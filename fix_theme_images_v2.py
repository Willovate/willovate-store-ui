import os
import re
import random

THEME_DIRS = [
    'bakery', 'bbq-grill', 'cloud-kitchen', 'dessert-shop', 'fast-food', 'fine-dining', 'food-delivery', 'indian', 'pizza'
]

# Curated image sets for different categories
IMAGES = {
    'bakery': [
        '1509440159596-0249088772ff', '1555507036-ab1f4038808a', '1495474472287-4d71bcdd2085',
        '1517433367879-1587d62f6b3d', '1486427944299-d1955d23e34d', '1515003197210-e0cd71810b5f',
        '1587245937200-98846c4f923b', '1621236378699-8597ea06145a', '1596683785461-91a5fbcf7cd5',
        '1585449767568-1250267e2a9b', '1611292025732-f19b884968ee', '1628198751532-6b9991cb7934',
        '1578985545045-893f4aa8ddc0', '1511993433611-667dc9e9333f'
    ],
    'fine-dining': [
        '1414235077428-978fa765f242', '1550966871-3ed3cdb5ed0c', '1544148103-0773bf10d330',
        '1424847651672-bf20a4b0982b', '1514362545857-3bc16c4c7d1b', '1559339352-11d035aa65de',
        '1520201163981-8cc95007dd2a', '1504675099198-5223a8de249c', '1414235077428-978fa765f242',
        '1568901346375-23c9450c58cd', '1514361892605-64d43615f208', '1476224203463-994ce3849f57',
        '1511690743698-d9e8d9a7f14b'
    ],
    'fast-food': [
        '1568901346375-23c9450c58cd', '1550547660-d345564cdde2', '1572802419224-296b0aeb8dc7',
        '1551504734-5ee1c4a1479b', '1586190848861-99aa4a171e90', '1610440042744-77a83d0c9f1a',
        '1561758033481-96f7c9e0df36', '1605333396590-4bf69d6718d0', '1598514982205-f36b96d1e8dd',
        '1555507036-ab1f4038808a'
    ],
    'pizza': [
        '1513104890138-7c003666b6ee', '1565299624-44600d685be6', '1574071318508-1cdbab80d002',
        '1590947132387-155cc02f3212', '1576458088443-04a19bb13da6', '1571066811602-7168bd3e13d9',
        '1604382354936-07c5d9983bd3', '1574071318508-1cdbab80d002', '1613564834361-9436948817d1'
    ],
    'indian': [
        '1585937421612-70a008356fbe', '1565557623262-b51c2513a641', '1603894584373-59d04735c3c0',
        '1631452180519-c014df810fec', '1589302168068-964664d93dc8', '1626777552726-2679a61474e2',
        '1642821373181-64d5c4125b01', '1589301760014-9fae2bc496fa', '1517244683847-759021469e32'
    ],
    'bbq-grill': [
        '1529193591184-b1d58069ecdd', '1550547660-d345564cdde2', '1555939594-58d7cb561ad1',
        '1602525227702-61a7a00f074d', '1590213038487-b6f1ef78f657', '1529193591184-b1d58069ecdd',
        '1544025162-836cd5a62e08', '1555939594-58d7cb561ad1'
    ],
    'cloud-kitchen': [
        '1556911220-bff31c812dba', '1504675099198-5223a8de249c', '1555939594-58d7cb561ad1',
        '1576867757430-f56f89efec69', '1605333396590-4bf69d6718d0', '1561758033481-96f7c9e0df36'
    ],
    'dessert-shop': [
        '1558961363-fa8fdf82db35', '1563729784474-d77dbb933a9e', '1551024601-bec78aea704b',
        '1579954115545-cb59636fc3a6', '1628198751532-6b9991cb7934', '1555507036-ab1f4038808a'
    ],
    'food-delivery': [
        '1526367790999-0150786686a2', '1617347454431-eb4a4d65691c', '1615887023516-92864388bd61',
        '1581404043697-36e6c8eafb11', '1621236378699-8597ea06145a', '1605333396590-4bf69d6718d0'
    ]
}

base_dir = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants"

# regex to find img('photo-...')
img_regex = re.compile(r"img\('photo-[A-Za-z0-9\-]+'\)")

def get_random_image(category, used_images):
    # Try to pick an image we haven't used in this file yet
    cat_images = IMAGES.get(category, IMAGES['bakery'])
    available = [img for img in cat_images if img not in used_images]
    if not available:
        available = cat_images
    chosen = random.choice(available)
    used_images.add(chosen)
    return chosen

def process_file(filepath, category):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    used_images = set()
    
    def replacer(match):
        new_img = get_random_image(category, used_images)
        return f"img('photo-{new_img}')"
    
    new_content = img_regex.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for cat in THEME_DIRS:
    cat_dir = os.path.join(base_dir, cat)
    if os.path.exists(cat_dir):
        for file in os.listdir(cat_dir):
            if file.endswith(".tsx"):
                process_file(os.path.join(cat_dir, file), cat)

print("Done fixing images.")
