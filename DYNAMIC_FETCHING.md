# Dynamic Preference Fetching - Implementation Guide

## Overview

The Firefox Config Generator now dynamically fetches preferences from upstream repositories instead of using hardcoded data. This ensures the app always has access to the latest preferences without manual updates.

## Architecture

### 1. Parser Service (`src/services/parser.ts`)

Parses raw `.js` files from upstream repositories and extracts:
- Preference keys and values
- Descriptions from `// PREF:` comments
- Notes from `// [NOTE]` comments
- Warnings from `// [WARNING]` comments
- Settings paths from `// [SETTING]` comments
- References from `// [1]` URL comments
- Section headers from `/*** SECTION: ***/` comments

**Key Features:**
- Handles both active and commented-out preferences
- Generates fallback descriptions from key names when comments are missing
- Merges preferences from multiple sources (first source wins for duplicates)

### 2. Fetcher Service (`src/services/fetcher.ts`)

Manages fetching, caching, and error handling:

**Sources:**
```
- arkenfox: https://raw.githubusercontent.com/arkenfox/user.js/master/user.js
- Betterfox-Fastfox: https://raw.githubusercontent.com/yokoffing/Betterfox/main/Fastfox.js
- Betterfox-Securefox: https://raw.githubusercontent.com/yokoffing/Betterfox/main/Securefox.js
- Betterfox-Peskyfox: https://raw.githubusercontent.com/yokoffing/Betterfox/main/Peskyfox.js
- Betterfox-Smoothfox: https://raw.githubusercontent.com/yokoffing/Betterfox/main/Smoothfox.js
```

**Caching:**
- Uses `localStorage` with 24-hour TTL
- Cache key: `firefox-config-generator-cache`
- Stores: preferences, lastUpdated timestamp, sources, errors
- Manual refresh bypasses cache

**Error Handling:**
- Graceful degradation if some sources fail
- Shows error banner with retry option
- Falls back to cached data if available

### 3. Dynamic Preferences Hook (`src/hooks/useDynamicPreferences.ts`)

React hook that orchestrates the entire flow:

**Responsibilities:**
- Fetches preferences on component mount
- Maps upstream sections to UI categories
- Manages loading and error states
- Provides selection management functions
- Exposes refresh functionality

**Category Mapping:**
Maps upstream section names to UI categories based on keywords:
- Performance: cache, network, gfx, render
- Security: tracking, privacy, https, ssl, ocsp
- Telemetry: telemetry, experiment, crash, health
- UI: ui, pesky, mozilla, newtab, urlbar
- Privacy: hardening, fingerprint, partition
- Other: everything else

### 4. Updated Components

**PreferenceCard** - Now accepts `ParsedPreference` type:
- Shows key name (last part of preference key)
- Displays description from upstream comments
- Shows notes, warnings, settings, and references in details view
- Source attribution (Betterfox/arkenfox)

**App** - Integrated dynamic loading:
- Loading spinner while fetching
- Error banner with retry button
- Last updated timestamp in header
- Refresh button to force update

**PreviewModal** - Updated generator:
- Accepts categories array
- Generates user.js with proper section grouping
- Includes warnings and source attribution

## Benefits

1. **Always Up-to-Date** - No manual updates needed when upstream repos change
2. **Automatic Descriptions** - Extracted from upstream comments, no hardcoding
3. **New Preferences** - Automatically included when added upstream
4. **Removed Preferences** - Automatically excluded when removed upstream
5. **Reduced Maintenance** - No need to manually sync preference lists

## Technical Details

### Parsing Strategy

The parser uses regex patterns to extract structured data:

```typescript
// Preference line
/^(user_pref|\/\/\s*user_pref)\s*\(\s*"([^"]+)"\s*,\s*(.+?)\s*\)\s*;?/

// Description
/\/\/\s*PREF:\s*(.+)/i

// Notes, warnings, settings, references
/\/\/\s*\[NOTE\]\s*(.+)/i
/\/\/\s*\[WARNING\]\s*(.+)/i
/\/\/\s*\[SETTING\]\s*(.+)/i
/\/\/\s*\[(\d+)\]\s*(.+)/
```

### Caching Strategy

```typescript
interface CacheData {
  preferences: ParsedPreference[];
  lastUpdated: number;
  sources: string[];
  errors: string[];
}

// TTL: 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000;
```

### Error Recovery

1. If fetch fails, show error banner
2. If cache exists, use cached data
3. Provide retry button to attempt fetch again
4. Log errors to console for debugging

## Future Enhancements

Potential improvements:
- Background refresh (check for updates without user action)
- Version tracking (show which version of upstream files)
- Selective source enabling (let users choose which repos to fetch)
- Custom preference sources (user-defined URLs)
- Diff view (show what changed since last fetch)
- Offline mode with service worker

## Testing

To test the dynamic fetching:

1. Clear cache: `localStorage.removeItem('firefox-config-generator-cache')`
2. Reload the page
3. Check Network tab for fetch requests
4. Verify preferences load correctly
5. Test refresh button
6. Test offline behavior (disable network)

## Troubleshooting

**Preferences not loading:**
- Check browser console for errors
- Verify CORS is not blocking requests (GitHub raw content should work)
- Check if cache is corrupted: clear localStorage

**Stale data:**
- Click refresh button to force update
- Check last updated timestamp in header
- Verify upstream repos are accessible

**Missing descriptions:**
- Some preferences may not have `// PREF:` comments upstream
- Fallback generates description from key name
- This is expected behavior

## Performance

- Initial load: ~1-2 seconds (depends on network)
- Cached load: <100ms
- Cache size: ~200-300KB (depends on preference count)
- Memory usage: ~2-3MB for parsed data

## Security

- All fetches use HTTPS
- No user data is sent to external servers
- Cache is stored locally in browser
- No third-party analytics or tracking
