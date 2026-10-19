import fs from 'node:fs';
const registryFile = 'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/imageRegistry.ts';
let registry = fs.readFileSync(registryFile, 'utf8');

const missing = {
  cloudKitchen: ['photo-1556911220-bff31c812dba', 'photo-1556740749-887f6717d7e4','photo-1600891964092-4316c2883c44','photo-1528712306091-ed0763094c98','photo-1551183053-bf91a1d81141','photo-1559339352-11d035aa65de','photo-1547592180-85f173990554','photo-1504674900247-0877df9cc836','photo-1498837167922-ddd27525d352'],
  pizza: ['photo-1548365328-8b849e6f6b92', 'photo-1513104890138-7c749659a591','photo-1574071318508-1cdbab80d002','photo-1593560708920-61dd98c46a4e','photo-1579751626657-72bc17010498','photo-1565299624946-b28f40a0ae38','photo-1571997478779-2adcbbe9ab2f','photo-1515003197210-e0cd71810b5f','photo-1473093295043-cdd812d0e601'],
  indian: ['photo-1585937421612-70a008356fbe', 'photo-1601050690597-df0568f70950','photo-1631452180519-c014fe946bc0','photo-1567188040759-fb8a883dc6d8','photo-1626132647523-66f5bf380027','photo-1603894584373-5ac82b2ae398','photo-1596797038530-2c107aa542e5','photo-1565557623262-b51c2513a641','photo-1547592180-85f173990554'],
  dessert: ['photo-1551024506-0bccd828d307', 'photo-1578985545062-69928b1d9587','photo-1511381939415-e44015466834','photo-1563805042-7684c019e1cb','photo-1558303420-f814d8a590f5','photo-1559622214-f8a9850965bb','photo-1488477181946-6428a0291777','photo-1571115764595-644a1f56a55c','photo-1582058091505-f87a2e55a40f'],
  foodDelivery: ['photo-1526367790999-0150786686a2', 'photo-1569058242253-92a9c755a0ec','photo-1546069901-ba9599a7e63c','photo-1540189549336-e6e99c3679fe','photo-1515003197210-e0cd71810b5f','photo-1528712306091-ed0763094c98','photo-1504674900247-0877df9cc836','photo-1476224203421-9ac39bcb3327','photo-1498837167922-ddd27525d352'],
  bbq: ['photo-1529193591184-b1d58069ecdd', 'photo-1558030006-450675393462','photo-1544025162-d76694265947','photo-1555939594-58d7cb561ad1','photo-1529042410759-befb1204b468','photo-1540189549336-e6e99c3679fe','photo-1550547660-d9450f859349','photo-1504674900247-0877df9cc836','photo-1529193591184-b1d58069ecdd']
};

let extraCode = '\\n';
for (const [key, arr] of Object.entries(missing)) {
  const vName = key.toUpperCase() + '_IMAGES';
  extraCode += `export const ${vName}: Record<string, ThemeImage[]> = {\\n  'default': [\\n`;
  arr.forEach((img, i) => {
    extraCode += `    { unsplashId: '${img}', url: u('${img}'), alt: '${key} image ${i}', category: '${key === 'cloudKitchen' ? 'cloud-kitchen' : key === 'foodDelivery' ? 'food-delivery' : key}', theme: 'default', section: 'gallery', tags: ['${key}'] },\\n`;
  });
  extraCode += `  ]\\n};\\n\\n`;
}

// Remove old ALL_IMAGES completely
const regex = /export const ALL_IMAGES: Record<FoodCategory, Record<string, ThemeImage\[\]>> = \{[\s\S]*?\};/g;

const newAllImages = `export const ALL_IMAGES: Record<FoodCategory, Record<string, ThemeImage[]>> = {
  'cafe': CAFE_IMAGES,
  'bakery': BAKERY_IMAGES,
  'fast-food': FAST_FOOD_IMAGES,
  'cloud-kitchen': CLOUDKITCHEN_IMAGES,
  'pizza': PIZZA_IMAGES,
  'indian': INDIAN_IMAGES,
  'dessert': DESSERT_IMAGES,
  'food-delivery': FOODDELIVERY_IMAGES,
  'bbq': BBQ_IMAGES,
  'fine-dining': CAFE_IMAGES, // Fallback
};`;

registry = registry.replace(regex, extraCode + newAllImages);

fs.writeFileSync(registryFile, registry, 'utf8');
console.log("Fixed imageRegistry.ts");
