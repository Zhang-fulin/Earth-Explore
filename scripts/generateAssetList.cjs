const fs = require('fs');
const path = require('path');

const walk = (dir, prefix = '') => {
  return fs.readdirSync(dir).flatMap((name) => {
    const fullPath = path.join(dir, name);
    const relPath = path.join(prefix, name).replace(/\\/g, '/');
    if (fs.statSync(fullPath).isDirectory()) {
      return walk(fullPath, relPath);
    }
    return [relPath];
  });
};

const assetDir = 'dist';
const outputFile = 'dist/web-files.json';

const files = walk(assetDir);
fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
console.log(`✅ Generated ${outputFile}`);