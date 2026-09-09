# Curated Descriptions System

## Overview

The Firefox Config Generator now uses a **curated descriptions database** to provide clear, user-friendly explanations for each preference. This replaces the often cryptic inline comments from upstream repositories with well-written, easy-to-understand descriptions.

## How It Works

### 1. Description Lookup

When displaying a preference, the app:
1. First checks the curated `descriptions.ts` database for a custom description
2. If found, uses the curated description
3. If not found, falls back to the parsed description from upstream comments

```typescript
// In PreferenceCard.tsx
const description = getDescription(preference.key, preference.description);
```

### 2. Description Database

The `src/data/descriptions.ts` file contains a comprehensive map of preference keys to clear descriptions:

```typescript
export const preferenceDescriptions: Record<string, string> = {
  "gfx.content.skia-font-cache-size": "Increases the font cache size to 20MB for faster text rendering...",
  "browser.contentblocking.category": "Enables Enhanced Tracking Protection in Strict mode...",
  // ... 200+ more descriptions
};
```

### 3. Description Quality

Each curated description:
- **Explains what it does** in plain English
- **Mentions the impact** on browsing experience
- **Notes trade-offs** when relevant (e.g., "may break some sites")
- **Provides context** about why you might want it
- **Avoids technical jargon** where possible

## Examples

### Before (Parsed from upstream):
```
Increases font cache size to improve performance on text-heavy websites.
```

### After (Curated):
```
Increases the font cache size to 20MB for faster text rendering on pages with many fonts. Helps with complex typography and reduces font loading delays.
```

---

### Before (Parsed from upstream):
```
Disable OCSP to prevent leaking visited sites to Certificate Authorities.
```

### After (Curated):
```
Disables OCSP (Online Certificate Status Protocol) checking to prevent leaking which websites you visit to Certificate Authorities. Slightly reduces certificate validation.
```

---

### Before (Parsed from upstream):
```
Disable disk cache to prevent sensitive data from being written to disk.
```

### After (Curated):
```
Disables disk cache to prevent sensitive data from being written to your hard drive. All caching happens in RAM only. May increase memory usage.
```

## Coverage

The curated descriptions database covers:

- ✅ **Performance preferences** (30+ entries)
- ✅ **Security & Privacy preferences** (80+ entries)
- ✅ **Telemetry & Data preferences** (40+ entries)
- ✅ **UI & Annoyances preferences** (50+ entries)
- ✅ **Privacy Hardening preferences** (30+ entries)
- ✅ **Security Hardening preferences** (20+ entries)

**Total: 250+ curated descriptions**

## Fallback Behavior

If a preference key is not in the curated database:
1. The app uses the description parsed from upstream comments
2. If no upstream description exists, a generic description is generated from the key name
3. The preference still works normally - only the description is affected

## Maintaining Descriptions

### Adding New Descriptions

To add a description for a preference:

1. Open `src/data/descriptions.ts`
2. Add an entry to the `preferenceDescriptions` object:

```typescript
"preference.key.name": "Clear, user-friendly description of what this preference does and its impact.",
```

3. Follow the description guidelines below

### Description Guidelines

Good descriptions should:

✅ **DO:**
- Explain what the preference does in plain English
- Mention the practical impact on browsing
- Note any trade-offs or side effects
- Be 1-3 sentences long
- Use active voice ("Disables X" not "X is disabled")
- Explain technical terms briefly

❌ **DON'T:**
- Use overly technical jargon without explanation
- Be too brief ("Disables X" with no context)
- Be too verbose (keep it concise)
- Assume advanced technical knowledge
- Include implementation details

### Example Patterns

**Performance:**
```typescript
"Increases X to Y for faster Z. Helps with W and reduces V."
```

**Privacy:**
```typescript
"Disables X to prevent Y from Z. May affect W but improves privacy."
```

**Security:**
```typescript
"Enables X protection against Y. May break Z but more secure."
```

**UI:**
```typescript
"Removes/hides X from Y. No more Z clutter."
```

## Benefits

1. **Better User Experience** - Clear explanations help users make informed decisions
2. **Reduced Confusion** - No more cryptic technical jargon
3. **Consistent Quality** - All descriptions follow the same style
4. **Easy Maintenance** - Centralized database, easy to update
5. **Graceful Degradation** - Falls back to parsed descriptions if needed

## Future Enhancements

Potential improvements:
- Add links to Mozilla documentation
- Include risk level indicators in descriptions
- Add "Learn more" expandable sections
- Community-contributed descriptions
- Multi-language support
- Searchable description database

## Testing

To test the description system:

1. Open the app
2. Browse preferences in any category
3. Verify descriptions are clear and helpful
4. Check that preferences without curated descriptions still show parsed descriptions
5. Verify the fallback works correctly

## Statistics

- **Total preferences**: 300+
- **Curated descriptions**: 250+
- **Coverage**: ~83%
- **Fallback rate**: ~17%

The coverage will increase as more descriptions are added to the database.
