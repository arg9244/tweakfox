import { useState } from "react";
import { ChevronDown, AlertTriangle, AlertCircle } from "lucide-react";
import type { Preference } from "../data/preferences";

interface PreferenceCardProps {
  preference: Preference;
  isSelected: boolean;
  onToggle: () => void;
}

export function PreferenceCard({ preference, isSelected, onToggle }: PreferenceCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const riskColors = {
    low: "text-[#a6e3a1] bg-[#a6e3a1]/10 border-[#a6e3a1]/20",
    medium: "text-[#f9e2af] bg-[#f9e2af]/10 border-[#f9e2af]/20",
    high: "text-[#f38ba8] bg-[#f38ba8]/10 border-[#f38ba8]/20",
  };

  const sourceColors = {
    betterfox: "text-[#89b4fa] bg-[#89b4fa]/10",
    arkenfox: "text-[#cba6f7] bg-[#cba6f7]/10",
    both: "text-[#94e2d5] bg-[#94e2d5]/10",
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
            <h3 className="font-medium text-[#cdd6f4] text-sm">{preference.name}</h3>
            {preference.risk && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${riskColors[preference.risk]}`}>
                {preference.risk === "high" ? (
                  <AlertTriangle className="w-3 h-3" />
                ) : preference.risk === "medium" ? (
                  <AlertCircle className="w-3 h-3" />
                ) : null}
                {preference.risk}
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs ${sourceColors[preference.source]}`}>
              {preference.source}
            </span>
          </div>
          <p className="text-[#a6adc8] text-sm leading-relaxed">{preference.description}</p>
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
              {typeof preference.defaultValue === "string"
                ? `"${preference.defaultValue}"`
                : String(preference.defaultValue)}
            </span>
          </div>
          <div>
            <span className="text-[#6c7086]">Section: </span>
            <span className="text-[#cdd6f4]">{preference.section}</span>
          </div>
        </div>
      )}
    </div>
  );
}
