#!/usr/bin/env python3
"""
Generate API documentation markdown files from bedrock_ge docstrings.
"""

import importlib
import inspect
from pathlib import Path
from typing import List

def format_signature(func):
    """Format clean function signature with parameter names only (no types)."""
    try:
        sig = inspect.signature(func)
        
        # Create a clean signature with just parameter names
        params = []
        for name, param in sig.parameters.items():
            if name == 'self':
                continue
            params.append(name)
        
        return f"({', '.join(params)})"
    except (ValueError, TypeError):
        return "()"

def extract_param_info(func):
    """Extract parameter information including types from function signature."""
    try:
        sig = inspect.signature(func)
        params = []
        
        for name, param in sig.parameters.items():
            if name == 'self':
                continue
                
            param_info = {"name": name, "type": "", "default": ""}
            
            # Get type annotation
            if param.annotation != inspect.Parameter.empty:
                param_info["type"] = str(param.annotation).replace("typing.", "")
            
            # Get default value
            if param.default != inspect.Parameter.empty:
                default_str = str(param.default)
                # Clean up complex multi-line defaults (like CRS objects)
                if '\n' in default_str or len(default_str) > 50:
                    # For complex objects, just show the type or a simplified representation
                    if hasattr(param.default, '__class__'):
                        param_info["default"] = f"<{param.default.__class__.__name__} object>"
                    else:
                        param_info["default"] = "<complex default>"
                else:
                    param_info["default"] = default_str
                
            params.append(param_info)
        
        # Get return type
        return_type = ""
        if sig.return_annotation != inspect.Signature.empty:
            return_type = str(sig.return_annotation).replace("typing.", "")
        
        return params, return_type
        
    except (ValueError, TypeError):
        return [], ""

def parse_docstring(docstring: str) -> dict:
    """Parse a docstring into structured components."""
    if not docstring:
        return {"description": "", "parameters": [], "returns": "", "examples": []}
    
    lines = docstring.strip().split('\n')
    result = {"description": "", "parameters": [], "returns": "", "examples": []}
    
    current_section = "description"
    current_param = None
    description_lines = []
    
    for line in lines:
        line = line.strip()
        
        # Check for section headers
        if line.lower().startswith(('args:', 'arguments:', 'parameters:', 'params:')):
            current_section = "parameters"
            continue
        elif line.lower().startswith(('returns:', 'return:')):
            current_section = "returns"
            continue
        elif line.lower().startswith(('examples:', 'example:')):
            current_section = "examples"
            continue
        elif line.lower().startswith(('raises:', 'raise:')):
            current_section = "raises"
            continue
            
        # Process based on current section
        if current_section == "description":
            if line:
                description_lines.append(line)
            elif description_lines:  # Empty line after description
                result["description"] = " ".join(description_lines)
                description_lines = []
        
        elif current_section == "parameters":
            # Look for parameter definitions (name: description or name (type): description)
            if line and not line.startswith(' '):
                # New parameter
                if ':' in line:
                    param_part, desc_part = line.split(':', 1)
                    param_name = param_part.strip()
                    param_desc = desc_part.strip()
                    result["parameters"].append({"name": param_name, "description": param_desc})
            elif line.startswith(' ') and result["parameters"]:
                # Continuation of previous parameter description
                result["parameters"][-1]["description"] += " " + line.strip()
        
        elif current_section == "returns":
            if line:
                result["returns"] += line + " "
    
    # Handle case where description continues to end
    if description_lines:
        result["description"] = " ".join(description_lines)
    
    return result

def format_docstring(docstring: str) -> str:
    """Format docstring for markdown."""
    if not docstring:
        return ""
    
    lines = docstring.strip().split('\n')
    formatted_lines = []
    
    for line in lines:
        # Remove common leading whitespace
        stripped = line.strip()
        if stripped:
            formatted_lines.append(stripped)
        else:
            formatted_lines.append("")
    
    return '\n'.join(formatted_lines)

