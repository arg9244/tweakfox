/**
 * Service for loading and parsing existing user.js files
 */

export interface LoadedPreference {
  key: string;
  value: boolean | number | string;
  type: "boolean" | "number" | "string";
  isCommented: boolean;
  line: number;
}

export interface LoadResult {
  preferences: LoadedPreference[];
  totalLines: number;
  errors: string[];
  fileName: string;
}

const USER_PREF_REGEX =
  /^\s*(\/\/\s*)?user_pref\s*\(\s*"([^"]+)"\s*,\s*(.+?)\s*\)\s*;?\s*$/;

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

export function parseUserJsFile(content: string, fileName: string): LoadResult {
  const lines = content.split(/\r?\n/);
  const preferences: LoadedPreference[] = [];
  const errors: string[] = [];

  lines.forEach((line, index) => {
    const match = line.match(USER_PREF_REGEX);
    if (match) {
      const isCommented = !!match[1];
      const key = match[2];
      try {
        const { value, type } = parseValue(match[3]);
        preferences.push({
          key,
          value,
          type,
          isCommented,
          line: index + 1,
        });
      } catch (err) {
        errors.push(`Line ${index + 1}: Failed to parse value for "${key}"`);
      }
    }
  });

  return {
    preferences,
    totalLines: lines.length,
    errors,
    fileName,
  };
}

export async function loadUserJsFromFile(file: File): Promise<LoadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        resolve(parseUserJsFile(content, file.name));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
