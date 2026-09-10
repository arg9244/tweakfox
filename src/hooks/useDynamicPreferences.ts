/**
 * Hook for managing dynamically loaded preferences.
 * Handles fetching, caching, selection state, and provides UI-ready data.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchAllPreferences, clearCache, type FetchResult } from "../services/fetcher";
import { userChromeOptions, userContentOptions } from "../data/cssOptions";
import type { ParsedPreference } from "../services/parser";

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  preferences: ParsedPreference[];
}

export interface UseDynamicPreferencesResult {
  categories: Category[];
  selections: Record<string, boolean>;
  customValues: Record<string, boolean | number | string>;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  loadedFileName: string | null;
  togglePreference: (key: string) => void;
  setCustomValue: (key: string, value: boolean | number | string) => void;
  loadUserJs: (content: string, fileName: string) => { loaded: number; errors: string[] };
  applyPreset: (presetId: string) => void;
  clearAll: () => void;
  selectAll: () => void;
  refresh: () => Promise<void>;
  getSelectedCount: () => number;
}

// Map upstream sections to UI categories
function mapToCategories(preferences: ParsedPreference[]): Category[] {
  const categoryMap = new Map<string, ParsedPreference[]>();

  for (const pref of preferences) {
    const categoryKey = getCategoryKey(pref);
    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, []);
    }
    categoryMap.get(categoryKey)!.push(pref);
  }

  const categories: Category[] = [];

  // Define category order and metadata
  const categoryDefs = [
    { key: "performance", name: "Performance", icon: "Zap", description: "Speed up Firefox with optimized caching, networking, and rendering settings." },
    { key: "networking", name: "Networking", icon: "Globe", description: "Network optimization, proxy settings, DNS, and connection management." },
    { key: "security", name: "Security", icon: "Shield", description: "HTTPS enforcement, SSL/TLS settings, certificate validation, and security hardening." },
    { key: "privacy", name: "Privacy & Tracking", icon: "Eye", description: "Tracking protection, cookie management, fingerprinting prevention, and data isolation." },
    { key: "telemetry", name: "Telemetry & Data Collection", icon: "EyeOff", description: "Disable all telemetry, experiments, crash reports, and data collection." },
    { key: "ui", name: "UI & Experience", icon: "Sparkles", description: "Interface customization, new tab page, URL bar, and user experience tweaks." },
    { key: "media", name: "Media & Downloads", icon: "Play", description: "Video/audio playback, buffering, downloads, and PDF handling." },
    { key: "extensions", name: "Extensions & Add-ons", icon: "Puzzle", description: "Extension management, scopes, and add-on behavior." },
    { key: "other", name: "Other Settings", icon: "Settings", description: "Additional preferences and settings." },
  ];

  for (const def of categoryDefs) {
    const prefs = categoryMap.get(def.key) || [];
    if (prefs.length > 0) {
      categories.push({
        id: def.key,
        name: def.name,
        icon: def.icon,
        description: def.description,
        preferences: prefs,
      });
    }
  }

  return categories;
}

function getCategoryKey(pref: ParsedPreference): string {
  const section = pref.section.toLowerCase();
  const key = pref.key.toLowerCase();

  // Networking (specific network settings)
  if (
    key.startsWith("network.") ||
    key.startsWith("dns.") ||
    section.includes("network") ||
    section.includes("proxy") ||
    section.includes("dns")
  ) {
    // But not network privacy settings
    if (!key.includes("predictor") && !key.includes("prefetch") && !key.includes("speculative")) {
      return "networking";
    }
  }

  // Media & Downloads
  if (
    key.startsWith("media.") ||
    key.startsWith("browser.download") ||
    key.startsWith("pdfjs") ||
    section.includes("media") ||
    section.includes("download") ||
    section.includes("pdf")
  ) {
    return "media";
  }

  // Extensions
  if (
    key.startsWith("extensions.") ||
    section.includes("extension") ||
    section.includes("addon")
  ) {
    return "extensions";
  }

  // Performance-related (rendering, cache, gfx)
  if (
    section.includes("fast") ||
    section.includes("performance") ||
    key.includes("gfx.") ||
    key.includes("content.notify") ||
    key.includes("nglayout") ||
    (key.includes("cache") && !key.startsWith("network.") && !key.startsWith("media."))
  ) {
    return "performance";
  }

  // Telemetry
  if (
    section.includes("telemetry") ||
    section.includes("experiment") ||
    section.includes("crash") ||
    section.includes("health") ||
    key.includes("telemetry") ||
    key.includes("datareporting") ||
    key.includes("breakpad") ||
    key.includes("normandy") ||
    key.includes("shield")
  ) {
    return "telemetry";
  }

  // UI/Annoyances
  if (
    section.includes("ui") ||
    section.includes("pesky") ||
    section.includes("mozilla") ||
    section.includes("newtab") ||
    section.includes("urlbar") ||
    key.includes("browser.newtabpage") ||
    key.includes("browser.urlbar") ||
    key.includes("browser.shell") ||
    key.includes("browser.about") ||
    key.includes("browser.discovery") ||
    key.includes("extensions.getAddons") ||
    key.includes("browser.preferences")
  ) {
    return "ui";
  }

  // Security & Privacy
  if (
    section.includes("secure") ||
    section.includes("tracking") ||
    section.includes("privacy") ||
    section.includes("https") ||
    section.includes("ssl") ||
    section.includes("ocsp") ||
    key.includes("privacy") ||
    key.includes("security") ||
    key.includes("tracking") ||
    key.includes("safebrowsing") ||
    key.includes("https_only") ||
    key.includes("dom.security")
  ) {
    return "security";
  }

  // Privacy hardening (more aggressive)
  if (
    section.includes("hardening") ||
    section.includes("fingerprint") ||
    section.includes("partition") ||
    key.includes("resistfingerprint") ||
    key.includes("partition") ||
    key.includes("purge_trackers") ||
    key.includes("query_stripping")
  ) {
    return "privacy";
  }

  return "other";
}

export function useDynamicPreferences(): UseDynamicPreferencesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selections, setSelections] = useState<Record<string, boolean>>({});
  const [customValues, setCustomValues] = useState<Record<string, boolean | number | string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchAllPreferences(forceRefresh);
      const mapped = mapToCategories(result.preferences);
      setCategories(mapped);
      setLastUpdated(result.lastUpdated);

      if (result.errors.length > 0) {
        setError(`Some sources failed to load: ${result.errors.join(", ")}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = useCallback(async () => {
    clearCache();
    await loadPreferences(true);
  }, []);

  const togglePreference = useCallback((key: string) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setCustomValue = useCallback((key: string, value: boolean | number | string) => {
    setCustomValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const loadUserJs = useCallback((content: string, fileName: string) => {
    const lines = content.split(/\r?\n/);
    const newSelections: Record<string, boolean> = {};
    const newCustomValues: Record<string, boolean | number | string> = {};
    const errors: string[] = [];
    let loaded = 0;

    const USER_PREF_REGEX = /^\s*(\/\/\s*)?user_pref\s*\(\s*"([^"]+)"\s*,\s*(.+?)\s*\)\s*;?\s*$/;

    lines.forEach((line, index) => {
      const match = line.match(USER_PREF_REGEX);
      if (match) {
        const isCommented = !!match[1];
        const key = match[2];
        const rawValue = match[3].trim().replace(/,?\s*$/, "");

        try {
          let value: boolean | number | string;
          let type: "boolean" | "number" | "string";

          if (rawValue === "true") {
            value = true;
            type = "boolean";
          } else if (rawValue === "false") {
            value = false;
            type = "boolean";
          } else {
            const num = Number(rawValue);
            if (!isNaN(num) && rawValue !== "") {
              value = num;
              type = "number";
            } else {
              const strMatch = rawValue.match(/^["'](.*)["']$/);
              if (strMatch) {
                value = strMatch[1];
                type = "string";
              } else {
                value = rawValue;
                type = "string";
              }
            }
          }

          // Only load non-commented preferences
          if (!isCommented) {
            newSelections[key] = true;
            
            // Check if this is a non-boolean value or if we should store it
            if (type !== "boolean") {
              newCustomValues[key] = value;
            }
            
            loaded++;
          }
        } catch (err) {
          errors.push(`Line ${index + 1}: Failed to parse value for "${key}"`);
        }
      }
    });

    setSelections(newSelections);
    setCustomValues(newCustomValues);
    setLoadedFileName(fileName);

    return { loaded, errors };
  }, []);

  const applyPreset = useCallback(
    (presetId: string) => {
      const newSelections: Record<string, boolean> = {};

      // Simple preset logic based on category
      for (const category of categories) {
        for (const pref of category.preferences) {
          if (presetId === "balanced") {
            // Enable low-risk, recommended prefs
            if (
              category.id === "telemetry" ||
              (category.id === "security" && !pref.key.includes("resistfingerprint"))
            ) {
              newSelections[pref.key] = true;
            }
          } else if (presetId === "privacy") {
            // Enable all security/privacy/telemetry
            if (
              category.id === "telemetry" ||
              category.id === "security" ||
              category.id === "privacy"
            ) {
              newSelections[pref.key] = true;
            }
          } else if (presetId === "performance") {
            // Enable all performance
            if (category.id === "performance") {
              newSelections[pref.key] = true;
            }
          } else if (presetId === "hardened") {
            // Enable everything
            newSelections[pref.key] = true;
          }
        }
      }

      setSelections(newSelections);
    },
    [categories]
  );

  const clearAll = useCallback(() => {
    setSelections({});
    setCustomValues({});
    setLoadedFileName(null);
  }, []);

  const selectAll = useCallback(() => {
    const all: Record<string, boolean> = {};
    for (const category of categories) {
      for (const pref of category.preferences) {
        all[pref.key] = true;
      }
    }
    // Also include CSS options
    for (const opt of userChromeOptions) {
      all[opt.id] = true;
    }
    for (const opt of userContentOptions) {
      all[opt.id] = true;
    }
    setSelections(all);
  }, [categories]);

  const getSelectedCount = useCallback(() => {
    return Object.values(selections).filter(Boolean).length;
  }, [selections]);

  return {
    categories,
    selections,
    customValues,
    isLoading,
    error,
    lastUpdated,
    loadedFileName,
    togglePreference,
    setCustomValue,
    loadUserJs,
    applyPreset,
    clearAll,
    selectAll,
    refresh,
    getSelectedCount,
  };
}
