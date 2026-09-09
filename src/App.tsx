import { useState, useMemo } from "react";
import {
  Zap,
  Shield,
  Eye,
  Sparkles,
  Lock,
  ShieldAlert,
  Paintbrush,
  Globe,
  Download,
  RotateCcw,
  CheckSquare,
  HelpCircle,
  Settings,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { userChromeOptions, userContentOptions } from "./data/cssOptions";
import { useDynamicPreferences } from "./hooks/useDynamicPreferences";
import { SearchBar } from "./components/SearchBar";
import { PreferenceCard } from "./components/PreferenceCard";
import { CSSOptionCard } from "./components/CSSOptionCard";
import { PresetSelector } from "./components/PresetSelector";
import { PreviewModal } from "./components/PreviewModal";
import { SetupGuide } from "./components/SetupGuide";

type TabId = string;

const iconMap: Record<string, typeof Zap> = {
  Zap,
  Shield,
  Eye,
  Sparkles,
  Lock,
  ShieldAlert,
  Paintbrush,
  Globe,
  Settings,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const {
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
  } = useDynamicPreferences();

  const selectedCount = getSelectedCount();

  // Set initial active tab when categories load
  if (!activeTab && categories.length > 0) {
    setActiveTab(categories[0].id);
  }

  const tabItems = useMemo(() => {
    const prefTabs = categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon, type: "pref" as const }));
    return [
      ...prefTabs,
      { id: "userchrome", name: "userChrome.css", icon: "Paintbrush", type: "css" as const },
      { id: "usercontent", name: "userContent.css", icon: "Globe", type: "css" as const },
    ];
  }, [categories]);

  const filteredPreferences = useMemo(() => {
    const cat = categories.find((c) => c.id === activeTab);
    if (!cat) return [];
    if (!searchQuery) return cat.preferences;
    const q = searchQuery.toLowerCase();
    return cat.preferences.filter(
      (p) =>
        p.key.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.section.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery, categories]);

  const filteredUserChrome = useMemo(() => {
    if (activeTab !== "userchrome") return [];
    if (!searchQuery) return userChromeOptions;
    const q = searchQuery.toLowerCase();
    return userChromeOptions.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery]);

  const filteredUserContent = useMemo(() => {
    if (activeTab !== "usercontent") return [];
    if (!searchQuery) return userContentOptions;
    const q = searchQuery.toLowerCase();
    return userContentOptions.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery]);

  const getTabSelectedCount = (tabId: string): number => {
    if (tabId === "userchrome") {
      return userChromeOptions.filter((o) => selections[o.id]).length;
    }
    if (tabId === "usercontent") {
      return userContentOptions.filter((o) => selections[o.id]).length;
    }
    const cat = categories.find((c) => c.id === tabId);
    if (!cat) return 0;
    return cat.preferences.filter((p) => selections[p.key]).length;
  };

  const currentTab = tabItems.find((t) => t.id === activeTab);
  const currentCategory = categories.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1e1e2e]/95 backdrop-blur-sm border-b border-[#313244]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#cba6f7]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#cba6f7]" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#cdd6f4]">Firefox Config Generator</h1>
                <p className="text-xs text-[#6c7086]">user.js · userChrome.css · userContent.css</p>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#6c7086] px-2">
                {selectedCount} selected
              </span>
              {lastUpdated && (
                <span className="text-xs text-[#6c7086]">
                  Updated {new Date(lastUpdated).toLocaleDateString()}
                </span>
              )}
              <button
                type="button"
                onClick={refresh}
                disabled={isLoading}
                className="p-2 text-[#6c7086] hover:text-[#cdd6f4] transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh preferences from source"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </button>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="px-3 py-2 text-xs bg-[#313244] border border-[#45475a] rounded-lg text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer"
              >
                Presets
              </button>
              <button
                type="button"
                onClick={() => setShowGuide(true)}
                className="p-2 text-[#6c7086] hover:text-[#cdd6f4] transition-colors cursor-pointer"
                title="Installation guide"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                disabled={selectedCount === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#cba6f7] text-[#1e1e2e] rounded-lg text-sm font-medium hover:bg-[#b4befe] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-[#f38ba8]/10 border border-[#f38ba8]/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-[#f38ba8] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#f38ba8]">{error}</p>
              <p className="text-xs text-[#6c7086] mt-1">
                Using cached data. Some preferences may be outdated.
              </p>
            </div>
            <button
              type="button"
              onClick={refresh}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs bg-[#313244] border border-[#45475a] rounded text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer disabled:opacity-50"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-[#cba6f7] animate-spin mb-4" />
            <p className="text-[#a6adc8] text-sm">Loading preferences from upstream sources...</p>
            <p className="text-[#6c7086] text-xs mt-2">Fetching from Betterfox and arkenfox repositories</p>
          </div>
        )}

        {/* Presets Panel */}
        {showPresets && (
          <div className="mb-6">
            <PresetSelector onApplyPreset={(id) => { applyPreset(id); setShowPresets(false); }} />
          </div>
        )}

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs bg-[#313244] border border-[#45475a] rounded-lg text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Select All
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs bg-[#313244] border border-[#45475a] rounded-lg text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <nav className="lg:w-56 flex-shrink-0">
            <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-1 px-1">
              {tabItems.map((tab) => {
                const Icon = iconMap[tab.icon] || Settings;
                const isActive = activeTab === tab.id;
                const count = getTabSelectedCount(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#313244] text-[#cdd6f4] border border-[#45475a]"
                        : "text-[#6c7086] hover:text-[#a6adc8] hover:bg-[#313244]/50 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-left">{tab.name}</span>
                    {count > 0 && (
                      <span className="ml-auto px-1.5 py-0.5 bg-[#45475a] rounded text-xs text-[#a6adc8]">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Category Header */}
            {(currentCategory || currentTab?.type === "css") && (
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#cdd6f4] mb-1">
                  {currentCategory?.name || currentTab?.name}
                </h2>
                <p className="text-sm text-[#6c7086]">
                  {currentCategory?.description ||
                    (currentTab?.id === "userchrome"
                      ? "Customize Firefox browser UI: tabs, toolbars, buttons, and layout."
                      : "Customize how web pages are displayed: scrollbars, fonts, animations, and more.")}
                </p>
              </div>
            )}

            {/* Preference List */}
            {currentCategory && (
              <div className="space-y-3">
                {filteredPreferences.length > 0 ? (
                  filteredPreferences.map((pref) => (
                    <PreferenceCard
                      key={pref.key}
                      preference={pref}
                      isSelected={!!selections[pref.key]}
                      onToggle={() => togglePreference(pref.key)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-[#6c7086] text-sm">
                    {searchQuery ? "No preferences match your search." : "No preferences in this category."}
                  </div>
                )}
              </div>
            )}

            {/* userChrome.css Options */}
            {activeTab === "userchrome" && (
              <div className="space-y-3">
                {filteredUserChrome.length > 0 ? (
                  filteredUserChrome.map((option) => (
                    <CSSOptionCard
                      key={option.id}
                      option={option}
                      isSelected={!!selections[option.id]}
                      onToggle={() => togglePreference(option.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-[#6c7086] text-sm">
                    {searchQuery ? "No options match your search." : "No options available."}
                  </div>
                )}
              </div>
            )}

            {/* userContent.css Options */}
            {activeTab === "usercontent" && (
              <div className="space-y-3">
                {filteredUserContent.length > 0 ? (
                  filteredUserContent.map((option) => (
                    <CSSOptionCard
                      key={option.id}
                      option={option}
                      isSelected={!!selections[option.id]}
                      onToggle={() => togglePreference(option.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-[#6c7086] text-sm">
                    {searchQuery ? "No options match your search." : "No options available."}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showPreview && (
        <PreviewModal
          categories={categories}
          selections={selections}
          onClose={() => setShowPreview(false)}
          onShowGuide={() => { setShowPreview(false); setShowGuide(true); }}
        />
      )}
      {showGuide && <SetupGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
