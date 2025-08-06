#!/usr/bin/env python3
"""
Post-process Quarto-generated markdown to convert blockquote callouts to Starlight format.
"""

import re
import sys
from pathlib import Path

def convert_blockquote_callouts(content):
    """Convert blockquote callouts to Starlight format."""
    
    # Pattern to match div-wrapped blockquote callouts like:
    # <div>
    # > **Note**
    # >
    # > content...
    # </div>
    pattern = r'<div>\s*\n\s*> \*\*(Note|Tip|Warning|Caution|Important|Danger)\*\*\s*\n>\s*\n((?:> .*\n?)*)\s*</div>'
    
    # Mapping from callout types to Starlight types
    type_mapping = {
        'Note': 'note',
        'Tip': 'tip', 
        'Warning': 'caution',
        'Caution': 'caution',
        'Important': 'note',
        'Danger': 'danger'
    }
    
    def replace_callout(match):
        callout_type = match.group(1)
        content_lines = match.group(2)
        
        # Convert to Starlight type
        starlight_type = type_mapping.get(callout_type, 'note')
        
        # Remove the '> ' prefix from each line and clean up
        content_lines = re.sub(r'^> ?', '', content_lines, flags=re.MULTILINE)
        content_lines = content_lines.strip()
        
        # Build the Starlight callout
        result = f':::{starlight_type}\n{content_lines}\n:::\n'
        return result
    
    return re.sub(pattern, replace_callout, content, flags=re.MULTILINE)

def main():
    if len(sys.argv) != 2:
        print("Usage: python fix-callouts.py <markdown-file>")
        sys.exit(1)
    
    file_path = Path(sys.argv[1])
    if not file_path.exists():
        print(f"File not found: {file_path}")
        sys.exit(1)
    
    # Read the file
    content = file_path.read_text(encoding='utf-8')
    
    # Convert callouts
    fixed_content = convert_blockquote_callouts(content)
    
    # Write back to file
    file_path.write_text(fixed_content, encoding='utf-8')
    print(f"Fixed callouts in {file_path}")

if __name__ == '__main__':
    main()