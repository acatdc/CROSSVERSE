const fs = require('fs');
const path = require('path');

const sourceDir = './tmp/wiki/CROSSVERSE WIKI 0716b8f0953645009d45638d5cda09fc';
const targetDir = './wiki/docs';

// Clean filename: remove hash, replace spaces with dashes
function cleanFilename(name) {
  return name
    .replace(/\s[a-f0-9]{32}/, '') // Remove Notion hash
    .replace(/\s+/g, '-')           // Spaces to dashes
    .toLowerCase()
    .replace(/[^a-z0-9\-\.]/g, ''); // Remove special chars
}

// Recursively copy and clean files
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

      // Fix internal links (remove hashes and URL encoding)
      content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // Skip external links
        if (url.startsWith('http')) return match;

        // Clean internal links
        const cleanUrl = url
          .replace(/%20/g, '-')
          .replace(/\s+/g, '-')
          .replace(/\s[a-f0-9]{32}/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9\-\.\/]/g, '');

        return `[${text}](./${cleanUrl})`;
      });

      fs.writeFileSync(destPath, content);
      console.log(`✓ ${item} -> ${cleanFileName}`);
    }
  });
}

// Start migration
console.log('Starting wiki migration...\n');
processDirectory(sourceDir, targetDir);
console.log('\n✓ Migration complete!');
