import os
import re

template_dir = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants"

categories = [
    'bakery', 'fast-food', 'cloud-kitchen', 'pizza', 'indian', 
    'dessert-shop', 'food-delivery', 'bbq-grill', 'fine-dining', 'cafe', 'bbq'
]

img_regex = re.compile(r"img\('photo-([\w\-]+)'\)")

for root, dirs, files in os.walk(template_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                matches = img_regex.findall(content)
                if matches:
                    cat = os.path.basename(os.path.dirname(path))
                    print(f"File: {cat}/{f} uses images: {set(matches)}")
