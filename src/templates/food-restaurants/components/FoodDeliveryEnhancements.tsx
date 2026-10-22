import React, { useState } from 'react';
import {
  Clock, ShieldCheck, ShoppingBag, ArrowRight, Check, Sparkles,
  Flame, Droplets, MapPin, Truck, Zap, Calendar, Award, PhoneCall,
  Search, RefreshCw, Layers, Plus, Heart, Compass
} from 'lucide-react';
import { useStorefront, type StorefrontThemeConfig, formatPrice, type StoreProduct, FALLBACK_FOOD_IMAGE, handleFoodImageError } from '../shared/FoodStorefrontCore';

// ─── FOOD DELIVERY TYPES & INTERFACES ────────────────────────────────────────

export interface PincodeZone {
  pincode: string;
  neighborhood: string;
  avgTimeMins: number;
  activeCouriers: number;
  deliveryFee: number;
  freeAbove: number;
  status: 'ultra-fast' | 'standard' | 'extended';
}

export interface TiffinMealPlan {
  id: string;
  name: string;
  tier: 'homestyle' | 'high-protein' | 'keto-clean' | 'sattvik-pure';
  pricePerDay: number;
  vessel: string;
  calories: string;
  macros: { protein: string; carbs: string; fats: string };
  sampleDays: { day: string; main: string; dalOrSide: string; breadOrGrain: string; sweetOrSalad: string }[];
  description: string;
  badge: string;
  image: string;
}

export interface LateNightCraveItem {
  id: string;
  name: string;
  category: 'mains' | 'sides' | 'drinks' | 'desserts';
  price: number;
  calories: string;
  description: string;
  spiceRating: number;
  image: string;
  badge?: string;
}

export interface GroupCateringPlatter {
  id: string;
  name: string;
  servesCount: string;
  price: number;
  leadTime: string;
  itemsIncluded: string[];
  setupGear: string;
  description: string;
  image: string;
  badge: string;
}

// ─── CURATED FOOD DELIVERY DATA ──────────────────────────────────────────────

export const POPULAR_PINCODES: Record<string, PincodeZone> = {
  '560038': { pincode: '560038', neighborhood: 'Indiranagar & HAL 2nd Stage', avgTimeMins: 18, activeCouriers: 12, deliveryFee: 0, freeAbove: 299, status: 'ultra-fast' },
  '560095': { pincode: '560095', neighborhood: 'Koramangala 4th & 5th Block', avgTimeMins: 20, activeCouriers: 15, deliveryFee: 0, freeAbove: 299, status: 'ultra-fast' },
  '560001': { pincode: '560001', neighborhood: 'MG Road, Brigade & Central CBD', avgTimeMins: 22, activeCouriers: 9, deliveryFee: 30, freeAbove: 399, status: 'standard' },
  '560076': { pincode: '560076', neighborhood: 'BTM Layout & Bannerghatta Main', avgTimeMins: 25, activeCouriers: 7, deliveryFee: 40, freeAbove: 499, status: 'standard' },
  '560066': { pincode: '560066', neighborhood: 'Whitefield & ITPL Tech Hub', avgTimeMins: 28, activeCouriers: 11, deliveryFee: 50, freeAbove: 599, status: 'extended' },
  '400050': { pincode: '400050', neighborhood: 'Bandra West & Carter Road', avgTimeMins: 19, activeCouriers: 14, deliveryFee: 0, freeAbove: 349, status: 'ultra-fast' },
  '110024': { pincode: '110024', neighborhood: 'Defence Colony & Lajpat Nagar', avgTimeMins: 21, activeCouriers: 10, deliveryFee: 0, freeAbove: 349, status: 'ultra-fast' }
};

