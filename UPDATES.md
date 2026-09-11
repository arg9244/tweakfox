# Firefox Config Generator - Latest Updates

## Overview
This document summarizes the recent enhancements made to the Firefox Config Generator, including the addition of a new tag type, CSS file loading capabilities, and comprehensive documentation.

## Changes Made

### 1. New Tag Type: Personal Preference
**File**: `src/data/tags.ts`

Added a new tag type `personal-preference` to the tagging system:
- **Tag ID**: `personal-preference`
- **Label**: "Personal Preference"
- **Color**: Green (safe category)
- **Description**: "Subjective preference that varies by user needs and workflow"

This tag allows users to mark preferences that are purely based on personal workflow preferences rather than objective security, privacy, or performance benefits.

### 2. CSS File Loading Service
**File**: `src/services/cssLoader.ts` (New)

Created a comprehensive CSS file loader service with the following capabilities:

#### Features:
- **File Loading**: Load userChrome.css and userContent.css files from user's system
- **File Type Detection**: Automatically detects whether the file is userChrome or userContent based on filename
- **Content Parsing**: Parse CSS content to extract enabled options
- **Download Support**: Download CSS content as files

#### Key Functions:
```typescript
loadCSSFile(file: File): Promise<CSSLoadResult>
parseCSSContent(content: string, type: 'userChrome' | 'userContent'): string[]
downloadCSSFile(content: string, filename: string): void
```

### 3. Enhanced App Component
**File**: `src/App.tsx`

#### New State Variables:
- `loadedUserChrome`: Stores loaded userChrome.css content
- `loadedUserContent`: Stores loaded userContent.css content
- `cssFileInputRef`: Reference for CSS file input element

#### New Handler:
```typescript
handleCSSFileUpload(e: React.ChangeEvent<HTMLInputElement>)
```
- Handles CSS file uploads
- Validates file naming (must contain 'userchrome' or 'usercontent')
- Displays file size in success message
- Clears file input after loading

#### UI Enhancements:
1. **CSS Upload Button**: Added Paintbrush icon button in header for loading CSS files
2. **File Input**: Hidden file input accepting `.css` files
3. **Loaded File Indicators**: Visual indicators showing loaded CSS files with:
   - File type icon (Paintbrush for userChrome, Globe for userContent)
   - File size display
   - Remove button (×) to clear loaded file
   - Color-coded styling (purple for userChrome, teal for userContent)

### 4. Enhanced Preview Modal
**File**: `src/components/PreviewModal.tsx`

#### New Props:
- `loadedUserChrome?: string | null`
- `loadedUserContent?: string | null`

#### Logic Updates:
- Uses loaded CSS content if available
- Falls back to generated CSS if no file is loaded
- Seamlessly integrates loaded files with the preview system

## Usage Guide

### Loading CSS Files

1. **Click the Paintbrush icon** in the header (next to the user.js upload button)
2. **Select a CSS file** from your system:
   - File must be named `userChrome.css` or `userContent.css`
   - The system automatically detects the file type
3. **View the indicator** showing the loaded file with its size
4. **Preview the content** by clicking "Generate" and switching to the appropriate tab
5. **Remove the loaded file** by clicking the × button on the indicator

### File Requirements

- **userChrome.css**: Customizes Firefox browser UI (tabs, toolbars, etc.)
- **userContent.css**: Customizes web page content rendering
- **File naming**: Must contain 'userchrome' or 'usercontent' (case-insensitive)
- **File format**: Standard CSS with comments

### CSS File Structure

The parser expects CSS files with the following structure:

```css
/* Option Name - Description */
/* Additional notes or warnings */
css-selector {
  property: value;
}

/* Another Option */
another-selector {
  property: value;
}
```

The parser extracts option names from comment blocks and associates them with the following CSS rules.

## Technical Details

### File Type Detection
The system uses case-insensitive filename matching:
- Files containing 'userchrome' → userChrome type
- Files containing 'usercontent' → userContent type
- Other filenames → Error message

### Content Parsing
The CSS parser:
1. Splits content into lines
2. Tracks comment blocks (/* ... */)
3. Associates CSS rules with preceding comments
4. Extracts option names from comment text
5. Returns array of enabled option names

### State Management
- Loaded CSS files are stored in component state
- Files persist until explicitly removed or page refresh
- Multiple files can be loaded simultaneously (one of each type)
- Loaded files take precedence over generated content in preview

## Integration with Existing Features

### Compatibility with user.js Loading
- CSS loading is independent of user.js loading
- Both can be used simultaneously
- Each has its own upload button and indicator
- No conflicts between preference and CSS configurations

### Preview System Integration
- Loaded CSS files appear in the preview modal
- Users can switch between generated and loaded content
- Download functionality works with both generated and loaded content
- Copy to clipboard works with all content types

### Tag System Integration
- New `personal-preference` tag integrates seamlessly
- Can be applied to any preference via the PREFERENCE_TAGS mapping
- Displays with green color scheme like other safe tags
- Tooltip shows description on hover

## Benefits

### For Users
1. **Flexibility**: Load existing CSS customizations instead of starting from scratch
2. **Preview**: See exactly what will be exported before downloading
3. **Control**: Easily remove loaded files and switch between configurations
4. **Transparency**: File size indicators show what's been loaded
5. **Personalization**: New tag type allows marking subjective preferences

### For Developers
1. **Modular Design**: CSS loader is a separate service, easy to maintain
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Reusability**: CSS loader functions can be used in other contexts
4. **Extensibility**: Easy to add more CSS parsing features
5. **Clear Separation**: CSS and user.js loading are independent systems

## Future Enhancements

Potential improvements for future versions:

1. **CSS Validation**: Validate CSS syntax before loading
2. **Conflict Detection**: Warn about conflicting CSS rules
3. **CSS Merging**: Merge loaded CSS with generated CSS
4. **Template Library**: Pre-built CSS templates for common customizations
5. **CSS Preview**: Live preview of CSS effects in a sandbox
6. **Import/Export**: Save and load configuration presets
7. **Diff View**: Show differences between loaded and generated CSS
8. **CSS Minification**: Option to minify CSS before export

## Testing Recommendations

### Manual Testing Steps
1. Load a userChrome.css file and verify indicator appears
2. Load a userContent.css file and verify indicator appears
3. Try loading a file with invalid name (should show error)
4. Remove loaded files using × button
5. Preview loaded CSS in the modal
6. Download loaded CSS files
7. Copy loaded CSS to clipboard
8. Load both userChrome and userContent simultaneously
9. Test with empty CSS files
10. Test with large CSS files (>1MB)

### Edge Cases to Test
- Files with special characters in names
- Files with non-UTF8 encoding
- Files with Windows/Mac/Linux line endings
- Files with mixed comment styles
- Files with CSS errors
- Very long CSS files
- CSS files with @import statements
- CSS files with media queries

## Conclusion

These updates significantly enhance the Firefox Config Generator by:
- Adding flexibility for CSS customization
- Improving the tagging system for better categorization
- Maintaining clean separation between different configuration types
- Providing a seamless user experience for loading and previewing files

The implementation follows best practices for React development, maintains type safety, and provides a solid foundation for future enhancements.
