import fs from 'node:fs';

const files = [
  'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/shared/RestaurantWebsite.tsx',
  'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/RestaurantTemplate.tsx'
];

const photoRegex = /photo-[a-zA-Z0-9-]+/g;
const photos = new Set<string>();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(photoRegex) || [];
  for (const match of matches) {
    photos.add(match);
  }
}

console.log("All hardcoded photos found in RestaurantWebsite and RestaurantTemplate:");
console.log([...photos].join('\n'));