export const TIFFIN_MEAL_PLANS: TiffinMealPlan[] = [
  {
    id: 'gharka-khana-dabba',
    name: 'Ghar Ka Khana Homestyle Dabba',
    tier: 'homestyle',
    pricePerDay: 199,
    vessel: 'Insulated 4-Tier Stainless Steel Dabba (Returnable)',
    calories: '650 kcal / meal',
    macros: { protein: '24g', carbs: '85g', fats: '18g' },
    sampleDays: [
      { day: 'Monday', main: 'Paneer Butter Masala', dalOrSide: 'Panchmel Tadka Dal', breadOrGrain: '3 Phulkas + Jeera Rice', sweetOrSalad: 'Cucumber Kosambari' },
      { day: 'Tuesday', main: 'Bhindi Do Pyaza', dalOrSide: 'Dhabe Wali Dal Fry', breadOrGrain: '3 Tawa Rotis + Steamed Basmati', sweetOrSalad: 'Fresh Mint Raita' },
      { day: 'Wednesday', main: 'Aloo Gobi Adraki', dalOrSide: 'Gujarati Khatti Meethi Dal', breadOrGrain: '3 Multigrain Rotis + Brown Rice', sweetOrSalad: 'Gulab Jamun (1 pc)' },
      { day: 'Thursday', main: 'Methi Malai Matar', dalOrSide: 'Chana Masala Amritsari', breadOrGrain: '3 Phulkas + Ghee Rice', sweetOrSalad: 'Kachumber Salad' },
      { day: 'Friday', main: 'Kadai Mushroom', dalOrSide: 'Maa Ki Dal (Slow Simmered)', breadOrGrain: '2 Laccha Parathas + Peas Pulao', sweetOrSalad: 'Kesar Phirni' }
    ],
    description: 'Freshly rolled whole-wheat phulkas, seasonal vegetable curries, and unadulterated cold-pressed oil tadkas. Tastes just like Mom’s kitchen with zero artificial colors or preservatives.',
    badge: 'DAILY BESTSELLER',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'lean-muscle-fuel',
    name: 'High-Protein Muscle Nourish Box',
    tier: 'high-protein',
    pricePerDay: 289,
    vessel: 'BPA-Free Microwaveable Compartment Tray',
    calories: '720 kcal / meal',
    macros: { protein: '52g', carbs: '60g', fats: '16g' },
    sampleDays: [
      { day: 'Monday', main: 'Herb-Grilled Chicken Breast (200g)', dalOrSide: 'Steamed Broccoli & Baby Corn', breadOrGrain: 'Organic Quinoa & Brown Rice', sweetOrSalad: 'Greek Yogurt Herb Dip' },
      { day: 'Tuesday', main: 'Pan-Seared Teriyaki Tofu & Edamame', dalOrSide: 'Charred Bell Peppers & Zucchini', breadOrGrain: 'Wild Black Rice', sweetOrSalad: 'Sprouted Moong Salad' },
      { day: 'Wednesday', main: 'Tandoori Spiced Turkey Mince Koftas', dalOrSide: 'Black Lentil Protein Stew', breadOrGrain: 'Sweet Potato Mash', sweetOrSalad: 'Cucumber Mint Raita' },
      { day: 'Thursday', main: 'Lemon Rosemary Grilled Tilapia', dalOrSide: 'Sautéed Garlic Spinach', breadOrGrain: 'Couscous & Roasted Seeds', sweetOrSalad: 'Citrus Beet Slaw' },
      { day: 'Friday', main: 'BBQ Charred Cottage Cheese Skewers', dalOrSide: 'Chickpea Protein Medley', breadOrGrain: 'Jowar Bhakri (2 pcs)', sweetOrSalad: 'Protein Chia Pudding' }
    ],
    description: 'Weigh-ins calibrated to exactly 50g+ lean protein per box. Minimal oil, low glycemic carbohydrates, and certified clean nutrition for athletic performance and recovery.',
    badge: '50G+ PROTEIN',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'sattvik-vedic-lunchbox',
    name: 'Sattvik Temple Pure Veg Tiffin',
    tier: 'sattvik-pure',
    pricePerDay: 219,
    vessel: 'Biodegradable Sugarcane Bagasse Carrier',
    calories: '580 kcal / meal',
    macros: { protein: '20g', carbs: '78g', fats: '14g' },
    sampleDays: [
      { day: 'Monday', main: 'Lauki Chana Dal with Hing Tadka', dalOrSide: 'Raw Banana Sukka', breadOrGrain: '3 Jowar Phulkas + Red Matta Rice', sweetOrSalad: 'Amla Chutney & Chaas' },
      { day: 'Tuesday', main: 'Pumpkin & Fenugreek Stew', dalOrSide: 'Moong Dal Panchratna', breadOrGrain: '3 Whole Wheat Rotis + Rice', sweetOrSalad: 'Pomegranate Kosambari' },
      { day: 'Wednesday', main: 'Gir Cow Paneer Makhana Korma', dalOrSide: 'Yellow Moong Tadka with Jeera', breadOrGrain: '3 Millet Rotis + Samak Rice', sweetOrSalad: 'Curd & Roasted Cumin' },
      { day: 'Thursday', main: 'Suran (Elephant Yam) Roast', dalOrSide: 'Ayurvedic Rasam with Curry Leaves', breadOrGrain: 'Steamed Rice + 2 Ragi Rotis', sweetOrSalad: 'Fresh Mint Coriander Pachadi' },
      { day: 'Friday', main: 'Cluster Beans & Coconut Thoran', dalOrSide: 'Toor Dal with Tomato & Lemon', breadOrGrain: '3 Phulkas + Brown Rice', sweetOrSalad: 'Jaggery Rice Payasam' }
    ],
    description: 'Rooted in ancient Vedic culinary wisdom. 100% vegetarian, zero onion, zero garlic, cooked with pure A2 cow ghee, fresh rock salt, and farm-fresh organic produce.',
    badge: '100% SATTVIK',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85'
  }
];

