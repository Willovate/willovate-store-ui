import fs from 'node:fs';
import path from 'node:path';
import { ALL_IMAGES } from '../src/templates/food-restaurants/imageRegistry';

// Gather all known good IDs from the registry
const goodIds = new Set<string>();
for (const category of Object.values(ALL_IMAGES)) {
  for (const theme of Object.values(category)) {
    for (const img of theme) {
      goodIds.add(img.unsplashId);
    }
  }
}

// Function to recursively find all .ts and .tsx files
function walk(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, fileList);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walk('e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants');
allFiles.push('e:/Willovate_store/willovate-store-ui/src/data/templateCategories.ts');

const photoRegex = /photo-[a-zA-Z0-9-]+/g;
let foundBad = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(photoRegex) || [];
  
  const badMatches = new Set<string>();
  for (const match of matches) {
    if (!goodIds.has(match)) {
      badMatches.add(match);
    }
  }
  
  if (badMatches.size > 0) {
    console.log(`\nFile: ${file}`);
    console.log(`Unknown/Unverified photos found:`);
    for (const bad of badMatches) {
      console.log(`  - ${bad}`);
      foundBad++;
    }
  }
}

console.log(`\nTotal unverified photos found: ${foundBad}`);
