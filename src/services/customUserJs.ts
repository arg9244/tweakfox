/**
 * Parser for the custom user.js configuration file
 * This file serves as the primary source of preferences
 */

import type { ParsedPreference } from "./parser";

// The custom user.js content from https://raw.githubusercontent.com/arg9244/dotfiles/refs/heads/main/dot_config/private_mozilla/private_firefox/private_x4ly4jil.default-nightly/user.js
export const CUSTOM_USER_JS_URL = "https://raw.githubusercontent.com/arg9244/dotfiles/refs/heads/main/dot_config/private_mozilla/private_firefox/private_x4ly4jil.default-nightly/user.js";

/**
 * Parse the custom user.js file content
 */
export function parseCustomUserJs(content: string): ParsedPreference[] {
  const preferences: ParsedPreference[] = [];
  const lines = content.split('\n');
  
  let currentSection = "General";
  let commentBuffer: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check for section headers
    if (trimmed.startsWith('// ===') && trimmed.includes('SECTION')) {
      const sectionMatch = trimmed.match(/SECTION \d+:\s*(.+)/);
      if (sectionMatch) {
        currentSection = sectionMatch[1].trim();
      }
      commentBuffer = [];
      continue;
    }
    
    // Collect comments
    if (trimmed.startsWith('//')) {
      commentBuffer.push(trimmed);
      continue;
    }
    
    // Parse user_pref lines
    const prefMatch = trimmed.match(/^user_pref\("([^"]+)",\s*(.+)\);$/);
    if (prefMatch) {
      const key = prefMatch[1];
      const valueStr = prefMatch[2];
      
      // Parse value
      let value: boolean | number | string;
      let type: 'boolean' | 'number' | 'string';
      
      if (valueStr === 'true') {
        value = true;
        type = 'boolean';
      } else if (valueStr === 'false') {
        value = false;
        type = 'boolean';
      } else if (!isNaN(Number(valueStr))) {
        value = Number(valueStr);
        type = 'number';
      } else {
        // String value - remove quotes
        value = valueStr.replace(/^["'](.*)["']$/, '$1');
        type = 'string';
      }
      
      // Extract description from comments
      let description = '';
      const notes: string[] = [];
      const warnings: string[] = [];
      
      for (const comment of commentBuffer) {
        const cleanComment = comment.replace(/^\/\/\s*/, '');
        if (cleanComment && !cleanComment.startsWith('===')) {
          if (!description) {
            description = cleanComment;
          } else {
            notes.push(cleanComment);
          }
        }
      }
      
      preferences.push({
        key,
        value,
        type,
        description: description || `Firefox preference: ${key}`,
        notes,
        references: [],
        warnings,
        settings: [],
        section: currentSection,
        source: 'custom-userjs',
        isCommented: false,
      });
      
      commentBuffer = [];
    } else if (trimmed && !trimmed.startsWith('//')) {
      // Reset comment buffer on non-comment, non-pref lines
      commentBuffer = [];
    }
  }
  
  return preferences;
}

/**
 * Fetch and parse the custom user.js file
 */
export async function fetchCustomUserJs(): Promise<ParsedPreference[]> {
  try {
    const response = await fetch(CUSTOM_USER_JS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const content = await response.text();
    return parseCustomUserJs(content);
  } catch (error) {
    console.error('Error fetching custom user.js:', error);
    throw error;
  }
}
