import { useState, useCallback } from "react";
import { categories } from "../data/preferences";
import { userChromeOptions, userContentOptions } from "../data/cssOptions";
import { presets } from "../data/presets";

export type TabId = string;

export function usePreferences() {
  const [selections, setSelections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const togglePreference = useCallback((key: string) => {
    setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    setSelections(preset.preferenceOverrides);
  }, []);

  const clearAll = useCallback(() => {
    setSelections({});
  }, []);

  const selectAll = useCallback(() => {
    const all: Record<string, boolean> = {};
    categories.forEach((cat) => {
      cat.preferences.forEach((p) => {
        all[p.key] = true;
      });
    });
    userChromeOptions.forEach((o) => { all[o.id] = true; });
    userContentOptions.forEach((o) => { all[o.id] = true; });
    setSelections(all);
  }, []);

  const getSelectedCount = useCallback(() => {
    return Object.values(selections).filter(Boolean).length;
  }, [selections]);

  return {
    selections,
    searchQuery,
    setSearchQuery,
    togglePreference,
    applyPreset,
    clearAll,
    selectAll,
    getSelectedCount,
  };
}
