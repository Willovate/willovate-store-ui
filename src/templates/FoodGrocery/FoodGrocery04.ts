import type { TemplateConfig } from '../../types/template'

export const FoodGrocery04: TemplateConfig = {
  id: 'food-grocery-04',
  name: 'DailyFresh',
  description: 'Your everyday grocery run, made simple.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'convenience', name: 'Convenience' }, { id: 'everyday', name: 'Everyday' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Outfit", sans-serif', body: '"Inter", sans-serif' },
    colors: { primary: '#12304A', background: '#FFFFFF', accent: '#4BA3D3' }
  },
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'Fresh Today', href: '#' },
    { label: 'Weekly Deals', href: '#' },
    { label: 'Breakfast', href: '#' },
    { label: 'Snacks', href: '#' },
    { label: 'Drinks', href: '#' }
  ],
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'DailyFresh', style: 'default' } },
    { id: 's2', type: 'promo-banner', props: { message: 'FREE SAME-DAY DELIVERY ON ORDERS OVER ₹999' } },
    { id: 's3', type: 'hero', props: { 
      title: 'EVERYDAY GROCERIES. MADE EASY.', 
      subtitle: 'Your weekly restock of fresh essentials, breakfast picks, and household basics delivered fast.', 
      image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'SHOP NOW' 
    }},
    { id: 's4', type: 'category-grid', props: { 
      title: 'Quick Shop',
      categories: [
        { id: 'c1', name: 'Fresh Produce', imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' },
        { id: 'c2', name: 'Dairy & Eggs', imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600' },
        { id: 'c3', name: 'Breakfast', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600' },
        { id: 'c4', name: 'Household', imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Weekly Deals',
      products: [
        { id: 'df-1', name: 'Whole Wheat Bread', description: 'Freshly Baked', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', category: 'Bakery', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'whole-wheat-bread', compareAtPrice: 55.00 },
        { id: 'df-2', name: 'Premium Butter', description: 'Salted, 500g', price: 249.00, imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 30, visualTheme: 'default', isFeatured: true, slug: 'premium-butter', compareAtPrice: 299.00 },
        { id: 'df-3', name: 'Orange Juice', description: '100% Real Juice, 1L', price: 110.00, imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600', category: 'Drinks', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'orange-juice', compareAtPrice: 130.00 },
        { id: 'df-4', name: 'Classic Oats', description: '1kg Pack', price: 199.00, imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 60, visualTheme: 'default', isFeatured: false, slug: 'classic-oats', compareAtPrice: 240.00 }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'Fresh Today',
      products: [
        { id: 'df-5', name: 'Farm Fresh Milk', description: 'Full Cream, 1L', price: 68.00, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600', category: 'Dairy', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'fresh-milk', compareAtPrice: null },
        { id: 'df-6', name: 'Ripe Bananas', description: '1 Dozen', price: 80.00, imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'ripe-bananas', compareAtPrice: null },
        { id: 'df-7', name: 'Tomatoes', description: '1 kg', price: 40.00, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'tomatoes', compareAtPrice: null },
        { id: 'df-8', name: 'Fresh Spinach', description: '1 Bunch', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600', category: 'Produce', stockQuantity: 30, visualTheme: 'default', isFeatured: false, slug: 'fresh-spinach', compareAtPrice: null }
      ]
    }},
    { id: 's7', type: 'bento-grid', props: {
      title: 'YOUR EVERYDAY PICKS',
      items: [
        { title: 'The Pantry Basics', image: 'https://images.unsplash.com/photo-1596181657683-1ceea98c25db?auto=format&fit=crop&q=80&w=800', span: 2 },
        { title: 'Household Cleaning', image: 'https://images.unsplash.com/photo-1584820927498-cafe3c157921?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'Quick Meals', image: 'https://images.unsplash.com/photo-1551224976-b33365fa316d?auto=format&fit=crop&q=80&w=800', span: 1 },
        { title: 'Paper Essentials', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=800', span: 2 }
      ]
    }},
    { id: 's8', type: 'split-hero', props: {
      title: 'START THE DAY RIGHT',
      subtitle: 'Everything you need for a quick, wholesome breakfast. From cereal and oats to fresh coffee and toast.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800',
      ctaLabel: 'SHOP BREAKFAST'
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Snacks & Drinks',
      products: [
        { id: 'df-9', name: 'Potato Chips', description: 'Classic Salted, 150g', price: 50.00, imageUrl: 'https://images.unsplash.com/photo-1566478989037-e98748d5bbf8?auto=format&fit=crop&q=80&w=600', category: 'Snacks', stockQuantity: 100, visualTheme: 'default', isFeatured: false, slug: 'potato-chips', compareAtPrice: null },
        { id: 'df-10', name: 'Mixed Nuts', description: 'Roasted & Salted, 200g', price: 299.00, imageUrl: 'https://images.unsplash.com/photo-1599598425947-3300262b7194?auto=format&fit=crop&q=80&w=600', category: 'Snacks', stockQuantity: 50, visualTheme: 'default', isFeatured: false, slug: 'mixed-nuts', compareAtPrice: null },
        { id: 'df-11', name: 'Sparkling Water', description: '6-Pack Cans', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1621262963391-729048a97753?auto=format&fit=crop&q=80&w=600', category: 'Drinks', stockQuantity: 40, visualTheme: 'default', isFeatured: false, slug: 'sparkling-water', compareAtPrice: null },
        { id: 'df-12', name: 'Iced Tea', description: 'Peach Flavor, 500ml', price: 60.00, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', category: 'Drinks', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'iced-tea', compareAtPrice: null }
      ]
    }},
    { id: 's10', type: 'product-spotlight', props: {
      name: 'Family Weekday Bundle',
      description: 'The ultimate convenience pack. Includes milk, bread, eggs, cereal, pasta, and essential fresh veggies to get you through the busy weekdays without stress.',
      price: 1499.00,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
      category: 'Value Bundle',
      badge: 'Save 15%'
    }},
    { id: 's11', type: 'testimonials', props: {
      title: 'Customer Favorites',
      testimonials: [
        { quote: 'DailyFresh has made my weekly shopping so much easier. I always know exactly what to restock.', author: 'Mark R.' },
        { quote: 'The weekly deals actually make sense for everyday groceries. Love the convenience!', author: 'Priya S.' },
        { quote: 'Fast, fresh, and totally reliable. The morning bundles are a lifesaver for my family.', author: 'Jennifer L.' }
      ]
    }},
    { id: 's12', type: 'newsletter', props: {
      title: 'GET THIS WEEK\'S PICKS',
      subtitle: 'Weekly deals, fresh arrivals and easy meal inspiration delivered to your inbox.',
      buttonText: 'GET THE PICKS'
    }},
    { id: 's13', type: 'footer', props: {} }
  ]
}
