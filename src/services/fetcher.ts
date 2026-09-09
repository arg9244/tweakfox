/**
 * Fetcher service for dynamically loading preferences from upstream repositories.
 * Handles fetching, parsing, caching, and fallback logic.
 */

import { parseUserJs, mergeParsedFiles, type ParsedPreference } from "./parser";

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

// Source files to fetch
const SOURCES: SourceConfig[] = [
  {
    name: "arkenfox",
    url: "https://raw.githubusercontent.com/arkenfox/user.js/master/user.js",
    category: "arkenfox",
    enabled: true,
  },
  {
    name: "Betterfox-Fastfox",
    url: "https://raw.githubusercontent.com/yokoffing/Betterfox/main/Fastfox.js",
    category: "betterfox",
    enabled: true,
  },
  {
    name: "Betterfox-Securefox",
    url: "https://raw.githubusercontent.com/yokoffing/Betterfox/main/Securefox.js",
    category: "betterfox",
    enabled: true,
  },
  {
    name: "Betterfox-Peskyfox",
    url: "https://raw.githubusercontent.com/yokoffing/Betterfox/main/Peskyfox.js",
    category: "betterfox",
    enabled: true,
  },
  {
    name: "Betterfox-Smoothfox",
    url: "https://raw.githubusercontent.com/yokoffing/Betterfox/main/Smoothfox.js",
    category: "betterfox",
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

  console.log("[Fetcher] Fetching preferences from sources...");

  const results = await Promise.all(
    SOURCES.filter((s) => s.enabled).map(fetchAndParseSource)
  );

  const allPreferences: ParsedPreference[] = [];
  const errors: string[] = [];
  const sources: string[] = [];

  for (const result of results) {
    allPreferences.push(...result.preferences);
    if (result.error) {
      errors.push(result.error);
    }
  }

  // Merge and deduplicate
  const merged = mergeParsedFiles(
    SOURCES.filter((s) => s.enabled).map((s, i) => ({
      source: s.name,
      preferences: results[i].preferences,
      sections: [],
    }))
  );

  const fetchResult: FetchResult = {
    preferences: merged,
    lastUpdated: Date.now(),
    sources: SOURCES.filter((s) => s.enabled).map((s) => s.name),
    errors,
  };

  // Save to cache
  saveToCache(fetchResult);

  console.log(`[Fetcher] Loaded ${merged.length} preferences from ${sources.length} sources`);
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
