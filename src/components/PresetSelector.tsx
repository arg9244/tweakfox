import { presets } from "../data/presets";

interface PresetSelectorProps {
  onApplyPreset: (presetId: string) => void;
}

export function PresetSelector({ onApplyPreset }: PresetSelectorProps) {
  const colorMap: Record<string, string> = {
    blue: "hover:border-[#89b4fa] hover:bg-[#89b4fa]/5",
    mauve: "hover:border-[#cba6f7] hover:bg-[#cba6f7]/5",
    peach: "hover:border-[#fab387] hover:bg-[#fab387]/5",
    red: "hover:border-[#f38ba8] hover:bg-[#f38ba8]/5",
  };

  const iconColorMap: Record<string, string> = {
    blue: "text-[#89b4fa]",
    mauve: "text-[#cba6f7]",
    peach: "text-[#fab387]",
    red: "text-[#f38ba8]",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onApplyPreset(preset.id)}
          className={`text-left p-4 bg-[#313244] border border-[#45475a] rounded-lg transition-all cursor-pointer ${colorMap[preset.color]}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{preset.icon}</span>
            <h3 className={`font-medium text-sm ${iconColorMap[preset.color]}`}>{preset.name}</h3>
          </div>
          <p className="text-[#a6adc8] text-xs leading-relaxed">{preset.description}</p>
        </button>
      ))}
    </div>
  );
}
