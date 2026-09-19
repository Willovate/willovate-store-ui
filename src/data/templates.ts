import type { TemplateConfig } from '../types/template'
import {
  Electronics01, Electronics02, Electronics03, Electronics04, Electronics05,
  Electronics06, Electronics07, Electronics08, Electronics09, Electronics10
} from '../templates/Electronics'
import {
  Haven, Forma, LumaLiving, OakAndCo, Nest,
  Linea, Casa as CasaHF, Solace, Terra, ModHaus,
  HomeFurniture11, HomeFurniture12, HomeFurniture13, HomeFurniture14, HomeFurniture15,
  HomeFurniture16, HomeFurniture17, HomeFurniture18, HomeFurniture19, HomeFurniture20
} from '../templates/HomeFurniture'
import {
  GeneralStore01, GeneralStore02, GeneralStore03, GeneralStore04, GeneralStore05,
  GeneralStore06, GeneralStore07, GeneralStore08, GeneralStore09
} from '../templates/GeneralStore'

export const templates: TemplateConfig[] = [
  {
    id: 'template-01',
    name: 'Willovate Original',
    description: 'The classic Willovate one storefront. Minimalist, premium, and designed for thoughtful curation.',
    categories: [{ id: 'general', name: 'General Store' }],
    tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'premium', name: 'Premium' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: true,
    theme: {
      fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
      colors: { primary: '#1d211c', background: '#f6f4ee', accent: '#566348' }
    },
    sections: []
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'Editorial fashion meets modern commerce. Large typography and generous whitespace.',
    categories: [{ id: 'fashion', name: 'Fashion' }],
    tags: [{ id: 'editorial', name: 'Editorial' }, { id: 'luxury', name: 'Luxury' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: true,
    theme: {
      fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      colors: { primary: '#000000', background: '#ffffff', accent: '#cccccc' }
    },
    sections: [
      { id: 's1', type: 'navbar', props: { brand: 'ATELIER', style: 'minimal' } },
      { id: 's2', type: 'split-hero', props: { title: 'Autumn Collection', subtitle: 'Curated pieces for the modern wardrobe.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', ctaLabel: 'View Lookbook' } },
      { id: 's3', type: 'catalog', props: { 
        products: [
          { id: 'a1', name: 'Tailored Wool Coat', description: 'Editorial Collection', price: 450, imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=600' },
          { id: 'a2', name: 'Structured Leather Bag', description: 'Italian Leather', price: 280, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
          { id: 'a3', name: 'Silk Evening Dress', description: 'Evening Wear', price: 620, imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600' },
          { id: 'a4', name: 'Minimalist Loafers', description: 'Footwear', price: 190, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's4', type: 'editorial-grid', props: { title: 'The Campaign', images: ['https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600'] } },
      { id: 's5', type: 'story', props: {} },
      { id: 's6', type: 'newsletter', props: {} },
      { id: 's7', type: 'footer', props: {} }
    ]
  },
  {
    id: 'aura',
    name: 'Aura',
    description: 'A soft premium aesthetic designed specifically for beauty and skincare brands.',
    categories: [{ id: 'beauty', name: 'Beauty' }],
    tags: [{ id: 'soft', name: 'Soft' }, { id: 'product-focused', name: 'Product-focused' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: false,
    theme: {
      fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
      colors: { primary: '#4a3f35', background: '#fcfaf8', accent: '#d4bda5' }
    },
    sections: [
      { id: 's1', type: 'promo', props: { text: 'Free shipping on orders over $50' } },
      { id: 's2', type: 'navbar', props: { brand: 'AURA', style: 'center' } },
      { id: 's3', type: 'full-hero', props: { title: 'Radiance Realized', subtitle: 'Our most advanced botanical formulation yet.', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop Skincare' } },
      { id: 's4', type: 'catalog', props: {
        products: [
          { id: 'b1', name: 'Hydrating Face Serum', description: 'Hyaluronic Acid', price: 65, imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
          { id: 'b2', name: 'Botanical Cleanser', description: 'Gentle Wash', price: 45, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600' },
          { id: 'b3', name: 'Daily Moisturizer', description: 'SPF 30', price: 55, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600' },
          { id: 'b4', name: 'Rose Facial Oil', description: 'Night Routine', price: 85, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's5', type: 'testimonials', props: { title: 'Real Results', testimonials: [{ quote: 'Transformed my morning routine completely.', author: 'Sarah J.' }, { quote: 'The gentle formulation is perfect for sensitive skin.', author: 'Emily R.' }] } },
      { id: 's6', type: 'newsletter', props: {} },
      { id: 's7', type: 'footer', props: {} }
    ]
  },
  {
    id: 'casa',
    name: 'Casa',
    description: 'Warm minimalist layout tailored for home goods and lifestyle photography.',
    categories: [{ id: 'home', name: 'Home & Furniture' }],
    tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'minimal', name: 'Minimal' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: true,
    theme: {
      fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      colors: { primary: '#2a2626', background: '#faf9f7', accent: '#8c7b6c' }
    },
    sections: [
      { id: 's1', type: 'navbar', props: { brand: 'CASA', style: 'minimal' } },
      { id: 's2', type: 'full-hero', props: { title: 'Living beautifully', subtitle: 'Furniture designed to last generations.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Explore Collections' } },
      { id: 's3', type: 'category-grid', props: { title: 'Shop by Room', categories: [{ name: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' }, { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }, { name: 'Dining', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }] } },
      { id: 's4', type: 'catalog', props: {
        products: [
          { id: 'c1', name: 'Sculptural Lounge Chair', description: 'Solid Wood & Wool', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
          { id: 'c2', name: 'Oak Side Table', description: 'Minimalist Form', price: 450, imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
          { id: 'c3', name: 'Ceramic Table Lamp', description: 'Handcrafted', price: 210, imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' },
          { id: 'c4', name: 'Linen Throw', description: 'Organic Cotton', price: 120, imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's5', type: 'newsletter', props: {} },
      { id: 's6', type: 'footer', props: {} }
    ]
  },
  {
    id: 'mono',
    name: 'Mono',
    description: 'Clean product-grid-first layout with a modern monochrome feel. Ideal for electronics.',
    categories: [{ id: 'general', name: 'General Store' }],
    tags: [{ id: 'modern', name: 'Modern' }, { id: 'bold', name: 'Bold' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: false,
    theme: {
      fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      colors: { primary: '#111111', background: '#f4f4f5', accent: '#0055ff' }
    },
    sections: [
      { id: 's1', type: 'navbar', props: { brand: 'MONO', style: 'utility' } },
      { id: 's2', type: 'hero', props: { title: 'Pro Audio Devices', subtitle: 'Experience sound without compromises.', ctaLabel: 'Pre-order' } },
      { id: 's3', type: 'full-hero', props: { title: '', subtitle: '', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Discover Tech' } },
      { id: 's4', type: 'catalog', props: {
        products: [
          { id: 'm1', name: 'Wireless Headphones', description: 'Noise Cancelling', price: 299, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
          { id: 'm2', name: 'Mechanical Keyboard', description: 'Tactile Switches', price: 149, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
          { id: 'm3', name: 'Smart Speaker', description: 'Voice Assistant', price: 199, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
          { id: 'm4', name: 'Portable Charger', description: '20,000mAh Power', price: 79, imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's5', type: 'newsletter', props: {} },
      { id: 's6', type: 'footer', props: {} }
    ]
  },
  {
    id: 'noir',
    name: 'Noir',
    description: 'Dark, sophisticated visual style for high-end luxury products.',
    categories: [{ id: 'jewelry', name: 'Jewelry' }],
    tags: [{ id: 'dark', name: 'Dark' }, { id: 'luxury', name: 'Luxury' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: true,
    theme: {
      fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
      colors: { primary: '#ffffff', background: '#0a0a0a', accent: '#d4af37' }
    },
    sections: [
      { id: 's1', type: 'navbar', props: { brand: 'NOIR', style: 'center' } },
      { id: 's2', type: 'full-hero', props: { title: 'The Eternity Collection', subtitle: 'Exquisite craftsmanship meets timeless design.', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'View High Jewelry' } },
      { id: 's3', type: 'catalog', props: {
        products: [
          { id: 'n1', name: 'Obsidian Watch', description: 'Automatic Movement', price: 4500, imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600' },
          { id: 'n2', name: 'Emerald Pendant', description: '18k White Gold', price: 2800, imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600' },
          { id: 'n3', name: 'Signature Cuff', description: 'Diamond Pavé', price: 1950, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600' },
          { id: 'n4', name: 'Leather Travel Case', description: 'Watch Storage', price: 420, imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's4', type: 'editorial-grid', props: { title: 'Craftsmanship', images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600'] } },
      { id: 's5', type: 'footer', props: {} }
    ]
  },
  {
    id: 'solis',
    name: 'Solis',
    description: 'Bright and welcoming layout designed for vibrant lifestyle brands.',
    categories: [{ id: 'general', name: 'General Store' }],
    tags: [{ id: 'lifestyle', name: 'Lifestyle' }, { id: 'bold', name: 'Bold' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: false,
    theme: {
      fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      colors: { primary: '#1a1a1a', background: '#ffffff', accent: '#f59e0b' }
    },
    sections: [
      { id: 's1', type: 'promo', props: { text: 'Summer Sale starts now!' } },
      { id: 's2', type: 'navbar', props: { brand: 'Solis', style: 'minimal' } },
      { id: 's3', type: 'split-hero', props: { title: 'Everyday Essentials', subtitle: 'Brighten your daily routine with our new arrivals.', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Shop Now' } },
      { id: 's4', type: 'category-grid', props: { title: 'Categories', categories: [{ name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' }, { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600' }, { name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }, { name: 'Gifts', image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=600' }] } },
      { id: 's5', type: 'catalog', props: {
        products: [
          { id: 's_p1', name: 'Cotton T-Shirt', description: 'Everyday Wear', price: 35, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
          { id: 's_p2', name: 'Canvas Tote', description: 'Accessories', price: 45, imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' },
          { id: 's_p3', name: 'Ceramic Mug', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
          { id: 's_p4', name: 'Woven Blanket', description: 'Home', price: 89, imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's6', type: 'newsletter', props: {} },
      { id: 's7', type: 'footer', props: {} }
    ]
  },
  {
    id: 'market',
    name: 'Market',
    description: 'High product density for large catalogs with strong category navigation.',
    categories: [{ id: 'food', name: 'Food & Grocery' }],
    tags: [{ id: 'product-focused', name: 'Product-focused' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: false,
    theme: {
      fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      colors: { primary: '#111827', background: '#ffffff', accent: '#10b981' }
    },
    sections: [
      { id: 's1', type: 'promo', props: { text: 'Next-day delivery available' } },
      { id: 's2', type: 'navbar', props: { brand: 'Market', style: 'utility' } },
      { id: 's3', type: 'category-grid', props: { title: '', categories: [{ name: 'Fresh Produce', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' }, { name: 'Pantry', image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600' }, { name: 'Beverages', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600' }, { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' }] } },
      { id: 's4', type: 'catalog', props: {
        products: [
          { id: 'mk1', name: 'Fresh Produce', description: 'Organic Greens', price: 12, imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=600' },
          { id: 'mk2', name: 'Artisan Bread', description: 'Sourdough Loaf', price: 8, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' },
          { id: 'mk3', name: 'Pantry Essentials', description: 'Olive Oil', price: 24, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600' },
          { id: 'mk4', name: 'Sparkling Beverage', description: 'Citrus Flavor', price: 6, imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's5', type: 'newsletter', props: {} },
      { id: 's6', type: 'footer', props: {} }
    ]
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Perfect for artisan brands and creative makers with an emphasis on storytelling.',
    categories: [{ id: 'services', name: 'Services' }],
    tags: [{ id: 'elegant', name: 'Elegant' }, { id: 'lifestyle', name: 'Lifestyle' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    previewImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600'
    ],
    isFeatured: false,
    theme: {
      fonts: { heading: 'Georgia, serif', body: 'Georgia, serif' },
      colors: { primary: '#3f3f46', background: '#f4f4f5', accent: '#71717a' }
    },
    sections: [
      { id: 's1', type: 'navbar', props: { brand: 'Studio', style: 'minimal' } },
      { id: 's2', type: 'hero', props: { title: 'Handcrafted with Intention', subtitle: 'Explore our latest collection of artisan goods.', ctaLabel: 'View the Process' } },
      { id: 's3', type: 'editorial-grid', props: { title: 'Behind the Scenes', images: ['https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600'] } },
      { id: 's4', type: 'catalog', props: {
        products: [
          { id: 'st1', name: 'Hand-thrown Bowl', description: 'Ceramics', price: 45, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
          { id: 'st2', name: 'Linen Apron', description: 'Workwear', price: 65, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
          { id: 'st3', name: 'Wooden Spoon', description: 'Carved Utility', price: 28, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' },
          { id: 'st4', name: 'Scented Candle', description: 'Beeswax', price: 35, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' }
        ]
      }},
      { id: 's5', type: 'testimonials', props: { title: '', testimonials: [{ quote: 'The attention to detail is unmatched.', author: 'Creative Digest' }] } },
      { id: 's6', type: 'footer', props: {} }
    ]
  },
  Electronics01,
  Electronics02,
  Electronics03,
  Electronics04,
  Electronics05,
  Electronics06,
  Electronics07,
  Electronics08,
  Electronics09,
  Electronics10,
  Haven,
  Forma,
  LumaLiving,
  OakAndCo,
  Nest,
  Linea,
  CasaHF,
  Solace,
  Terra,
  ModHaus,
  HomeFurniture11,
  HomeFurniture12,
  HomeFurniture13,
  HomeFurniture14,
  HomeFurniture15,
  HomeFurniture16,
  HomeFurniture17,
  HomeFurniture18,
  HomeFurniture19,
  HomeFurniture20,
  GeneralStore01,
  GeneralStore02,
  GeneralStore03,
  GeneralStore04,
  GeneralStore05,
  GeneralStore06,
  GeneralStore07,
  GeneralStore08,
  GeneralStore09
]

