# Contributing to Firefox user.js Generator

Thank you for your interest in contributing! Here's how you can help:

## 🐛 Reporting Bugs

- Open an issue describing the bug
- Include steps to reproduce
- Mention your browser and OS

## ✨ Feature Requests

- Open an issue with the "enhancement" label
- Describe the feature and its use case

## 🔧 Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/firefox-userjs-generator.git
cd firefox-userjs-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📝 Adding New Preferences

Preferences are defined in `src/data/preferences.ts`. To add a new preference:

1. Add it to the appropriate category
2. Fill in all required fields:
   - `id`: Unique identifier (e.g., 'sf-45')
   - `name`: Human-readable name
   - `key`: The Firefox preference key
   - `type`: 'boolean' | 'number' | 'string'
   - `defaultValue`: The value when enabled
   - `description`: Clear, concise description
   - `section`: Sub-section within the category
   - `source`: 'betterfox' | 'arkenfox' | 'both'
   - `risk`: 'low' | 'medium' | 'high'
   - `recommended`: Whether it's recommended for most users

## 🎨 Theme

This project uses Catppuccin Mocha. When adding new UI elements, use the CSS variables defined in `src/index.css`:

- `--ctp-mauve` (#cba6f7) - Primary/accent
- `--ctp-green` (#a6e3a1) - Success/enabled
- `--ctp-red` (#f38ba8) - Errors/high risk
- `--ctp-blue` (#89b4fa) - Info/links
- `--ctp-base` (#1e1e2e) - Background

## 📦 Building

```bash
npm run build
```

## 🚀 Deployment

Push to `main` branch to trigger automatic GitHub Pages deployment.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
