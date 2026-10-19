import fs from 'node:fs';
import path from 'node:path';
import { ALL_IMAGES } from '../src/templates/food-restaurants/imageRegistry';

const goodIds = new Set<string>();
const categoryImages: Record<string, string[]> = {};

for (const [cat, themes] of Object.entries(ALL_IMAGES)) {
  categoryImages[cat] = [];
  for (const theme of Object.values(themes)) {
    for (const img of theme) {
      goodIds.add(img.unsplashId);
      categoryImages[cat].push(img.unsplashId);
    }
  }
}

// Map folder names/keys to imageRegistry keys
const catMap: Record<string, string> = {
  'pizza': 'pizza',
  'fast-food': 'fast-food',
  'cloud-kitchen': 'cloud-kitchen',
  'indian': 'indian',
  'dessert-shop': 'dessert',
  'food-delivery': 'food-delivery',
  'bbq-grill': 'bbq',
  'bakery': 'bakery',
  'cafe': 'cafe',
  'fine-dining': 'fine-dining',
};

function getCategoryForFile(filePath: string): string | null {
  for (const [folder, key] of Object.entries(catMap)) {
    if (filePath.includes(`/${folder}/`) || filePath.includes(`\\${folder}\\`)) {
      return key;
    }
  }
  return null; 
}

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

// Pass 1: Build a global replacement map based on the specific theme files (where we know the category)
const badToGood = new Map<string, string>();
const imgIdxMap: Record<string, number> = {};

for (const file of allFiles) {
  const cat = getCategoryForFile(file);
  if (!cat) continue; 
  
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(photoRegex) || [];
  
  for (const match of matches) {
    if (!goodIds.has(match) && !badToGood.has(match)) {
      const validImages = categoryImages[cat];
      if (!imgIdxMap[cat]) imgIdxMap[cat] = 0;
      
      const replacement = validImages[imgIdxMap[cat] % validImages.length];
      imgIdxMap[cat]++;
      
      badToGood.set(match, replacement);
    }
  }
}

// Pass 2: Actually replace in all files using the global map
let totalReplaced = 0;
for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const matches = content.match(photoRegex) || [];
  
  const badMatches = new Set<string>();
  for (const match of matches) {
    if (badToGood.has(match)) {
      badMatches.add(match);
    }
  }
  
  if (badMatches.size > 0) {
    for (const bad of badMatches) {
      const replacement = badToGood.get(bad)!;
      content = content.replaceAll(bad, replacement);
      totalReplaced++;
      console.log(`Replaced ${bad} -> ${replacement} in ${path.basename(file)}`);
    }
    fs.writeFileSync(file, content, 'utf8');
  }
}

console.log(`\nTotal files modified, unverified photos replaced globally: ${totalReplaced}`);
