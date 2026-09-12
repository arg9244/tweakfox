import { userChromeOptions, userContentOptions, type CSSOption } from "../data/cssOptions";

/**
 * Parse CSS content and match it to predefined CSS options
 * Returns a map of option IDs that are present in the CSS
 */
export function parseCSSAndMatchOptions(
  cssContent: string,
  type: "userChrome" | "userContent"
): Record<string, boolean> {
  const options = type === "userChrome" ? userChromeOptions : userContentOptions;
  const selections: Record<string, boolean> = {};

  // Normalize the uploaded CSS (remove extra whitespace, comments)
  const normalizedCSS = normalizeCSS(cssContent);

  // For each predefined option, check if its CSS is present in the uploaded file
  for (const option of options) {
    const optionCSS = normalizeCSS(option.css);
    
    // Check if the option's CSS is present in the uploaded file
    if (isCSSPresent(normalizedCSS, optionCSS)) {
      selections[option.id] = true;
    }
  }

  return selections;
}

/**
 * Normalize CSS by removing comments, extra whitespace, and standardizing format
 */
function normalizeCSS(css: string): string {
  return css
    // Remove CSS comments
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // Remove single-line comments
    .replace(/\/\/.*$/gm, "")
    // Remove extra whitespace
    .replace(/\s+/g, " ")
    // Remove spaces around special characters
    .replace(/\s*([{};:,])\s*/g, "$1")
    // Trim
    .trim()
    .toLowerCase();
}

/**
 * Check if a CSS snippet is present in the full CSS content
 * Uses fuzzy matching to handle minor differences
 */
function isCSSPresent(fullCSS: string, snippetCSS: string): boolean {
  // Direct match
  if (fullCSS.includes(snippetCSS)) {
    return true;
  }

  // Extract key selectors and properties from the snippet
  const selectors = extractSelectors(snippetCSS);
  const properties = extractProperties(snippetCSS);

  // Check if all key selectors are present
  const allSelectorsPresent = selectors.every((selector) =>
    fullCSS.includes(selector.toLowerCase())
  );

  // Check if key properties are present
  const allPropertiesPresent = properties.every((prop) =>
    fullCSS.includes(prop.toLowerCase())
  );

  // If we have selectors and properties, and they're all present, consider it a match
  return selectors.length > 0 && allSelectorsPresent && allPropertiesPresent;
}

/**
 * Extract CSS selectors from CSS content
 */
function extractSelectors(css: string): string[] {
  const selectors: string[] = [];
  const lines = css.split(/[{}]/);

  for (let i = 0; i < lines.length; i += 2) {
    const selector = lines[i]?.trim();
    if (selector && !selector.startsWith("@")) {
      // Split multiple selectors
      const parts = selector.split(",").map((s) => s.trim());
      selectors.push(...parts);
    }
  }

  return selectors.filter((s) => s.length > 0);
}

/**
 * Extract CSS properties from CSS content
 */
function extractProperties(css: string): string[] {
  const properties: string[] = [];
  const blocks = css.split("}");

  for (const block of blocks) {
    const props = block.split("{")[1];
    if (props) {
      const propLines = props.split(";");
      for (const prop of propLines) {
        const trimmed = prop.trim();
        if (trimmed && trimmed.includes(":")) {
          // Extract just the property name and value
          const [name, value] = trimmed.split(":").map((s) => s.trim());
          if (name && value) {
            properties.push(`${name}:${value}`);
          }
        }
      }
    }
  }

  return properties;
}

/**
 * Get the count of matched CSS options
 */
export function getMatchedCSSCount(selections: Record<string, boolean>): number {
  return Object.values(selections).filter(Boolean).length;
}
