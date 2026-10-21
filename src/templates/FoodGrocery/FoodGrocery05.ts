import type { TemplateConfig } from '../../types/template'

export const FoodGrocery05: TemplateConfig = {
  id: 'food-grocery-05',
  name: 'Grain & Co.',
  description: 'Premium grains, spices and specialty pantry products.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'heritage', name: 'Heritage' }, { id: 'artisan', name: 'Artisan' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Playfair Display", serif', body: '"Source Sans Pro", sans-serif' },
    colors: { primary: '#292722', background: '#F4EFE5', accent: '#B28A45' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'The Grain House', href: '#' },
    { label: 'Spice Cabinet', href: '#' },
    { label: 'Baker\'s Shelf', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Journal', href: '#' }
  ],
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'GRAIN & CO.', style: 'minimal' } },
    { id: 's2', type: 'promo-banner', props: { message: 'A TRADITION OF TASTE. COMPLIMENTARY SHIPPING ON ORDERS OVER $75.' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'GRAINS. SPICES. STORIES.', 
      subtitle: 'Carefully selected ingredients, traditional craftsmanship, and pantry staples with provenance. Discover the art of the specialty pantry.', 
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'EXPLORE THE PANTRY',
      secondaryCtaLabel: 'OUR STORY'
    }},
    { id: 's4', type: 'category-grid', props: { 
      title: 'The Pantry Collections',
      categories: [
        { id: 'c1', name: 'The Grain House', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'The Spice Cabinet', imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'The Baker\'s Shelf', imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'The Oil Cellar', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'The Grain House',
      products: [
        { id: 'gc-1', name: 'Stone-Ground Heritage Wheat', description: 'Small Batch, Unbleached', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'heritage-wheat', compareAtPrice: null },
        { id: 'gc-2', name: 'Golden Valley Basmati', description: 'Aged 2 Years', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 40, visualTheme: 'default', isFeatured: true, slug: 'golden-valley-basmati', compareAtPrice: null },
        { id: 'gc-3', name: 'Heirloom Red Quinoa', description: 'Andean Origin', price: 16.50, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'heirloom-red-quinoa', compareAtPrice: null },
        { id: 'gc-4', name: 'Steel-Cut Reserve Oats', description: 'Toasted, Thick Cut', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600', category: 'Grains', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'reserve-oats', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { 
      title: 'EVERY INGREDIENT HAS AN ORIGIN.', 
      subtitle: 'From centuries-old salt pans to small family spice gardens, we travel to the source. We believe that understanding where our food comes from, the traditional methods used to cultivate it, and the character of the soil is the only way to curate a truly exceptional pantry.',
      images: ['https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800'] 
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'The Spice Cabinet',
      products: [
        { id: 'gc-5', name: 'Smoked Pimentón', description: 'Wood-fired, Sweet', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'smoked-pimenton', compareAtPrice: null },
        { id: 'gc-6', name: 'Tellicherry Black Pepper', description: 'Late Harvest Whole Peppercorns', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'tellicherry-pepper', compareAtPrice: null },
        { id: 'gc-7', name: 'Single-Origin Ceylon Cinnamon', description: 'Quills, Hand-Rolled', price: 16.00, imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'ceylon-cinnamon', compareAtPrice: null },
        { id: 'gc-8', name: 'Wild Harvested Cumin', description: 'Whole Seed, Highly Aromatic', price: 11.00, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', category: 'Spices', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'wild-cumin', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'product-spotlight', props: { 
      name: 'Single-Origin Saffron', 
      description: 'Hand-harvested threads with profound floral notes and vibrant color. Sourced directly from traditional farms, this saffron elevates risottos, paellas, and delicate pastries.', 
      price: 32.00, 
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800', 
      category: 'Artisan Spotlight', 
      badge: 'Limited Harvest' 
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'The Baker\'s Shelf',
      products: [
        { id: 'gc-9', name: 'Artisan Bread Flour', description: 'High Protein, Stone Milled', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', category: 'Baking', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'bread-flour', compareAtPrice: null },
        { id: 'gc-10', name: 'Dutch Processed Cocoa', description: 'Rich Dark Chocolate Powder', price: 22.00, imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', category: 'Baking', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'dutch-cocoa', compareAtPrice: null },
        { id: 'gc-11', name: 'Madagascar Vanilla Bean', description: 'Grade A, Plump & Fragrant', price: 28.00, imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600', category: 'Baking', stockQuantity: 25, visualTheme: 'default', isFeatured: false, slug: 'vanilla-bean', compareAtPrice: null },
        { id: 'gc-12', name: 'Wildflower Reserve Honey', description: 'Raw & Unfiltered', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600', category: 'Preserves', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'wildflower-honey', compareAtPrice: null }
      ]
    }},
    { id: 's10', type: 'split-hero', props: { 
      title: 'GOOD INGREDIENTS NEED VERY LITTLE.', 
      subtitle: 'Our philosophy is rooted in simplicity. We believe that when you start with exceptional ingredients—cultivated with time-honored knowledge—the preparation should simply let their natural character speak.', 
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'READ OUR MANIFESTO'
    }},
    { id: 's11', type: 'bento-grid', props: {
      title: 'Curated Pantry Collections',
      items: [
        { title: 'The Grain Collection', image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'The Baker\'s Box', image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Weekend Pantry', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Spice Collection', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's12', type: 'testimonials', props: { 
      title: 'Customer Notes', 
      testimonials: [
        { quote: 'The depth of flavor in the single-origin spices completely transformed my everyday cooking.', author: 'Thomas H.' },
        { quote: 'Beautiful presentation and unparalleled quality. Grain & Co. is my trusted source for authentic ingredients.', author: 'Margaret C.' },
        { quote: 'I finally found heritage wheat flour that tastes the way bread was meant to taste.', author: 'David L.' }
      ] 
    }},
    { id: 's13', type: 'newsletter', props: { 
      title: 'THE GRAIN & CO. JOURNAL', 
      subtitle: 'Seasonal recipes, ingredient origin stories and notes directly from the pantry.', 
      buttonText: 'JOIN THE JOURNAL' 
    }},
    { id: 's14', type: 'footer', props: {} }
  ]
}
