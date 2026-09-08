export interface CSSOption {
  id: string;
  name: string;
  description: string;
  css: string;
  category: string;
  risk?: "low" | "medium" | "high";
}

export const userChromeOptions: CSSOption[] = [
  {
    id: "uc-1",
    name: "Single Tab Bar Hidden",
    description: "Hide the tab bar when only one tab is open for a cleaner look.",
    category: "Tabs",
    risk: "low",
    css: `/* Hide tab bar when only one tab */
#tabbrowser-tabs tab:only-of-type {
  display: none !important;
}
#tabbrowser-tabs tab:only-of-type ~ #tabs-newtab-button {
  display: none !important;
}`,
  },
  {
    id: "uc-2",
    name: "Compact Tab Density",
    description: "Reduce tab height and padding for a more compact interface.",
    category: "Tabs",
    risk: "low",
    css: `/* Compact tab density */
.tabbrowser-tab {
  min-height: 28px !important;
  --tab-min-height: 28px !important;
}
.tab-content {
  padding: 0 8px !important;
}`,
  },
  {
    id: "uc-3",
    name: "Hide New Tab Button",
    description: "Remove the new tab button from the tab bar.",
    category: "Tabs",
    risk: "low",
    css: `/* Hide new tab button */
#tabs-newtab-button {
  display: none !important;
}`,
  },
  {
    id: "uc-4",
    name: "Hide Bookmarks Toolbar",
    description: "Hide the bookmarks toolbar for maximum vertical space.",
    category: "Toolbars",
    risk: "low",
    css: `/* Hide bookmarks toolbar */
#PersonalToolbar {
  display: none !important;
}`,
  },
  {
    id: "uc-5",
    name: "Auto-hide Bookmarks Toolbar",
    description: "Show bookmarks toolbar only when hovering over it.",
    category: "Toolbars",
    risk: "low",
    css: `/* Auto-hide bookmarks toolbar */
#PersonalToolbar {
  visibility: collapse !important;
  transition: visibility 0.2s ease !important;
}
#navigator-toolbox:hover #PersonalToolbar {
  visibility: visible !important;
}`,
  },
  {
    id: "uc-6",
    name: "Hide Navigation Bar Buttons",
    description: "Hide back, forward, and reload buttons (use keyboard shortcuts instead).",
    category: "Navigation",
    risk: "low",
    css: `/* Hide back, forward, reload buttons */
#back-button,
#forward-button,
#reload-button {
  display: none !important;
}`,
  },
  {
    id: "uc-7",
    name: "Hide Menu Button",
    description: "Hide the hamburger menu button (use Alt key or keyboard shortcuts).",
    category: "Navigation",
    risk: "low",
    css: `/* Hide menu button */
#PanelUI-button {
  display: none !important;
}`,
  },
  {
    id: "uc-8",
    name: "Hide All Tabs Button",
    description: "Hide the 'List all tabs' button in the tab bar.",
    category: "Tabs",
    risk: "low",
    css: `/* Hide all tabs button */
#alltabs-button {
  display: none !important;
}`,
  },
  {
    id: "uc-9",
    name: "Remove Title Bar",
    description: "Remove the OS title bar for a more integrated look (Linux/Windows).",
    category: "Window",
    risk: "low",
    css: `/* Remove title bar */
#titlebar {
  display: none !important;
}`,
  },
  {
    id: "uc-10",
    name: "Custom Scrollbar (Thin)",
    description: "Make scrollbars thin and styled to match the browser theme.",
    category: "UI Elements",
    risk: "low",
    css: `/* Thin custom scrollbar */
scrollbar {
  --scrollbar-width: 6px !important;
}
scrollbar thumb {
  background-color: rgba(128, 128, 128, 0.4) !important;
  border-radius: 3px !important;
}
scrollbar thumb:hover {
  background-color: rgba(128, 128, 128, 0.6) !important;
}`,
  },
  {
    id: "uc-11",
    name: "Rounded URL Bar",
    description: "Make the URL bar rounded with a subtle background.",
    category: "URL Bar",
    risk: "low",
    css: `/* Rounded URL bar */
#urlbar-background {
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
#urlbar[focused] #urlbar-background {
  background: rgba(255, 255, 255, 0.08) !important;
}`,
  },
  {
    id: "uc-12",
    name: "Hide URL Bar Icons",
    description: "Hide the lock icon and other icons inside the URL bar.",
    category: "URL Bar",
    risk: "low",
    css: `/* Hide URL bar icons */
#identity-box,
#tracking-protection-icon-container {
  display: none !important;
}`,
  },
  {
    id: "uc-13",
    name: "Center URL Bar Text",
    description: "Center-align the text in the URL bar.",
    category: "URL Bar",
    risk: "low",
    css: `/* Center URL bar text */
#urlbar-input {
  text-align: center !important;
}`,
  },
  {
    id: "uc-14",
    name: "Hide Extensions Menu Icon",
    description: "Hide the extensions puzzle piece icon from the toolbar.",
    category: "UI Elements",
    risk: "low",
    css: `/* Hide extensions menu icon */
#unified-extensions-button {
  display: none !important;
}`,
  },
  {
    id: "uc-15",
    name: "Minimal UI Mode",
    description: "Hide most UI elements for a distraction-free browsing experience.",
    category: "Layout",
    risk: "medium",
    css: `/* Minimal UI - hide most chrome */
#nav-bar:not(:focus-within):not(:hover) {
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
}
#navigator-toolbox:focus-within #nav-bar,
#navigator-toolbox:hover #nav-bar {
  opacity: 1 !important;
}`,
  },
  {
    id: "uc-16",
    name: "Tab Close Button Always Visible",
    description: "Always show the close button on tabs, not just on hover.",
    category: "Tabs",
    risk: "low",
    css: `/* Always show tab close button */
.tabbrowser-tab .tab-close-button {
  display: block !important;
  opacity: 1 !important;
}`,
  },
  {
    id: "uc-17",
    name: "Hide Firefox View Button",
    description: "Remove the Firefox View button from the toolbar.",
    category: "UI Elements",
    risk: "low",
    css: `/* Hide Firefox View button */
#firefox-view-button {
  display: none !important;
}`,
  },
  {
    id: "uc-18",
    name: "Status Bar at Bottom",
    description: "Show a minimal status bar at the bottom with link hover URLs.",
    category: "UI Elements",
    risk: "low",
    css: `/* Status bar at bottom */
#statuspanel {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  max-width: 50% !important;
  background: rgba(30, 30, 46, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 0 4px 0 0 !important;
  padding: 2px 8px !important;
  font-size: 11px !important;
}`,
  },
  {
    id: "uc-19",
    name: "Dark Theme Enforcement",
    description: "Force dark theme on all browser UI elements.",
    category: "Theme",
    risk: "low",
    css: `/* Dark theme enforcement */
:root {
  --toolbar-bgcolor: #1e1e2e !important;
  --toolbar-color: #cdd6f4 !important;
  --toolbar-border-color: #313244 !important;
  --lwt-accent-color: #181825 !important;
  --lwt-text-color: #cdd6f4 !important;
}`,
  },
  {
    id: "uc-20",
    name: "Hide Sidebar Header",
    description: "Hide the header of the sidebar panel for more content space.",
    category: "Sidebar",
    risk: "low",
    css: `/* Hide sidebar header */
#sidebar-header {
  display: none !important;
}`,
  },
];

