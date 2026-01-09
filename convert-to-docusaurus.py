#!/usr/bin/env python3
"""
Convert Notion wiki structure to Docusaurus-compatible format:
- Rename files/folders to kebab-case
- Update all links to relative paths
- Add frontmatter to markdown files
"""
import os
import re
import sys
from pathlib import Path

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DOCS_DIR = Path("wiki/docs")


def to_kebab_case(text):
    """Convert text to kebab-case"""
    # Remove special chars except spaces, hyphens, and alphanumeric
    text = re.sub(r'[^\w\s\-]', '', text)
    # Replace spaces and underscores with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Convert to lowercase
    text = text.lower()
    # Remove multiple consecutive hyphens
    text = re.sub(r'-+', '-', text)
    # Remove leading/trailing hyphens
    return text.strip('-')


def get_title_from_filename(filename):
    """Extract human-readable title from filename"""
    # Remove .md extension
    name = filename.replace('.md', '')
    # Replace hyphens with spaces and title case
    return name.replace('-', ' ').title()


def get_all_paths(root_dir):
    """Get all files and directories, sorted by depth (deepest first)"""
    all_paths = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        depth = dirpath.count(os.sep)
        for dirname in dirnames:
            full_path = Path(dirpath) / dirname
            all_paths.append((depth, full_path, True))  # True = is_dir
        for filename in filenames:
            if filename.endswith('.md'):
                full_path = Path(dirpath) / filename
                all_paths.append((depth, full_path, False))  # False = is_file

    # Sort by depth (deepest first) to avoid path issues when renaming
    all_paths.sort(key=lambda x: x[0], reverse=True)
    return all_paths


def rename_to_kebab_case(root_dir):
    """Rename all files and directories to kebab-case"""
    all_paths = get_all_paths(root_dir)
    rename_map = {}  # old_path -> new_path

    print("Step 1: Renaming files and directories to kebab-case...")
    count = 0

    for depth, old_path, is_dir in all_paths:
        old_name = old_path.name

        # Special handling for .md files
        if old_name.endswith('.md'):
            base_name = old_name[:-3]  # Remove .md
            new_base = to_kebab_case(base_name)
            new_name = new_base + '.md'
        else:
            new_name = to_kebab_case(old_name)

        if old_name != new_name and new_name:  # Only rename if different and valid
            new_path = old_path.parent / new_name

            # Store mapping for link updates
            rename_map[old_name] = new_name
            rename_map[str(old_path.relative_to(root_dir))] = str(new_path.relative_to(root_dir))

            try:
                old_path.rename(new_path)
                count += 1
                print(f"  [{count}] {old_name} -> {new_name}")
            except Exception as e:
                print(f"  [ERROR] Failed to rename {old_name}: {e}")

    print(f"\nRenamed {count} items\n")
    return rename_map


def add_frontmatter(file_path, title, slug):
    """Add frontmatter to markdown file if not present"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if frontmatter already exists
        if content.startswith('---'):
            return False

        # Create frontmatter
        frontmatter = f"""---
title: {title}
slug: {slug}
---

"""

        # Add frontmatter
        new_content = frontmatter + content

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True
    except Exception as e:
        print(f"  [ERROR] Failed to add frontmatter to {file_path}: {e}")
        return False


def update_links_in_file(file_path, root_dir):
    """Update all links to relative paths"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Pattern to match markdown links: [text](url)
        def replace_link(match):
            link_text = match.group(1)
            link_url = match.group(2)

            # Skip external links
            if link_url.startswith(('http://', 'https://', '#')):
                return match.group(0)

            # Decode URL-encoded spaces
            link_url = link_url.replace('%20', ' ')

            # Convert to kebab-case
            parts = link_url.split('/')
            new_parts = []
            for part in parts:
                if part.endswith('.md'):
                    base = part[:-3]
                    new_parts.append(to_kebab_case(base) + '.md')
                else:
                    new_parts.append(to_kebab_case(part))

            new_url = '/'.join(new_parts)

            # Make relative (remove leading ./)
            new_url = new_url.lstrip('./')

            return f"[{link_text}](./{new_url})"

        # Replace all markdown links
        content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, content)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True

        return False
    except Exception as e:
        print(f"  [ERROR] Failed to update links in {file_path}: {e}")
        return False


def process_all_files(root_dir):
    """Process all markdown files: add frontmatter and update links"""
    print("Step 2: Adding frontmatter and updating links...")

    frontmatter_count = 0
    links_count = 0

    for md_file in root_dir.rglob("*.md"):
        # Calculate relative path from docs root
        rel_path = md_file.relative_to(root_dir)

        # Generate slug (URL path)
        slug_parts = list(rel_path.parts[:-1])  # All except filename
        filename = rel_path.name.replace('.md', '')
        slug_parts.append(filename)
        slug = '/' + '/'.join(slug_parts)

        # Generate title from filename
        title = get_title_from_filename(filename)

        # Add frontmatter
        if add_frontmatter(md_file, title, slug):
            frontmatter_count += 1
            print(f"  [FM] {rel_path}")

        # Update links
        if update_links_in_file(md_file, root_dir):
            links_count += 1
            print(f"  [LINK] {rel_path}")

    print(f"\nAdded frontmatter to {frontmatter_count} files")
    print(f"Updated links in {links_count} files\n")


def main():
    if not DOCS_DIR.exists():
        print(f"ERROR: Directory not found: {DOCS_DIR}")
        return

    print(f"Converting wiki structure to Docusaurus format: {DOCS_DIR}\n")

    # Step 1: Rename all files and directories to kebab-case
    rename_map = rename_to_kebab_case(DOCS_DIR)

    # Step 2: Add frontmatter and update links
    process_all_files(DOCS_DIR)

    print("Done! Wiki is ready for Docusaurus.")


if __name__ == "__main__":
    main()
