
import React from 'react';

/**
 * Converts plain text URLs in a string to clickable links
 */
export function linkify(text: string): React.ReactNode[] {
  if (!text) return [text];
  
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Find all URL matches
  const matches = text.matchAll(urlRegex);
  
  for (const match of matches) {
    const url = match[0];
    const index = match.index || 0;

    // Add text before the URL
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Add clickable URL link
    parts.push(
      <a 
        key={index}
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {url}
      </a>
    );

    // Update last index
    lastIndex = index + url.length;
  }

  // Add any remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts;
}

