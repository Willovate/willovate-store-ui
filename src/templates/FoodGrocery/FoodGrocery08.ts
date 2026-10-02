import type { TemplateConfig } from '../../types/template'

export const FoodGrocery08: TemplateConfig = {
  id: 'food-grocery-08',
  name: 'Bite',
  description: 'A bold Gen-Z snack and food-drop ecommerce brand.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'bold', name: 'Bold' }, { id: 'hype', name: 'Hype' }, { id: 'snacks', name: 'Snacks' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'New Drops', href: '#' },
    { label: 'Bundles', href: '#' },
    { label: 'About', href: '#' }
  ],
  theme: {
    fonts: { heading: '"Syne", "Anton", sans-serif', body: '"Manrope", sans-serif' },
    colors: { primary: '#ccff00', background: '#000000', accent: '#ff00ff' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: '🚨 NEW DROP LIVE: GHOST PEPPER X LIME 🚨 FREE SHIPPING OVER $50' } },
    { id: 's2', type: 'navbar', props: { brand: 'BITE', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: { title: 'SNACK LOUD.', subtitle: 'The most hyped snacks and beverages on the internet. Get them before they\'re gone.', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800', ctaLabel: 'SHOP THE DROP' } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'fg08-1', name: 'Chili Lime Chips', description: 'Extra Crunch', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1599598425947-33002629ee98?auto=format&fit=crop&q=80&w=600', category: 'Snacks', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'chili-lime-chips', compareAtPrice: null },
        { id: 'fg08-2', name: 'Dark Chocolate Bites', description: 'Sea Salt', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600', category: 'Sweets', stockQuantity: 120, visualTheme: 'default', isFeatured: false, slug: 'dark-chocolate-bites', compareAtPrice: null },
        { id: 'fg08-3', name: 'Mango Chili Gummies', description: 'Sweet & Spicy', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=600', category: 'Candy', stockQuantity: 80, visualTheme: 'default', isFeatured: true, slug: 'mango-chili-gummies', compareAtPrice: null },
        { id: 'fg08-4', name: 'Sparkling Yuzu Drink', description: 'Zero Sugar', price: 3.99, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', category: 'Beverage', stockQuantity: 200, visualTheme: 'default', isFeatured: false, slug: 'sparkling-yuzu', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'editorial-grid', props: { title: 'WHAT\'S BLOWING UP', images: ['https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's6', type: 'product-spotlight', props: { name: 'Chili Mango Crunch', description: 'The latest limited edition drop. Sweet, spicy, and perfectly crunchy.', price: 7.99, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=600', category: 'Latest Drop', badge: 'LIMITED EDITION' } },
    { id: 's7', type: 'bento-grid', props: { title: 'SNACK PACKS & BUNDLES', items: [{ title: 'Movie Night Pack', description: 'Everything you need for the big screen.', image: 'https://images.unsplash.com/photo-1585653018241-7e806bc2a8b3?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'Spicy Pack', description: 'Can you handle the heat?', image: 'https://images.unsplash.com/photo-1599598425947-33002629ee98?auto=format&fit=crop&q=80&w=600', size: 'medium' }, { title: 'Sweet Tooth Pack', description: 'Sugar rush guaranteed.', image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600', size: 'medium' }, { title: 'Energy Pack', description: 'Fuel your late night gaming.', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', size: 'medium' }] } },
    { id: 's8', type: 'catalog', props: {
      products: [
        { id: 'fg08-5', name: 'Ghost Pepper Chips', description: 'Extreme Heat', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1599598425947-33002629ee98?auto=format&fit=crop&q=80&w=600', category: 'Spicy', stockQuantity: 40, visualTheme: 'default', isFeatured: true, slug: 'ghost-pepper-chips', compareAtPrice: null },
        { id: 'fg08-6', name: 'Sour Cola Gummies', description: 'Extra Tart', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=600', category: 'Sour', stockQuantity: 150, visualTheme: 'default', isFeatured: false, slug: 'sour-cola-gummies', compareAtPrice: null },
        { id: 'fg08-7', name: 'Jalapeño Crunch', description: 'Spicy Pretzels', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600', category: 'Spicy', stockQuantity: 90, visualTheme: 'default', isFeatured: true, slug: 'jalapeno-crunch', compareAtPrice: null },
        { id: 'fg08-8', name: 'Wasabi Peas', description: 'Nose-Clearing Heat', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=600', category: 'Spicy', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'wasabi-peas', compareAtPrice: null }
      ]
    }},
    { id: 's9', type: 'feature-comparison', props: { title: 'WHY BITE?', products: [{ name: 'BITE', isHighlighted: true }, { name: 'BORING SNACKS' }], rows: [{ label: 'Flavor Profile', values: ['LOUD & BOLD', 'Bland'] }, { label: 'Ingredients', values: ['Crazy Combos', 'Standard'] }, { label: 'Vibe', values: ['Hype', 'Sleepy'] }] } },
    { id: 's10', type: 'story', props: { title: 'BORING SNACKS ARE OUT.', content: 'We got tired of the same old flavors. So we started BITE to bring the heat, the sour, and the sweet with maximum attitude. Our drops sell out fast, so keep your eyes peeled.' } },
    { id: 's11', type: 'newsletter', props: { title: 'GET THE NEXT DROP FIRST.', description: 'Sign up for SMS alerts. We don\'t spam, we just drop fire.' } },
    { id: 's12', type: 'footer', props: {} }
  ]
}
