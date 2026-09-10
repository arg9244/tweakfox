import { useState } from "react";
import { X, Download, Copy, Check, FileText } from "lucide-react";
import { generateUserJs, generateUserChrome, generateUserContent } from "../utils/generators";
import { userChromeOptions, userContentOptions } from "../data/cssOptions";

import type { Category } from "../hooks/useDynamicPreferences";

interface PreviewModalProps {
  categories: Category[];
  selections: Record<string, boolean>;
  customValues: Record<string, boolean | number | string>;
  onClose: () => void;
  onShowGuide: () => void;
}

type FileTab = "userjs" | "userchrome" | "usercontent";

export function PreviewModal({ categories, selections, customValues, onClose, onShowGuide }: PreviewModalProps) {
  const [activeTab, setActiveTab] = useState<FileTab>("userjs");
  const [copied, setCopied] = useState(false);

  const userjs = generateUserJs(categories, selections, customValues);
  const userchrome = generateUserChrome(selections);
  const usercontent = generateUserContent(selections);

  const getContent = () => {
    switch (activeTab) {
      case "userjs": return userjs;
      case "userchrome": return userchrome;
      case "usercontent": return usercontent;
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case "userjs": return "user.js";
      case "userchrome": return "userChrome.css";
      case "usercontent": return "userContent.css";
    }
  };

  const content = getContent();
  const hasContent = content.trim().length > 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = getFilename();
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    if (userjs) downloadFile("user.js", userjs);
    if (userchrome) downloadFile("userChrome.css", userchrome);
    if (usercontent) downloadFile("userContent.css", usercontent);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const userjsCount = userjs ? (userjs.match(/user_pref\(/g) || []).length : 0;
  const userchromeCount = userChromeOptions.filter((o) => selections[o.id]).length;
  const usercontentCount = userContentOptions.filter((o) => selections[o.id]).length;

  const tabs = [
    { id: "userjs" as const, label: "user.js", count: userjsCount },
    { id: "userchrome" as const, label: "userChrome.css", count: userchromeCount },
    { id: "usercontent" as const, label: "userContent.css", count: usercontentCount },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e2e] border border-[#313244] rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#313244]">
          <h2 className="text-lg font-semibold text-[#cdd6f4]">Preview & Export</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#313244] px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#cba6f7] text-[#cba6f7]"
                  : "border-transparent text-[#6c7086] hover:text-[#a6adc8]"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-[#45475a] rounded text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {hasContent ? (
            <pre className="text-xs font-mono text-[#a6e3a1] bg-[#11111b] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {content}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <FileText className="w-12 h-12 text-[#45475a] mb-3" />
              <p className="text-[#6c7086] text-sm">
                No {getFilename()} options selected. Go back and select some preferences.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {hasContent && (
          <div className="border-t border-[#313244] p-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] border border-[#45475a] rounded-lg text-sm text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#a6e3a1]" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#cba6f7] text-[#1e1e2e] rounded-lg text-sm font-medium hover:bg-[#b4befe] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download {getFilename()}
            </button>
            <button
              type="button"
              onClick={handleDownloadAll}
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] border border-[#45475a] rounded-lg text-sm text-[#cdd6f4] hover:border-[#585b70] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onShowGuide}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#89b4fa] hover:text-[#b4befe] transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Installation Guide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
