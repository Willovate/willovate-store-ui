import type { TemplateConfig } from '../../types/template'

export const GeneralStore09: TemplateConfig = {
  id: 'collective',
  name: 'Collective',
  description: 'A curated marketplace of good things. Different objects brought together under one point of view.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'curated', name: 'Curated' }, { id: 'collection', name: 'Collection' }, { id: 'editorial', name: 'Editorial' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1600',
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
        { id: 'cl1', name: 'Arc Desk Tray', description: 'Workspace', price: 42, imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl2', name: 'Fold Travel Pouch', description: 'Travel', price: 35, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl3', name: 'Daily Ceramic Mug', description: 'Kitchen', price: 28, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl4', name: 'Field Carry Tote', description: 'Everyday Carry', price: 65, imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800',
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
        { id: 'cl5', name: 'Form Storage Box', description: 'Organization', price: 45, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl6', name: 'Countertop Tray', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl7', name: 'Glass Match Cloche', description: 'Accessories', price: 24, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl8', name: 'Stack Organizer', description: 'Storage', price: 55, imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'For the Desk',
      subtitle: 'Focus and clarity for your workspace.',
      products: [
        { id: 'cl9', name: 'Grid Notebook', description: 'Stationery', price: 22, imageUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl10', name: 'Mono Desk Lamp', description: 'Lighting', price: 115, imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl11', name: 'Cable Wrap Set', description: 'Organization', price: 18, imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl12', name: 'Aluminum Laptop Stand', description: 'Accessories', price: 65, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Out of Office',
      subtitle: 'Essentials for motion and transit.',
      products: [
        { id: 'cl13', name: 'Everyday Bottle', description: 'Hydration', price: 35, imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl14', name: 'Compact Umbrella', description: 'Accessories', price: 42, imageUrl: 'https://images.unsplash.com/photo-1609081524998-a1163e2d44cb?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl15', name: 'Pocket Speaker', description: 'Small Tech', price: 85, imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl16', name: 'Leather Cardholder', description: 'Everyday Carry', price: 48, imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'bento-grid', props: {
      title: 'Found Together',
      items: [
        { title: 'Five things that just work together.', description: 'Curated mix.', span: 2, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800' },
        { title: 'Desk & Home', description: 'Seamless.', span: 1 },
        { title: 'Travel & Tech', description: 'In motion.', span: 1 }
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'New Arrivals',
      products: [
        { id: 'cl17', name: 'Reading Light', description: 'Lighting', price: 55, imageUrl: 'https://images.unsplash.com/photo-1524135329990-07660cd5bf10?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl18', name: 'Ceramic Pour Over', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl19', name: 'Bamboo Organizer', description: 'Organization', price: 28, imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl20', name: 'Linen Throw Blanket', description: 'Home', price: 95, imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'The Weekend Edit',
      subtitle: 'Small upgrades for the season.',
      products: [
        { id: 'cl21', name: 'Canvas Travel Pouch', description: 'Travel', price: 26, imageUrl: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl22', name: 'Aromatherapy Candle', description: 'Home', price: 32, imageUrl: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl23', name: 'Steel Cutlery Set', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'story', props: {
      title: 'Good design earns its place.',
      subtitle: 'The Details',
      content: 'We believe that the objects you interact with every day should be a pleasure to use. From the weight of a pen to the texture of a ceramic mug, we look for items where every detail has been considered.',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's14', type: 'catalog', props: {
      title: 'Curated Bundles',
      products: [
        { id: 'cl24', name: 'The Desk Edit', description: 'Tray, Lamp, Notebook', price: 165, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl25', name: 'The Travel Edit', description: 'Pouch, Bottle, Organizer', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600' },
        { id: 'cl26', name: 'The Home Edit', description: 'Storage, Lamp, Blanket', price: 185, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600' }
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
