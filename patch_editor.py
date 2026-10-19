import re

with open('src/components/PageEditor.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
content = content.replace("import type { Page, PageElement } from '../types'", "import type { Page, PageElement } from '../types'\nimport { RestaurantTheme, type RestaurantThemePreset } from '../themes/RestaurantTheme'")

# Add restaurant-theme element
find_str = """          <div
            key={el.id}
            id={`pe-${el.id}`}
            className={`pe-user-element ${isSelected(el.id) ? 'pe-selected' : ''}`}
            onClick={() => onSelectElement?.(el)}
            style={{ position: 'relative' }}
          >
            {el.elementType === 'heading' && ("""

replace_str = """          <div
            key={el.id}
            id={`pe-${el.id}`}
            className={`pe-user-element ${isSelected(el.id) ? 'pe-selected' : ''}`}
            onClick={() => onSelectElement?.(el)}
            style={{ position: 'relative' }}
          >
            {el.elementType === 'restaurant-theme' && (
              <RestaurantTheme
                theme={{
                  ...(el.properties as unknown as RestaurantThemePreset),
                  images: [
                    el.properties?.image1 || '',
                    el.properties?.image2 || '',
                    el.properties?.image3 || '',
                    el.properties?.image4 || ''
                  ],
                  menu: [
                    el.properties?.menuItem1 || '',
                    el.properties?.menuItem2 || '',
                    el.properties?.menuItem3 || ''
                  ]
                } as RestaurantThemePreset}
                compact
              />
            )}
            {el.elementType === 'heading' && ("""

# Normalize line endings for replacement
find_str_n = find_str.replace('\r\n', '\n')
content_n = content.replace('\r\n', '\n')

content = content_n.replace(find_str_n, replace_str)

with open('src/components/PageEditor.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
