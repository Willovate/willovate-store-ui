import type { TemplateConfig } from '../../types/template'

export const FoodGrocery10: TemplateConfig = {
  id: 'food-grocery-10',
  name: 'Savor',
  description: 'Premium gourmet food marketplace.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'luxury', name: 'Luxury' }, { id: 'gourmet', name: 'Gourmet' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Cormorant Garamond", serif', body: '"Montserrat", sans-serif' },
    colors: { primary: '#C8A96B', background: '#11100E', accent: '#F6F1E8' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'Collections', href: '#' },
    { label: 'The Gift Edit', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Journal', href: '#' }
  ],
  features: [
    { id: 'curated', label: 'Curated Selection', description: 'Expertly sourced' },
    { id: 'shipping', label: 'Premium Shipping', description: 'Temperature controlled' }
  ],
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'SAVOR', style: 'minimal' } },
    { id: 's2', type: 'promo-banner', props: { message: 'COMPLIMENTARY OVERNIGHT SHIPPING ON ORDERS OVER $200' } },
    { id: 's3', type: 'split-hero', props: { title: 'THE ART OF GOOD TASTE', subtitle: 'Curated ingredients, exceptional products, and culinary craftsmanship for the discerning palate.', ctaLabel: 'EXPLORE THE COLLECTION', secondaryCtaLabel: 'DISCOVER OUR STORY', image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=1600' } },
    { id: 's4', type: 'bento-grid', props: { 
      title: 'Curated Collections',
      items: [
        { title: 'THE PANTRY', image: 'https://images.unsplash.com/photo-1596660682121-65123d2da881?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'THE CELLAR', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'SWEET INDULGENCES', image: 'https://images.unsplash.com/photo-1614088924209-543597d21a2d?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'MORNING RITUALS', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Signature Products',
      products: [
        { id: 'fg10-1', name: 'Single-Origin 72% Dark Chocolate', description: 'Madagascar Estate', price: 24.00, imageUrl: 'https://images.unsplash.com/photo-1511381939415-e440c94625f1?auto=format&fit=crop&q=80&w=600', category: 'Sweets', stockQuantity: 20, visualTheme: 'default', isFeatured: true, slug: 'single-origin-chocolate', compareAtPrice: null },
        { id: 'fg10-2', name: 'Estate Extra Virgin Olive Oil', description: 'Cold-Pressed, Tuscany', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 15, visualTheme: 'default', isFeatured: false, slug: 'estate-olive-oil', compareAtPrice: null },
        { id: 'fg10-3', name: 'Reserve Aged Balsamic', description: '25 Years, Modena', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1507048123014-a9509b5523a7?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 5, visualTheme: 'default', isFeatured: false, slug: 'reserve-aged-balsamic', compareAtPrice: null },
        { id: 'fg10-4', name: 'Hand-Cut Bronze Die Pasta', description: 'Artisan Crafted', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'bronze-die-pasta', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'editorial-grid', props: { title: 'FROM ORIGIN TO TABLE', subtitle: 'Good food has a story.', images: ['https://images.unsplash.com/photo-1596660682121-65123d2da881?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1614088924209-543597d21a2d?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's7', type: 'category-grid', props: { 
      title: 'Gourmet Categories',
      categories: [
        { id: 'c1', name: 'Truffles & Mushrooms', imageUrl: 'https://images.unsplash.com/photo-1596627641243-7f1c8413bb01?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Artisan Cheeses', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Caviar & Roe', imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'product-spotlight', props: { name: 'Reserve Aged Balsamic', description: 'Aged for 25 years in Modena, Italy, this reserve balsamic vinegar offers unparalleled depth, sweetness, and complexity. A true culinary treasure.', price: 120.00, image: 'https://images.unsplash.com/photo-1507048123014-a9509b5523a7?auto=format&fit=crop&q=80&w=800', category: 'The Cellar', badge: 'Collector' } },
    { id: 's9', type: 'bento-grid', props: { 
      title: 'THE GIFT EDIT',
      items: [
        { title: 'The Host', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Connoisseur', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'The Sweet Tooth', image: 'https://images.unsplash.com/photo-1614088924209-543597d21a2d?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'The Morning Ritual', image: 'https://images.unsplash.com/photo-1511381939415-e440c94625f1?auto=format&fit=crop&q=80&w=800', span: 1 }
      ]
    }},
    { id: 's10', type: 'editorial-grid', props: { title: 'OUR PHILOSOPHY', subtitle: 'Fewer, better ingredients. Thoughtful sourcing. Food worth slowing down for.', images: ['https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800'] } },
    { id: 's11', type: 'testimonials', props: { 
      title: 'Customer Notes',
      testimonials: [
        { quote: 'Exceptional quality and beautiful gifting. A memorable experience.', author: 'Eleanor V.' },
        { quote: 'The single-origin chocolate is unparalleled. It redefined dessert for me.', author: 'James T.' },
        { quote: 'The perfect curation of artisan products. My go-to for client gifts.', author: 'Sarah M.' }
      ]
    }},
    { id: 's12', type: 'newsletter', props: { title: 'THE SAVOUR JOURNAL', subtitle: 'Recipes, seasonal discoveries and stories from the world of good food.', buttonText: 'JOIN THE JOURNAL' } },
    { id: 's13', type: 'footer', props: {} }
  ]
}
