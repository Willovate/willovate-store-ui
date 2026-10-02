import type { TemplateConfig } from '../../types/template'

export const FoodGrocery07: TemplateConfig = {
  id: 'food-grocery-07',
  name: 'MarketDay',
  description: 'Your neighborhood market, brought online.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'community', name: 'Community' }, { id: 'local', name: 'Local' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Merriweather", serif', body: '"Open Sans", sans-serif' },
    colors: { primary: '#3A3028', background: '#F8F1E5', accent: '#C76B4A' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'What\'s Fresh', href: '#' },
    { label: 'Market Stalls', href: '#' },
    { label: 'Seasonal Picks', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Market Letter', href: '#' }
  ],
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'MarketDay', style: 'default' } },
    { id: 's2', type: 'promo-banner', props: { message: 'SPRING HARVEST IS HERE • SHOP SEASONAL FAVORITES TODAY' } },
    { id: 's3', type: 'split-hero', props: { 
      title: 'GOOD FOOD. GOOD NEIGHBORS.', 
      subtitle: 'Your neighborhood market, now at your door. Shop fresh produce, warm bakery loaves, and everyday local favorites directly from your community.', 
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'SHOP THE MARKET',
      secondaryCtaLabel: 'SEE WHAT\'S FRESH'
    }},
    { id: 's4', type: 'category-grid', props: { 
      title: 'Shop by Market Stall',
      categories: [
        { id: 'c1', name: 'Fresh Produce', imageUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Bakery Counter', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Local Dairy', imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Neighborhood Pantry', imageUrl: 'https://images.unsplash.com/photo-1584473457406-6240486414e9?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Fresh Produce',
      products: [
        { id: 'md-1', name: 'Market Day Tomatoes', description: 'Vine-ripened, Sweet', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'market-tomatoes', compareAtPrice: null },
        { id: 'md-2', name: 'Local Spring Mix', description: 'Fresh Cut Greens', price: 5.00, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'spring-mix', compareAtPrice: null },
        { id: 'md-3', name: 'Golden Apple Basket', description: 'Crisp & Sweet', price: 6.50, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'golden-apples', compareAtPrice: null },
        { id: 'md-4', name: 'Bunched Carrots', description: 'With Tops', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'bunched-carrots', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'From the Bakery Counter',
      products: [
        { id: 'md-5', name: 'Country Sourdough', description: 'Fresh Baked Daily', price: 7.00, imageUrl: 'https://images.unsplash.com/photo-1585478259715-876a6a81fa08?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 20, visualTheme: 'default', isFeatured: true, slug: 'country-sourdough', compareAtPrice: null },
        { id: 'md-6', name: 'Rustic Baguette', description: 'Crisp Crust', price: 4.50, imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'rustic-baguette', compareAtPrice: null },
        { id: 'md-7', name: 'Morning Croissants', description: '2 Pack, Buttery', price: 6.00, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 15, visualTheme: 'default', isFeatured: false, slug: 'morning-croissants', compareAtPrice: null },
        { id: 'md-8', name: 'Blueberry Muffins', description: '4 Pack', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 25, visualTheme: 'default', isFeatured: false, slug: 'blueberry-muffins', compareAtPrice: null }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Local Pantry Favorites',
      products: [
        { id: 'md-9', name: 'House Blend Coffee', description: 'Whole Bean, 12oz', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'house-coffee', compareAtPrice: null },
        { id: 'md-10', name: 'Strawberry Preserve', description: 'Small Batch', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1584473457409-f64f433fbd48?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'strawberry-preserve', compareAtPrice: null },
        { id: 'md-11', name: 'Wildflower Honey', description: 'Local Apiary', price: 11.50, imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e8941552e?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 20, visualTheme: 'default', isFeatured: false, slug: 'wildflower-honey', compareAtPrice: null },
        { id: 'md-12', name: 'Bronze Die Penne', description: 'Artisan Pasta', price: 5.50, imageUrl: 'https://images.unsplash.com/photo-1621996316220-3b47bd2ed0db?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'bronze-die-penne', compareAtPrice: null }
      ]
    }},
    { id: 's8', type: 'editorial-grid', props: { 
      title: 'WHAT\'S GOOD THIS WEEK', 
      subtitle: 'The best of the season is here. We are featuring sweet strawberries, crisp greens, and freshly baked focaccia from our favorite local makers.',
      images: ['https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800'] 
    }},
    { id: 's9', type: 'bento-grid', props: {
      title: 'Market Baskets',
      items: [
        { title: 'Weekend Market Basket', image: 'https://images.unsplash.com/photo-1584844626154-15c0e0b3eec6?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'Breakfast for Two', image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'The Baker\'s Picks', image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'Family Pantry Box', image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's10', type: 'split-hero', props: { 
      title: 'MORE THAN A GROCERY STORE.', 
      subtitle: 'We believe shopping for everyday groceries should feel familiar, welcoming, and community-driven. It\'s about good food, simple cooking, and bringing people together around the table.', 
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'READ OUR STORY'
    }},
    { id: 's11', type: 'testimonials', props: { 
      title: 'Neighbor Notes', 
      testimonials: [
        { quote: 'It feels exactly like walking into a friendly local market. The sourdough is my absolute favorite.', author: 'Emily R.' },
        { quote: 'Easy weekly shopping with products that actually taste fresh and seasonal. Highly recommended.', author: 'Marcus J.' },
        { quote: 'I love discovering new local favorites here. It brings so much joy to my everyday routine.', author: 'Sarah K.' }
      ] 
    }},
    { id: 's12', type: 'newsletter', props: { 
      title: 'THE WEEKLY MARKET LETTER', 
      subtitle: 'Fresh arrivals, seasonal picks, recipes, and what\'s worth bringing home this week.', 
      buttonText: 'JOIN THE MARKET' 
    }},
    { id: 's13', type: 'footer', props: {} }
  ]
}
