import type { TemplateConfig } from '../../types/template'

export const FoodGrocery03: TemplateConfig = {
  id: 'pantry-03',
  name: 'Pantry',
  description: 'Minimal, utilitarian everyday staples.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'minimal', name: 'Minimal' }, { id: 'bulk', name: 'Bulk' }, { id: 'staples', name: 'Staples' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  navigation: [
    { label: 'Staples', href: '#' },
    { label: 'Bulk', href: '#' },
    { label: 'Spices', href: '#' },
    { label: 'Bundles', href: '#' }
  ],
  theme: {
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Roboto", sans-serif' },
    colors: { primary: '#000000', background: '#f3f4f6', accent: '#2563eb' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'PANTRY', style: 'utility' } },
    { id: 's2', type: 'hero', props: { title: 'STOCK YOUR PANTRY.', subtitle: 'Everyday essentials. Organized shopping. Pantry staples and bulk options.', ctaLabel: 'Shop Staples', image: 'https://images.unsplash.com/photo-1584473457406-624047641d0f?auto=format&fit=crop&q=80&w=1600' } },
    { id: 's3', type: 'category-grid', props: { title: 'PANTRY CATEGORIES', categories: [
      { name: 'Rice & Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
      { name: 'Lentils & Beans', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600' },
      { name: 'Flours', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' },
      { name: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
      { name: 'Oils', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600' },
      { name: 'Baking', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' }
    ] } },
    { id: 's4', type: 'catalog', props: {
      products: [
        { id: 'pantry-1', name: 'Premium Basmati Rice', description: 'Long grain, 5kg', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 200, visualTheme: 'default', isFeatured: true, slug: 'basmati-rice', compareAtPrice: null },
        { id: 'pantry-2', name: 'Red Lentils', description: 'Split, 2kg', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', category: 'Lentils', stockQuantity: 150, visualTheme: 'default', isFeatured: false, slug: 'red-lentils', compareAtPrice: null },
        { id: 'pantry-3', name: 'Organic Chickpeas', description: 'Dried, 1kg', price: 4.20, imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', category: 'Beans', stockQuantity: 300, visualTheme: 'default', isFeatured: false, slug: 'chickpeas', compareAtPrice: null },
        { id: 'pantry-4', name: 'Whole Wheat Flour', description: 'Stoneground, 5kg', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', category: 'Flours', stockQuantity: 80, visualTheme: 'default', isFeatured: true, slug: 'whole-wheat-flour', compareAtPrice: null },
        { id: 'pantry-5', name: 'Rolled Oats', description: 'Gluten-free, 1.5kg', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 120, visualTheme: 'default', isFeatured: false, slug: 'rolled-oats', compareAtPrice: null },
        { id: 'pantry-6', name: 'White Quinoa', description: 'Pre-washed, 1kg', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 90, visualTheme: 'default', isFeatured: false, slug: 'white-quinoa', compareAtPrice: null },
        { id: 'pantry-7', name: 'Brown Rice', description: 'Short grain, 2kg', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 210, visualTheme: 'default', isFeatured: false, slug: 'brown-rice', compareAtPrice: null },
        { id: 'pantry-8', name: 'Kidney Beans', description: 'Dried, 1kg', price: 4.80, imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', category: 'Beans', stockQuantity: 140, visualTheme: 'default', isFeatured: false, slug: 'kidney-beans', compareAtPrice: null }
      ]
    }},
    { id: 's5', type: 'bento-grid', props: { title: 'BULK & BUNDLES', items: [
      { title: 'Monthly Pantry Box', description: 'The absolute essentials, delivered monthly.', image: 'https://images.unsplash.com/photo-1584473457406-624047641d0f?auto=format&fit=crop&q=80&w=600', size: 'large' },
      { title: 'Baking Starter Kit', description: 'Flour, sugar, baking soda, and yeast.', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', size: 'medium' },
      { title: 'Spice Essentials', description: '12 core spices for everyday cooking.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', size: 'medium' }
    ] } },
    { id: 's6', type: 'specification-grid', props: { title: 'PANTRY ESSENTIALS', specs: [
      { label: 'Pack Sizes', value: '1kg, 2kg, 5kg, 10kg, 20kg' },
      { label: 'Storage', value: 'Store in a cool, dry place.' },
      { label: 'Delivery', value: '2-4 business days nationwide.' },
      { label: 'Shelf Life', value: '12-24 months for most dry goods.' },
      { label: 'Bulk Options', value: 'Available upon request.' },
      { label: 'Packaging', value: 'Recyclable paper and minimal plastic.' }
    ] } },
    { id: 's7', type: 'catalog', props: {
      products: [
        { id: 'pantry-9', name: 'Ground Cumin', description: 'Organic, 200g', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'ground-cumin', compareAtPrice: null },
        { id: 'pantry-10', name: 'Turmeric Powder', description: 'High curcumin, 250g', price: 5.20, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'turmeric', compareAtPrice: null },
        { id: 'pantry-11', name: 'Extra Virgin Olive Oil', description: 'Cold pressed, 1L', price: 18.50, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600', category: 'Oils', stockQuantity: 60, visualTheme: 'default', isFeatured: true, slug: 'olive-oil', compareAtPrice: null },
        { id: 'pantry-12', name: 'Himalayan Pink Salt', description: 'Fine grain, 500g', price: 3.80, imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 150, visualTheme: 'default', isFeatured: false, slug: 'pink-salt', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'feature-comparison', props: { title: 'BUY SMARTER', products: [{ name: 'Standard Pack' }, { name: 'Family Pack', isHighlighted: true }, { name: 'Bulk Pack' }], rows: [
      { label: 'Quantity', values: ['1kg', '5kg', '20kg'] },
      { label: 'Price per kg', values: ['$4.50', '$3.80', '$2.90'] },
      { label: 'Best For', values: ['Occasional Use', 'Daily Cooking', 'Long Term Storage'] },
      { label: 'Packaging', values: ['Paper Bag', 'Resealable Pouch', 'Sturdy Sack'] }
    ] } },
    { id: 's9', type: 'promo', props: { text: 'PANTRY, WITHOUT THE LAST-MINUTE RUN. Make everyday essentials easier to keep stocked.' } },
    { id: 's10', type: 'newsletter', props: { title: 'PANTRY NOTES', description: 'New staples, useful bundles and seasonal pantry picks.' } },
    { id: 's11', type: 'footer', props: {} }
  ]
}
