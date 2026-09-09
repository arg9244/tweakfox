import { useState } from "react";
import { ChevronDown, AlertTriangle, AlertCircle } from "lucide-react";
import type { ParsedPreference } from "../services/parser";
import { getDescription } from "../data/descriptions";

interface PreferenceCardProps {
  preference: ParsedPreference;
  isSelected: boolean;
  onToggle: () => void;
}

export function PreferenceCard({ preference, isSelected, onToggle }: PreferenceCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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

  return (
    <div className={`rounded-lg p-4 border transition-colors ${
      isSelected 
        ? "bg-[#313244] border-[#a6e3a1]/30" 
        : "bg-[#313244] border-[#45475a] hover:border-[#585b70]"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-medium text-[#cdd6f4] text-sm">{preference.key.split(".").pop()}</h3>
            {preference.warnings.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border text-[#f9e2af] bg-[#f9e2af]/10 border-[#f9e2af]/20">
                <AlertTriangle className="w-3 h-3" />
                warning
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs ${sourceColors[preference.source] || "text-[#94e2d5] bg-[#94e2d5]/10"}`}>
              {getSourceLabel(preference.source)}
            </span>
          </div>
          <p className="text-[#a6adc8] text-sm leading-relaxed">{description}</p>
          {preference.notes.length > 0 && (
            <p className="text-[#6c7086] text-xs mt-1 italic">
              {preference.notes[0]}
            </p>
          )}
        </div>
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
      </div>

      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="mt-3 flex items-center gap-1 text-xs text-[#6c7086] hover:text-[#a6adc8] transition-colors cursor-pointer"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${showDetails ? "rotate-180" : ""}`} />
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
            <span className="text-[#6c7086]">Value: </span>
            <span className="text-[#a6e3a1]">
              {typeof preference.value === "string"
                ? `"${preference.value}"`
                : String(preference.value)}
            </span>
          </div>
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
        </div>
      )}
    </div>
  );
}
