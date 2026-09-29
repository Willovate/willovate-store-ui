import os
import re
import urllib.request
import urllib.error
import random
import time

print("Loading valid images...")
with open('src/themes/RestaurantTheme.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    
safe_matches = re.findall(r"'([0-9]{10,13}-[a-f0-9]+)'", content)
safe_pool = list(set(safe_matches))

valid_images = []
for img in safe_pool:
    url = f"https://images.unsplash.com/photo-{img}?w=10"
    try:
        req = urllib.request.Request(url, method='HEAD')
        if urllib.request.urlopen(req, timeout=3).status == 200:
            valid_images.append(img)
    except Exception:
        pass
    time.sleep(0.05)

print(f"Found {len(valid_images)} valid images out of {len(safe_pool)}")

directories = ['src/templates/food-restaurants/fine-dining', 'src/themes']

for d in directories:
    for filename in os.listdir(d):
        if not filename.endswith('.tsx'): continue
        path = os.path.join(d, filename)
        with open(path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Find all Unsplash IDs
        ids = set(re.findall(r"(?:photo-)?([0-9]{10,13}-[a-f0-9]+)", code))
        replacements = {}
        for id in ids:
            url = f"https://images.unsplash.com/photo-{id}?w=10"
            try:
                req = urllib.request.Request(url, method='HEAD')
                urllib.request.urlopen(req, timeout=3)
            except urllib.error.HTTPError as e:
                print(f"{filename}: Broken image {id} ({e.code})")
                if valid_images:
                    replacements[id] = random.choice(valid_images)
            except Exception as e:
                print(f"{filename}: Error {id} ({e})")
                if valid_images:
                    replacements[id] = random.choice(valid_images)
            time.sleep(0.05)
        
        if replacements:
            for bad, good in replacements.items():
                code = code.replace(bad, good)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(code)
            print(f"Fixed {len(replacements)} images in {filename}")

print("Done.")
