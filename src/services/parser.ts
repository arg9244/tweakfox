/**
 * Parser for Firefox user.js files.
 * Extracts preferences and their descriptions from raw .js source files.
 */

export interface ParsedPreference {
  key: string;
  value: boolean | number | string;
  type: "boolean" | "number" | "string";
  description: string;
  notes: string[];
  references: string[];
  warnings: string[];
  settings: string[];
  section: string;
  source: string;
  isCommented: boolean;
}

export interface ParsedFile {
  source: string;
  preferences: ParsedPreference[];
  sections: string[];
}

const USER_PREF_REGEX =
  /^(user_pref|\/\/\s*user_pref)\s*\(\s*"([^"]+)"\s*,\s*(.+?)\s*\)\s*;?/;

const PREF_DESC_REGEX = /\/\/\s*PREF:\s*(.+)/i;
const NOTE_REGEX = /\/\/\s*\[NOTE\]\s*(.+)/i;
const WARNING_REGEX = /\/\/\s*\[WARNING\]\s*(.+)/i;
const SETTING_REGEX = /\/\/\s*\[SETTING\]\s*(.+)/i;
const REFERENCE_REGEX = /\/\/\s*\[(\d+)\]\s*(.+)/;
const SECTION_REGEX = /\*+\s*SECTION:\s*(.+?)\s*\*+/;
const ABOUT_REGEX = /\/\/\s*\[ABOUT\]\s*(.+)/i;
const WHY_REGEX = /\/\/\s*\[WHY\]\s*(.+)/i;
const ALT_REGEX = /\/\/\s*\[ALTERNATIVE\]\s*(.+)/i;

function parseValue(raw: string): { value: boolean | number | string; type: "boolean" | "number" | "string" } {
  const trimmed = raw.trim().replace(/,?\s*$/, "");

  if (trimmed === "true") return { value: true, type: "boolean" };
  if (trimmed === "false") return { value: false, type: "boolean" };

  const num = Number(trimmed);
  if (!isNaN(num) && trimmed !== "") return { value: num, type: "number" };

  // String value - remove quotes
  const strMatch = trimmed.match(/^["'](.*)["']$/);
  if (strMatch) return { value: strMatch[1], type: "string" };

  return { value: trimmed, type: "string" };
}

export function parseUserJs(content: string, sourceName: string): ParsedFile {
  const lines = content.split(/\r?\n/);
  const preferences: ParsedPreference[] = [];
  const sections: string[] = [];
  let currentSection = "General";

  // Track comment block above current position
  let commentBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for section headers
    const sectionMatch = line.match(SECTION_REGEX);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      if (!sections.includes(currentSection)) {
        sections.push(currentSection);
      }
      commentBuffer = [];
      continue;
    }

    // Check if line is a comment
    const isComment = line.trim().startsWith("//");
    const isBlockComment = line.trim().startsWith("*") || line.trim().startsWith("/*");

    if (isComment || isBlockComment) {
      commentBuffer.push(line);
      continue;
    }

    // Check for user_pref line
    const prefMatch = line.match(USER_PREF_REGEX);
    if (prefMatch) {
      const isCommented = line.trim().startsWith("//");
      const key = prefMatch[2];
      const { value, type } = parseValue(prefMatch[3]);

      // Parse description and metadata from comment buffer
      let description = "";
      const notes: string[] = [];
      const references: string[] = [];
      const warnings: string[] = [];
      const settings: string[] = [];

      for (const commentLine of commentBuffer) {
        const cleanLine = commentLine.replace(/^\/\/\s*/, "").replace(/^\*\s*/, "").trim();

        const prefDescMatch = commentLine.match(PREF_DESC_REGEX);
        if (prefDescMatch) {
          description = prefDescMatch[1].trim();
          continue;
        }

        const noteMatch = commentLine.match(NOTE_REGEX);
        if (noteMatch) {
          notes.push(noteMatch[1].trim());
          continue;
        }

        const warningMatch = commentLine.match(WARNING_REGEX);
        if (warningMatch) {
          warnings.push(warningMatch[1].trim());
          continue;
        }

        const settingMatch = commentLine.match(SETTING_REGEX);
        if (settingMatch) {
          settings.push(settingMatch[1].trim());
          continue;
        }

        const refMatch = commentLine.match(REFERENCE_REGEX);
        if (refMatch) {
          references.push(refMatch[2].trim());
          continue;
        }

        const aboutMatch = commentLine.match(ABOUT_REGEX);
        if (aboutMatch) {
          notes.push(aboutMatch[1].trim());
          continue;
        }

        const whyMatch = commentLine.match(WHY_REGEX);
        if (whyMatch) {
          notes.push(whyMatch[1].trim());
          continue;
        }

        const altMatch = commentLine.match(ALT_REGEX);
        if (altMatch) {
          notes.push(altMatch[1].trim());
          continue;
        }
      }

      // If no PREF: description, build one from remaining comment lines
      if (!description) {
        const meaningfulComments = commentBuffer
          .map((l) => l.replace(/^\/\/\s*/, "").replace(/^\*\s*/, "").trim())
          .filter((l) => l && !l.startsWith("[") && !l.startsWith("url:") && !l.startsWith("http") && !l.startsWith("credit") && !l.startsWith("priority") && !l.startsWith("version"));
        
        if (meaningfulComments.length > 0) {
          description = meaningfulComments.slice(0, 2).join(" ");
        }
      }

      // Fallback: generate description from key name
      if (!description) {
        description = generateDescriptionFromKey(key);
      }

      preferences.push({
        key,
        value,
        type,
        description,
        notes,
        references,
        warnings,
        settings,
        section: currentSection,
        source: sourceName,
        isCommented,
      });

      commentBuffer = [];
      continue;
    }

    // Non-comment, non-pref line - reset buffer
    if (line.trim() && !line.trim().startsWith("/") && !line.trim().startsWith("*")) {
      commentBuffer = [];
    }
  }

  return { source: sourceName, preferences, sections };
}

function generateDescriptionFromKey(key: string): string {
  // Convert preference key to human-readable description
  const parts = key.split(".");
  const lastPart = parts[parts.length - 1];

  // Clean up the key name
  const readable = lastPart
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .trim();

  // Capitalize first letter
  const capitalized = readable.charAt(0).toUpperCase() + readable.slice(1);

  // Add context from parent keys
  const context = parts.length > 2
    ? parts.slice(0, -1).join(".").replace(/\./g, " → ")
    : "";

  if (context) {
    return `${capitalized} (${context})`;
  }
  return capitalized;
}

/**
 * Parse multiple files and merge preferences.
 * If the same key appears in multiple files, the first source wins for description.
 */
export function mergeParsedFiles(files: ParsedFile[]): ParsedPreference[] {
  const seen = new Map<string, ParsedPreference>();

  for (const file of files) {
    for (const pref of file.preferences) {
      if (!seen.has(pref.key)) {
        seen.set(pref.key, pref);
      } else {
        // Duplicate found - keep the first occurrence but log it
        console.log(`[Parser] Duplicate preference found: ${pref.key} in ${file.source} (already exists from ${seen.get(pref.key)!.source})`);
      }
    }
  }

  return Array.from(seen.values());
}

/**
 * Remove duplicate preferences from a single file
 * Keeps the first occurrence of each preference key
 */
export function removeDuplicates(preferences: ParsedPreference[]): ParsedPreference[] {
  const seen = new Map<string, ParsedPreference>();
  
  for (const pref of preferences) {
    if (!seen.has(pref.key)) {
      seen.set(pref.key, pref);
    }
  }
  
  return Array.from(seen.values());
}
