/**
 * CSS file loader for userChrome.css and userContent.css
 */

export interface CSSFile {
  name: string;
  content: string;
  type: 'userChrome' | 'userContent';
}

export interface CSSLoadResult {
  success: boolean;
  file?: CSSFile;
  error?: string;
}

/**
 * Load a CSS file from user input
 */
export async function loadCSSFile(file: File): Promise<CSSLoadResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      
      // Determine file type based on filename
      const fileName = file.name.toLowerCase();
      let type: 'userChrome' | 'userContent';
      
      if (fileName.includes('userchrome')) {
        type = 'userChrome';
      } else if (fileName.includes('usercontent')) {
        type = 'userContent';
      } else {
        resolve({
          success: false,
          error: 'File must be named userChrome.css or userContent.css'
        });
        return;
      }
      
      resolve({
        success: true,
        file: {
          name: file.name,
          content,
          type
        }
      });
    };
    
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file'
      });
    };
    
    reader.readAsText(file);
  });
}

/**
 * Parse CSS content to extract enabled options
 */
export function parseCSSContent(content: string, type: 'userChrome' | 'userContent'): string[] {
  const enabledOptions: string[] = [];
  
  // Split content into blocks (each option is typically a comment block followed by CSS)
  const lines = content.split('\n');
  let currentBlock: string[] = [];
  let inComment = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Track comment blocks
    if (trimmed.startsWith('/*')) {
      inComment = true;
      currentBlock = [line];
      continue;
    }
    
    if (inComment) {
      currentBlock.push(line);
      if (trimmed.endsWith('*/')) {
        inComment = false;
      }
      continue;
    }
    
    // If we have CSS after a comment block, it's an enabled option
    if (currentBlock.length > 0 && trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
      // Extract option name from comment (usually first line)
      const commentText = currentBlock.join('\n');
      const nameMatch = commentText.match(/\/\*\s*(.+?)(?:\s*-\s*|$)/);
      
      if (nameMatch) {
        enabledOptions.push(nameMatch[1].trim());
      }
      
      currentBlock = [];
    }
  }
  
  return enabledOptions;
}

/**
 * Download CSS content as a file
 */
export function downloadCSSFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
