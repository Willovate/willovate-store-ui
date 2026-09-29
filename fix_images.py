import os
import re

template_dir = r"e:\Willovate_store\willovate-store-ui\src\templates\food-restaurants"

# Valid image pools (using existing known good images for each category + placeholders if needed)
# In reality, you'd fetch nice IDs from Unsplash API, but we'll use a generic subset of known IDs.
img_pools = {
    'cloud-kitchen': ['1556911220-bff31c812dba', '1556740749-887f6717d7e4', '1600891964092-4316c2883c44', '1546069901-ba9599a7e63c', '1512621776951-a57141f2eefd'],
    'bbq-grill': ['1529193591184-b1d58069ecdd', '1520209759809-a9bcb6cb3241', '1511381939415-e44015466834', '1550547660-d9450f859349'],
    'pizza': ['1513104890138-7c749659a591', '1529042410759-befb1204b468', '1565299624946-b28f40a0ae38', '1574071318508-1cdbab80d002'],
    'indian': ['1585937421612-70a008356fbe', '1540189549336-e6e99c3679fe', '1567188040759-fb8a883dc6d8', '1558030006-450675393462'],
    'fast-food': ['1555939594-58d7cb561ad1', '1540189549336-e6e99c3679fe', '1571115764595-644a1f56a55c', '1568901346375-23c9450c58cd'],
    'dessert-shop': ['1551024506-0bccd828d307', '1558303420-f814d8a590f5', '1556711905-b3f402473b01', '1544025162-d76694265947'],
    'food-delivery': ['1528712306091-ed0763094c98', '1526367790999-0150786686a2', '1498837167922-ddd27525d352', '1600891964092-4316c2883c44'],
    'fine-dining': ['1509042239860-f550ce710b93', '1495474472287-4d71bcdd2085', '1442512595331-e89e73853f31', '1515003197210-e0cd71810b5f'],
    'cafe': ['1497935586351-b67a49e012bf', '1504630083234-14187a9df0f5', '1447933601403-0c6688de566e', '1506224477000-07c7e0e260e9'],
    'bakery': ['1509722747041-616f39b57569', '1552332386-f8dd00dc2f85', '1582058091505-f87a2e55a40f', '1504674900247-0877df9cc836'],
}

img_regex = re.compile(r"img\('photo-([\w\-]+)'\)")

import random

for root, dirs, files in os.walk(template_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            cat = os.path.basename(os.path.dirname(path))
            
            if cat in img_pools:
                pool = img_pools[cat]
                
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Replace each image individually with a random one from the pool to avoid same image everywhere
                def replacer(match):
                    return f"img('photo-{random.choice(pool)}')"
                    
                new_content = img_regex.sub(replacer, content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"Fixed images in {cat}/{f}")
