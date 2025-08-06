#!/usr/bin/env python3
"""
Clean up docusaurus-md output from Quarto to make it compatible with Astro/Starlight.
Removes React-specific elements while preserving the correct callout syntax.
"""

import re
import sys
from pathlib import Path

def clean_docusaurus_md(content):
    """Remove React-specific elements from docusaurus-md output."""
    
    # Remove the export statement for quartoRawHtml
    content = re.sub(r'^export const quartoRawHtml =\s*\[.*?\];\s*\n', '', content, flags=re.MULTILINE | re.DOTALL)
    
    # Remove React dangerouslySetInnerHTML divs
    content = re.sub(r'<div dangerouslySetInnerHTML=\{\{ __html: quartoRawHtml\[\d+\] \}\} />', '', content)
    
    # Clean up code block class attributes (optional)
    content = re.sub(r'<pre class="text"><code>', '<pre><code>', content)
    
    # Remove empty lines that might be left behind
    content = re.sub(r'\n\n\n+', '\n\n', content)
    
    return content

def main():
    if len(sys.argv) != 2:
        print("Usage: python clean-docusaurus-md.py <markdown-file>")
        sys.exit(1)
    
    file_path = Path(sys.argv[1])
    if not file_path.exists():
        print(f"File not found: {file_path}")
        sys.exit(1)
    
    # Read the file
    content = file_path.read_text(encoding='utf-8')
    
    # Clean the content
    cleaned_content = clean_docusaurus_md(content)
    
    # Write back to file
    file_path.write_text(cleaned_content, encoding='utf-8')
    print(f"Cleaned docusaurus-md output in {file_path}")

if __name__ == '__main__':
    main()