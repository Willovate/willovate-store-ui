import React from 'react';
import DailyGrindTheme from '../../../themes/DailyGrindTheme';
import { restaurantThemePresets } from '../../../themes/RestaurantTheme';

export default function DailyGrind() {
  const theme = restaurantThemePresets['the-daily-grind'];
  return <DailyGrindTheme theme={theme} />;
}
