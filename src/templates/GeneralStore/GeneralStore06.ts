import type { TemplateConfig } from '../../types/template'

export const GeneralStore06: TemplateConfig = {
  id: 'supply',
  name: 'Supply',
  description: 'Everyday supplies, made simple. A highly practical, value-driven general store focused on everyday essentials and utility.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'practical', name: 'Practical' }, { id: 'essentials', name: 'Essentials' }, { id: 'value', name: 'Value' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Archivo", sans-serif', body: '"Inter", sans-serif' },
    colors: { primary: '#17202a', background: '#f3f4f1', accent: '#2563eb' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'FREE NEXT-DAY DELIVERY ON ORDERS OVER ₹999. SHOP ESSENTIALS.' } },
    { id: 's2', type: 'navbar', props: { brand: 'SUPPLY', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Everyday supplies,\nmade simple.',
      subtitle: 'Dependable products for your home, workspace, and daily routine. Everything useful, in one dependable place.',
      image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop Essentials',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Quick Categories',
      items: [
        { title: 'Household', description: 'Cleaning & Storage', size: 'large', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800' },
        { title: 'Workspace', description: 'Desk Supplies', size: 'small', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400' },
        { title: 'Kitchen', description: 'Daily Tools', size: 'small', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=400' },
        { title: 'Travel', description: 'Packing Essentials', size: 'small', image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Core Essentials',
      products: [
        { id: 'sp1', name: 'Stackable Storage Bins (Set of 3)', description: 'Organization', price: 899, imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp2', name: 'Heavy-Duty Kitchen Shears', description: 'Kitchen', price: 450, imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp3', name: 'Microfiber Cleaning Cloths (10 Pack)', description: 'Cleaning', price: 399, badge: 'Value Pack', imageUrl: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp4', name: 'Insulated Steel Tumbler', description: 'Hydration', price: 799, imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'Bundle & Save',
      subtitle: 'Curated packs for maximum value.',
      products: [
        { id: 'sp5', name: 'The Desk Reset Kit', description: 'Notebook, Pens, Desk Tray', price: 1299, badge: 'Save 20%', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp6', name: 'Kitchen Starter Kit', description: 'Utensils & Storage', price: 2499, badge: 'Save 15%', imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp7', name: 'Travel Organizer Pack', description: '3 Packing Cubes & Pouch', price: 1899, badge: 'Save 25%', imageUrl: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp8', name: 'Daily Care Bundle', description: 'Soap, Lotion, Towel', price: 999, badge: 'Save 10%', imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Most Reliable',
      subtitle: 'Highest rated everyday products.',
      products: [
        { id: 'sp9', name: 'Cable Management Box', description: 'Workspace', price: 699, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp10', name: 'Glass Food Storage (Set of 5)', description: 'Kitchen', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp11', name: 'Toiletry Travel Pouch', description: 'Personal Care', price: 550, imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp12', name: 'Compact Umbrella', description: 'Everyday Carry', price: 850, imageUrl: 'https://images.unsplash.com/photo-1474625121024-7595bfbc57ac?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'editorial-grid', props: {
      title: 'Practical Spaces',
      images: [
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=800'
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'Workspace Essentials',
      products: [
        { id: 'sp17', name: 'Aluminum Ruler', description: 'Stationery', price: 199, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp18', name: 'Wire Mesh Basket', description: 'Storage', price: 399, imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp19', name: 'Leather Desk Pad', description: 'Workspace', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp20', name: 'Adjustable Tablet Stand', description: 'Accessories', price: 899, imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'bento-grid', props: {
      title: 'Hydration Tiers',
      items: [
        { title: 'Good', description: 'BPA-Free Plastic Bottle — ₹399', span: 1 },
        { title: 'Better', description: 'Vacuum Insulated Steel — ₹799', span: 1 },
        { title: 'Best', description: 'Titanium Travel Flask — ₹1499', span: 1 },
        { title: 'Accessories', description: 'Cleaning brush & carry strap.', span: 1 }
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'Clearance & Deals',
      subtitle: 'Great value on overstock essentials.',
      products: [
        { id: 'sp13', name: 'Bamboo Drawer Organizer', description: 'Kitchen', price: 499, badge: 'Clearance', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp14', name: 'Utility Tote Bag', description: 'Carry', price: 299, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp15', name: 'Ceramic Soap Dispenser', description: 'Bath', price: 349, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp16', name: 'Silicone Food Covers', description: 'Kitchen', price: 199, badge: 'Clearance', imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'Household Needs',
      products: [
        { id: 'sp21', name: 'Cotton Bath Towel', description: 'Bath', price: 599, imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp22', name: 'Laundry Hamper', description: 'Organization', price: 899, imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp23', name: 'Aromatherapy Diffuser', description: 'Wellness', price: 1199, imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600' },
        { id: 'sp24', name: 'Fleece Throw Blanket', description: 'Living', price: 799, imageUrl: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'bento-grid', props: {
      title: 'Why Shop Supply',
      items: [
        { title: 'Honest Pricing', description: 'No artificial markups. Just solid value.', span: 1 },
        { title: 'Quality Tested', description: 'We use everything we sell.', span: 1 },
        { title: 'Bulk Discounts', description: 'Save more when you stock up.', span: 1 },
        { title: 'Fast Delivery', description: 'Next-day delivery on essentials.', span: 1 }
      ]
    }},
    { id: 's14', type: 'testimonials', props: {
      title: 'Customer Reviews',
      testimonials: [
        { quote: 'No clutter, no confusion. Just the things I actually need for my house, delivered fast.', author: 'David M.' },
        { quote: 'The bundles are brilliant. I moved into a new apartment and the Kitchen Starter Kit was a lifesaver.', author: 'Sarah K.' },
        { quote: 'Reliable quality across the board. I don\'t shop anywhere else for my home office supplies.', author: 'James R.' }
      ]
    }},
    { id: 's15', type: 'story', props: {
      title: 'Utility Above All.',
      subtitle: 'Our Philosophy',
      content: 'We created Supply because shopping for everyday goods shouldn\'t be complicated. We curate highly functional, durable, and practical products that make your life easier. No unnecessary features, just dependable utility.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's16', type: 'newsletter', props: {
      title: 'Get Supply Updates',
      subtitle: 'Sign up for alerts on new essentials, restocks, and exclusive bundle deals.',
      buttonText: 'Subscribe'
    }},
    { id: 's17', type: 'footer', props: {
      brand: 'SUPPLY',
      text: 'Everyday supplies, made simple.',
      social: [
        { label: 'LinkedIn', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Facebook', href: '#' }
      ]
    }}
  ]
}
