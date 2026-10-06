import type { TemplateConfig } from '../../types/template'

export const GeneralStore02: TemplateConfig = {
  id: 'everyday',
  name: 'Everyday',
  description: 'Everything you need, beautifully organized. An approachable, modern general store.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'friendly', name: 'Friendly' }, { id: 'essentials', name: 'Essentials' }, { id: 'lifestyle', name: 'Lifestyle' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: {
      heading: '"Outfit", sans-serif',
      body: '"DM Sans", sans-serif'
    },
    colors: {
      primary: '#1c1917', // Stone 900 (Dark Charcoal)
      background: '#fafaf9', // Stone 50 (Warm off-white)
      accent: '#0d9488' // Teal 600 (Fresh but restrained accent)
    }
  },
  sections: [
    { id: 's1', type: 'promo', props: {
      text: 'Free standard shipping on all orders over $50. Easy 30-day returns.'
    } },

    { id: 's2', type: 'navbar', props: {
      brand: 'EVERYDAY',
      style: 'solid'
    } },

    { id: 's3', type: 'split-hero', props: {
      title: 'Everything you need, beautifully organized.',
      subtitle: 'Discover our curated collection of household essentials, personal care, and daily-use items designed to simplify your routine and elevate your space.',
      ctaLabel: 'Shop the Collection',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600'
    } },

    { id: 's4', type: 'bento-grid', props: {
      title: 'Built for real life.',
      items: [
        {
          title: 'Home Organization',
          description: 'Clever solutions for every room.',
          image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800',
          span: 2
        },
        {
          title: 'Personal Care',
          description: 'Clean, simple self-care routines.',
          image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
          span: 1
        },
        {
          title: 'Workspace',
          description: 'Tools for better focus.',
          image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
          span: 1
        },
        {
          title: 'Daily Essentials',
          description: 'The reliable basics you reach for every day.',
          image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800',
          span: 2
        }
      ]
    } },

    { id: 's5', type: 'category-grid', props: {
      title: 'Shop by Category',
      categories: [
        { id: 'c1', name: 'Household', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600', itemCount: 124 },
        { id: 'c2', name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', itemCount: 86 },
        { id: 'c3', name: 'Bath & Body', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600', itemCount: 53 },
        { id: 'c4', name: 'Travel', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', itemCount: 42 }
      ]
    } },

    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
      name: 'The Thermal Essential Bottle',
      category: 'Drinkware',
      description: 'Our award-winning insulated bottle keeps your drinks cold for 24 hours or hot for 12. Features a durable powder-coated finish and a leak-proof seal for your daily commute.',
      price: 35,
      originalPrice: 45,
      features: ['Double-wall vacuum insulation', 'BPA-free stainless steel', 'Dishwasher safe design'],
      badge: 'Bestseller',
      ctaLabel: 'Add to Cart'
    } },

    { id: 's7', type: 'catalog', props: {
      title: 'Everyday Essentials',
      subtitle: 'Highly-rated staples for a well-stocked home.',
      products: [
        { id: 'e1', name: 'Ceramic Storage Jar', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600' },
        { id: 'e2', name: 'Minimalist Notebook', description: 'Workspace', price: 18, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'e3', name: 'Bamboo Cleaning Brush', description: 'Household', price: 12, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' },
        { id: 'e4', name: 'Natural Hand Soap', description: 'Bath & Body', price: 16, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' }
      ]
    } },

    { id: 's8', type: 'promo', props: {
      text: 'Build your custom household kit and save 20%. Bundle any 5 items from the Essentials Collection.'
    } },

    { id: 's9', type: 'catalog', props: {
      title: 'Trending This Week',
      subtitle: 'What our community is loving right now.',
      products: [
        { id: 't1', name: 'Canvas Tote Bag', description: 'Accessories', price: 28, badge: 'Popular', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { id: 't2', name: 'Glass Meal Prep Set', description: 'Kitchen', price: 45, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&q=80&w=600' },
        { id: 't3', name: 'Desktop Organizer', description: 'Workspace', price: 32, imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c638c478d5?auto=format&fit=crop&q=80&w=600' },
        { id: 't4', name: 'Linen Dish Towels', description: 'Household', price: 22, imageUrl: 'https://images.unsplash.com/photo-1584285427181-42021fb20a9a?auto=format&fit=crop&q=80&w=600' }
      ]
    } },

    { id: 's10', type: 'shop-the-look', props: {
      title: 'The Morning Routine',
      image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 40, product: { name: 'Pour Over Coffee Maker', price: 45 } },
        { x: 55, y: 60, product: { name: 'Ceramic Mug Set', price: 28 } },
        { x: 40, y: 75, product: { name: 'Wooden Breakfast Tray', price: 55 } }
      ]
    } },

    { id: 's11', type: 'catalog', props: {
      title: 'Special Offers',
      products: [
        { id: 'so1', name: 'Silicone Storage Bags', description: 'Kitchen', price: 24, originalPrice: 32, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600' },
        { id: 'so2', name: 'Cable Management Box', description: 'Workspace', price: 18, originalPrice: 25, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'so3', name: 'Aromatherapy Candle', description: 'Home Fragrance', price: 20, originalPrice: 28, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'so4', name: 'Travel Packing Cubes', description: 'Accessories', price: 35, originalPrice: 48, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' }
      ]
    } },

    { id: 's12', type: 'story', props: {
      title: 'Designed for Real Life',
      subtitle: 'The Everyday Promise',
      content: 'We believe that the objects you interact with every day should bring a small sense of joy and profound utility. We rigorously test, source, and refine our collection to ensure that every item in our store is durable, sustainable, and beautifully practical. No clutter, no gimmicks—just good design for everyday living.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
    } },

    { id: 's13', type: 'editorial-grid', props: {
      title: 'Life in Motion',
      images: [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
      ]
    } },

    { id: 's14', type: 'testimonials', props: {
      title: 'What Our Customers Say',
      testimonials: [
        {
          quote: "The quality of these everyday items is unmatched. I've slowly replaced all my kitchen basics with their products.",
          author: "Sarah J.",
          role: "Verified Buyer"
        },
        {
          quote: "Finally, a store that understands practical design doesn't have to be ugly. Fast shipping and great customer service.",
          author: "Mark T.",
          role: "Verified Buyer"
        },
        {
          quote: "My workspace has never looked better. The desk organizers and notebooks are exactly what I needed to stay focused.",
          author: "Emily R.",
          role: "Verified Buyer"
        }
      ]
    } },

    { id: 's15', type: 'bento-grid', props: {
      title: 'The Everyday Standard',
      items: [
        {
          title: 'Free Shipping',
          description: 'On all orders over $50.',
          span: 1
        },
        {
          title: '30-Day Returns',
          description: 'Simple and hassle-free.',
          span: 1
        },
        {
          title: 'Sustainable Materials',
          description: 'Responsibly sourced products.',
          span: 1
        },
        {
          title: 'Customer First',
          description: 'Support available 24/7.',
          span: 1
        }
      ]
    } },

    { id: 's16', type: 'newsletter', props: {
      title: 'Join the Everyday Community',
      subtitle: 'Subscribe for practical tips, new arrivals, and 10% off your first order.',
      buttonText: 'Subscribe'
    } },

    { id: 's17', type: 'footer', props: {
      brand: 'EVERYDAY',
      text: 'Practical, beautiful essentials for a well-organized life.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'Pinterest', href: '#' },
        { label: 'Twitter', href: '#' }
      ]
    } }
  ]
}
