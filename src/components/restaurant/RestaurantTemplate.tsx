import React, { useEffect } from 'react';
import type { RestaurantConfig } from '../../types/restaurant';
import { RestaurantProvider } from '../../store/RestaurantContext';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { MenuSection } from './sections/MenuSection';
import { DishModal } from './modals/DishModal';
import { OrderDrawer } from './modals/OrderDrawer';
import { ReservationModal } from './modals/ReservationModal';
import type { MenuItem } from '../../types/restaurant';
import './RestaurantTheme.css';

export function RestaurantTemplate({ config }: { config: RestaurantConfig }) {
  const [selectedDish, setSelectedDish] = React.useState<MenuItem | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--rt-bg', config.design.palette.background);
    root.style.setProperty('--rt-text', config.design.palette.text);
    root.style.setProperty('--rt-primary', config.design.palette.primary);
    root.style.setProperty('--rt-secondary', config.design.palette.secondary);
    root.style.setProperty('--rt-accent', config.design.palette.accent);
    root.style.setProperty('--rt-font-heading', config.design.typography.heading);
    root.style.setProperty('--rt-font-body', config.design.typography.body);
    root.style.setProperty('--rt-font-accent', config.design.typography.accent);
    root.style.setProperty('--rt-radius', config.design.radius);
    root.style.setProperty('--rt-shadow', config.design.shadow);
  }, [config]);

  return (
    <RestaurantProvider>
      <div className="rt-app" style={{ 
        backgroundColor: 'var(--rt-bg)', 
        color: 'var(--rt-text)',
        fontFamily: 'var(--rt-font-body)',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Nav config={config} />
        <main>
          <Hero config={config} />
          <MenuSection config={config} onDishClick={setSelectedDish} />
        </main>
        <Footer config={config} />
        
        {/* Modals & Overlays */}
        {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}
        <OrderDrawer />
        <ReservationModal onClose={() => {}} />
      </div>
    </RestaurantProvider>
  );
}
