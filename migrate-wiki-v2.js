const fs = require('fs');
const path = require('path');

const sourceDir = './tmp/wiki/CROSSVERSE WIKI 0716b8f0953645009d45638d5cda09fc';
const targetDir = './wiki/docs';

// Clean filename: remove hash, replace spaces with dashes
function cleanFilename(name) {
  return name
    .replace(/\s[a-f0-9]{32}/, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9\-\.]/g, '');
}

// Convert file path to clean doc ID
function getDocId(filePath, basePath) {
  const relativePath = path.relative(basePath, filePath);
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .replace(/\s[a-f0-9]{32}/g, '')
    .replace(/%20/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9\-\/]/g, '');
}

// Process markdown content
function processMarkdown(content, currentFile) {
  // Remove horizontal rules after headings
  content = content.replace(/^#[^\n]+\n\n---\n/gm, (match) => match.replace('\n---\n', '\n'));

  // Convert Notion callouts (<aside>) to Docusaurus admonitions
  content = content.replace(/<aside>\s*\n💡\s*([\s\S]*?)\n<\/aside>/g, (match, text) => {
    return `:::note\n${text.trim()}\n:::`;
  });

  // Escape HTML-like tags that aren't real HTML
  content = content.replace(/<\?>/g, '`<?>`');
  content = content.replace(/<O>/g, '`<O>`');
  content = content.replace(/<Q>/g, '`<Q>`');
  content = content.replace(/<X>/g, '`<X>`');
  content = content.replace(/<\.>/g, '`<.>`');

  // Fix self-referencing links (remove them or convert to anchors)
  content = content.replace(/\[([^\]]+)\]\([^)]*General%20overview[^)]*\)/g, '$1');
  content = content.replace(/\[([^\]]+)\]\([^)]*general-overview[^)]*\)/g, '$1');

  // Fix internal links with Notion hashes
  content = content.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (match, text, url) => {
    // Skip external links
    if (url.startsWith('http')) return match;

    // Clean internal link
    const cleanUrl = url
      .replace(/%20/g, '-')
      .replace(/\s+/g, '-')
      .replace(/\s[a-f0-9]{32}/g, '')
      .replace(/\[.*?\]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\-\.\/]/g, '')
      .replace(/\.md$/, '');

    return `[${text}](./${cleanUrl})`;
  });

  // Remove broken image references (we'll add them later manually)
  content = content.replace(/!\[([^\]]*)\]\([^)]*[a-f0-9]{32}[^)]*\)/g, '');

  return content;
}

// Recursively copy and process files
function processDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      const cleanDirName = cleanFilename(item);
      const destPath = path.join(dest, cleanDirName);
      processDirectory(srcPath, destPath);
    } else if (item.endsWith('.md')) {
      const cleanFileName = cleanFilename(item);
      const destPath = path.join(dest, cleanFileName);

      let content = fs.readFileSync(srcPath, 'utf8');
      content = processMarkdown(content, srcPath);

      fs.writeFileSync(destPath, content);
      console.log(`✓ ${item} -> ${cleanFileName}`);
    }
  });
}

// Start migration
console.log('Starting wiki migration v2...\n');
processDirectory(sourceDir, targetDir);
console.log('\n✓ Migration complete!');
console.log('\nNote: Images were removed. Add them manually to static/img/ if needed.');
