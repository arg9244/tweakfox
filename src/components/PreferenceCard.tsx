import { useState } from "react";
import { ChevronDown, AlertTriangle, AlertCircle, Edit3, Search } from "lucide-react";
import type { ParsedPreference } from "../services/parser";
import { getDescription } from "../data/descriptions";
import { getTagsForPreference, getTagColorClass } from "../data/tags";

interface PreferenceCardProps {
  preference: ParsedPreference;
  isSelected: boolean;
  customValue?: boolean | number | string;
  onToggle: () => void;
  onValueChange?: (value: boolean | number | string) => void;
}

export function PreferenceCard({
  preference,
  isSelected,
  customValue,
  onToggle,
  onValueChange,
}: PreferenceCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showValueEditor, setShowValueEditor] = useState(false);

  // Use curated description if available, otherwise fall back to parsed description
  const description = getDescription(preference.key, preference.description);

  const sourceColors: Record<string, string> = {
    betterfox: "text-[#89b4fa] bg-[#89b4fa]/10",
    arkenfox: "text-[#cba6f7] bg-[#cba6f7]/10",
  };

  const getSourceLabel = (source: string) => {
    if (source.toLowerCase().includes("betterfox")) return "Betterfox";
    if (source.toLowerCase().includes("arkenfox")) return "arkenfox";
    return source;
  };

  const isBoolean = preference.type === "boolean";
  const currentValue = customValue !== undefined ? customValue : preference.value;
  const hasCustomValue = customValue !== undefined && customValue !== preference.value;
  const tags = getTagsForPreference(preference.key);

  const handleSearchAI = () => {
    const query = encodeURIComponent(
      `Explain Firefox preference "${preference.key}" - what does it do, is it safe, and do you recommend enabling it?`
    );
    window.open(`https://duckduckgo.com/?q=${query}&ia=chat`, "_blank");
  };

  return (
    <div
      className={`rounded-lg p-4 border transition-colors ${
        isSelected
          ? "bg-[#313244] border-[#a6e3a1]/30"
          : "bg-[#313244] border-[#45475a] hover:border-[#585b70]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-medium text-[#cdd6f4] text-sm font-mono">
              {preference.key}
            </h3>
            {preference.warnings.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border text-[#f9e2af] bg-[#f9e2af]/10 border-[#f9e2af]/20">
                <AlertTriangle className="w-3 h-3" />
                warning
              </span>
            )}
            {hasCustomValue && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border text-[#89dceb] bg-[#89dceb]/10 border-[#89dceb]/20">
                <Edit3 className="w-3 h-3" />
                custom
              </span>
            )}
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                sourceColors[preference.source] || "text-[#94e2d5] bg-[#94e2d5]/10"
              }`}
            >
              {getSourceLabel(preference.source)}
            </span>
          </div>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`px-2 py-0.5 rounded-full text-xs border ${getTagColorClass(tag.color)}`}
                  title={tag.description}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-[#a6adc8] text-sm leading-relaxed">{description}</p>
          {preference.notes.length > 0 && (
            <p className="text-[#6c7086] text-xs mt-1 italic">{preference.notes[0]}</p>
          )}
        </div>

        {/* Toggle for boolean, or value display for others */}
        {isBoolean ? (
          <button
            type="button"
            role="switch"
            aria-checked={isSelected}
            onClick={onToggle}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
              isSelected ? "bg-[#a6e3a1]" : "bg-[#45475a]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-150 ${
                isSelected ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              role="switch"
              aria-checked={isSelected}
              onClick={onToggle}
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                isSelected ? "bg-[#a6e3a1]" : "bg-[#45475a]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-150 ${
                  isSelected ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            {isSelected && onValueChange && (
              <button
                type="button"
                onClick={() => setShowValueEditor(!showValueEditor)}
                className="p-1.5 rounded bg-[#45475a] hover:bg-[#585b70] transition-colors cursor-pointer"
                title="Edit value"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#cdd6f4]" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Value Editor for non-boolean prefs */}
      {showValueEditor && isSelected && onValueChange && !isBoolean && (
        <div className="mt-3 pt-3 border-t border-[#45475a]">
          <label className="block text-xs text-[#6c7086] mb-2">
            Custom Value ({preference.type})
          </label>
          {preference.type === "number" ? (
            <input
              type="number"
              value={String(currentValue)}
              onChange={(e) => onValueChange(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#1e1e2e] border border-[#45475a] rounded text-sm text-[#cdd6f4] focus:outline-none focus:border-[#cba6f7] transition-colors font-mono"
            />
          ) : (
            <input
              type="text"
              value={String(currentValue)}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full px-3 py-2 bg-[#1e1e2e] border border-[#45475a] rounded text-sm text-[#cdd6f4] focus:outline-none focus:border-[#cba6f7] transition-colors font-mono"
            />
          )}
          <p className="text-xs text-[#6c7086] mt-1.5">
            Default:{" "}
            <code className="text-[#a6e3a1]">
              {typeof preference.value === "string"
                ? `"${preference.value}"`
                : String(preference.value)}
            </code>
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="mt-3 flex items-center gap-1 text-xs text-[#6c7086] hover:text-[#a6adc8] transition-colors cursor-pointer"
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`}
        />
        {showDetails ? "Hide" : "Show"} technical details
      </button>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-[#45475a] space-y-2 text-xs font-mono">
          <div>
            <span className="text-[#6c7086]">Key: </span>
            <span className="text-[#89b4fa]">{preference.key}</span>
          </div>
          <div>
            <span className="text-[#6c7086]">Type: </span>
            <span className="text-[#f9e2af]">{preference.type}</span>
          </div>
          <div>
            <span className="text-[#6c7086]">Default Value: </span>
            <span className="text-[#a6e3a1]">
              {typeof preference.value === "string"
                ? `"${preference.value}"`
                : String(preference.value)}
            </span>
          </div>
          {hasCustomValue && (
            <div>
              <span className="text-[#6c7086]">Custom Value: </span>
              <span className="text-[#89dceb]">
                {typeof currentValue === "string"
                  ? `"${currentValue}"`
                  : String(currentValue)}
              </span>
            </div>
          )}
          <div>
            <span className="text-[#6c7086]">Section: </span>
            <span className="text-[#cdd6f4]">{preference.section}</span>
          </div>
          <div>
            <span className="text-[#6c7086]">Source: </span>
            <span className="text-[#cdd6f4]">{preference.source}</span>
          </div>
          {preference.settings.length > 0 && (
            <div>
              <span className="text-[#6c7086]">Settings: </span>
              <span className="text-[#cdd6f4]">{preference.settings.join(", ")}</span>
            </div>
          )}
          {preference.warnings.length > 0 && (
            <div>
              <span className="text-[#f9e2af]">Warnings: </span>
              <span className="text-[#f9e2af]">{preference.warnings.join("; ")}</span>
            </div>
          )}
          {preference.references.length > 0 && (
            <div>
              <span className="text-[#6c7086]">References: </span>
              <div className="mt-1 space-y-0.5">
                {preference.references.slice(0, 3).map((ref, i) => (
                  <div key={i} className="text-[#89b4fa] truncate">
                    {ref}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* AI Search Button */}
          <div className="pt-2 mt-2 border-t border-[#45475a]">
            <button
              type="button"
              onClick={handleSearchAI}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#89b4fa]/10 hover:bg-[#89b4fa]/20 border border-[#89b4fa]/20 rounded text-xs text-[#89b4fa] transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3" />
              Ask AI to explain this preference
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
