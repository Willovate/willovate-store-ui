import type { TemplateConfig } from '../../types/template'

export const FoodGrocery09: TemplateConfig = {
  id: 'food-grocery-09',
  name: 'Farmstead',
  description: 'Rustic farm-to-table and farm heritage goods.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'heritage', name: 'Heritage' }, { id: 'farm', name: 'Farm' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Zilla Slab", serif', body: '"Lora", serif' },
    colors: { primary: '#284D32', background: '#F3E9D5', accent: '#7A3028' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'Fresh Harvest', href: '#' },
    { label: 'Farmhouse Goods', href: '#' },
    { label: 'Seasonal Boxes', href: '#' },
    { label: 'Our Farm', href: '#' },
    { label: 'Farm Notes', href: '#' }
  ],
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'FARMSTEAD', style: 'default' } },
    { id: 's2', type: 'promo-banner', props: { message: 'THE AUTUMN HARVEST IS HERE • DELIVERING TO LOCAL COMMUNITIES' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'FROM OUR FIELDS TO YOUR TABLE.', 
      subtitle: 'Good food starts at the farm. Discover seasonal harvests, traditional farmhouse goods, and simple, honest ingredients grown with care.', 
      image: 'https://images.unsplash.com/photo-1592424041796-7bb09153be03?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'SHOP THE FARM',
      secondaryCtaLabel: 'OUR STORY'
    }},
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop the Harvest',
      categories: [
        { id: 'c1', name: 'Fresh Harvest', imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Dairy & Eggs', imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Farmhouse Pantry', imageUrl: 'https://images.unsplash.com/photo-1601002360251-24855d0a688b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Farm Goods', imageUrl: 'https://images.unsplash.com/photo-1595843468007-df08e9a12cc9?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Fresh from the Farm',
      products: [
        { id: 'fs-1', name: 'Field Tomato Basket', description: 'Sun-ripened', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'field-tomatoes', compareAtPrice: null },
        { id: 'fs-2', name: 'Root Carrots', description: 'Earthy & Sweet', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'root-carrots', compareAtPrice: null },
        { id: 'fs-3', name: 'Farmhouse Potatoes', description: 'Unwashed, Direct', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'farmhouse-potatoes', compareAtPrice: null },
        { id: 'fs-4', name: 'Wild Leafy Greens', description: 'Morning Cut', price: 5.00, imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'leafy-greens', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'Dairy & Farmhouse Goods',
      products: [
        { id: 'fs-5', name: 'Golden Harvest Eggs', description: 'Pasture Raised, Dozen', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1506976773555-b3e1bb18bfa6?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 20, visualTheme: 'default', isFeatured: true, slug: 'harvest-eggs', compareAtPrice: null },
        { id: 'fs-6', name: 'Farmhouse Whole Milk', description: 'Glass Bottle, 1L', price: 6.00, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'whole-milk', compareAtPrice: null },
        { id: 'fs-7', name: 'Cultured Butter', description: 'Hand-churned, Salted', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 15, visualTheme: 'default', isFeatured: false, slug: 'cultured-butter', compareAtPrice: null },
        { id: 'fs-8', name: 'Aged Farm Cheddar', description: 'Sharp, 8oz', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 25, visualTheme: 'default', isFeatured: false, slug: 'aged-cheddar', compareAtPrice: null }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Pantry & Preserves',
      products: [
        { id: 'fs-9', name: 'Apple Orchard Preserve', description: 'Seasonal Batch', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1506802913710-1ce82987a0fc?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'apple-preserve', compareAtPrice: null },
        { id: 'fs-10', name: 'Stone-Milled Farm Flour', description: 'Whole Wheat, 5lb', price: 11.00, imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'stone-flour', compareAtPrice: null },
        { id: 'fs-11', name: 'Cellar Pickles', description: 'Garlic & Dill', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1560706240-3b47bd2ed0db?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 20, visualTheme: 'default', isFeatured: false, slug: 'cellar-pickles', compareAtPrice: null },
        { id: 'fs-12', name: 'Wildflower Honey', description: 'Raw & Unfiltered', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1587049352858-8d4e8941552e?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'wildflower-honey', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'split-hero', props: { 
      title: 'IT STARTS WITH THE LAND.', 
      subtitle: 'We follow the rhythms of the seasons. Our approach to food is rooted in traditional farming, celebrating the relationship between the soil, the harvest, and the meals shared around your table.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'READ OUR STORY'
    }},
    { id: 's9', type: 'product-spotlight', props: {
      title: 'AUTUMN PUMPKIN HARVEST',
      description: 'The fields are full of color. Discover our seasonal collection of heirloom pumpkins and winter squash, perfect for roasting, baking, and decorating your front porch.',
      image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=1600',
      productName: 'Heirloom Pumpkin Box',
      price: 28.00,
      ctaLabel: 'SHOP THE HARVEST'
    }},
    { id: 's10', type: 'bento-grid', props: {
      title: 'Farmstead Bundles',
      items: [
        { title: 'The Weekend Harvest', image: 'https://images.unsplash.com/photo-1511210878235-ee8da2eb6098?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'The Farmhouse Breakfast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Pantry Box', image: 'https://images.unsplash.com/photo-1584285422409-e1eef45c55d0?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Sunday Table', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's11', type: 'editorial-grid', props: {
      title: 'KEEP IT SIMPLE. GROW IT WELL.',
      subtitle: 'We believe that good food follows the seasons. Thoughtful sourcing, simple ingredients, and farm-to-table values are at the heart of everything we do.',
      images: [
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1595856453612-4c220f8623bd?auto=format&fit=crop&q=80&w=800'
      ]
    }},
    { id: 's12', type: 'testimonials', props: { 
      title: 'Customer Notes', 
      testimonials: [
        { quote: 'The fresh seasonal produce always exceeds expectations. It feels like picking it straight from the field.', author: 'Clara M.' },
        { quote: 'Their farmhouse butter and fresh eggs are staples in our kitchen. Truly connected to the farm.', author: 'David T.' },
        { quote: 'The seasonal boxes make eating well so easy. It\'s honest food with incredible flavor.', author: 'Sophie L.' }
      ] 
    }},
    { id: 's13', type: 'newsletter', props: { 
      title: 'FROM THE FARM THIS WEEK', 
      subtitle: 'Seasonal harvests, new farm goods and what\'s fresh from the fields.', 
      buttonText: 'GET FARM NOTES' 
    }},
    { id: 's14', type: 'footer', props: {} }
  ]
}
