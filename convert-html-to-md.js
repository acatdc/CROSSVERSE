const fs = require('fs');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

// Custom rule for Notion callouts
turndownService.addRule('notionCallout', {
  filter: function (node) {
    return node.classList && node.classList.contains('callout');
  },
  replacement: function (content) {
    return `:::note\n${content.trim()}\n:::\n\n`;
  }
});

// Read HTML file
const htmlPath = './tmp/wiki/NotionExport_HTML/General overview 8ba05a8fdd4d4438a5aa9d48195dde9b.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract body content (skip all the inline styles)
const bodyMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
const bodyContent = bodyMatch ? bodyMatch[1] : html;

// Convert to markdown
let markdown = turndownService.turndown(bodyContent);

// Post-process: clean up
markdown = markdown
  // Remove extra blank lines
  .replace(/\n{3,}/g, '\n\n')
  // Fix Notion internal links (remove hashes)
  .replace(/\[([^\]]+)\]\([^)]*8ba05a8fdd4d4438a5aa9d48195dde9b[^)]*\)/g, '$1')
  .trim();

// Write to test file
const outputPath = './wiki/docs/general-overview-test.md';
fs.writeFileSync(outputPath, markdown);

console.log('✓ Converted General overview to markdown');
console.log(`  Output: ${outputPath}`);
console.log(`\nFirst 500 chars:\n${markdown.substring(0, 500)}...`);