export const LATE_NIGHT_MUNCHIES: LateNightCraveItem[] = [
  {
    id: 'smash-double-cheeseburger',
    name: 'The 2:00 AM Double Smashed Wagyu Melt',
    category: 'mains',
    price: 380,
    calories: '820 kcal',
    description: 'Two crispy-edged smashed beef/mutton patties, double American melted cheese, grilled caramelized onions, house burger sauce on toasted brioche.',
    spiceRating: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=85',
    badge: 'NIGHT OWL FAVORITE'
  },
  {
    id: 'ghost-pepper-crispy-wings',
    name: 'Ghost Pepper Hot Wings (8 pcs)',
    category: 'mains',
    price: 340,
    calories: '650 kcal',
    description: 'Extra-crispy twice-fried chicken wings drenched in fiery Bhut Jolokia glaze, served with cooling blue cheese dip and celery sticks.',
    spiceRating: 5,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=85',
    badge: 'FIERY 5-FLAME'
  },
  {
    id: 'truffle-parm-animal-fries',
    name: 'Loaded Animal Monster Fries',
    category: 'sides',
    price: 240,
    calories: '540 kcal',
    description: 'Golden crinkle-cut fries piled high with molten cheddar sauce, caramelized shallots, pickled jalapeños, and bacon jam drizzle.',
    spiceRating: 2,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=85',
    badge: 'INDULGENT'
  },
  {
    id: 'nutella-smores-thickshake',
    name: 'Nutella S’mores Molten Shake',
    category: 'drinks',
    price: 220,
    calories: '490 kcal',
    description: 'Rich whole-milk vanilla shake blended with 3 scoops of Nutella, topped with blowtorched marshmallow fluff and graham cracker dust.',
    spiceRating: 0,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=85',
    badge: 'DESSERT SHAKE'
  }
];

