import type { TemplateConfig } from '../../types/template'

export const FoodGrocery02: TemplateConfig = {
  id: 'food-grocery-02',
  name: 'Harvest',
  description: 'Farm-to-table editorial and seasonal abundance.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Lora", serif', body: '"Nunito", sans-serif' },
    colors: { primary: '#5E7153', background: '#FAF7F2', accent: '#B5533A' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'Seasonal Produce', href: '#' },
    { label: 'Harvest Bundles', href: '#' },
    { label: 'Pantry', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Journal', href: '#' }
  ],
  sections: [
    { id: 's1', type: 'promo-banner', props: { message: 'EARLY SUMMER HARVEST IS HERE • ORGANIC AND SUN-RIPENED' } },
    { id: 's2', type: 'navbar', props: { brand: 'Harvest', style: 'default' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Sunlit & Seasonal.', 
      subtitle: 'Experience the abundance of the season. Farm-to-table organic produce, hand-picked at peak ripeness and brought straight to your kitchen.', 
      image: 'https://images.unsplash.com/photo-1476140417676-e8d1a16631b3?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'EXPLORE THE HARVEST' 
    }},
    { id: 's4', type: 'category-grid', props: { 
      title: 'Seasonal Collections',
      categories: [
        { id: 'c1', name: 'Seasonal Vegetables', imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Fresh Fruits', imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Herbs & Greens', imageUrl: 'https://images.unsplash.com/photo-1601275868399-45bebcbf0f19?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Pantry & Preserves', imageUrl: 'https://images.unsplash.com/photo-1605333555931-15ebba8e3fb2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Featured Harvest',
      products: [
        { id: 'h-1', name: 'Heirloom Tomatoes', description: 'Sun-ripened, Mixed Varieties', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1596485764023-e1fccb982631?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'heirloom-tomatoes', compareAtPrice: null },
        { id: 'h-2', name: 'Organic Baby Spinach', description: 'Tender Spring Leaves', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1528659109033-02f8ddfb68c7?auto=format&fit=crop&q=80&w=600', category: 'Greens', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'baby-spinach', compareAtPrice: null },
        { id: 'h-3', name: 'Fresh Cut Basil', description: 'Aromatic & Bright', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1596701832049-74d33eb4f686?auto=format&fit=crop&q=80&w=600', category: 'Herbs', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'fresh-basil', compareAtPrice: null },
        { id: 'h-4', name: 'Purple Asparagus', description: 'Early Season Harvest', price: 7.00, imageUrl: 'https://images.unsplash.com/photo-1515589654371-d4198c6913ee?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'purple-asparagus', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'split-hero', props: { 
      title: 'FIELD TO TABLE.', 
      subtitle: 'Our philosophy is simple: good food comes from good soil. We work with nature to bring you the freshest, most vibrant organic produce, grown with respect for the land and harvested at the perfect moment.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'READ THE JOURNAL'
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Fresh From the Field',
      products: [
        { id: 'h-5', name: 'Summer Zucchini', description: 'Crisp & Tender', price: 3.00, imageUrl: 'https://images.unsplash.com/photo-1594957588147-3dc6ec87b5a8?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'summer-zucchini', compareAtPrice: null },
        { id: 'h-6', name: 'Rainbow Chard', description: 'Vibrant Leaves', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1620601369395-88572186dd49?auto=format&fit=crop&q=80&w=600', category: 'Greens', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'rainbow-chard', compareAtPrice: null },
        { id: 'h-7', name: 'Fennel Bulbs', description: 'Sweet & Anise-scented', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1598448888060-63ce71d1e4c7?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'fennel-bulbs', compareAtPrice: null },
        { id: 'h-8', name: 'Artichoke Hearts', description: 'Freshly Foraged', price: 6.00, imageUrl: 'https://images.unsplash.com/photo-1512616858908-1110fc0e6f66?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 20, visualTheme: 'default', isFeatured: false, slug: 'artichoke-hearts', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'bento-grid', props: {
      title: 'Harvest Boxes',
      items: [
        { title: 'The Seasonal Harvest Box', image: 'https://images.unsplash.com/photo-1542601600647-3a722a90a0a5?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'Summer Berry Collection', image: 'https://images.unsplash.com/photo-1555462529-67ceb4d538e1?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'Kitchen Starter Box', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'Pantry & Produce Bundle', image: 'https://images.unsplash.com/photo-1588665726207-6c84c4e2f89c?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Preserves & Pantry',
      products: [
        { id: 'h-9', name: 'Wild Strawberry Preserve', description: 'Small Batch', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1497914445892-7104b2b9a712?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 40, visualTheme: 'default', isFeatured: true, slug: 'strawberry-preserve', compareAtPrice: null },
        { id: 'h-10', name: 'Rustic Sourdough Boule', description: 'Naturally Leavened', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bfc7e?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'rustic-sourdough', compareAtPrice: null },
        { id: 'h-11', name: 'Organic Farm Eggs', description: 'Free-range, Dozen', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980bfc?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 20, visualTheme: 'default', isFeatured: false, slug: 'farm-eggs', compareAtPrice: null },
        { id: 'h-12', name: 'Raw Clover Honey', description: 'Unfiltered, 12oz', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1558231572-c2e36bf2659e?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'clover-honey', compareAtPrice: null }
      ]
    }},
    { id: 's10', type: 'product-spotlight', props: {
      title: 'SUMMER ESSENTIALS',
      description: 'Brighten your meals with our hand-picked summer citrus collection. Bursting with sunshine and flavor, these fruits are the perfect addition to seasonal salads and refreshing drinks.',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=1600',
      productName: 'Orchard Citrus Box',
      price: 24.00,
      ctaLabel: 'SHOP CITRUS'
    }},
    { id: 's11', type: 'editorial-grid', props: {
      title: 'FROM OUR FIELDS.',
      subtitle: 'We nurture our soil so it can nurture you. Walk through our fields and discover the journey from seed to harvest.',
      images: [
        'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1592424001869-70068a183d24?auto=format&fit=crop&q=80&w=800'
      ]
    }},
    { id: 's12', type: 'testimonials', props: { 
      title: 'Customer Notes', 
      testimonials: [
        { quote: 'The most beautiful, vibrant produce I have ever cooked with. It tastes like sunshine.', author: 'Elena R.' },
        { quote: 'Their harvest boxes make eating organically so effortless. Truly farm-to-table quality.', author: 'James W.' },
        { quote: 'Every delivery feels like a trip to the local farmers market. Highly recommended.', author: 'Sophie T.' }
      ] 
    }},
    { id: 's13', type: 'newsletter', props: { 
      title: 'HARVEST NOTES', 
      subtitle: 'Join our journal for updates on what is in season, farm stories, and seasonal recipes.', 
      buttonText: 'SUBSCRIBE' 
    }},
    { id: 's14', type: 'footer', props: {} }
  ]
}
