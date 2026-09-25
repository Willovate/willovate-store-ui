import type { ComponentType } from 'react'
import type { CategoryData, MarketplaceTemplate, Template } from '../types'
import { VelocityStorefront } from '../templates/sports/Velocity'
import { ArenaStorefront } from '../templates/sports/Arena'
import { SprintStorefront } from '../templates/sports/Sprint'
import { ProGearStorefront } from '../templates/sports/ProGear'
import { FitCoreStorefront } from '../templates/sports/FitCore'
import { GameDayStorefront } from '../templates/sports/GameDay'
import { PeakStorefront } from '../templates/sports/Peak'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from './sportsTemplatesData'

export const TEMPLATE_REGISTRY: Record<string, CategoryData> = {
  'sporting-goods': {
    displayName: 'Sports Store',
    badgeIcon: '⚽',
    description: 'High-energy performance athletic wear, running shoes, and competition gear.',
    filterTags: ['All', 'Performance Sports', 'Athletic', 'Footwear', 'Running', 'Football', 'Cricket', 'Equipment', 'Gym', 'Outdoor', 'Hiking'],
    templates: ALL_SPORTS_MARKETPLACE_TEMPLATES,
  },
  'online-store': {
    displayName: 'Online Store',
    badgeIcon: '🛍️',
    description: 'Sell products online and manage your orders.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'clothing-store': {
    displayName: 'Clothing Store',
    badgeIcon: '👕',
    description: 'Create a beautiful online clothing store.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'restaurant': {
    displayName: 'Restaurant',
    badgeIcon: '🍽️',
    description: 'Show your menu and take orders online.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'salon': {
    displayName: 'Salon',
    badgeIcon: '✂️',
    description: 'Manage services and bookings.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'fitness': {
    displayName: 'Fitness',
    badgeIcon: '💪',
    description: 'Promote your programs and manage memberships.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'education': {
    displayName: 'Education',
    badgeIcon: '📚',
    description: 'Create courses and share knowledge.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'business-website': {
    displayName: 'Business Website',
    badgeIcon: '🏢',
    description: 'Build a professional website for your business.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
  'other': {
    displayName: 'Other',
    badgeIcon: '✨',
    description: 'Something different or unique.',
    filterTags: ['All'],
    templates: [], // Clean and empty
  },
}

export function getTemplateComponent(template?: MarketplaceTemplate | Template | null): ComponentType<any> {
  if (
    template &&
    (template.slug === 'sports-peak' ||
      template.id === 'sports-peak' ||
      template.name?.toLowerCase().includes('peak'))
  ) {
    return PeakStorefront
  }
  if (
    template &&
    (template.slug === 'sports-gameday' ||
      template.id === 'sports-gameday' ||
      template.name?.toLowerCase().includes('gameday'))
  ) {
    return GameDayStorefront
  }
  if (
    template &&
    (template.slug === 'sports-fitcore' ||
      template.id === 'sports-fitcore' ||
      template.name?.toLowerCase().includes('fitcore'))
  ) {
    return FitCoreStorefront
  }
  if (
    template &&
    (template.slug === 'sports-progear' ||
      template.id === 'sports-progear' ||
      template.name?.toLowerCase().includes('progear'))
  ) {
    return ProGearStorefront
  }
  if (
    template &&
    (template.slug === 'sports-sprint' ||
      template.id === 'sports-sprint' ||
      template.name?.toLowerCase().includes('sprint'))
  ) {
    return SprintStorefront
  }
  if (
    template &&
    (template.slug === 'sports-arena' ||
      template.id === 'sports-arena' ||
      template.name?.toLowerCase().includes('arena'))
  ) {
    return ArenaStorefront
  }
  return VelocityStorefront
}