export const GROUP_CATERING_PLATTERS: GroupCateringPlatter[] = [
  {
    id: 'corporate-boardroom-platter',
    name: 'The Executive Boardroom Feast Box',
    servesCount: '10 to 12 Guests',
    price: 3450,
    leadTime: '2 Hours Notice (Same Day)',
    itemsIncluded: [
      '12x Artisanal Gourmet Brioche Sliders (Chicken & Paneer Trio)',
      '10x Superfood Grain & Avocado Nourish Bowls (Mini)',
      'Large Truffle Parmesan Crinkle Fry Tub with 4 Dips',
      '12x Chilled Sparkling Cold-Pressed Juices & Lemonades',
      '12x Valrhona Chocolate Sea Salt Fudge Brownie Squares'
    ],
    setupGear: 'Includes eco-friendly sugarcane tableware, birchwood cutlery, and napkins',
    description: 'Designed for high-stakes client pitches, executive meetings, and tech town halls. Perfectly portioned, zero mess, and delivered in sleek branded thermal carry totes.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85',
    badge: 'CORPORATE FAVORITE'
  },
  {
    id: 'hackathon-night-mega-spread',
    name: 'The Late-Night Hackathon Mega Platter',
    servesCount: '15 to 20 Developers',
    price: 4950,
    leadTime: '90 Minutes Flash Dispatch',
    itemsIncluded: [
      '4x 16-Inch Stone-Baked NY Style Pizzas (Pepperoni & Margherita)',
      '32x Crispy Buttermilk Chicken Tenders with 6 Secret Sauces',
      'Double Mountain of Loaded Animal Cheesy Fries',
      '16x Chilled Red Bull Energy Cans & Monster Sodas',
      '20x Hot NYC Molten Double Chocolate Cookies'
    ],
    setupGear: 'Includes disposable warming chafing mats, wet wipes, and paper plates',
    description: 'Fueling overnight sprints and product releases. High-octane finger foods designed for rapid eating while debugging code without greasing the keyboards.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85',
    badge: 'DEVELOPER POWER'
  }
];

// ─── 1. EXPRESS DELIVERY RADAR & PINCODE CHECKER ─────────────────────────────

