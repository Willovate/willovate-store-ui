import React from 'react';
import { RestaurantPage, type RestaurantThemeConfig } from '../components/RestaurantCore';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

const theme: RestaurantThemeConfig = {
  id: 'patisserie-lune', name: 'Patisserie Lune', tagline: 'Elegant French pastries and delicate desserts.',
  category: 'bakery',
  palette: { primary: '#ec4899', secondary: '#fbcfe8', background: '#fff1f2', surface: '#ffffff', text: '#831843', textLight: '#be185d', heroOverlay: 'linear-gradient(to right, rgba(131,24,67,0.8), rgba(236,72,153,0.3))' },
  typography: { heading: '"Cormorant Garamond", serif', body: '"Montserrat", sans-serif' },
  images: {
    hero: img('photo-1558961363-fa8fdf82db35'), heroAlt: 'Beautifully decorated French pastries in a vitrine',
    story: img('photo-1509365465994-3e28be75c504'), storyAlt: 'Chef piping macarons',
    promo: img('photo-1578985545062-69928b1d9587'), promoAlt: 'Elegant layered cake',
    gallery: [
      { src: img('photo-1558961363-fa8fdf82db35'), alt: 'Pastry case' },
      { src: img('photo-1509365465994-3e28be75c504'), alt: 'Macarons' },
      { src: img('photo-1578985545062-69928b1d9587'), alt: 'Chocolate cake' },
      { src: img('photo-1550617931-e17a7b70dce2'), alt: 'Fruit tart' },
      { src: img('photo-1514517521153-1be72277b32f'), alt: 'Eclairs' },
      { src: img('photo-1621303837174-89787a7d4729'), alt: 'Croissants' },
    ],
  },
  content: {
    heroHeadline: 'Sweet Perfection.',
    heroSub: 'Experience the magic of Parisian pastry arts right in your neighborhood. Every dessert is a masterpiece.',
    storyTitle: 'Crafted with Precision.',
    storyBody: [
      'At Patisserie Lune, baking is an exacting science and a passionate art form. Our executive pastry chef trained in Paris and brings authentic techniques to every creation.',
      'From the precise temperature of our chocolate tempering to the exact lamination of our croissant dough, we pursue perfection in every bite.',
    ],
    promoTitle: 'Custom Celebration Cakes.',
    promoCTA: 'Inquire Now',
    ctaPrimary: 'Order Treats', ctaSecondary: 'Cake Gallery',
    address: '100 Rose Avenue, Chic District',
    hours: 'Wed-Sun: 8AM - 5PM',
    phone: '(555) 777-8888',
  },
  menu: [
    { tab: 'Macarons', items: [
      { name: 'Rose Water Macaron', price: '$3.50', desc: 'Delicate floral notes with a white chocolate ganache center.', tags: ['Signature'], image: img('photo-1509365465994-3e28be75c504') },
      { name: 'Pistachio Macaron', price: '$3.50', desc: 'Sicilian pistachio buttercream in a crisp shell.', image: img('photo-1509365465994-3e28be75c504') },
    ]},
    { tab: 'Patisserie', items: [
      { name: 'Opera Cake', price: '$8', desc: 'Layers of almond sponge, coffee syrup, French buttercream, and chocolate glaze.', image: img('photo-1578985545062-69928b1d9587') },
      { name: 'Vanilla Bean Eclair', price: '$6', desc: 'Choux pastry filled with Tahitian vanilla pastry cream.', image: img('photo-1514517521153-1be72277b32f') },
    ]},
  ],
  testimonials: [
    { name: 'Isabella C.', quote: 'The macarons taste exactly like the ones I had in Paris. Absolutely divine.', rating: 5 },
    { name: 'Michael L.', quote: 'We ordered our wedding cake from Patisserie Lune and it was breathtakingly beautiful and delicious.', rating: 5 },
  ],
  features: ['Authentic French Recipes', 'Custom Cakes', 'High Tea Service', 'Premium Ingredients'],
};

export default function PatisserieLune() { return <RestaurantPage theme={theme} />; }