def generate_class_docs(cls, level=2):
    """Generate documentation for a class."""
    docs = []
    
    # Class header with syntax highlighting
    header = "#" * level
    docs.append(f"{header} `class {cls.__name__}`")
    docs.append("")
    
    # Class docstring
    if cls.__doc__:
        parsed = parse_docstring(cls.__doc__)
        if parsed["description"]:
            docs.append(parsed["description"])
            docs.append("")
    
    # Get attributes/properties - only include those defined in this class
    attributes = []
    for name in cls.__dict__:
        if not name.startswith('_'):
            try:
                attr = getattr(cls, name)
                if not callable(attr):
                    attributes.append(name)
            except Exception:
                continue
    
    if attributes:
        docs.append(f"{'#' * (level + 1)} Attributes")
        docs.append("")
        for attr in sorted(attributes):
            docs.append(f"- `{attr}`")
        docs.append("")
    
    # Methods - only include methods defined in this class, not inherited ones
    methods = []
    functions = []
    
    for name, method in inspect.getmembers(cls, inspect.ismethod):
        if not name.startswith('_') and method.__qualname__.startswith(cls.__name__ + '.'):
            methods.append(name)
    
    for name, func in inspect.getmembers(cls, inspect.isfunction):
        if not name.startswith('_') and func.__qualname__.startswith(cls.__name__ + '.'):
            functions.append(name)
    
    all_methods = sorted(set(methods + functions))
    
    if all_methods:
        docs.append(f"{'#' * (level + 1)} Methods")
        docs.append("")
        
        for method_name in all_methods:
            try:
                method = getattr(cls, method_name)
                sig = format_signature(method)
                docs.append(f"{'#' * (level + 2)} `{method_name}`")
                docs.append("")
                
                if method.__doc__:
                    # Extract parameter and return type info from method signature
                    method_sig_params, method_return_type = extract_param_info(method)
                    parsed = parse_docstring(method.__doc__)
                    
                    # Description
                    if parsed["description"]:
                        docs.append(parsed["description"])
                        docs.append("")
                    
                    # Enhanced Parameters table with types
                    if method_sig_params:
                        docs.append("**Parameters:**")
                        docs.append("")
                        docs.append("| Parameter | Type | Default | Description |")
                        docs.append("|-----------|------|---------|-------------|")
                        
                        for sig_param in method_sig_params:
                            name = sig_param["name"]
                            param_type = sig_param["type"]
                            default = sig_param["default"]
                            
                            # Find matching description from docstring
                            description = ""
                            for parsed_param in parsed["parameters"]:
                                if parsed_param["name"].strip().startswith(name):
                                    description = parsed_param["description"]
                                    break
                            
                            # Clean up for table display
                            name_clean = name.replace("|", "\\|")
                            type_clean = param_type.replace("|", "\\|") if param_type else ""
                            default_clean = default.replace("|", "\\|") if default else ""
                            desc_clean = description.replace("|", "\\|")
                            
                            # Format type and default columns
                            type_display = f"`{type_clean}`" if type_clean else ""
                            default_display = f"`{default_clean}`" if default_clean else ""
                            
                            docs.append(f"| `{name_clean}` | {type_display} | {default_display} | {desc_clean} |")
                        docs.append("")
                    
                    # Returns with type
                    if method_return_type or parsed["returns"]:
                        docs.append("**Returns:**")
                        docs.append("")
                        if method_return_type:
                            docs.append(f"**Type:** `{method_return_type}`")
                            docs.append("")
                        if parsed["returns"]:
                            docs.append(parsed["returns"].strip())
                            docs.append("")
                    
            except Exception as e:
                docs.append(f"Could not document {method_name}: {e}")
                docs.append("")
    
    return '\n'.join(docs)

def generate_function_docs(func, level=2):
    """Generate documentation for a function."""
    header = "#" * level
    sig = format_signature(func)
    
    docs = [f"{header} `{func.__name__}`", ""]
    
    # Extract parameter and return type info from signature
    sig_params, return_type = extract_param_info(func)
    
    if func.__doc__:
        parsed = parse_docstring(func.__doc__)
        
        # Description
        if parsed["description"]:
            docs.append(parsed["description"])
            docs.append("")
        
        # Enhanced Parameters table with types
        if sig_params:
            docs.append("**Parameters:**")
            docs.append("")
            docs.append("| Parameter | Type | Default | Description |")
            docs.append("|-----------|------|---------|-------------|")
            
            for sig_param in sig_params:
                name = sig_param["name"]
                param_type = sig_param["type"]
                default = sig_param["default"]
                
                # Find matching description from docstring
                description = ""
                for parsed_param in parsed["parameters"]:
                    if parsed_param["name"].strip().startswith(name):
                        description = parsed_param["description"]
                        break
                
                # Clean up for table display
                name_clean = name.replace("|", "\\|")
                type_clean = param_type.replace("|", "\\|") if param_type else ""
                default_clean = default.replace("|", "\\|") if default else ""
                desc_clean = description.replace("|", "\\|")
                
                # Format type and default columns
                type_display = f"`{type_clean}`" if type_clean else ""
                default_display = f"`{default_clean}`" if default_clean else ""
                
                docs.append(f"| `{name_clean}` | {type_display} | {default_display} | {desc_clean} |")
            docs.append("")
        
        # Returns with type
        if return_type or parsed["returns"]:
            docs.append("**Returns:**")
            docs.append("")
            if return_type:
                docs.append(f"**Type:** `{return_type}`")
                docs.append("")
            if parsed["returns"]:
                docs.append(parsed["returns"].strip())
                docs.append("")
            
    return '\n'.join(docs)

