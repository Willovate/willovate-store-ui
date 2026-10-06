import type { TemplateConfig } from '../../types/template'

export const GeneralStore10: TemplateConfig = {
  id: 'emporium',
  name: 'Emporium',
  description: 'A modern digital department store. Broad selection, clear navigation, and expansive discovery.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'department', name: 'Department Store' }, { id: 'modern', name: 'Modern' }, { id: 'broad', name: 'Broad' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"DM Sans", sans-serif', body: '"IBM Plex Sans", sans-serif' },
    colors: { primary: '#111111', background: '#f5f1e8', accent: '#c62828' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping over $50 · Easy returns · New arrivals every week' } },
    { id: 's2', type: 'navbar', props: { brand: 'EMPORIUM', style: 'full' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'More to discover.',
      subtitle: 'Everyday essentials, useful upgrades, and unexpected finds — all under one roof.',
      image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop everything',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Department Directory',
      items: [
        { title: 'Home', description: 'Living & Decor', span: 1 },
        { title: 'Everyday', description: 'Daily Essentials', span: 1 },
        { title: 'Travel', description: 'On the move', span: 1 },
        { title: 'Work', description: 'Desk & Office', span: 1 },
        { title: 'Kitchen', description: 'Tools & Dining', span: 1 },
        { title: 'Accessories', description: 'Personal items', span: 1 },
        { title: 'Tech', description: 'Small electronics', span: 1 },
        { title: 'Gifts', description: 'For everyone', span: 1 }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Featured Deals',
      subtitle: 'Good finds. Better prices.',
      products: [
        { id: 'emp1', name: 'Stack Storage Set', description: 'Home', price: 45, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp2', name: 'Charge Hub', description: 'Tech', price: 35, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp3', name: 'Fold Travel Pouch', description: 'Travel', price: 28, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp4', name: 'Countertop Organizer', description: 'Kitchen', price: 32, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1541604193435-22287d32c2c2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'What\'s moving fast',
      subtitle: 'Best Sellers',
      products: [
        { id: 'emp5', name: 'Daily Mug', description: 'Kitchen', price: 18, imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp6', name: 'Grid Notebook', description: 'Work', price: 22, imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp7', name: 'Transit Tote', description: 'Travel', price: 65, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp8', name: 'Pocket Speaker', description: 'Tech', price: 85, imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp9', name: 'Everyday Cap', description: 'Accessories', price: 25, imageUrl: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp10', name: 'Counter Tray', description: 'Home', price: 38, imageUrl: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Department: Home',
      subtitle: 'Everything for your living spaces.',
      products: [
        { id: 'emp11', name: 'Everyday Organizer', description: 'Home', price: 42, imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp12', name: 'Prep Storage Set', description: 'Kitchen', price: 55, imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp13', name: 'Glass Carafe', description: 'Tabletop', price: 34, imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp14', name: 'Ceramic Catchall', description: 'Decor', price: 28, imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'Department: Work & Everyday',
      subtitle: 'Tools for focus and routine.',
      products: [
        { id: 'emp15', name: 'Desk Tray', description: 'Work', price: 32, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp16', name: 'Arc Desk Lamp', description: 'Lighting', price: 115, imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp17', name: 'Cable Wrap Set', description: 'Tech Accessories', price: 15, imageUrl: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp18', name: 'Aluminum Laptop Stand', description: 'Work', price: 65, imageUrl: 'https://images.unsplash.com/photo-1507206130118-b5907f817163?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Department: Travel',
      subtitle: 'Built for motion.',
      products: [
        { id: 'emp19', name: 'Go Bottle', description: 'Hydration', price: 35, imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp20', name: 'Compact Umbrella', description: 'Travel', price: 42, imageUrl: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp21', name: 'Utility Pouch', description: 'Accessories', price: 24, imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp22', name: 'Key Organizer', description: 'Everyday Carry', price: 28, imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&q=80&w=800',
      name: 'The Commuter Backpack',
      category: 'The one you\'ll keep reaching for.',
      description: 'Built for the daily transit. Water-resistant exterior, dedicated tech sleeve, and comfort straps for all-day carry.',
      price: 110,
      features: ['15" Laptop Sleeve', 'Water-resistant', 'Quick-access pockets'],
      badge: 'Highly Rated',
      imageRight: false
    }},
    { id: 's11', type: 'bento-grid', props: {
      title: 'Shop by Need',
      items: [
        { title: 'Organize', description: 'Clear the clutter.', span: 1 },
        { title: 'Carry', description: 'Bags and totes.', span: 1 },
        { title: 'Work', description: 'Focus tools.', span: 1 },
        { title: 'Relax', description: 'Unwind.', span: 1 },
        { title: 'Travel', description: 'On the go.', span: 1 },
        { title: 'Gift', description: 'Thoughtful finds.', span: 1 }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'New Arrivals',
      products: [
        { id: 'emp23', name: 'Reading Light', description: 'Home', price: 55, imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp24', name: 'Ceramic Pour Over', description: 'Kitchen', price: 38, imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp25', name: 'Bamboo Organizer', description: 'Home', price: 28, imageUrl: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp26', name: 'Linen Throw Blanket', description: 'Lifestyle', price: 95, imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp27', name: 'Steel Cutlery Set', description: 'Kitchen', price: 45, imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp28', name: 'Aromatherapy Candle', description: 'Home', price: 32, imageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Weekend-ready',
      subtitle: 'Small upgrades for the season.',
      products: [
        { id: 'emp29', name: 'Canvas Travel Pouch', description: 'Travel', price: 26, imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp30', name: 'Travel Pill Organizer', description: 'Accessories', price: 14, imageUrl: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp31', name: 'Weekend Gift Set', description: 'Gifts', price: 65, imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'catalog', props: {
      title: 'Value Bundles',
      products: [
        { id: 'emp32', name: 'Everyday Starter', description: 'Mug, Notebook, Tote', price: 85, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp33', name: 'Desk Reset', description: 'Tray, Lamp, Organizer', price: 165, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&q=80&w=600' },
        { id: 'emp34', name: 'Travel Ready', description: 'Pouch, Bottle, Umbrella', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's15', type: 'testimonials', props: {
      title: 'Customer Notes',
      testimonials: [
        { quote: 'I love being able to find everything I need in one place without sacrificing quality. The curation is fantastic.', author: 'Sarah W.' },
        { quote: 'Emporium has become my go-to for gifts, home upgrades, and everyday essentials. Fast shipping, too.', author: 'Michael T.' },
        { quote: 'The Travel Ready bundle had exactly what I needed for my weekend trip. Highly recommended.', author: 'Jessica K.' }
      ]
    }},
    { id: 's16', type: 'bento-grid', props: {
      title: 'Why Emporium',
      items: [
        { title: 'Broad selection', description: 'Thousands of items.', span: 1 },
        { title: 'Clear pricing', description: 'No hidden fees.', span: 1 },
        { title: 'Easy returns', description: 'Simple process.', span: 1 },
        { title: 'Fast delivery', description: 'Quick shipping.', span: 1 },
        { title: 'Secure checkout', description: 'Safe & encrypted.', span: 2 }
      ]
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Keep discovering.',
      subtitle: 'New arrivals, useful finds, seasonal edits, and offers — delivered occasionally.',
      buttonText: 'Join the list'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'EMPORIUM',
      text: 'Everyday essentials, useful upgrades, and unexpected finds — all under one roof.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Facebook', href: '#' }
      ]
    }}
  ]
}
