import re
with open('src/pages/Workspace.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace("import ThemeLibrary from '../components/ThemeLibrary'", "import ThemeLibrary from '../components/ThemeLibrary'\nimport { registry } from '../templates/registry'\nimport { restaurantThemePresets } from '../themes/RestaurantTheme'")

# Add theme recovery logic
find_str = """        if (!themeRecoveryRef.current) {
          themeRecoveryRef.current = createTheme(w.id, 'Default theme')
            .then(async (theme) => {
              await publishTheme(theme.id)
              return { ...theme, isLive: true }
            })"""

replace_str = """        if (!themeRecoveryRef.current) {
          themeRecoveryRef.current = createTheme(w.id, 'Default theme')
            .then(async (theme) => {
              const registryTemplate = registry.flatMap(g => g.categories).flatMap(c => c.templates).find(t => t.slug === w.templateId);
              if (registryTemplate && ['fine-dining', 'cafe', 'bakery', 'fast-food'].includes(registryTemplate.category) || (registryTemplate && registryTemplate.tags.some(tag => tag.label === 'Food & Restaurants'))) {
                 const home = theme.pages.find(p => p.isHomePage) || theme.pages[0];
                 if (home) {
                    const preset = restaurantThemePresets[w.templateId] || restaurantThemePresets['maison-gourmet'] || Object.values(restaurantThemePresets)[0];
                    if (preset) {
                        const properties = {
                           name: preset.name,
                           eyebrow: preset.eyebrow,
                           heroTitle: preset.heroTitle,
                           heroCopy: preset.heroCopy,
                           image1: preset.images[0],
                           image2: preset.images[1],
                           image3: preset.images[2],
                           image4: preset.images[3],
                           menuItem1: preset.menu[0],
                           menuItem2: preset.menu[1],
                           menuItem3: preset.menu[2]
                        };
                        const el = await createElement(home.id, 'restaurant-theme', 'Restaurant Theme', properties, 0);
                        await createElement(home.id, 'nav', 'Navigation', { isHidden: true }, 1);
                        await createElement(home.id, 'hero', 'Hero', { isHidden: true }, 2);
                        await createElement(home.id, 'featured-title', 'Featured Title', { isHidden: true }, 3);
                        await createElement(home.id, 'prod-grid', 'Products', { isHidden: true }, 4);
                        await createElement(home.id, 'img-text', 'Image with Text', { isHidden: true }, 5);
                        await createElement(home.id, 'footer', 'Footer', { isHidden: true }, 6);
                        
                        home.elements = [el, 
                           {id:'temp-nav', pageId: home.id, elementType: 'nav', name: 'Navigation', displayOrder: 1, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''},
                           {id:'temp-hero', pageId: home.id, elementType: 'hero', name: 'Hero', displayOrder: 2, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''},
                           {id:'temp-featured', pageId: home.id, elementType: 'featured-title', name: 'Featured Title', displayOrder: 3, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''},
                           {id:'temp-prod', pageId: home.id, elementType: 'prod-grid', name: 'Products', displayOrder: 4, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''},
                           {id:'temp-img', pageId: home.id, elementType: 'img-text', name: 'Image with Text', displayOrder: 5, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''},
                           {id:'temp-footer', pageId: home.id, elementType: 'footer', name: 'Footer', displayOrder: 6, properties: {isHidden: true}, isEditable: true, isRequired: false, createdAt: '', updatedAt: ''}
                        ]
                    }
                 }
              }

              await publishTheme(theme.id)
              return { ...theme, isLive: true }
            })"""

# Replace hardcoded dashboard preview MINO
find_dash_str = """                        <div className="ws-store-preview-logo" style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>MINO</div>
                        <div className="ws-store-preview-nav" style={{ display: 'flex', gap: '1.25rem', fontSize: '0.7rem', fontWeight: 600, color: '#111' }}>"""

replace_dash_str = """                        <div className="ws-store-preview-logo" style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
                          {registry.flatMap(g => g.categories).flatMap(c => c.templates).find(t => t.slug === website?.templateId)?.name || 'MINO'}
                        </div>
                        <div className="ws-store-preview-nav" style={{ display: 'flex', gap: '1.25rem', fontSize: '0.7rem', fontWeight: 600, color: '#111' }}>"""

# Also replace MINO fallback text in description
content = content.replace("Mino Fashion Store", "{website?.name || 'Mino Fashion Store'}")

# Replace the Mino name on line 520 manually:
content = content.replace(">Mino</span>", ">{registry.flatMap(g => g.categories).flatMap(c => c.templates).find(t => t.slug === website?.templateId)?.name || 'Mino'}</span>")


find_str_n = find_str.replace('\r\n', '\n')
find_dash_str_n = find_dash_str.replace('\r\n', '\n')
content_n = content.replace('\r\n', '\n')

content = content_n.replace(find_str_n, replace_str)
content = content.replace(find_dash_str_n, replace_dash_str)

with open('src/pages/Workspace.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
