import { useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import type { CSSOption } from "../data/cssOptions";

interface CSSOptionCardProps {
  option: CSSOption;
  isSelected: boolean;
  onToggle: () => void;
}

export function CSSOptionCard({ option, isSelected, onToggle }: CSSOptionCardProps) {
  const [showCSS, setShowCSS] = useState(false);

  return (
    <div className={`rounded-lg p-4 border transition-colors ${
      isSelected 
        ? "bg-[#313244] border-[#a6e3a1]/30" 
        : "bg-[#313244] border-[#45475a] hover:border-[#585b70]"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-medium text-[#cdd6f4] text-sm">{option.name}</h3>
            {option.risk === "medium" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border text-[#f9e2af] bg-[#f9e2af]/10 border-[#f9e2af]/20">
                <AlertCircle className="w-3 h-3" />
                medium
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-xs text-[#94e2d5] bg-[#94e2d5]/10">
              {option.category}
            </span>
          </div>
          <p className="text-[#a6adc8] text-sm leading-relaxed">{option.description}</p>
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
        onClick={() => setShowCSS(!showCSS)}
        className="mt-3 flex items-center gap-1 text-xs text-[#6c7086] hover:text-[#a6adc8] transition-colors cursor-pointer"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${showCSS ? "rotate-180" : ""}`} />
        {showCSS ? "Hide" : "Show"} CSS code
      </button>

      {showCSS && (
        <div className="mt-3 pt-3 border-t border-[#45475a]">
          <pre className="text-xs font-mono text-[#a6e3a1] bg-[#1e1e2e] rounded p-3 overflow-x-auto whitespace-pre-wrap">
            {option.css}
          </pre>
        </div>
      )}
    </div>
  );
}
