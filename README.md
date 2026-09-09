# Firefox Config Generator

A web application for generating customized Firefox configuration files: `user.js`, `userChrome.css`, and `userContent.css`. Based on preferences from [Betterfox](https://github.com/yokoffing/Betterfox) and [arkenfox/user.js](https://github.com/arkenfox/user.js).

## Features

- **Dynamic Updates** - Automatically fetches latest preferences from upstream repositories
- **250+ Curated Descriptions** - Clear, user-friendly explanations for each preference
- **100+ preferences** from Betterfox & arkenfox
- **6 categorized tabs** for preferences
- **userChrome.css** generation for browser UI customization
- **userContent.css** generation for web page styling
- **4 presets**: Balanced, Privacy Focused, Performance, Hardened
- **Search** across all options
- **Live preview** before downloading
- **Installation guide** with OS-specific paths
- **Smart caching** - 24-hour cache with manual refresh option

## How It Works

The app dynamically fetches preference files from the upstream repositories:
- **Betterfox**: Fastfox.js, Securefox.js, Peskyfox.js, Smoothfox.js
- **arkenfox**: user.js

Preferences are parsed at runtime, extracting descriptions from inline comments. However, since upstream comments are often cryptic or technical, the app uses a **curated descriptions database** with 250+ clear, user-friendly explanations. If a preference isn't in the curated database, it falls back to the parsed description.

The parsed data is cached locally for 24 hours to improve performance. You can manually refresh to get the latest updates.

## Development

```bash
npm install
npm run dev
npm run build
```

## Deploy to GitHub Pages

Push to `main` branch. The included GitHub Actions workflow handles deployment automatically.

## Credits

- [Betterfox](https://github.com/yokoffing/Betterfox) — Firefox user.js for optimal privacy and security
- [arkenfox/user.js](https://github.com/arkenfox/user.js) — Comprehensive user.js template for privacy hardening

## License

MIT