def generate_module_docs(module_name: str) -> str:
    """Generate markdown documentation for a module."""
    try:
        module = importlib.import_module(module_name)
    except ImportError as e:
        return f"Could not import {module_name}: {e}"
    
    docs = []
    
    # Module docstring
    if module.__doc__:
        docs.append(format_docstring(module.__doc__))
        docs.append("")
    
    # Get all public members
    members = [name for name in dir(module) if not name.startswith('_')]
    
    # Separate different types of members
    classes = []
    functions = []
    constants = []
    
    for name in members:
        try:
            obj = getattr(module, name)
            if inspect.isclass(obj) and obj.__module__ == module_name:
                classes.append((name, obj))
            elif inspect.isfunction(obj) and obj.__module__ == module_name:
                functions.append((name, obj))
            elif not callable(obj) and not inspect.ismodule(obj):
                # Likely a constant or variable
                constants.append((name, obj))
        except Exception:
            continue
    
    # Add overview section if there are multiple types
    if len([x for x in [classes, functions, constants] if x]) > 1:
        docs.append("## Overview")
        docs.append("")
        
        if classes:
            docs.append("**Classes:**")
            for name, cls in sorted(classes):
                # Generate heading ID that matches Starlight's pattern: "class-classname"
                heading_id = f"class-{name.lower()}"
                docs.append(f"- [`{name}`](#{heading_id})")
            docs.append("")
        
        if functions:
            docs.append("**Functions:**")
            for name, func in sorted(functions):
                # Function headings don't have "class" prefix, just the function name
                docs.append(f"- [`{name}`](#{name.lower()})")
            docs.append("")
        
        if constants:
            docs.append("**Constants:**")
            for name, const in sorted(constants):
                docs.append(f"- `{name}`")
            docs.append("")
    
    # Document constants
    if constants:
        docs.append("## Constants")
        docs.append("")
        for name, const in sorted(constants):
            docs.append(f"### `{name}`")
            docs.append("")
            docs.append(f"**Value:** `{repr(const)}`")
            docs.append("")
    
    # Document classes
    if classes:
        docs.append("## Classes")
        docs.append("")
        for name, cls in sorted(classes):
            docs.append(generate_class_docs(cls, level=3))
            docs.append("---")
            docs.append("")
    
    # Document functions
    if functions:
        docs.append("## Functions")
        docs.append("")
        for name, func in sorted(functions):
            docs.append(generate_function_docs(func, level=3))
            docs.append("---")
            docs.append("")
    
    return '\n'.join(docs)

def discover_modules(package_name: str) -> List[str]:
    """Automatically discover all modules in a package."""
    try:
        package = importlib.import_module(package_name)
    except ImportError:
        return []
    
    modules = [package_name]
    
    # Get package path
    if hasattr(package, '__path__'):
        import pkgutil
        for importer, modname, ispkg in pkgutil.walk_packages(
            path=package.__path__, 
            prefix=package.__name__ + ".",
            onerror=lambda x: None
        ):
            try:
                importlib.import_module(modname)
                modules.append(modname)
            except ImportError:
                continue
    
    return sorted(modules)

def main():
    """Generate API documentation for bedrock_ge modules."""
    
    output_dir = Path("src/content/docs/reference/api")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Automatically discover all modules
    modules = discover_modules("bedrock_ge")
    
    print("Generating API documentation...")
    
    for module_name in modules:
        try:
            print(f"Processing {module_name}...")
            
            # Generate markdown content
            content = generate_module_docs(module_name)
            
            # Create output file
            file_name = module_name.replace(".", "_") + ".md"
            output_file = output_dir / file_name
            
            # Add frontmatter for Starlight
            frontmatter = f"""---
title: {module_name}
description: API reference for {module_name}
prev: false
next: false
editUrl: false
---

"""
            
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(frontmatter + content)
            
            print(f"Generated: {output_file}")
            
        except Exception as e:
            print(f"Error generating docs for {module_name}: {e}")
    
    print("API documentation generation complete!")

if __name__ == "__main__":
    main()