import os
import re

DIR = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants\fine-dining"

LAYOUTS = {
    "NoirEmber": """<AnnouncementBar text={`🔥 ${theme.tagline}`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <FeaturesStrip theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantMenu theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />""",
    
    "IvoryCourt": """<RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantMenu theme={theme} />
      <FeaturesStrip theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />""",

    "AzureBistro": """<AnnouncementBar text={`🌊 ${theme.tagline}`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantGallery theme={theme} />
      <RestaurantMenu theme={theme} />
      <PromoSection theme={theme} />
      <FeaturesStrip theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />""",

    "VelvetTable": """<RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <FeaturesStrip theme={theme} />
      <PromoSection theme={theme} />
      <RestaurantMenu theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantGallery theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />""",

    "MinimalOmakase": """<AnnouncementBar text={`🍣 ${theme.tagline}`} palette={theme.palette} />
      <RestaurantNavbar theme={theme} />
      <RestaurantHero theme={theme} />
      <RestaurantGallery theme={theme} />
      <RestaurantStory theme={theme} />
      <RestaurantMenu theme={theme} />
      <FeaturesStrip theme={theme} />
      <PromoSection theme={theme} />
      <Testimonials theme={theme} />
      <LocationCTA theme={theme} />
      <RestaurantFooter theme={theme} />"""
}

# 1515003197210-e0cd71810b5f is a burger / food delivery image. 
# We'll replace it with 1544148103-0773bf10d330 (Fine dining seafood / oysters)
# We'll replace 1558030137-a56c1b002c99 (Dry aging room, might be unrelated) with 1581184953963-d1597158bc51 (Fine dining chef)

for filename, layout_code in LAYOUTS.items():
    filepath = os.path.join(DIR, f"{filename}.tsx")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update imports
    content = re.sub(
        r"import \{ RestaurantPage, type RestaurantThemeConfig \} from '\.\./components/RestaurantCore';",
        "import { AnnouncementBar, RestaurantNavbar, RestaurantHero, FeaturesStrip, RestaurantStory, RestaurantMenu, PromoSection, RestaurantGallery, Testimonials, LocationCTA, RestaurantFooter, type RestaurantThemeConfig } from '../components/RestaurantCore';",
        content
    )

    # 2. Replace bad images with verified fine dining images
    content = content.replace("1515003197210-e0cd71810b5f", "1544148103-0773bf10d330") # Replace Burger with Fine dining seafood
    content = content.replace("1558030137-a56c1b002c99", "1581184953963-d1597158bc51") # Replace possible non-fine-dining with Chef
    content = content.replace("photo-1541592106381-b31e9677c0e5", "photo-1519708227418-c8fd9a32b7a2") # Replace mac & cheese with Scallops

    # 3. Replace the export default function
    pattern = rf"export default function {filename}\(\) {{ return <RestaurantPage theme={{theme}} />; }}"
    
    new_func = f"""export default function {filename}() {{
  return (
    <div style={{{{ backgroundColor: theme.palette.background, fontFamily: theme.typography.body, overflowX: 'hidden', minHeight: '100vh' }}}}>
      {layout_code}
    </div>
  );
}}"""
    
    content = re.sub(pattern, new_func, content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {filename}")
