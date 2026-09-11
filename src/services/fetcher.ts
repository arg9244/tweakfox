/**
 * Fetcher service for dynamically loading preferences from upstream repositories.
 * Handles fetching, parsing, caching, and fallback logic.
 */

import { parseUserJs, mergeParsedFiles, type ParsedPreference } from "./parser";
import { fetchCustomUserJs } from "./customUserJs";

export interface SourceConfig {
  name: string;
  url: string;
  category: string;
  enabled: boolean;
}

export interface FetchResult {
  preferences: ParsedPreference[];
  lastUpdated: number;
  sources: string[];
  errors: string[];
}

const CACHE_KEY = "firefox-config-generator-cache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Source files to fetch - Now using custom user.js as primary source
const SOURCES: SourceConfig[] = [
  {
    name: "Custom-UserJS",
    url: "https://raw.githubusercontent.com/arg9244/dotfiles/refs/heads/main/dot_config/private_mozilla/private_firefox/private_x4ly4jil.default-nightly/user.js",
    category: "custom",
    enabled: true,
  },
];

/**
 * Fetch a single source file and parse it
 */
async function fetchAndParseSource(source: SourceConfig): Promise<{
  preferences: ParsedPreference[];
  error?: string;
}> {
  try {
    const response = await fetch(source.url, {
      headers: {
        Accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();
    const parsed = parseUserJs(content, source.name);

    // Tag each preference with its category
    const tagged = parsed.preferences.map((pref) => ({
      ...pref,
      category: source.category,
    }));

    return { preferences: tagged };
  } catch (error) {
    return {
      preferences: [],
      error: `Failed to fetch ${source.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Fetch all sources and merge preferences
 */
export async function fetchAllPreferences(forceRefresh = false): Promise<FetchResult> {
  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cached = loadFromCache();
    if (cached && Date.now() - cached.lastUpdated < CACHE_TTL) {
      console.log("[Fetcher] Using cached preferences");
      return cached;
    }
  }

  console.log("[Fetcher] Fetching preferences from custom user.js source...");

  const errors: string[] = [];
  let preferences: ParsedPreference[] = [];

  try {
    // Fetch and parse the custom user.js file
    preferences = await fetchCustomUserJs();
    console.log(`[Fetcher] Loaded ${preferences.length} preferences from custom user.js`);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    errors.push(`Failed to fetch custom user.js: ${errorMsg}`);
    console.error("[Fetcher] Error fetching custom user.js:", error);
  }

  const fetchResult: FetchResult = {
    preferences,
    lastUpdated: Date.now(),
    sources: ["Custom-UserJS"],
    errors,
  };

  // Save to cache
  saveToCache(fetchResult);

  if (errors.length > 0) {
    console.warn("[Fetcher] Errors:", errors);
  }

  return fetchResult;
}

/**
 * Load preferences from localStorage cache
 */
function loadFromCache(): FetchResult | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached);
    return {
      preferences: data.preferences || [],
      lastUpdated: data.lastUpdated || 0,
      sources: data.sources || [],
      errors: data.errors || [],
    };
  } catch (error) {
    console.error("[Fetcher] Failed to load cache:", error);
    return null;
  }
}

/**
 * Save preferences to localStorage cache
 */
function saveToCache(result: FetchResult): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        preferences: result.preferences,
        lastUpdated: result.lastUpdated,
        sources: result.sources,
        errors: result.errors,
      })
    );
  } catch (error) {
    console.error("[Fetcher] Failed to save cache:", error);
  }
}

/**
 * Clear the cache
 */
export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log("[Fetcher] Cache cleared");
  } catch (error) {
    console.error("[Fetcher] Failed to clear cache:", error);
  }
}

/**
 * Get cache info
 */
export function getCacheInfo(): { exists: boolean; age: number; size: number } | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached);
    return {
      exists: true,
      age: Date.now() - (data.lastUpdated || 0),
      size: cached.length,
    };
  } catch {
    return null;
  }
}
