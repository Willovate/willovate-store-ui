import fs from 'node:fs';

const content = fs.readFileSync('e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/shared/RestaurantWebsite.tsx', 'utf8');
const registryFile = 'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/imageRegistry.ts';
let registry = fs.readFileSync(registryFile, 'utf8');

const regex = /([^'"]+):\s*{\s*kind:\s*['"]([^'"]+)['"].*?hero:\s*['"](photo-[a-zA-Z0-9-]+)['"].*?images:\s*\[([^\]]+)\]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const kind = match[2];
  if (['pizza', 'indian', 'dessert-shop', 'food-delivery', 'bbq-grill', 'cloud-kitchen'].includes(kind)) {
    const hero = match[3];
    const images = match[4].match(/photo-[a-zA-Z0-9-]+/g) || [];
    
    // Map kinds
    const map: Record<string,string> = {
      'dessert-shop': 'dessert',
      'bbq-grill': 'bbq'
    };
    const cat = map[kind] || kind;
    
    const allImages = [hero, ...images];
    let newCode = `\nexport const ${cat.replace('-', '_').toUpperCase()}_IMAGES: Record<string, ThemeImage[]> = {\n  'default': [\n`;
    
    allImages.forEach((img, i) => {
      newCode += `    { unsplashId: '${img}', url: u('${img}'), alt: '${cat} image ${i}', category: '${cat}', theme: 'default', section: 'gallery', tags: ['${cat}'] },\n`;
    });
    newCode += `  ]\n};\n`;
    
    // Insert into registry above ALL_IMAGES
    registry = registry.replace('export const ALL_IMAGES', newCode + '\nexport const ALL_IMAGES');
    
    // Update ALL_IMAGES
    registry = registry.replace(`'${cat}': {}`, `'${cat}': ${cat.replace('-', '_').toUpperCase()}_IMAGES`);
    registry = registry.replace(`'food-delivery': {}`, `'food-delivery': FOOD_DELIVERY_IMAGES`);
  }
}

// Ensure food-delivery maps correctly since it's food-delivery in ALL_IMAGES but delivery in some places
registry = registry.replace(`'dessert': {}`, `'dessert': DESSERT_IMAGES`);
registry = registry.replace(`'bbq': {}`, `'bbq': BBQ_GRILL_IMAGES`);

fs.writeFileSync(registryFile, registry, 'utf8');
console.log("Updated imageRegistry.ts");
