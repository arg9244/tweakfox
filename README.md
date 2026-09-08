# Firefox Config Generator

A web application for generating customized Firefox configuration files: `user.js`, `userChrome.css`, and `userContent.css`. Based on preferences from [Betterfox](https://github.com/yokoffing/Betterfox) and [arkenfox/user.js](https://github.com/arkenfox/user.js).

## Features

- **100+ preferences** from Betterfox & arkenfox
- **6 categorized tabs** for preferences
- **userChrome.css** generation for browser UI customization
- **userContent.css** generation for web page styling
- **4 presets**: Balanced, Privacy Focused, Performance, Hardened
- **Search** across all options
- **Live preview** before downloading
- **Installation guide** with OS-specific paths

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
