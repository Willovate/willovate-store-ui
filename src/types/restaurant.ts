export interface RestaurantConfig {
  id: string;
  name: string;
  tagline: string;
  chef: string;
  address: string;
  hours: string;
  design: {
    theme: 'dark' | 'light';
    palette: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      accent: string;
    };
    typography: {
      heading: string;
      body: string;
      accent: string;
    };
    radius: string;
    shadow: string;
  };
  menu: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[]; // Chef's Pick, New, Seasonal, Vegan, Spicy, Bestseller
  dietary: string[]; // Vegetarian, Vegan, Gluten-free, Halal, Nut-free
  calories?: number;
  options?: MenuOption[];
  addons?: MenuAddon[];
}

export interface MenuOption {
  name: string; // e.g., Portion Size, Cooking Preference
  choices: { label: string; priceOverride?: number }[];
}

export interface MenuAddon {
  name: string; // e.g., Extra Protein
  price: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  options: Record<string, string>;
  addons: string[];
  specialInstructions?: string;
  image: string;
}

export interface Reservation {
  date: string;
  time: string;
  partySize: number;
  seatingPreference: string;
  occasion: string;
  specialRequests: string;
  customerDetails: {
    name: string;
    phone: string;
    email: string;
  };
}
