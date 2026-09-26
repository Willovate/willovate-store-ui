import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'waffle-house-studio', name: 'Waffle House Studio', tagline: 'Belgian craft waffles & gourmet dessert creations',
  category: 'dessert',
  palette: { primary: '#d97706', secondary: '#1c1100', background: '#fefce8', surface: '#fef9c3', text: '#1c1100', textLight: '#92400e', heroOverlay: 'linear-gradient(to right, rgba(28,17,0,0.9), rgba(217,119,6,0.15))' },
  typography: { heading: '"Abril Fatface", cursive', body: '"Inter", sans-serif' },
  images: {
    hero: img('photo-1519676867240-f03562e64548'), heroAlt: 'Stacked Belgian waffles with fresh strawberries, cream, and maple syrup',
    story: img('photo-1544943910-4c1dc44aab44'), storyAlt: 'Belgian waffle iron being opened to reveal a golden, crispy waffle',
    promo: img('photo-1567620905732-2d1ec7ab7445'), promoAlt: 'Elaborate dessert waffle topped with ice cream, sauce, and toppings',
    gallery: [
      { src: img('photo-1519676867240-f03562e64548'), alt: 'Stack of Belgian waffles with fresh strawberries, whipped cream, maple syrup' },
      { src: img('photo-1544943910-4c1dc44aab44'), alt: 'Freshly pressed Belgian waffle being lifted from a cast-iron iron' },
      { src: img('photo-1567620905732-2d1ec7ab7445'), alt: 'Dessert waffle with Nutella, banana, and caramel ice cream scoop' },
      { src: img('photo-1551024601-bec78aea704b'), alt: 'Waffle ice cream sandwich with caramel drizzle and sprinkles' },
      { src: img('photo-1588195538326-c5b1e9f80a1b'), alt: 'Waffle cone topped with artisan ice cream and edible flowers' },
      { src: img('photo-1497034825429-c343d7c6a68f'), alt: 'Belgian liège waffle with pearl sugar and chocolate dipping sauce' },
    ],
  },
  content: {
    heroHeadline: 'The Waffle\nElevated.',
    heroSub: 'Authentic Belgian liège and Brussels waffles crafted from pearl sugar brioche dough, topped to your imagination.',
    storyTitle: 'From Brussels, With Love.',
    storyBody: [
      'Waffle House Studio was founded by Chef Pierre Dupont who trained at the legendary Maison Dandoy in Brussels. He mastered both the crispy Brussels waffle and the caramelized liège waffle before opening his own studio.',
      'Each waffle is cooked in a hand-crafted iron and served within 2 minutes of coming off the press. The liège dough is prepared 24 hours in advance with pearl sugar crystals folded in for that signature caramelized crunch.',
    ],
    promoTitle: 'Built to Your Vision.',
    promoCTA: 'Build Your Waffle',
    ctaPrimary: 'Order Now', ctaSecondary: 'See Creations',
    address: '1 Belgian Quarter, Portland, OR 97205',
    hours: 'Mon–Sun: 9am – 9pm · Brunch Saturdays & Sundays',
    phone: '+1 (503) 555-0187',
  },
  menu: [
    { tab: 'Signature Waffles', items: [
      { name: 'Strawberry Dreams', price: '$13', desc: 'Brussels waffle, macerated strawberries, crème fraîche, strawberry coulis.', tags: ['Classic'], image: img('photo-1592415486689-125cbbfcbee2') },
      { name: 'The Speculoos', price: '$14', desc: 'Liège waffle, speculoos spread, salted caramel, vanilla ice cream, crushed biscuit.', tags: ['Belgian Classic'], image: img('photo-1571407970349-bc81e7e96d47') },
      { name: 'Dark Chocolate Heaven', price: '$15', desc: 'Brussels waffle, dark chocolate ganache, caramelized banana, hazelnut praline, whipped cream.', tags: ['Must Try', 'Signature'], image: img('photo-1440516851687-7a8a3a48e2d4') },
    ]},
    { tab: 'Savory Waffles', items: [
      { name: 'Eggs Benedict Waffle', price: '$16', desc: 'Brussels waffle, poached eggs, Canadian bacon, hollandaise, chives.', image: img('photo-1604382354936-07c5d9983bd3') },
      { name: 'Smoked Salmon Waffle', price: '$17', desc: 'Smoked salmon, crème fraîche, pickled onion, dill, capers.', image: img('photo-1576458088443-04a19bb13da6') },
    ]},
    { tab: 'Drinks', items: [
      { name: 'Fresh Orange Juice', price: '$5', desc: 'Squeezed to order.', image: img('photo-1571407970349-bc81e7e96d47') },
      { name: 'Belgian Hot Chocolate', price: '$6', desc: 'Melted Callebaut chocolate with steamed whole milk.', image: img('photo-1587314168485-3236d6710814') },
      { name: 'Cold Brew', price: '$5', desc: 'Single-origin, 20-hour cold brew.', image: img('photo-1558030137-a56c1b002c99') },
    ]},
  ],
  testimonials: [
    { name: 'Charlotte D.', quote: 'I have been to the original Maison Dandoy in Brussels and Pierre\'s waffles give it a serious run. Extraordinary.', rating: 5 },
    { name: 'Ryan S.', quote: 'The Dark Chocolate Heaven waffle is the best thing I ate all year. The caramelized banana sealed the deal.', rating: 5 },
    { name: 'Isabelle C.', quote: 'The Eggs Benedict waffle for brunch is a revelation. I will never go back to regular eggs Benedict.', rating: 5 },
  ],
  features: ['Authentic Belgian Recipes', 'Liège & Brussels Style', '24-Hour Dough Preparation', 'Pearl Sugar Imported'],
};

export default function WaffleHouseStudio() { return <RestaurantPage theme={theme} />; }
