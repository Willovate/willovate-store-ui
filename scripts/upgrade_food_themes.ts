import fs from 'fs';
import path from 'path';

const SRC = path.join(process.cwd(), 'src/templates/food-restaurants');

// Each category will get a set of unique layouts.
const LAYOUTS = [
  ['RestaurantNavbar', 'RestaurantHero', 'RestaurantMenu', 'RestaurantStory', 'RestaurantGallery', 'Testimonials', 'LocationCTA', 'RestaurantFooter'],
  ['RestaurantNavbar', 'RestaurantHero', 'FeaturesStrip', 'RestaurantMenu', 'RestaurantGallery', 'PromoSection', 'Testimonials', 'RestaurantFooter'],
  ['RestaurantNavbar', 'AnnouncementBar', 'RestaurantHero', 'PromoSection', 'RestaurantMenu', 'RestaurantStory', 'LocationCTA', 'RestaurantFooter'],
  ['RestaurantNavbar', 'RestaurantHero', 'RestaurantStory', 'RestaurantMenu', 'PromoSection', 'RestaurantGallery', 'Testimonials', 'LocationCTA', 'RestaurantFooter'],
  ['RestaurantNavbar', 'AnnouncementBar', 'RestaurantHero', 'FeaturesStrip', 'RestaurantMenu', 'Testimonials', 'PromoSection', 'LocationCTA', 'RestaurantFooter'],
];

function randomLayout() {
  return LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
}

const registryStr = fs.readFileSync(path.join(SRC, 'imageRegistry.ts'), 'utf-8');
const allImagesRegex = /unsplashId:\s*'([^']+)'/g;
let match;
const validImages = [];
while ((match = allImagesRegex.exec(registryStr)) !== null) {
  validImages.push(match[1]);
}

