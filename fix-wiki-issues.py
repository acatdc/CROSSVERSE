#!/usr/bin/env python3
"""
Fix specific wiki issues:
1. Rename files with IPA symbols to clean names
2. Fix broken links
3. Fix image references
4. Fix HTML issues in markdown
"""
import os
import re
import sys
from pathlib import Path

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DOCS_DIR = Path("wiki/docs")

# Manual mapping for problematic files
RENAME_MAP = {
    "hyp-0-ˈhaɪpou.md": "hyp-0.md",
    "hyp-0-ˈhaɪpou": "hyp-0",
    "qbits-ˈkjuːbɪt.md": "qbits.md",
}


def fix_html_issues(file_path):
    """Fix common HTML issues in markdown"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Fix <details> without closing tags
        # Match <details> and ensure it has </details>
        def fix_details(match):
            details_content = match.group(0)
            if '</details>' not in details_content:
                # Find next blank line or end of section
                return details_content + '\n</details>\n'
            return details_content

        # Fix standalone <O> or <?> tags (convert to escaped or remove)
        content = re.sub(r'<\?>', '&lt;?&gt;', content)
        content = re.sub(r'<O>', '&lt;O&gt;', content)
        content = re.sub(r'<\s*>', '', content)  # Remove empty tags

        # Fix image references - ensure extension is preserved
        # Pattern: ![text](path/imagepng) -> ![text](path/image.png)
        def fix_image_ext(match):
            alt_text = match.group(1)
            path = match.group(2)

            # Check if extension is missing dot
            if path.endswith(('png', 'jpg', 'jpeg', 'gif', 'webp')) and '.' not in path[-5:]:
                # Find where extension starts
                for ext in ['png', 'jpg', 'jpeg', 'gif', 'webp']:
                    if path.endswith(ext):
                        path = path[:-len(ext)] + '.' + ext
                        break

            return f'![{alt_text}]({path})'

        content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', fix_image_ext, content)

        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"  [ERROR] {file_path}: {e}")
        return False


def rename_problematic_files():
    """Rename files with IPA symbols"""
    print("Step 1: Renaming problematic files...")
    count = 0

    for old_name, new_name in RENAME_MAP.items():
        # Find all occurrences
        for file_path in DOCS_DIR.rglob(old_name):
            new_path = file_path.parent / new_name
            try:
                file_path.rename(new_path)
                count += 1
                print(f"  [{count}] {old_name} -> {new_name}")
            except Exception as e:
                print(f"  [ERROR] Failed to rename {old_name}: {e}")

    print(f"\nRenamed {count} files\n")


def fix_all_links():
    """Fix all broken links in markdown files"""
    print("Step 2: Fixing broken links...")
    count = 0

    # Build link replacement map
    link_fixes = {
        'hyp-0-ˈhaɪpou.md': 'hyp-0.md',
        'hyp-0-ˈhaɪpou': 'hyp-0',
        'qbits-ˈkjuːbɪt.md': 'qbits.md',
        'qbite28099s-5bcb88kjucb90bc9aat5d.md': 'qbits.md',
        'hyp-0-5bcb88hac9aapou5d.md': 'hyp-0.md',
        'hyp-0-5bcb88hac9aapou5d': 'hyp-0',
        'Platform%20entities/Hyp-0%20%5B%CB%88ha%C9%AApou%5D.md': 'platform-entities/hyp-0.md',
    }

    for md_file in DOCS_DIR.rglob("*.md"):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original = content

            # Replace all broken links
            for old_link, new_link in link_fixes.items():
                content = content.replace(old_link, new_link)

            if content != original:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print(f"  [{count}] Fixed links in: {md_file.name}")

        except Exception as e:
            print(f"  [ERROR] {md_file}: {e}")

    print(f"\nFixed links in {count} files\n")


def fix_all_html():
    """Fix HTML issues in all markdown files"""
    print("Step 3: Fixing HTML issues...")
    count = 0

    for md_file in DOCS_DIR.rglob("*.md"):
        if fix_html_issues(md_file):
            count += 1
            print(f"  [{count}] Fixed HTML in: {md_file.name}")

    print(f"\nFixed HTML in {count} files\n")


def main():
    if not DOCS_DIR.exists():
        print(f"ERROR: Directory not found: {DOCS_DIR}")
        return

    print(f"Fixing wiki issues in: {DOCS_DIR}\n")

    rename_problematic_files()
    fix_all_links()
    fix_all_html()

    print("Done! Try running the dev server again.")


if __name__ == "__main__":
    main()