export const userContentOptions: CSSOption[] = [
  {
    id: "uc-21",
    name: "Custom Scrollbar (Web Pages)",
    description: "Style scrollbars on all web pages with thin, rounded design.",
    category: "Scrollbars",
    risk: "low",
    css: `/* Custom scrollbar for web pages */
* {
  scrollbar-width: thin !important;
  scrollbar-color: rgba(128, 128, 128, 0.4) transparent !important;
}
::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}
::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.4) !important;
  border-radius: 3px !important;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.6) !important;
}
::-webkit-scrollbar-track {
  background: transparent !important;
}`,
  },
  {
    id: "uc-22",
    name: "Force Dark Mode",
    description: "Force dark color scheme on all websites regardless of site preference.",
    category: "Theme",
    risk: "medium",
    css: `/* Force dark mode on all sites */
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: dark !important;
  }
}`,
  },
  {
    id: "uc-23",
    name: "Custom Selection Color",
    description: "Change the text selection highlight color to a custom purple.",
    category: "Theme",
    risk: "low",
    css: `/* Custom selection color */
::selection {
  background: rgba(203, 166, 247, 0.3) !important;
  color: inherit !important;
}`,
  },
  {
    id: "uc-24",
    name: "Remove Website Animations",
    description: "Disable all CSS animations and transitions on web pages.",
    category: "Performance",
    risk: "medium",
    css: `/* Remove website animations */
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}`,
  },
  {
    id: "uc-25",
    name: "Reduce Motion",
    description: "Reduce motion for users sensitive to animations (respects prefers-reduced-motion).",
    category: "Accessibility",
    risk: "low",
    css: `/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
  },
  {
    id: "uc-26",
    name: "Custom Font Override",
    description: "Override website fonts with a system font stack for consistency.",
    category: "Typography",
    risk: "medium",
    css: `/* Custom font override */
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
}`,
  },
  {
    id: "uc-27",
    name: "Increase Line Height",
    description: "Increase line height for better readability across all sites.",
    category: "Typography",
    risk: "low",
    css: `/* Increase line height */
body, p, div, li, td, th {
  line-height: 1.7 !important;
}`,
  },
  {
    id: "uc-28",
    name: "Increase Font Size",
    description: "Increase base font size to 16px for better readability.",
    category: "Typography",
    risk: "low",
    css: `/* Increase font size */
html {
  font-size: 16px !important;
}`,
  },
  {
    id: "uc-29",
    name: "Hide Cookie Banners",
    description: "Hide common cookie consent banners and overlays.",
    category: "Privacy",
    risk: "low",
    css: `/* Hide cookie banners */
[class*="cookie"] ~ div,
[class*="cookie-consent"],
[class*="cookie-banner"],
[class*="cookie-notice"],
[class*="cookieNotice"],
[class*="cookieConsent"],
[class*="cookie-banner"],
[id*="cookie-consent"],
[id*="cookie-banner"],
[id*="cookie-notice"],
#onetrust-consent-sdk,
#CybotCookiebotDialog,
.cc-window,
.js-consent-banner {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}`,
  },
  {
    id: "uc-30",
    name: "Hide Newsletter Popups",
    description: "Hide common newsletter subscription popups and modals.",
    category: "Privacy",
    risk: "low",
    css: `/* Hide newsletter popups */
[class*="newsletter-popup"],
[class*="newsletter-modal"],
[class*="subscribe-popup"],
[class*="email-popup"],
[class*="mailchimp-popup"] {
  display: none !important;
  visibility: hidden !important;
}`,
  },
  {
    id: "uc-31",
    name: "Custom Link Underline",
    description: "Style links with a subtle underline that appears on hover.",
    category: "Typography",
    risk: "low",
    css: `/* Custom link style */
a {
  text-decoration: none !important;
  border-bottom: 1px solid rgba(137, 180, 250, 0.3) !important;
  transition: border-color 0.2s ease !important;
}
a:hover {
  border-bottom-color: rgba(137, 180, 250, 0.8) !important;
}`,
  },
  {
    id: "uc-32",
    name: "Remove Autoplay Videos",
    description: "Hide autoplay video elements on web pages.",
    category: "Media",
    risk: "medium",
    css: `/* Hide autoplay videos */
video[autoplay]:not([controls]) {
  display: none !important;
}`,
  },
  {
    id: "uc-33",
    name: "Max Content Width",
    description: "Limit content width to 800px for better readability on wide screens.",
    category: "Layout",
    risk: "low",
    css: `/* Max content width */
body {
  max-width: 800px !important;
  margin: 0 auto !important;
}`,
  },
  {
    id: "uc-34",
    name: "Custom Focus Outline",
    description: "Style keyboard focus indicators with a visible outline.",
    category: "Accessibility",
    risk: "low",
    css: `/* Custom focus outline */
:focus-visible {
  outline: 2px solid rgba(203, 166, 247, 0.8) !important;
  outline-offset: 2px !important;
}`,
  },
  {
    id: "uc-35",
    name: "Hide Social Media Embeds",
    description: "Hide embedded social media content (Twitter, Facebook, etc.).",
    category: "Privacy",
    risk: "medium",
    css: `/* Hide social media embeds */
iframe[src*="facebook.com"],
iframe[src*="twitter.com"],
iframe[src*="instagram.com"],
iframe[src*="youtube.com"],
blockquote[class*="twitter"],
blockquote[class*="instagram"],
.fb-post,
.fb-video {
  display: none !important;
}`,
  },
  {
    id: "uc-36",
    name: "Smooth Scrolling",
    description: "Enable smooth scrolling behavior on all pages.",
    category: "UX",
    risk: "low",
    css: `/* Smooth scrolling */
html {
  scroll-behavior: smooth !important;
}`,
  },
  {
    id: "uc-37",
    name: "Hide Chat Widgets",
    description: "Hide common live chat and support widgets.",
    category: "Privacy",
    risk: "low",
    css: `/* Hide chat widgets */
[class*="livechat"],
[class*="live-chat"],
[class*="chat-widget"],
[class*="intercom"],
[class*="drift-widget"],
[class*="zendesk"],
[class*="crisp-chat"],
#chat-widget-container,
iframe[src*="intercom"],
iframe[src*="drift"] {
  display: none !important;
  visibility: hidden !important;
}`,
  },
  {
    id: "uc-38",
    name: "Custom Image Rendering",
    description: "Use high-quality image rendering for sharper images.",
    category: "Media",
    risk: "low",
    css: `/* High-quality image rendering */
img {
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: crisp-edges !important;
}`,
  },
];
