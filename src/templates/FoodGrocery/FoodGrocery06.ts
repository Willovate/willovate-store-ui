import type { TemplateConfig } from '../../types/template'

export const FoodGrocery06: TemplateConfig = {
  id: 'food-grocery-06',
  name: 'GreenBasket',
  description: 'Organic wellness, healthy grocery, and better living.',
  categories: [{ id: 'food', name: 'Food & Grocery' }],
  tags: [{ id: 'organic', name: 'Organic' }, { id: 'wellness', name: 'Wellness' }, { id: 'health', name: 'Health' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  navigation: [
    { label: 'Shop', href: '#' },
    { label: 'Organic Pantry', href: '#' },
    { label: 'Plant-Based', href: '#' },
    { label: 'Superfoods', href: '#' },
    { label: 'Healthy Snacks', href: '#' }
  ],
  theme: {
    fonts: { heading: '"Quicksand", sans-serif', body: '"Nunito", sans-serif' },
    colors: { primary: '#16796B', background: '#F4FBF7', accent: '#F28C7A' }
  },
  sections: [
    { id: 's1', type: 'navbar', props: { brand: 'GreenBasket', style: 'utility' } },
    { id: 's2', type: 'promo', props: { text: 'COMPLIMENTARY SHIPPING ON ALL ORGANIC ORDERS OVER $50', buttonLabel: 'Shop Now', buttonLink: '#' } },
    { id: 's3', type: 'hero', props: { title: 'Good Food. Better Living.', subtitle: 'Thoughtfully selected organic groceries for everyday wellness. Clean ingredients, plant-forward choices, and naturally delicious staples.', ctaLabel: 'BUILD YOUR BASKET', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600' } },
    { id: 's4', type: 'category-grid', props: { title: 'Explore Wellness', categories: [
      { name: 'Organic Pantry', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' },
      { name: 'Plant-Based', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
      { name: 'Superfoods', image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600' },
      { name: 'Healthy Snacks', image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600' },
      { name: 'Tea & Infusions', image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=600' },
      { name: 'Better Breakfast', image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=600' }
    ] } },
    { id: 's5', type: 'catalog', props: {
      products: [
        { id: 'gb-1', name: 'Raw Almond Butter', description: 'No added sugar or oils.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600', category: 'Pantry', stockQuantity: 50, visualTheme: 'default', isFeatured: true, slug: 'raw-almond-butter', compareAtPrice: null },
        { id: 'gb-2', name: 'Organic Chia Seeds', description: 'Rich in Omega-3.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', category: 'Superfoods', stockQuantity: 120, visualTheme: 'default', isFeatured: false, slug: 'organic-chia-seeds', compareAtPrice: null },
        { id: 'gb-3', name: 'Sprouted Granola', description: 'Sweetened with coconut nectar.', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600', category: 'Breakfast', stockQuantity: 80, visualTheme: 'default', isFeatured: false, slug: 'sprouted-granola', compareAtPrice: null },
        { id: 'gb-4', name: 'Cold-Pressed Green Juice', description: 'Kale, spinach, celery, apple.', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', category: 'Drinks', stockQuantity: 30, visualTheme: 'default', isFeatured: true, slug: 'cold-pressed-green', compareAtPrice: null }
      ]
    }},
    { id: 's6', type: 'story', props: { title: 'Build a Better Basket.', content: 'We believe that wellness starts in your pantry. By choosing thoughtfully sourced, organic, and plant-forward ingredients, you are nourishing your body and supporting a healthier planet. Discover food that makes you feel vibrant, energized, and balanced every single day.' } },
    { id: 's7', type: 'product-spotlight', props: { name: 'Ceremonial Grade Matcha', description: 'Your new morning ritual. Sourced directly from Uji, Japan, our organic matcha provides sustained energy without the crash.', price: 28.00, image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600', badge: 'ORGANIC', category: 'Superfoods' } },
    { id: 's8', type: 'editorial-grid', props: { title: 'Plant-Powered Living', images: ['https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600'] } },
    { id: 's9', type: 'specification-grid', props: { title: 'Why GreenBasket?', specs: [
      { label: 'Organic-First', value: 'We prioritize certified organic ingredients in everything we carry.' },
      { label: 'Plant-Forward', value: 'A curated selection of the best plant-based foods available.' },
      { label: 'Simple Ingredients', value: 'No artificial flavors, colors, or unnecessary preservatives.' },
      { label: 'Thoughtful Sourcing', value: 'Working with farmers who care about soil health and sustainability.' }
    ] } },
    { id: 's10', type: 'bento-grid', props: { title: 'Wellness Bundles', items: [
      { title: 'Morning Ritual Starter', description: 'Everything you need for a balanced, energized morning.', image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=600', size: 'large' },
      { title: 'Plant-Based Pantry', description: 'Stock up on organic essentials.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', size: 'medium' },
      { title: 'Healthy Snacking', description: 'Guilt-free treats for the whole week.', image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600', size: 'medium' }
    ] } },
    { id: 's11', type: 'testimonials', props: { title: 'Community Voices', testimonials: [
      { quote: 'GreenBasket has completely transformed my weekly grocery run. It is so easy to find clean, organic staples without deciphering labels.', author: 'Sarah L.', role: 'Wellness Advocate' },
      { quote: 'I love their curated bundles. The Morning Ritual pack has made healthy breakfasts effortless for my family.', author: 'James P.', role: 'Customer' }
    ] } },
    { id: 's12', type: 'newsletter', props: { title: 'The Wellness Journal', description: 'Join our community for weekly plant-based recipes, new arrivals, and mindful living tips.' } },
    { id: 's13', type: 'footer', props: {} }
  ]
}
