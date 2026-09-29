import os
import re
import urllib.request
import urllib.error
import random
from concurrent.futures import ThreadPoolExecutor

print("Loading valid images...")
with open('src/themes/RestaurantTheme.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    
safe_matches = re.findall(r"'([0-9]{10,13}-[a-f0-9]+)'", content)
safe_pool = list(set(safe_matches))
valid_images = []

def check_valid(img):
    url = f"https://images.unsplash.com/photo-{img}?w=10"
    try:
        req = urllib.request.Request(url, method='HEAD')
        if urllib.request.urlopen(req, timeout=5).status == 200:
            return img
    except Exception:
        pass
    return None

with ThreadPoolExecutor(max_workers=20) as executor:
    results = executor.map(check_valid, safe_pool)
    for r in results:
        if r:
            valid_images.append(r)

print(f"Found {len(valid_images)} valid images out of {len(safe_pool)}")

directories = ['src/templates/food-restaurants/fine-dining', 'src/themes']

for d in directories:
    for filename in os.listdir(d):
        if not filename.endswith('.tsx'): continue
        path = os.path.join(d, filename)
        with open(path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # Find all Unsplash IDs
        ids = list(set(re.findall(r"(?:photo-)?([0-9]{10,13}-[a-f0-9]+)", code)))
        
        def check_broken(id):
            url = f"https://images.unsplash.com/photo-{id}?w=10"
            try:
                req = urllib.request.Request(url, method='HEAD')
                urllib.request.urlopen(req, timeout=5)
                return None
            except urllib.error.HTTPError as e:
                return (id, e.code)
            except Exception as e:
                return (id, str(e))
                
        with ThreadPoolExecutor(max_workers=20) as executor:
            broken_results = list(executor.map(check_broken, ids))
            
        replacements = {}
        for r in broken_results:
            if r is not None:
                id, err = r
                print(f"{filename}: Broken image {id} ({err})")
                if valid_images:
                    replacements[id] = random.choice(valid_images)
        
        if replacements:
            for bad, good in replacements.items():
                code = code.replace(bad, good)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(code)
            print(f"Fixed {len(replacements)} images in {filename}")

print("Done.")
