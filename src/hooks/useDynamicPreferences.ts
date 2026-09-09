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
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  togglePreference: (key: string) => void;
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
    { key: "security", name: "Security & Privacy", icon: "Shield", description: "Enhanced tracking protection, HTTPS enforcement, and anti-fingerprinting." },
    { key: "telemetry", name: "Telemetry & Data", icon: "EyeOff", description: "Disable all telemetry, experiments, crash reports, and data collection." },
    { key: "ui", name: "UI & Annoyances", icon: "Sparkles", description: "Remove Mozilla UI clutter, disable AI features, and clean up the browsing experience." },
    { key: "privacy", name: "Privacy Hardening", icon: "Lock", description: "Advanced privacy settings: partitioning, cookies, and tracking prevention." },
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

  // Performance-related
  if (
    section.includes("fast") ||
    section.includes("performance") ||
    section.includes("cache") ||
    section.includes("network") ||
    section.includes("gfx") ||
    section.includes("render") ||
    key.includes("cache") ||
    key.includes("network") ||
    key.includes("gfx") ||
    key.includes("content.notify")
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

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
    isLoading,
    error,
    lastUpdated,
    togglePreference,
    applyPreset,
    clearAll,
    selectAll,
    refresh,
    getSelectedCount,
  };
}
