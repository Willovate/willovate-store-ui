import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'sugar-petal', name: 'Sugar Petal', tagline: 'Whimsical cupcakes and custom sweet treats.',
  category: 'bakery',
  palette: { primary: '#f472b6', secondary: '#831843', background: '#fdf2f8', surface: '#ffffff', text: '#831843', textLight: '#be185d', heroOverlay: 'linear-gradient(to right, rgba(131,24,67,0.8), rgba(244,114,182,0.3))' },
  typography: { heading: '"Pacifico", cursive', body: '"Quicksand", sans-serif' },
  images: {
    hero: img('photo-1486427944299-d1955d23e34d'), heroAlt: 'Colorful, beautifully decorated cupcakes with sprinkles',
    story: img('photo-1578985545062-69928b1d9587'), storyAlt: 'Baker piping frosting onto a cake',
    promo: img('photo-1550617931-e17a7b70dce2'), promoAlt: 'Brightly colored sugar cookies',
    gallery: [
      { src: img('photo-1486427944299-d1955d23e34d'), alt: 'Cupcakes' },
      { src: img('photo-1578985545062-69928b1d9587'), alt: 'Cake decorating' },
      { src: img('photo-1550617931-e17a7b70dce2'), alt: 'Cookies' },
      { src: img('photo-1514517521153-1be72277b32f'), alt: 'Donuts' },
      { src: img('photo-1495147466023-ac5c588e2e94'), alt: 'Macarons' },
      { src: img('photo-1587314168485-3236d6710814'), alt: 'Muffins' },
    ],
  },
  content: {
    heroHeadline: 'Life is Sweet.',
    heroSub: 'Brighten your day with our colorful, whimsical cupcakes, cookies, and custom treats.',
    storyTitle: 'Baking Smiles.',
    storyBody: [
      'Sugar Petal was created to bring a little joy into the world. We specialize in fun, vibrant flavors and over-the-top decorations that make every dessert feel like a celebration.',
      'Whether you need a dozen cupcakes for a birthday or just a single cookie to treat yourself, we are here to make your day sweeter.',
    ],
    promoTitle: 'Custom Party Orders.',
    promoCTA: 'Get a Quote',
    ctaPrimary: 'Order Cupcakes', ctaSecondary: 'Cake Gallery',
    address: '99 Sweet Street, Downtown',
    hours: 'Mon-Sat: 10AM - 6PM',
    phone: '(555) 666-7777',
  },
  menu: [
    { tab: 'Cupcakes', items: [
      { name: 'Funfetti Explosion', price: '$4', desc: 'Vanilla cake loaded with sprinkles, topped with buttercream and more sprinkles.', tags: ['Bestseller'], image: img('photo-1486427944299-d1955d23e34d') },
      { name: 'Red Velvet Dream', price: '$4.50', desc: 'Classic red velvet cake with rich cream cheese frosting.', image: img('photo-1486427944299-d1955d23e34d') },
    ]},
    { tab: 'Cookies & More', items: [
      { name: 'Stuffed Chocolate Chip', price: '$3.50', desc: 'Giant chocolate chip cookie stuffed with Nutella.', image: img('photo-1550617931-e17a7b70dce2') },
    ]},
  ],
  testimonials: [
    { name: 'Jessica T.', quote: 'The cutest and most delicious cupcakes ever. They were a huge hit at my daughter\'s party.', rating: 5 },
    { name: 'Amy C.', quote: 'I love coming here. It smells amazing and the staff is so friendly.', rating: 5 },
  ],
  features: ['Custom Designs', 'Vibrant Colors', 'Gluten Free Options', 'Party Packages'],
};

export default function SugarPetal() { return <RestaurantPage theme={theme} />; }
