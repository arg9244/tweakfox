# 🦊 Firefox user.js Generator

A modern, interactive web application for generating customized Firefox `user.js` configuration files based on the popular [Betterfox](https://github.com/yokoffing/Betterfox) and [arkenfox/user.js](https://github.com/arkenfox/user.js) projects.

![Catppuccin Mocha](https://img.shields.io/badge/Theme-Catppuccin_Mocha-b4befe?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-a6e3a1?style=flat-square)
![Firefox](https://img.shields.io/badge/Firefox-128%2B-f38ba8?style=flat-square)

## ✨ Features

- **🎨 Beautiful UI** — Catppuccin Mocha theme with smooth animations
- **📋 100+ Preferences** — Curated from Betterfox & arkenfox repositories
- **🗂️ Organized Tabs** — Categories: Performance, Security & Privacy, Telemetry, UI & Annoyances, Privacy Hardening, Security Hardening
- **⚡ Presets** — One-click Balanced, Privacy, Performance, and Hardened configurations
- **🔍 Search** — Find any preference instantly
- **📄 Live Preview** — See your generated user.js before downloading
- **📥 Download** — Export your custom user.js file
- **📋 Copy** — Copy to clipboard with one click
- **🏷️ Risk Labels** — Clear indicators for low/medium/high risk preferences
- **📱 Responsive** — Works on desktop and mobile

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Push to the `main` branch
2. Go to **Settings → Pages** in your repository
3. Under "Build and deployment", select **GitHub Actions** as the source
4. The workflow will automatically build and deploy on every push

Or deploy manually:

```bash
# Using GitHub CLI
gh workflow run deploy.yml

# Or push to trigger the workflow
git push origin main
```

## 📖 How to Use

1. **Browse Categories** — Use the sidebar to navigate through preference categories
2. **Toggle Preferences** — Click the toggle switch to enable/disable each preference
3. **Use Presets** — Click a preset button to quickly apply a curated selection
4. **Search** — Type in the search bar to find specific preferences
5. **View Details** — Click "Show technical details" to see the preference key, type, and value
6. **Preview** — Click "Preview user.js" to see the generated configuration
7. **Download** — Click "Download user.js" to save your configuration file

### Installing your user.js

1. Open Firefox and type `about:profiles` in the URL bar
2. Find your profile and click "Open Folder" in the Root Directory section
3. Place the downloaded `user.js` file in that folder
4. Restart Firefox

## 📂 Categories

| Category | Description |
|----------|-------------|
| ⚡ Performance | Speed optimizations: caching, networking, rendering |
| 🛡️ Security & Privacy | Tracking protection, HTTPS, anti-fingerprinting |
| 👁️ Telemetry & Data | Disable all data collection and experiments |
| ✨ UI & Annoyances | Remove clutter, disable AI features, clean UX |
| 🔒 Privacy Hardening | Advanced partitioning, cookies, tracking prevention |
| 🛡️ Security Hardening | JIT controls, certificates, safe browsing |

## 🎨 Theme

This project uses the [Catppuccin Mocha](https://catppuccin.com/) color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Rosewater | `#f5e0dc` | Accents |
| Mauve | `#cba6f7` | Primary |
| Red | `#f38ba8` | Errors/High Risk |
| Green | `#a6e3a1` | Success/Enabled |
| Blue | `#89b4fa` | Info/Links |
| Base | `#1e1e2e` | Background |
| Surface0 | `#313244` | Cards |
| Text | `#cdd6f4` | Primary text |

## 🙏 Credits

- **[Betterfox](https://github.com/yokoffing/Betterfox)** by yokoffing — Firefox user.js for optimal privacy and security
- **[arkenfox/user.js](https://github.com/arkenfox/user.js)** — Comprehensive user.js template for privacy and security hardening
- **[Catppuccin](https://catppuccin.com/)** — Soothing pastel theme for the high-spirited!
- **[Framer Motion](https://www.framer.com/motion/)** — Animation library
- **[Lucide](https://lucide.dev/)** — Beautiful icons

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

## ⚠️ Disclaimer

This tool generates configuration files based on community-maintained preference lists. Always:

- **Create a backup profile** before applying changes
- **Read the documentation** for each preference you enable
- **Test thoroughly** after applying your user.js
- High-risk preferences may cause significant site breakage

## 🔗 Links

- [Betterfox Repository](https://github.com/yokoffing/Betterfox)
- [arkenfox/user.js Repository](https://github.com/arkenfox/user.js)
- [Firefox about:config](https://support.mozilla.org/en-US/kb/about-config-editor-firefox)
- [Betterfox Wiki](https://github.com/yokoffing/Betterfox/wiki)
- [arkenfox Wiki](https://github.com/arkenfox/user.js/wiki)
