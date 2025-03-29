
import React from 'react';

/**
 * Converts plain text URLs in a string to clickable links
 * The excludeGithubUrls parameter has been removed as we now want all links to be clickable
 */
export function linkify(text: string): React.ReactNode[] {
  if (!text) return [text];
  
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Split the text by URLs
  const parts = text.split(urlRegex);
  // Match all URLs in the text
  const matches = text.match(urlRegex) || [];
  
  // Combine parts and matches
  const result: React.ReactNode[] = [];
  
  parts.forEach((part, i) => {
    // Add the text part
    if (part) result.push(part);
    
    // Add the URL part (if there is one)
    if (matches[i]) {
      result.push(
        <a 
          key={i}
          href={matches[i]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {matches[i]}
        </a>
      );
    }
  });
  
  return result;
}
