const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
files.push('../index.html');

for (const file of files) {
  const filePath = path.join(jsDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacedAny = false;

  // Find <svg and add aria-hidden="true" if it doesn't already exist
  const regex = /<svg([^>]*?)>/g;
  content = content.replace(regex, (match, attrs) => {
    if (attrs.includes('aria-hidden')) return match;
    replacedAny = true;
    return `<svg aria-hidden="true"${attrs}>`;
  });

  if (replacedAny) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added aria-hidden to SVGs in ${file}`);
  }
}
