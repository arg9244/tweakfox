import { X, Folder, FileText, Monitor, Apple, Laptop } from "lucide-react";

interface SetupGuideProps {
  onClose: () => void;
}

export function SetupGuide({ onClose }: SetupGuideProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e2e] border border-[#313244] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1e1e2e] border-b border-[#313244] p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#cdd6f4]">Installation Guide</h2>
          <button
            onClick={onClose}
            className="text-[#6c7086] hover:text-[#cdd6f4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* user.js Instructions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#89b4fa]" />
              <h3 className="text-lg font-medium text-[#cdd6f4]">user.js (Preferences)</h3>
            </div>
            <div className="bg-[#313244] rounded-lg p-4 space-y-3">
              <p className="text-[#a6adc8] text-sm">
                The <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">user.js</code> file contains Firefox preferences that override default settings.
              </p>
              <div className="space-y-2">
                <p className="text-[#cdd6f4] text-sm font-medium">Installation steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#a6adc8] text-sm">
                  <li>Open Firefox and type <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:profiles</code> in the URL bar</li>
                  <li>Find your profile and click "Open Folder" in the Root Directory section</li>
                  <li>Place the downloaded <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">user.js</code> file in that folder</li>
                  <li>Restart Firefox to apply the changes</li>
                </ol>
              </div>
            </div>
          </div>

          {/* userChrome.css Instructions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#cba6f7]" />
              <h3 className="text-lg font-medium text-[#cdd6f4]">userChrome.css (Browser UI)</h3>
            </div>
            <div className="bg-[#313244] rounded-lg p-4 space-y-3">
              <p className="text-[#a6adc8] text-sm">
                The <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">userChrome.css</code> file customizes Firefox's interface (tabs, toolbars, etc.).
              </p>
              <div className="space-y-2">
                <p className="text-[#cdd6f4] text-sm font-medium">Installation steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#a6adc8] text-sm">
                  <li>Open <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:config</code> and set <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">toolkit.legacyUserProfileCustomizations.stylesheets</code> to <code className="text-[#a6e3a1]">true</code></li>
                  <li>Open <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:profiles</code> and find your profile Root Directory</li>
                  <li>Create a folder named <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">chrome</code> (lowercase) if it doesn't exist</li>
                  <li>Place <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">userChrome.css</code> inside the chrome folder</li>
                  <li>Restart Firefox</li>
                </ol>
              </div>
            </div>
          </div>

          {/* userContent.css Instructions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#94e2d5]" />
              <h3 className="text-lg font-medium text-[#cdd6f4]">userContent.css (Web Content)</h3>
            </div>
            <div className="bg-[#313244] rounded-lg p-4 space-y-3">
              <p className="text-[#a6adc8] text-sm">
                The <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">userContent.css</code> file customizes how web pages are displayed (scrollbars, fonts, etc.).
              </p>
              <div className="space-y-2">
                <p className="text-[#cdd6f4] text-sm font-medium">Installation steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#a6adc8] text-sm">
                  <li>Open <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:config</code> and set <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">toolkit.legacyUserProfileCustomizations.stylesheets</code> to <code className="text-[#a6e3a1]">true</code></li>
                  <li>Open <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:profiles</code> and find your profile Root Directory</li>
                  <li>Create a folder named <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">chrome</code> (lowercase) if it doesn't exist</li>
                  <li>Place <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">userContent.css</code> inside the chrome folder</li>
                  <li>Restart Firefox</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Profile Paths */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Folder className="w-5 h-5 text-[#f9e2af]" />
              <h3 className="text-lg font-medium text-[#cdd6f4]">Profile Locations by OS</h3>
            </div>
            <div className="bg-[#313244] rounded-lg p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-[#89b4fa]" />
                  <p className="text-[#cdd6f4] text-sm font-medium">Windows</p>
                </div>
                <code className="block text-xs text-[#a6e3a1] bg-[#1e1e2e] rounded p-2 break-all">
                  %APPDATA%\Mozilla\Firefox\Profiles\XXXXXXXX.default-release\
                </code>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Apple className="w-4 h-4 text-[#89b4fa]" />
                  <p className="text-[#cdd6f4] text-sm font-medium">macOS</p>
                </div>
                <code className="block text-xs text-[#a6e3a1] bg-[#1e1e2e] rounded p-2 break-all">
                  ~/Library/Application Support/Firefox/Profiles/XXXXXXXX.default-release/
                </code>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Laptop className="w-4 h-4 text-[#89b4fa]" />
                  <p className="text-[#cdd6f4] text-sm font-medium">Linux</p>
                </div>
                <code className="block text-xs text-[#a6e3a1] bg-[#1e1e2e] rounded p-2 break-all">
                  ~/.mozilla/firefox/XXXXXXXX.default-release/
                </code>
              </div>

              <div className="pt-3 border-t border-[#45475a]">
                <p className="text-[#a6adc8] text-xs">
                  <span className="text-[#f9e2af]">Note:</span> Replace <code className="bg-[#45475a] px-1.5 py-0.5 rounded">XXXXXXXX.default-release</code> with your actual profile folder name.
                </p>
              </div>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-[#f38ba8]/10 border border-[#f38ba8]/20 rounded-lg p-4">
            <p className="text-[#f38ba8] text-sm font-medium mb-2">⚠️ Important Notes</p>
            <ul className="list-disc list-inside space-y-1.5 text-[#a6adc8] text-sm">
              <li>Always backup your profile before making changes</li>
              <li>Some preferences may cause websites to break or behave unexpectedly</li>
              <li>High-risk preferences should only be used if you understand the implications</li>
              <li>You can reset Firefox to default settings via <code className="text-[#f9e2af] bg-[#45475a] px-1.5 py-0.5 rounded">about:support</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