export function ExpressDeliveryRadarSection() {
  const { theme } = useStorefront();
  const [inputPincode, setInputPincode] = useState<string>('');
  const [checkedZone, setCheckedZone] = useState<PincodeZone | null>(POPULAR_PINCODES['560038']);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPincode.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const match = POPULAR_PINCODES[inputPincode.trim()];
      if (match) {
        setCheckedZone(match);
      } else {
        // Fallback realistic simulation for any valid 6-digit pin
        setCheckedZone({
          pincode: inputPincode.trim(),
          neighborhood: 'Verified Metro Service District',
          avgTimeMins: 24,
          activeCouriers: 8,
          deliveryFee: 35,
          freeAbove: 399,
          status: 'standard'
        });
      }
      setIsSearching(false);
    }, 400);
  };

  return (
    <section
      id="express-delivery-radar"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Zap size={14} color={theme.palette.primary} />
            <span>Hyperlocal GPS Dispatch Radar</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            20-Minute Doorstep SLA.
            <br />
            <span style={{ color: theme.palette.primary }}>Check Live Courier Radar in Your Pincode.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            We don’t rely on distant third-party riders. Our dedicated electric bike fleet operates from
            hyperlocal neighborhood micro-kitchens equipped with 68°C heated thermal bags to guarantee crispy fries
            and piping hot broths.
          </p>
        </div>

        {/* Pincode Input Form */}
        <div style={{ maxWidth: '580px', margin: '0 auto 3.5rem auto' }}>
          <form
            onSubmit={handleCheckPincode}
            style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: theme.palette.surface,
              padding: '0.5rem',
              borderRadius: '16px',
              border: `2px solid ${theme.palette.border}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', flex: 1, gap: '0.5rem' }}>
              <MapPin size={18} color={theme.palette.primary} />
              <input
                type="text"
                placeholder="Enter your 6-digit delivery pincode (e.g. 560038)"
                value={inputPincode}
                onChange={e => setInputPincode(e.target.value)}
                maxLength={6}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: theme.palette.text,
                  fontSize: '0.92rem',
                  fontWeight: 600
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              style={{
                padding: '0.75rem 1.4rem',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSearching ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
              <span>Verify Radar</span>
            </button>
          </form>

          {/* Quick preset chips */}
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, marginRight: '0.25rem' }}>Popular hubs:</span>
            {['560038', '560095', '400050', '110024'].map(pin => (
              <button
                key={pin}
                onClick={() => {
                  setInputPincode(pin);
                  setCheckedZone(POPULAR_PINCODES[pin]);
                }}
                style={{
                  background: 'none',
                  border: `1px solid ${theme.palette.border}`,
                  borderRadius: '999px',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.72rem',
                  color: theme.palette.textMuted,
                  cursor: 'pointer'
                }}
              >
                {pin}
              </button>
            ))}
          </div>
        </div>

        {/* Live Radar Telemetry Display */}
        {checkedZone && (
          <div
            style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '24px',
              border: `1px solid ${theme.palette.border}`,
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    boxShadow: '0 0 8px #16a34a',
                    display: 'inline-block'
                  }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>
                  Live Dispatch Active
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.palette.text, margin: '2px 0 4px 0' }}>
                {checkedZone.neighborhood}
              </h3>
              <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, margin: 0 }}>
                Zone Pincode: <strong>{checkedZone.pincode}</strong> • Guaranteed hot food delivery
              </p>
            </div>

            <div
              style={{
                backgroundColor: theme.palette.background,
                padding: '1rem',
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <Clock size={28} color={theme.palette.primary} />
              <div>
                <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Estimated Door Drop Time
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.primary }}>
                  ~{checkedZone.avgTimeMins} Minutes
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: theme.palette.background,
                padding: '1rem',
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <Truck size={28} color="#16a34a" />
              <div>
                <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Active Couriers on Radar
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text }}>
                  {checkedZone.activeCouriers} Electric Bikes Nearby
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: theme.palette.background,
                padding: '1rem',
                borderRadius: '14px',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <ShieldCheck size={28} color="#eab308" />
              <div>
                <div style={{ fontSize: '0.72rem', color: theme.palette.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
                  Delivery Fee SLA
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: theme.palette.text }}>
                  {checkedZone.deliveryFee === 0 ? 'FREE EXPRESS' : formatPrice(checkedZone.deliveryFee, theme.currencySymbol)}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.palette.textMuted, marginLeft: '4px' }}>
                    (Free &gt; {formatPrice(checkedZone.freeAbove, theme.currencySymbol)})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 2. TIFFIN & MEAL PREP SUBSCRIPTION BUILDER ──────────────────────────────

export function TiffinSubscriptionBuilderSection() {
  const { theme, addToCart } = useStorefront();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(TIFFIN_MEAL_PLANS[0].id);
  const [subscriptionDuration, setSubscriptionDuration] = useState<'5-day' | '7-day' | '30-day'>('5-day');
  const [selectedSlot, setSelectedSlot] = useState<'lunch' | 'dinner' | 'both'>('lunch');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activePlan = TIFFIN_MEAL_PLANS.find(p => p.id === selectedPlanId) || TIFFIN_MEAL_PLANS[0];

  const daysCount = subscriptionDuration === '5-day' ? 5 : subscriptionDuration === '7-day' ? 7 : 30;
  const slotMultiplier = selectedSlot === 'both' ? 1.85 : 1; // 15% discount on double slot
  const totalPrice = Math.round(activePlan.pricePerDay * daysCount * slotMultiplier);

  const handleSubscribeTiffin = () => {
    const subProduct: StoreProduct = {
      id: `tiffin-sub-${activePlan.id}-${subscriptionDuration}-${selectedSlot}-${Date.now()}`,
      name: `${activePlan.name} (${daysCount}-Day Subscription)`,
      description: `${subscriptionDuration.toUpperCase()} Plan • Slot: ${selectedSlot.toUpperCase()} • Daily Calories: ${activePlan.calories} • Vessel: ${activePlan.vessel}`,
      price: totalPrice,
      category: 'meal-subscriptions',
      image: activePlan.image,
      tags: ['tiffin', 'subscription', 'meal-prep'],
      leadTime: 'Starts next business day'
    };

    addToCart(subProduct, {}, 1);
    setToastMessage(`Enrolled in ${activePlan.name} (${daysCount} Days - ${selectedSlot.toUpperCase()})!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="tiffin-meal-subscription"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.surface,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Calendar size={14} color={theme.palette.primary} />
            <span>Homestyle Tiffin & Meal Prep Subscriptions</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            No Daily Ordering Hassle.
            <br />
            <span style={{ color: theme.palette.primary }}>Chef-Rotated Menus at Your Door Like Clockwork.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            Whether you crave authentic homestyle phulkas and dal in stainless steel insulated dabbas or
            macro-counted high-protein clean boxes, our recurring plans save you 25% and bring peace of mind.
          </p>
        </div>

        {/* Plan Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
          {TIFFIN_MEAL_PLANS.map(plan => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                style={{
                  backgroundColor: theme.palette.background,
                  borderRadius: '20px',
                  border: `2px solid ${isSelected ? theme.palette.primary : theme.palette.border}`,
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 28px rgba(0,0,0,0.12)' : 'none',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px'
                    }}
                  >
                    {plan.badge}
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.primary }}>
                    {formatPrice(plan.pricePerDay, theme.currencySymbol)}
                    <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted, fontWeight: 500 }}>/day</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: theme.palette.text, marginBottom: '0.5rem' }}>
                  {plan.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
                  {plan.description}
                </p>

                {/* Macro breakdown */}
                <div
                  style={{
                    backgroundColor: theme.palette.surface,
                    borderRadius: '12px',
                    padding: '0.75rem',
                    border: `1px solid ${theme.palette.border}`,
                    fontSize: '0.78rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <span><strong>Protein:</strong> {plan.macros.protein}</span>
                  <span><strong>Carbs:</strong> {plan.macros.carbs}</span>
                  <span><strong>Fats:</strong> {plan.macros.fats}</span>
                </div>

                <div style={{ fontSize: '0.75rem', color: theme.palette.textMuted }}>
                  🍱 <strong>Carrier:</strong> {plan.vessel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Plan Weekly Menu & Subscription Config */}
        <div
          style={{
            backgroundColor: theme.palette.background,
            borderRadius: '24px',
            border: `1px solid ${theme.palette.border}`,
            padding: '2.5rem',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Left: 5-Day Menu Preview */}
            <div>
              <div style={{ fontSize: '0.8rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Weekly Rotational Menu Preview
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.palette.text, marginBottom: '1.25rem' }}>
                What’s In The Dabba This Week ({activePlan.name})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {activePlan.sampleDays.map(item => (
                  <div
                    key={item.day}
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: theme.palette.surface,
                      borderRadius: '12px',
                      border: `1px solid ${theme.palette.border}`,
                      fontSize: '0.82rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <strong style={{ color: theme.palette.primary }}>{item.day}</strong>
                      <span style={{ color: theme.palette.textMuted }}>{item.breadOrGrain}</span>
                    </div>
                    <div style={{ color: theme.palette.text, fontWeight: 600 }}>
                      {item.main} &bull; {item.dalOrSide}
                    </div>
                    <div style={{ color: theme.palette.textMuted, fontSize: '0.75rem', marginTop: '2px' }}>
                      Accomp: {item.sweetOrSalad}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Customization Controls & Checkout */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Subscription Duration:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[
                    { id: '5-day', label: '5-Day Workweek' },
                    { id: '7-day', label: '7-Day Complete' },
                    { id: '30-day', label: '30-Day Monthly Pass' }
                  ].map(dur => (
                    <button
                      key={dur.id}
                      onClick={() => setSubscriptionDuration(dur.id as any)}
                      style={{
                        flex: 1,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        backgroundColor: subscriptionDuration === dur.id ? theme.palette.primary : theme.palette.surface,
                        color: subscriptionDuration === dur.id ? '#ffffff' : theme.palette.text,
                        border: `1px solid ${subscriptionDuration === dur.id ? theme.palette.primary : theme.palette.border}`,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Delivery Meal Slot:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[
                    { id: 'lunch', label: 'Lunch (12:30 PM)' },
                    { id: 'dinner', label: 'Dinner (8:00 PM)' },
                    { id: 'both', label: 'Lunch + Dinner (Save 15%)' }
                  ].map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id as any)}
                      style={{
                        flex: 1,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        backgroundColor: selectedSlot === slot.id ? theme.palette.primary : theme.palette.surface,
                        color: selectedSlot === slot.id ? '#ffffff' : theme.palette.text,
                        border: `1px solid ${selectedSlot === slot.id ? theme.palette.primary : theme.palette.border}`,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: theme.palette.surface,
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: `1px solid ${theme.palette.border}`,
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: theme.palette.textMuted }}>Duration & Slots:</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: theme.palette.text }}>
                    {daysCount} Days &bull; {selectedSlot.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: `1px solid ${theme.palette.border}` }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: theme.palette.text }}>Subscription Total:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: theme.palette.primary }}>
                    {formatPrice(totalPrice, theme.currencySymbol)}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.4rem', textAlign: 'right', fontWeight: 600 }}>
                  ✓ Pause, resume, or skip dates anytime via customer portal
                </div>
              </div>

              <button
                onClick={handleSubscribeTiffin}
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)'
                }}
              >
                <ShoppingBag size={18} />
                <span>Start Subscription &bull; {formatPrice(totalPrice, theme.currencySymbol)}</span>
              </button>
            </div>
          </div>
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 3. LATE-NIGHT CRAVE LAB SECTION ─────────────────────────────────────────

