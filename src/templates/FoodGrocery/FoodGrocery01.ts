import type { TemplateConfig } from '../../types/template'

export const FoodGrocery01: TemplateConfig = {
  id: 'food-grocery-01',
  name: 'FreshCart',
  description: 'A premium, modern grocery marketplace designed for freshness and speed.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'modern', name: 'Modern' }, { id: 'supermarket', name: 'Supermarket' }, { id: 'premium', name: 'Premium' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: '"Plus Jakarta Sans", sans-serif', body: '"Inter", sans-serif' },
    colors: { primary: '#0d3a24', background: '#f8faf9', accent: '#16a34a' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free delivery on all orders over ₹999. Use code FRESH100' } },
    { id: 's2', type: 'navbar', props: { brand: 'FreshCart', style: 'utility' } },
    { id: 's3', type: 'full-hero', props: { title: 'Fresh Groceries, Delivered Daily', subtitle: 'Handpicked produce, daily essentials, and gourmet treats brought straight to your doorstep.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600', ctaLabel: 'Shop All Aisles' } },
    { id: 's4', type: 'category-grid', props: { title: 'Shop by Category', categories: [{ name: 'Fresh Produce', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' }, { name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600' }, { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' }, { name: 'Meat & Seafood', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'fc-1', name: 'Alphonso Mangoes', description: 'Box of 6, Ratnagiri', price: 899.00, imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'alphonso-mangoes', compareAtPrice: 1099.00 },
        { id: 'fc-2', name: 'Farm Fresh Milk', description: '1 Liter, Organic', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1550583724599-97cb51f0858e?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'farm-fresh-milk', compareAtPrice: null },
        { id: 'fc-3', name: 'Artisan Sourdough', description: 'Freshly Baked', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bfc19?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'artisan-sourdough', compareAtPrice: null },
        { id: 'fc-4', name: 'Premium Cashews', description: 'Whole, 500g', price: 650.00, imageUrl: 'https://images.unsplash.com/photo-1599598425947-33002629ee98?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 200, visualTheme: 'default', isFeatured: false, slug: 'premium-cashews', compareAtPrice: 750.00 }
      ]
    }},
    { id: 's6', type: 'bento-grid', props: { title: 'Weekly Deals', items: [{ title: 'Weekend Savings', description: 'Up to 30% off on fresh organic greens.', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600', size: 'large' }, { title: 'BOGO Snacks', description: 'Buy one get one free on all imported chips.', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600', size: 'medium' }] } },
    { id: 's7', type: 'editorial-grid', props: { title: 'Seasonal Fresh Picks', images: ['https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's8', type: 'category-grid', props: { title: 'Shop by Lifestyle', categories: [{ name: 'Organic', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' }, { name: 'Vegan', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' }, { name: 'Gluten Free', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' }] } },
    { id: 's9', type: 'split-hero', props: { title: 'Fresh Groceries, Right to Your Door', subtitle: 'Join FreshCart Plus for unlimited free deliveries and exclusive member discounts on daily essentials.', image: 'https://images.unsplash.com/photo-1588169930714-866e13f4841b?auto=format&fit=crop&q=80&w=800', ctaLabel: 'Learn More' } },
    { id: 's10', type: 'catalog', props: {
      products: [
        { id: 'fc-5', name: 'Cold Pressed Orange Juice', description: '100% Pure, 500ml', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', category: 'Beverages', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'orange-juice', compareAtPrice: null },
        { id: 'fc-6', name: 'Himalayan Pink Salt', description: 'Fine Grain, 250g', price: 95.00, imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 150, visualTheme: 'default', isFeatured: false, slug: 'pink-salt', compareAtPrice: null },
        { id: 'fc-7', name: 'Avocados', description: 'Pack of 2, Hass', price: 299.00, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 40, visualTheme: 'default', isFeatured: true, slug: 'hass-avocados', compareAtPrice: 350.00 },
        { id: 'fc-8', name: 'Greek Yogurt', description: 'Plain, 400g', price: 140.00, imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'greek-yogurt', compareAtPrice: null }
      ]
    }},
    { id: 's11', type: 'story', props: {} },
    { id: 's12', type: 'testimonials', props: { title: 'Loved by Locals', testimonials: [{ quote: 'FreshCart has completely changed how I shop for my family. The produce is always incredibly fresh.', author: 'Priya S.', role: 'Loyal Customer' }, { quote: 'Lightning fast delivery and the quality of the meat and seafood is consistently excellent.', author: 'Rahul M.', role: 'Home Chef' }] } },
    { id: 's13', type: 'feature-comparison', props: { title: 'The FreshCart Promise', products: [{ name: 'FreshCart', isHighlighted: true }, { name: 'Supermarkets' }], rows: [{ label: 'Freshness Guarantee', values: ['100%', 'Varies'] }, { label: 'Sourcing', values: ['Direct from Farms', 'Multiple Middlemen'] }, { label: 'Delivery Speed', values: ['Same Day', 'Next Day'] }] } },
    { id: 's14', type: 'newsletter', props: {} },
    { id: 's15', type: 'footer', props: {} }
  ]
}