function getRandomValidImage() {
  return validImages[Math.floor(Math.random() * validImages.length)];
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  let index = 0;
  for (const file of files) {
    if (file.endsWith('.tsx') && file !== 'RestaurantTemplate.tsx') {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      // We need to parse out the theme object.
      // Usually it's `const theme: RestaurantThemeConfig = { ... };`
      const themeMatch = content.match(/const theme:\s*RestaurantThemeConfig\s*=\s*({[\s\S]*?});\n\nexport default function/);
      
      if (!themeMatch) {
         // Some themes like generated ones don't use RestaurantCore. Let's rewrite them to use RestaurantCore.
         const nameMatch = content.match(/export default function ([A-Za-z0-9_]+)/);
         if (nameMatch) {
            const name = nameMatch[1];
            const layout = LAYOUTS[index % LAYOUTS.length];
            const newContent = `import React from 'react';
import { 
  RestaurantThemeConfig,
  AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip,
  RestaurantMenu, RestaurantStory, PromoSection, RestaurantGallery, 
  Testimonials, LocationCTA, RestaurantFooter
} from '../components/RestaurantCore';

const img = (id: string) => \`https://images.unsplash.com/\${id}?auto=format&fit=crop&w=1600&q=85\`;

const theme: RestaurantThemeConfig = {
  id: '${name.toLowerCase()}', name: '${name}', tagline: 'An unforgettable culinary experience.',
  category: '${path.basename(dir)}',
  palette: { primary: '#eab308', secondary: '#000000', background: '#0a0a0a', surface: '#171717', text: '#ffffff', textLight: '#a3a3a3', heroOverlay: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3))' },
  typography: { heading: '"Oswald", sans-serif', body: '"Inter", sans-serif' },
  images: {
    hero: img('${getRandomValidImage()}'), heroAlt: 'Hero Image',
    story: img('${getRandomValidImage()}'), storyAlt: 'Story Image',
    promo: img('${getRandomValidImage()}'), promoAlt: 'Promo Image',
    gallery: [
      { src: img('${getRandomValidImage()}'), alt: 'Gallery Image 1' },
      { src: img('${getRandomValidImage()}'), alt: 'Gallery Image 2' },
      { src: img('${getRandomValidImage()}'), alt: 'Gallery Image 3' },
      { src: img('${getRandomValidImage()}'), alt: 'Gallery Image 4' }
    ],
  },
  content: {
    heroHeadline: 'Taste the Passion.',
    heroSub: 'Crafted with care, served with excellence. Experience the finest dining in the city.',
    storyTitle: 'Our Culinary Journey.',
    storyBody: [
      'Every dish tells a story. We source the freshest ingredients to bring you flavors that linger long after the meal.',
      'Our master chefs dedicate their lives to perfecting the art of cooking, ensuring an unforgettable experience.'
    ],
    promoTitle: 'Exclusive Dining Experience.',
    promoCTA: 'Book Your Table',
    ctaPrimary: 'Reservations', ctaSecondary: 'View Menu',
    address: '123 Culinary Avenue, Food District',
    hours: 'Mon-Sun: 11AM - 11PM',
    phone: '(555) 123-4567',
  },
  menu: [
    { tab: 'Signature', items: [
      { name: 'Chef\\'s Special', price: '$45', desc: 'A meticulously crafted dish showcasing the season\\'s best.', tags: ['Signature'], image: img('${getRandomValidImage()}') },
      { name: 'Truffle Delicacy', price: '$35', desc: 'Rich, earthy flavors infused with fresh truffles.', image: img('${getRandomValidImage()}') },
    ]},
  ],
  testimonials: [
    { name: 'Alex M.', quote: 'An absolute masterpiece. The flavors are simply divine.', rating: 5 },
    { name: 'Jamie L.', quote: 'The perfect ambiance and an even better meal.', rating: 5 },
  ],
  features: ['Locally Sourced', 'Award Winning Chef', 'Premium Quality'],
};

export default function ${name}() {
  return (
    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>
      ${layout.map(comp => `<${comp} theme={theme} ${comp === 'AnnouncementBar' ? 'text="Now Open Daily" palette={theme.palette}' : ''}/>`).join('\\n      ')}
    </div>
  );
}
`;
            fs.writeFileSync(filePath, newContent, 'utf-8');
         }
      } else {
         let themeStr = themeMatch[1];
         
         // Replace invalid images
         themeStr = themeStr.replace(/unsplashId:\s*'([^']+)'|img\('([^']+)'\)/g, (match, p1, p2) => {
            const imgId = p1 || p2;
            if (validImages.includes(imgId)) return match;
            return `img('${getRandomValidImage()}')`;
         });

         const nameMatch = content.match(/export default function ([A-Za-z0-9_]+)/);
         const name = nameMatch ? nameMatch[1] : 'Template';
         
         const layout = LAYOUTS[index % LAYOUTS.length];
         
         // Build the new file content
         const topPart = content.split(/const theme:/)[0];
         let newTop = topPart.replace(/RestaurantPage(, )?/, '');
         if (!newTop.includes('RestaurantNavbar')) {
             newTop = newTop.replace(/} from '\.\.\/components\/RestaurantCore';/, ', AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantMenu, RestaurantStory, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter } from \'../components/RestaurantCore\';');
         }

         const newContent = newTop + "const theme: RestaurantThemeConfig = " + themeStr + ";\n\n" +
"export default function " + name + "() {\n" +
"  return (\n" +
"    <div style={{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}>\n" +
"      " + layout.map(comp => {
         if (comp === 'AnnouncementBar') return "<AnnouncementBar text={`🍽️ ${theme.tagline} · Now Open Daily`} palette={theme.palette} />";
         return `<${comp} theme={theme} />`;
      }).join('\n      ') + "\n" +
"    </div>\n" +
"  );\n" +
"}\n";
         fs.writeFileSync(filePath, newContent, 'utf-8');
      }
      index++;
    }
  }
}

const categories = fs.readdirSync(SRC).filter(f => fs.statSync(path.join(SRC, f)).isDirectory() && f !== 'components' && f !== 'shared');
for (const cat of categories) {
  processDir(path.join(SRC, cat));
}
console.log('Processed all themes.');