export function LateNightCraveLabSection() {
  const { theme, addToCart } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderMunchie = (item: LateNightCraveItem) => {
    const prod: StoreProduct = {
      id: `latenight-${item.id}-${Date.now()}`,
      name: `${item.name} (Late-Night Crave)`,
      description: `${item.description} • Calories: ${item.calories}`,
      price: item.price,
      category: 'late-night',
      image: item.image,
      tags: ['late-night', 'insomnia-bites', 'comfort-food']
    };

    addToCart(prod, {}, 1);
    setToastMessage(`Added ${item.name} to late-night order!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="late-night-crave-lab"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Flame size={14} color="#ea580c" />
            <span>10:00 PM – 4:00 AM Insomnia Hub</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Nocturnal Cravings. Sizzling Griddles.
            <br />
            <span style={{ color: theme.palette.primary }}>Delivered While the City Sleeps.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            When midnight hunger hits, regular delivery shuts down or serves cold limp snacks.
            Our dedicated late-night kitchens stay fired up until 4:00 AM with double smash burgers,
            molten cheese fries, and thick shakes.
          </p>
        </div>

        {/* Munchies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {LATE_NIGHT_MUNCHIES.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '18px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border}`,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={item.image || FALLBACK_FOOD_IMAGE}
                  alt={item.name}
                  onError={handleFoodImageError}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: theme.palette.primary,
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800
                  }}
                >
                  {formatPrice(item.price, theme.currencySymbol)}
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: theme.palette.text, marginBottom: '0.45rem' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: theme.palette.textMuted, lineHeight: 1.55, marginBottom: '1rem', flex: 1 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: theme.palette.textMuted, fontWeight: 600 }}>
                    ⚡ {item.calories}
                  </span>
                  {item.spiceRating > 0 && (
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <Flame
                          key={lvl}
                          size={12}
                          color={lvl <= item.spiceRating ? '#ea580c' : 'rgba(150,150,150,0.3)'}
                          fill={lvl <= item.spiceRating ? '#ea580c' : 'transparent'}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleOrderMunchie(item)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Order Late-Night Munchie</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 4. MULTI-KITCHEN CORPORATE & CATERING PLATTER ───────────────────────────

export function MultiKitchenCateringSection() {
  const { theme, addToCart } = useStorefront();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOrderPlatter = (platter: GroupCateringPlatter) => {
    const prod: StoreProduct = {
      id: `catering-${platter.id}-${Date.now()}`,
      name: platter.name,
      description: `${platter.description} • ${platter.servesCount} • Setup: ${platter.setupGear}`,
      price: platter.price,
      category: 'catering-platters',
      image: platter.image,
      tags: ['catering', 'corporate', 'group-order'],
      leadTime: platter.leadTime,
      portion: platter.servesCount
    };

    addToCart(prod, {}, 1);
    setToastMessage(`Added ${platter.name} (${platter.servesCount}) to order!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section
      id="multi-kitchen-catering"
      style={{
        padding: '5.5rem 1.5rem',
        backgroundColor: theme.palette.surface,
        color: theme.palette.text,
        borderBottom: `1px solid ${theme.palette.border}`
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              backgroundColor: theme.palette.badgeBg,
              color: theme.palette.badgeText,
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: `1px solid ${theme.palette.border}`
            }}
          >
            <Award size={14} color={theme.palette.primary} />
            <span>Team Feasts & Corporate Catering</span>
          </div>

          <h2
            style={{
              fontFamily: theme.typography.headingFont,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: theme.palette.text
            }}
          >
            Feeding 10 to 50 People?
            <br />
            <span style={{ color: theme.palette.primary }}>One Seamless Cart. One Unified Delivery.</span>
          </h2>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: theme.palette.textMuted
            }}
          >
            No more coordinating 12 separate orders on different phones. Our catering fleet provides complete
            banquet packages with warming chafing equipment, eco tableware, and guaranteed scheduled arrival.
          </p>
        </div>

        {/* Platters Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {GROUP_CATERING_PLATTERS.map(platter => (
            <div
              key={platter.id}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '24px',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.border}`,
                boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={platter.image || FALLBACK_FOOD_IMAGE}
                  alt={platter.name}
                  onError={handleFoodImageError}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px'
                  }}
                >
                  {platter.badge}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '12px',
                    fontSize: '1.25rem',
                    fontWeight: 800
                  }}
                >
                  {formatPrice(platter.price, theme.currencySymbol)}
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: theme.palette.primary, fontWeight: 700, textTransform: 'uppercase' }}>
                    👥 {platter.servesCount}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: theme.palette.textMuted }}>
                    ⏱️ {platter.leadTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.palette.text, marginBottom: '0.75rem' }}>
                  {platter.name}
                </h3>

                <p style={{ fontSize: '0.9rem', color: theme.palette.textMuted, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {platter.description}
                </p>

                {/* Items Included List */}
                <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: theme.palette.textMuted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Platter Inclusions:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {platter.itemsIncluded.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: theme.palette.text }}>
                        <Check size={14} color={theme.palette.primary} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: theme.palette.surface,
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    color: theme.palette.textMuted,
                    marginBottom: '1.5rem',
                    border: `1px solid ${theme.palette.border}`
                  }}
                >
                  🍽️ <strong>Setup:</strong> {platter.setupGear}
                </div>

                <button
                  onClick={() => handleOrderPlatter(platter)}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Order Group Catering &bull; {formatPrice(platter.price, theme.currencySymbol)}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 9999
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── 5. LIVE FOOD DELIVERY STATUS BAR ────────────────────────────────────────

export function LiveFoodDeliveryStatusBar() {
  const { theme, setActivePage } = useStorefront();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border}`,
        padding: '0.65rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 900,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Live couriers status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              boxShadow: '0 0 8px #16a34a',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.palette.text }}>
            Hyperlocal Fleet Active: Avg 21 Min Door Drop
          </span>
        </div>

        {/* Thermal bag guarantee */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <ShieldCheck size={14} color={theme.palette.primary} />
          <span>68°C Thermal Bag Isolation Sealed</span>
        </div>

        {/* Pincode check */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.palette.textMuted, fontSize: '0.82rem' }}>
          <Zap size={14} color="#ea580c" />
          <span>Instant GPS Dispatch Online</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => {
            const el = document.getElementById('express-delivery-radar');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: theme.palette.text,
            border: `1px solid ${theme.palette.border}`,
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Check Pincode SLA
        </button>

        <button
          onClick={() => setActivePage('menu')}
          style={{
            padding: '0.45rem 1.1rem',
            borderRadius: '8px',
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}
        >
          <Truck size={14} />
          <span>Order Express Delivery</span>
        </button>
      </div>
    </div>
  );
}
