import os
import re

REGISTRY_PATH = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants\imageRegistry.ts"
BASE_DIR = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants"

# Read registry
with open(REGISTRY_PATH, 'r', encoding='utf-8') as f:
    registry_content = f.read()

# Extract valid IDs per category by matching category: '...' and unsplashId: '...'
import json
category_images = {}

pattern = re.compile(r"unsplashId:\s*'([^']+)',.*?category:\s*'([^']+)'", re.DOTALL)
matches = pattern.findall(registry_content)

for uid, cat in matches:
    # remove photo- prefix if it's there
    uid = uid.replace('photo-', '')
    if cat not in category_images:
        category_images[cat] = []
    category_images[cat].append(uid)

print("Found categories in registry:", category_images.keys())
for k, v in category_images.items():
    print(k, len(v))

# The directories map slightly differently to the registry categories
dir_to_cat = {
    'bakery': 'bakery',
    'bbq-grill': 'bbq',
    'cloud-kitchen': 'cloud-kitchen',
    'dessert-shop': 'dessert',
    'fast-food': 'fast-food',
    'fine-dining': 'fine-dining',
    'food-delivery': 'food-delivery',
    'indian': 'indian',
    'pizza': 'pizza',
    'cafe': 'cafe'
}

img_regex = re.compile(r"img\('photo-[A-Za-z0-9\-]+'\)")

def process_file(filepath, category):
    if category not in category_images or not category_images[category]:
        print(f"Skipping {filepath}, no images for {category}")
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    used = set()
    def replacer(match):
        available = [img for img in category_images[category] if img not in used]
        if not available:
            available = category_images[category]
        import random
        chosen = random.choice(available)
        used.add(chosen)
        return f"img('photo-{chosen}')"
    
    new_content = img_regex.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for theme_dir, cat in dir_to_cat.items():
    cat_path = os.path.join(BASE_DIR, theme_dir)
    if os.path.exists(cat_path):
        for file in os.listdir(cat_path):
            if file.endswith(".tsx"):
                process_file(os.path.join(cat_path, file), cat)

print("Done fixing images from real registry.")
