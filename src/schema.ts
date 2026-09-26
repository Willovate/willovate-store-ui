export type FieldType = 'text' | 'textarea' | 'richtext' | 'link' | 'image' | 'color' | 'select' | 'toggle' | 'number' | 'product_picker' | 'collection_picker';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  tab?: 'content' | 'style';
}

export interface BlockDef {
  type: string;
  name: string;
  fields: FieldDef[];
}

export interface SectionSchema {
  type: string;
  name: string;
  settings: FieldDef[];
  blocks?: BlockDef;
  maxBlocks?: number;
}

export const SECTION_SCHEMAS: SectionSchema[] = [
  {
    type: 'hero',
    name: 'Hero',
    settings: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'e.g. NEW COLLECTION', tab: 'content' },
      { name: 'heading', label: 'Heading', type: 'textarea', placeholder: 'Timeless pieces made for you', tab: 'content' },
      { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Discover our new collection...', tab: 'content' },
      { name: 'buttonText', label: 'Button text', type: 'text', placeholder: 'Shop Now', tab: 'content' },
      { name: 'buttonLink', label: 'Button link', type: 'link', placeholder: '/collections/all', tab: 'content' },
      { name: 'style_backgroundImage', label: 'Image', type: 'image', tab: 'style' },
      { name: 'style_backgroundColor', label: 'Background color', type: 'color', tab: 'style' },
      { name: 'style_textColor', label: 'Text color', type: 'color', tab: 'style' },
      { name: 'style_buttonColor', label: 'Button color', type: 'color', tab: 'style' },
      { name: 'style_buttonTextColor', label: 'Button text color', type: 'color', tab: 'style' },
    ]
  },
  {
    type: 'announcement',
    name: 'Announcement bar',
    settings: [
      { name: 'text', label: 'Text', type: 'text', tab: 'content' },
      { name: 'link', label: 'Link', type: 'link', tab: 'content' },
      { name: 'visibility', label: 'Show announcement', type: 'toggle', tab: 'content' },
      { name: 'style_backgroundColor', label: 'Background color', type: 'color', tab: 'style' },
      { name: 'style_textColor', label: 'Text color', type: 'color', tab: 'style' },
    ],
    blocks: {
      type: 'message',
      name: 'Message',
      fields: [
        { name: 'text', label: 'Text', type: 'text' },
        { name: 'link', label: 'Link', type: 'link' },
      ]
    }
  },
  {
    type: 'nav',
    name: 'Header',
    settings: [
      { name: 'logoText', label: 'Logo text', type: 'text', tab: 'content' },
      { name: 'logoImage', label: 'Logo image', type: 'image', tab: 'content' },
    ],
    blocks: {
      type: 'menu_link',
      name: 'Menu link',
      fields: [
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'link', label: 'Link', type: 'link' },
      ]
    }
  },
  {
    type: 'featured-title',
    name: 'Featured collection',
    settings: [
      { name: 'title', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'collection', label: 'Collection', type: 'collection_picker', tab: 'content' },
      { name: 'productsToShow', label: 'Products to show', type: 'number', tab: 'style' },
      { name: 'columns', label: 'Columns', type: 'number', tab: 'style' },
    ]
  },
  {
    type: 'heading',
    name: 'Heading',
    settings: [
      { name: 'content', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'alignment', label: 'Alignment', type: 'select', options: [{label: 'Left', value: 'left'}, {label: 'Center', value: 'center'}, {label: 'Right', value: 'right'}], tab: 'style' },
    ]
  },
  {
    type: 'prod-grid',
    name: 'Product grid',
    settings: [
      { name: 'title', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'productsToShow', label: 'Products to show', type: 'number', tab: 'style' },
      { name: 'columns', label: 'Columns', type: 'number', tab: 'style' },
    ],
    blocks: {
      type: 'product',
      name: 'Product',
      fields: [
        { name: 'product', label: 'Product', type: 'product_picker' }
      ]
    }
  },
  {
    type: 'coll-list',
    name: 'Collection list',
    settings: [
      { name: 'title', label: 'Heading', type: 'text', tab: 'content' },
    ],
    blocks: {
      type: 'collection',
      name: 'Collection',
      fields: [
        { name: 'collection', label: 'Collection', type: 'collection_picker' }
      ]
    }
  },
  {
    type: 'img-text',
    name: 'Image with text',
    settings: [
      { name: 'image', label: 'Image', type: 'image', tab: 'content' },
      { name: 'title', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'content', label: 'Text', type: 'textarea', tab: 'content' },
      { name: 'buttonText', label: 'Button label', type: 'text', tab: 'content' },
      { name: 'buttonLink', label: 'Button link', type: 'link', tab: 'content' },
    ]
  },
  {
    type: 'newsletter',
    name: 'Newsletter',
    settings: [
      { name: 'title', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'subtitle', label: 'Subtext', type: 'textarea', tab: 'content' },
      { name: 'buttonText', label: 'Button text', type: 'text', tab: 'content' },
    ]
  },
  {
    type: 'email-signup',
    name: 'Email signup',
    settings: [
      { name: 'heading', label: 'Heading', type: 'text', tab: 'content' },
      { name: 'subtext', label: 'Subtext', type: 'textarea', tab: 'content' },
      { name: 'placeholder', label: 'Input placeholder', type: 'text', tab: 'content' },
      { name: 'buttonText', label: 'Button text', type: 'text', tab: 'content' },
    ]
  },
  {
    type: 'footer',
    name: 'Footer',
    settings: [
      { name: 'brand', label: 'Brand name', type: 'text', tab: 'content' },
      { name: 'tagline', label: 'Tagline', type: 'textarea', tab: 'content' },
      { name: 'showSocial', label: 'Show social links', type: 'toggle', tab: 'content' },
    ],
    blocks: {
      type: 'link_column',
      name: 'Link column',
      fields: [
        { name: 'title', label: 'Heading', type: 'text' },
        { name: 'links', label: 'Links (JSON)', type: 'textarea' }
      ]
    }
  },
  {
    type: 'policies',
    name: 'Policies and links',
    settings: [
      { name: 'copyright', label: 'Copyright text', type: 'text', tab: 'content' },
    ],
    blocks: {
      type: 'link',
      name: 'Link',
      fields: [
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'url', label: 'URL', type: 'link' },
      ]
    }
  }
];

export function getSchemaForSection(type: string): SectionSchema | undefined {
  return SECTION_SCHEMAS.find(s => s.type === type);
}
