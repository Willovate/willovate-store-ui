import type { TemplateConfig } from '../../types/template'

export const GeneralStore09: TemplateConfig = {
  id: 'collective',
  name: 'Collective',
  description: 'A curated marketplace of good things. Different objects brought together under one point of view.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'curated', name: 'Curated' }, { id: 'collection', name: 'Collection' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Fraunces", serif', body: '"Work Sans", sans-serif' },
    colors: { primary: '#26222b', background: '#f7f4ee', accent: '#7c3aed' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping over $50 · Thoughtfully selected, easy to return' } },
    { id: 's2', type: 'navbar', props: { brand: 'COLLECTIVE', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'A collection of good things.',
      subtitle: 'Useful objects, everyday favorites, and unexpected finds — brought together under one point of view.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Explore the collection',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Collection Directory',
      items: [
        { title: 'For Home', description: 'Living spaces.', span: 1, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
        { title: 'For Work', description: 'Desk items.', span: 1 },
        { title: 'For Travel', description: 'On the go.', span: 1 },
        { title: 'For Gifting', description: 'Thoughtful finds.', span: 1 }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'The Collective Edit',
      subtitle: 'A selection across all categories.',
      products: [
        { id: 'cl1', name: 'Arc Desk Tray', description: 'Workspace', price: 42, imageUrl: 'https://images.unsplash.com/photo-1611077544719-741ce2b9894e?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl2', name: 'Fold Travel Pouch', description: 'Travel', price: 35, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl3', name: 'Daily Ceramic Mug', description: 'Kitchen', price: 28, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl4', name: 'Field Carry Tote', description: 'Everyday Carry', price: 65, imageUrl: 'https://images.unsplash.com/photo-1597816041042-45e3ed609f98?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
      name: 'Weekend Utility Bag',
      category: 'Featured Product',
      description: 'The perfect size for a two-day trip. Constructed from heavy-weight canvas with solid brass hardware.',
      price: 120,
      features: ['Heavy canvas', 'Brass hardware', 'Cabin approved'],
      badge: 'Editor\'s Pick',
      imageRight: false
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'For the Home',
      subtitle: 'Objects that earn their place in your space.',
      products: [
        { id: 'cl5', name: 'Form Storage Box', description: 'Organization', price: 45, imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl6', name: 'Countertop Tray', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl7', name: 'Glass Match Cloche', description: 'Accessories', price: 24, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl8', name: 'Stack Organizer', description: 'Storage', price: 55, imageUrl: 'https://images.unsplash.com/photo-1595514535316-24eb22442ad4?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'For the Desk',
      subtitle: 'Focus and clarity for your workspace.',
      products: [
        { id: 'cl9', name: 'Grid Notebook', description: 'Stationery', price: 22, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl10', name: 'Mono Desk Lamp', description: 'Lighting', price: 115, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl11', name: 'Cable Wrap Set', description: 'Organization', price: 18, imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl12', name: 'Aluminum Laptop Stand', description: 'Accessories', price: 65, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Out of Office',
      subtitle: 'Essentials for motion and transit.',
      products: [
        { id: 'cl13', name: 'Everyday Bottle', description: 'Hydration', price: 35, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl14', name: 'Compact Umbrella', description: 'Accessories', price: 42, imageUrl: 'https://images.unsplash.com/photo-1559404289-4b68ff05f57a?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl15', name: 'Pocket Speaker', description: 'Small Tech', price: 85, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl16', name: 'Leather Cardholder', description: 'Everyday Carry', price: 48, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'bento-grid', props: {
      title: 'Found Together',
      items: [
        { title: 'Five things that just work together.', description: 'Curated mix.', span: 2, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
        { title: 'Desk & Home', description: 'Seamless.', span: 1 },
        { title: 'Travel & Tech', description: 'In motion.', span: 1 }
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'New Arrivals',
      products: [
        { id: 'cl17', name: 'Reading Light', description: 'Lighting', price: 55, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl18', name: 'Ceramic Pour Over', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl19', name: 'Bamboo Organizer', description: 'Organization', price: 28, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl20', name: 'Linen Throw Blanket', description: 'Home', price: 95, imageUrl: 'https://images.unsplash.com/photo-1528317424683-11bb58763dc0?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'The Weekend Edit',
      subtitle: 'Small upgrades for the season.',
      products: [
        { id: 'cl21', name: 'Canvas Travel Pouch', description: 'Travel', price: 26, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl22', name: 'Aromatherapy Candle', description: 'Home', price: 32, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl23', name: 'Steel Cutlery Set', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'story', props: {
      title: 'Good design earns its place.',
      subtitle: 'The Details',
      content: 'We believe that the objects you interact with every day should be a pleasure to use. From the weight of a pen to the texture of a ceramic mug, we look for items where every detail has been considered.',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's14', type: 'catalog', props: {
      title: 'Curated Bundles',
      products: [
        { id: 'cl24', name: 'The Desk Edit', description: 'Tray, Lamp, Notebook', price: 165, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl25', name: 'The Travel Edit', description: 'Pouch, Bottle, Organizer', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl26', name: 'The Home Edit', description: 'Storage, Lamp, Blanket', price: 185, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's15', type: 'testimonials', props: {
      title: 'Customer Notes',
      testimonials: [
        { quote: 'I trust the curation here completely. Everything I have bought works perfectly and looks beautiful.', author: 'James R.' },
        { quote: 'It is so refreshing to find a store that brings together different types of products with such a consistent aesthetic.', author: 'Elena M.' },
        { quote: 'The Desk Edit bundle transformed my home office overnight. Beautifully selected items.', author: 'David T.' }
      ]
    }},
    { id: 's16', type: 'bento-grid', props: {
      title: 'Why Collective',
      items: [
        { title: 'Curated selection', description: 'Carefully chosen items.', span: 1 },
        { title: 'Clear pricing', description: 'Honest value.', span: 1 },
        { title: 'Easy returns', description: 'Hassle-free process.', span: 1 },
        { title: 'Useful products', description: 'Function meets form.', span: 1 }
      ]
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Stay in the collection.',
      subtitle: 'New finds, thoughtful edits, and useful things worth knowing about.',
      buttonText: 'Join the list'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'COLLECTIVE',
      text: 'Different things. One point of view.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'Pinterest', href: '#' },
        { label: 'Journal', href: '#' }
      ]
    }}
  ]
}
