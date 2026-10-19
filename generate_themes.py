import os
import shutil

# This script will generate the 15 themes for Cloud Kitchen, Food Delivery, and BBQ.

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

base_dir = "e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants"

# 1. Cloud Kitchen Themes
cloud_kitchen_dir = os.path.join(base_dir, "cloud-kitchen")
ensure_dir(cloud_kitchen_dir)

cloud_kitchen_themes = [
    {
        "name": "CloudKitchenPro",
        "file": "CloudKitchenPro.tsx",
        "title": "Cloud Kitchen Pro",
        "content": """import React from 'react';
import { ThemeInteractionProvider, SmoothScrollLink, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function CloudKitchenPro({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#111', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <nav style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{theme.name || 'Cloud Kitchen Pro'}</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <SmoothScrollLink to="#menu">Menu</SmoothScrollLink>
            <SmoothScrollLink to="#about">About</SmoothScrollLink>
            <ThemeCTA action="order" style={{ background: '#ff4d4f', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none' }}>Order Now</ThemeCTA>
          </div>
        </nav>
        
        <header style={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'center', padding: '4rem', background: '#000' }}>
          <img src={theme.images?.hero || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="Hero" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>Data-Driven Delivery</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Optimized for speed, precision, and taste.</p>
            <ThemeCTA action="order" style={{ background: '#ff4d4f', color: '#fff', padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Start Your Order</ThemeCTA>
          </div>
        </header>

        <section id="menu" style={{ padding: '5rem 2rem', background: '#1a1a1a' }}>
          <h3 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Popular Dishes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ background: '#222', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="Food" />
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Signature Bowl {i}</h4>
                  <p style={{ color: '#aaa', marginBottom: '1rem' }}>Premium ingredients prepared in under 5 minutes.</p>
                  <ThemeCTA action="order" style={{ width: '100%', background: '#333', color: '#fff', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add to Order</ThemeCTA>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "UrbanKitchen",
        "file": "UrbanKitchen.tsx",
        "title": "Urban Kitchen",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function UrbanKitchen({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: 'Helvetica, sans-serif' }}>
        <header style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px' }}>URBAN KITCHEN</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem', color: '#666' }}>Modern ghost kitchens powering the city's best flavors.</p>
        </header>
        
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800" style={{ width: '40%', height: '600px', objectFit: 'cover', borderRadius: '24px' }} alt="Food 1" />
          <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800" style={{ width: '40%', height: '600px', objectFit: 'cover', borderRadius: '24px' }} alt="Food 2" />
        </div>

        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <ThemeCTA action="order" style={{ background: '#111', color: '#fff', padding: '1.5rem 4rem', fontSize: '1.5rem', borderRadius: '99px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ORDER DELIVERY NOW</ThemeCTA>
        </div>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "FreshBoxKitchen",
        "file": "FreshBoxKitchen.tsx",
        "title": "FreshBox Kitchen",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function FreshBoxKitchen({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#f0fdf4', color: '#14532d', fontFamily: 'sans-serif' }}>
        <header style={{ display: 'flex', padding: '2rem 5%', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>FreshBox</h1>
          <ThemeCTA action="order" style={{ background: '#16a34a', color: '#fff', padding: '0.75rem 2rem', borderRadius: '99px', border: 'none', cursor: 'pointer' }}>Subscribe</ThemeCTA>
        </header>

        <section style={{ padding: '5rem 5%', display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '2rem' }}>Farm fresh meals, prepped and delivered.</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.8 }}>Healthy eating has never been easier. From our kitchen to your doorstep.</p>
            <ThemeCTA action="order" style={{ background: '#14532d', color: '#fff', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View Weekly Menu</ThemeCTA>
          </div>
          <div style={{ flex: 1 }}>
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} alt="Salad" />
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "MidnightKitchen",
        "file": "MidnightKitchen.tsx",
        "title": "Midnight Kitchen",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function MidnightKitchen({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'monospace' }}>
        <header style={{ padding: '2rem', textAlign: 'center', borderBottom: '1px solid #1e293b' }}>
          <h1 style={{ fontSize: '2rem', color: '#38bdf8' }}>[ MIDNIGHT KITCHEN ]</h1>
          <p style={{ marginTop: '0.5rem', color: '#94a3b8' }}>OPEN 8PM - 4AM</p>
        </header>

        <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'contrast(1.2) saturate(1.5)' }} alt="Burger" />
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>LATE NIGHT CRAVINGS?</h2>
            <ThemeCTA action="order" style={{ background: '#38bdf8', color: '#0f172a', padding: '1rem 3rem', fontSize: '1.25rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>ORDER NOW</ThemeCTA>
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "KitchenExpress",
        "file": "KitchenExpress.tsx",
        "title": "Kitchen Express",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function KitchenExpress({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fafafa', color: '#222', fontFamily: 'sans-serif' }}>
        <header style={{ background: '#fbbf24', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>KITCHEN EXPRESS ⚡</h1>
          <ThemeCTA action="order" style={{ background: '#000', color: '#fff', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>ORDER NOW</ThemeCTA>
        </header>

        <section style={{ padding: '4rem 5%', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: '1 1 250px', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={`https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} alt="Food" />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Combo #{i}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Burger, Fries, Drink</p>
              <ThemeCTA action="order" style={{ width: '100%', background: '#fbbf24', color: '#000', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>ADD - $12.99</ThemeCTA>
            </div>
          ))}
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    }
]

# 2. Food Delivery Themes
food_delivery_dir = os.path.join(base_dir, "food-delivery")
ensure_dir(food_delivery_dir)

food_delivery_themes = [
    {
        "name": "QuickBite",
        "file": "QuickBite.tsx",
        "title": "QuickBite",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function QuickBite({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff', color: '#333', fontFamily: 'sans-serif' }}>
        <header style={{ background: '#ef4444', color: '#fff', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ fontWeight: 800 }}>QuickBite</h1>
          <ThemeCTA action="order" style={{ background: '#fff', color: '#ef4444', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</ThemeCTA>
        </header>
        <section style={{ background: '#fef2f2', padding: '6rem 5%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', color: '#991b1b' }}>Order Food. Delivered Fast.</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <input type="text" placeholder="Enter your delivery address" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
            <ThemeCTA action="order" style={{ background: '#ef4444', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>Find Food</ThemeCTA>
          </div>
        </section>
        <section style={{ padding: '4rem 5%' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Popular near you</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1513104890d38-7c0f413fbca1?w=500" style={{ width: '100%', height: '160px', objectFit: 'cover' }} alt="Pizza" />
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Luigi's Pizza</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Italian • 15-25 min • Free delivery</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "DoorDish",
        "file": "DoorDish.tsx",
        "title": "DoorDish",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function DoorDish({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: 'Helvetica, sans-serif' }}>
        <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea' }}>
          <h1 style={{ fontWeight: 900, color: '#ff3366', fontSize: '1.8rem' }}>DoorDish</h1>
          <ThemeCTA action="order" style={{ background: '#ff3366', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '99px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</ThemeCTA>
        </header>
        <div style={{ display: 'flex', minHeight: '80vh' }}>
          <div style={{ flex: 1, padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem' }}>Restaurants and more,<br/>delivered to your door</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" placeholder="Enter delivery address" style={{ flex: 1, padding: '1.25rem', borderRadius: '99px', border: '1px solid #ccc', fontSize: '1.1rem' }} />
              <ThemeCTA action="order" style={{ background: '#ff3366', color: '#fff', padding: '0 2rem', borderRadius: '99px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Search</ThemeCTA>
            </div>
          </div>
          <div style={{ flex: 1, background: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000) center/cover' }}></div>
        </div>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "MealRush",
        "file": "MealRush.tsx",
        "title": "MealRush",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function MealRush({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#38bdf8', fontWeight: 900, fontStyle: 'italic', fontSize: '2rem' }}>MealRush ⚡</h1>
          <ThemeCTA action="order" style={{ background: '#38bdf8', color: '#0f172a', padding: '0.5rem 1.5rem', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Order Now</ThemeCTA>
        </header>
        <section style={{ padding: '6rem 5%', textAlign: 'center', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>30 Minute Delivery. Guaranteed.</h2>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem' }}>The fastest food delivery network in the city.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
            {['Burgers', 'Pizza', 'Sushi', 'Tacos'].map(cat => (
              <div key={cat} style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{cat}</h3>
                <ThemeCTA action="order" style={{ background: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Explore</ThemeCTA>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "LocalEats",
        "file": "LocalEats.tsx",
        "title": "LocalEats",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function LocalEats({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fdfbf7', color: '#4a4a4a', fontFamily: 'Georgia, serif' }}>
        <header style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#2c7a7b' }}>LocalEats</h1>
          <ThemeCTA action="order" style={{ background: '#2c7a7b', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Support Local</ThemeCTA>
        </header>
        <section style={{ padding: '4rem 5%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#2d3748' }}>Discover the best local flavor.</h2>
          <p style={{ fontSize: '1.25rem', color: '#718096', marginBottom: '3rem' }}>Connecting you with independent restaurants in your neighborhood.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500" style={{ width: '100%', borderRadius: '16px', height: '300px', objectFit: 'cover' }} alt="Restaurant" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500" style={{ width: '100%', borderRadius: '16px', height: '300px', objectFit: 'cover' }} alt="Food" />
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "FoodFleet",
        "file": "FoodFleet.tsx",
        "title": "FoodFleet",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function FoodFleet({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-1px' }}>FoodFleet</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Search restaurants..." style={{ padding: '0.5rem 1rem', borderRadius: '99px', border: '1px solid #ddd', background: '#f5f5f5' }} />
            <ThemeCTA action="order" style={{ background: '#000', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '99px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Log In</ThemeCTA>
          </div>
        </header>
        <div style={{ padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Trending Food Categories</h2>
          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {['Healthy', 'Comfort', 'Asian', 'Mexican', 'Desserts', 'Breakfast'].map(cat => (
              <div key={cat} style={{ minWidth: '150px', height: '150px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    }
]


# 3. BBQ Themes
bbq_dir = os.path.join(base_dir, "bbq") # Using bbq dir
ensure_dir(bbq_dir)

bbq_themes = [
    {
        "name": "Smokehouse",
        "file": "Smokehouse.tsx",
        "title": "Smokehouse",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function Smokehouse({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#111', color: '#fff', fontFamily: 'Courier New, monospace' }}>
        <header style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="BBQ Hero" />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <h1 style={{ fontSize: '5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', border: '4px solid #fff', padding: '1rem 3rem', display: 'inline-block' }}>THE SMOKEHOUSE</h1>
            <p style={{ marginTop: '2rem', fontSize: '1.25rem', letterSpacing: '2px' }}>LOW & SLOW TEXAS BBQ</p>
            <ThemeCTA action="order" style={{ marginTop: '3rem', background: '#d97706', color: '#fff', padding: '1rem 3rem', fontSize: '1.2rem', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' }}>View Menu</ThemeCTA>
          </div>
        </header>
        <section style={{ padding: '5rem 5%', display: 'flex', gap: '2rem', overflowX: 'auto' }}>
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500" style={{ height: '400px', width: '300px', objectFit: 'cover', flexShrink: 0 }} alt="Ribs" />
          <img src="https://images.unsplash.com/photo-1558030006-450675393462?w=500" style={{ height: '400px', width: '300px', objectFit: 'cover', flexShrink: 0 }} alt="Brisket" />
          <img src="https://images.unsplash.com/photo-1593030668930-8130abed266c?w=500" style={{ height: '400px', width: '300px', objectFit: 'cover', flexShrink: 0 }} alt="Pulled Pork" />
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "BackyardBBQ",
        "file": "BackyardBBQ.tsx",
        "title": "Backyard BBQ",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function BackyardBBQ({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#f5f5f4', color: '#44403c', fontFamily: 'Georgia, serif' }}>
        <header style={{ padding: '3rem 5%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', color: '#78350f', fontStyle: 'italic', marginBottom: '1rem' }}>Backyard BBQ</h1>
          <p style={{ fontSize: '1.2rem' }}>Family, Friends, and Fire.</p>
        </header>
        <section style={{ padding: '0 5%', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', height: '60vh' }}>
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} alt="Grilling" />
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
            <img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} alt="Meat" />
            <div style={{ background: '#78350f', color: '#fff', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Weekend Special</h2>
              <ThemeCTA action="order" style={{ background: '#fff', color: '#78350f', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Order Now</ThemeCTA>
            </div>
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "FireAndGrill",
        "file": "FireAndGrill.tsx",
        "title": "Fire & Grill",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function FireAndGrill({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase' }}>Fire & Grill</h1>
          <ThemeCTA action="order" style={{ background: '#ef4444', color: '#fff', padding: '0.5rem 2rem', borderRadius: '2px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>BOOK A TABLE</ThemeCTA>
        </header>
        <section style={{ position: 'relative', padding: '8rem 2rem', textAlign: 'center' }}>
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Flames" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>Ignite Your Tastebuds</h2>
            <ThemeCTA action="order" style={{ marginTop: '2rem', background: 'transparent', color: '#ef4444', border: '3px solid #ef4444', padding: '1rem 3rem', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>SEE THE MENU</ThemeCTA>
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "TexasBBQ",
        "file": "TexasBBQ.tsx",
        "title": "Texas BBQ",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function TexasBBQ({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff8eb', color: '#333', fontFamily: 'serif' }}>
        <div style={{ border: '10px solid #8b4513', margin: '1rem', minHeight: '95vh', padding: '2rem' }}>
          <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '4rem', color: '#8b4513', textTransform: 'uppercase', letterSpacing: '2px' }}>★ Authentic Texas BBQ ★</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>EST. 1998</p>
          </header>
          
          <section style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '300px', textAlign: 'center' }}>
              <img src="https://images.unsplash.com/photo-1558030006-450675393462?w=400" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '50%' }} alt="Brisket" />
              <h3 style={{ fontSize: '2rem', marginTop: '1rem', color: '#8b4513' }}>The Brisket</h3>
            </div>
            <div style={{ width: '300px', textAlign: 'center' }}>
              <img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '50%' }} alt="Ribs" />
              <h3 style={{ fontSize: '2rem', marginTop: '1rem', color: '#8b4513' }}>The Ribs</h3>
            </div>
          </section>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <ThemeCTA action="order" style={{ background: '#8b4513', color: '#fff', padding: '1rem 3rem', fontSize: '1.25rem', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Place Order</ThemeCTA>
          </div>
        </div>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    },
    {
        "name": "ModernBBQ",
        "file": "ModernBBQ.tsx",
        "title": "Modern BBQ",
        "content": """import React from 'react';
import { ThemeInteractionProvider, ThemeCTA } from '../../components/theme-interactions/ThemeInteractions';

export default function ModernBBQ({ theme }: { theme: any }) {
  return (
    <ThemeInteractionProvider>
      <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '1px' }}>MODERN BBQ.</h1>
          <ThemeCTA action="reserve" style={{ background: '#111', color: '#fff', padding: '0.75rem 2rem', borderRadius: '99px', border: 'none', cursor: 'pointer' }}>Reserve</ThemeCTA>
        </header>
        
        <section style={{ padding: '0 5% 4rem' }}>
          <div style={{ height: '60vh', overflow: 'hidden', borderRadius: '24px', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1593030668930-8130abed266c?w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Plated BBQ" />
            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: '#fff', padding: '2rem', borderRadius: '16px', maxWidth: '400px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Elevated Smoke</h2>
              <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>Experience traditional barbecue techniques refined with modern culinary precision.</p>
              <ThemeCTA action="order" style={{ background: '#111', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>View Tasting Menu</ThemeCTA>
            </div>
          </div>
        </section>
      </div>
    </ThemeInteractionProvider>
  );
}
"""
    }
]

def write_themes(themes, out_dir):
    for theme in themes:
        with open(os.path.join(out_dir, theme["file"]), "w", encoding="utf-8") as f:
            f.write(theme["content"])

write_themes(cloud_kitchen_themes, cloud_kitchen_dir)
write_themes(food_delivery_themes, food_delivery_dir)
write_themes(bbq_themes, bbq_dir)

print("Created 15 themes.")
