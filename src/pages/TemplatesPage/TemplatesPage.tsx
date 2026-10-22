import React, { useEffect, useState, useMemo, useRef } from 'react'
import './TemplatesPage.css'
import { VelocityStorefront } from '../../templates/sports/Velocity'
import { ArenaStorefront } from '../../templates/sports/Arena'
import { SprintStorefront } from '../../templates/sports/Sprint'
import { ProGearStorefront } from '../../templates/sports/ProGear'
import { FitCoreStorefront } from '../../templates/sports/FitCore'
import { GameDayStorefront } from '../../templates/sports/GameDay'
import { PeakStorefront } from '../../templates/sports/Peak'
import { StreetAthleteStorefront } from '../../templates/sports/StreetAthlete'
import { EliteSportStorefront } from '../../templates/sports/EliteSport'
import { MotionStorefront } from '../../templates/sports/Motion'
import { BelleFashionStorefront } from '../../templates/fashion/Belle'
import { VogalFashionStorefront } from '../../templates/fashion/Vogal'
import { OptimalFashionStorefront } from '../../templates/fashion/Optimal'
import { NaturyaFashionStorefront } from '../../templates/fashion/Naturya'
import { TrendyFashionStorefront } from '../../templates/fashion/Trendy'
import { FragranceFashionStorefront } from '../../templates/fashion/Fragrance'
import { JenieFashionStorefront } from '../../templates/fashion/Jenie'
import { ChuttiFashionStorefront } from '../../templates/fashion/Chutti'
import { BaggoFashionStorefront } from '../../templates/fashion/Baggo'
import { MrTevorFashionStorefront } from '../../templates/fashion/MrTevor'
import { DiamondJewelryStorefront } from '../../templates/jewelry/Diamond'
import { JoharyJewelryStorefront } from '../../templates/jewelry/Johary'
import { LopezJewelryStorefront } from '../../templates/jewelry/Lopez'
import { PSJewelshopStorefront } from '../../templates/jewelry/PSJewelshop'
import { TimzeeStorefront } from '../../templates/jewelry/Timzee'
import { JewelsWorkDoStorefront } from '../../templates/jewelry/JewelsWorkDo'
import { DiamondWorkDoStorefront } from '../../templates/jewelry/DiamondWorkDo'
import { VtOlightStorefront } from '../../templates/jewelry/VtOlight'
import { SwarnaStorefront } from '../../templates/jewelry/Swarna'
import { JewStorefront } from '../../templates/jewelry/Jew'
import {
  HappyFeetStorefront,
  ShoeZoneStorefront,
  SusieShoesStorefront,
  FashionFeetStorefront,
  FootwearWorkDoStorefront,
  ShoesWorkDoStorefront,
  SensationStorefront,
  GiarosStorefront,
  StepGlamStorefront,
  ApShoesStorefront,
} from '../../templates/shoes'
import '../../templates/fashion/fashionMobile.css'
import '../../templates/jewelry/jewelryMobile.css'
import '../../templates/shoes/shoesMobile.css'
import '../../templates/cosmetics/cosmeticsMobile.css'
import {
  BELLE_FASHION_TEMPLATE,
  VOGAL_FASHION_TEMPLATE,
  OPTIMAL_FASHION_TEMPLATE,
  NATURYA_FASHION_TEMPLATE,
  TRENDY_FASHION_TEMPLATE,
  FRAGRANCE_FASHION_TEMPLATE,
  ALL_FASHION_MARKETPLACE_TEMPLATES,
} from '../../data/fashionTemplatesData'
import {
  DIAMOND_JEWELRY_TEMPLATE,
  JOHARY_JEWELRY_TEMPLATE,
  LOPEZ_JEWELRY_TEMPLATE,
  PS_JEWELSHOP_TEMPLATE,
  TIMZEE_WATCHES_TEMPLATE,
  JEWELS_WORKDO_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
  VT_OLIGHT_TEMPLATE,
  SWARNA_TEMPLATE,
  JEW_TEMPLATE,
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
} from '../../data/jewelryTemplatesData'
import {
  HAPPY_FEET_TEMPLATE,
  SHOE_ZONE_TEMPLATE,
  SUSIE_SHOES_TEMPLATE,
  FASHION_FEET_TEMPLATE,
  FOOTWEAR_WORKDO_TEMPLATE,
  SHOES_WORKDO_TEMPLATE,
  SENSATION_WORKDO_TEMPLATE,
  GIAROS_TEMPLATE,
  STEPGLAM_TEMPLATE,
  AP_SHOES_TEMPLATE,
  ALL_SHOES_MARKETPLACE_TEMPLATES,
} from '../../data/shoesTemplatesData'
import {
  BEAUX_TEMPLATE,
  GLOWING_TEMPLATE,
  FABISH_TEMPLATE,
  ORGANICA_TEMPLATE,
  SHADES_TEMPLATE,
  BELLETNY_TEMPLATE,
  SMETIC_TEMPLATE,
  DEZEL_TEMPLATE,
  DTSPALAB_TEMPLATE,
  LIPURA_TEMPLATE,
  ALL_COSMETICS_MARKETPLACE_TEMPLATES,
} from '../../data/cosmeticsTemplatesData'
import {
  BeauxStorefront,
  GlowingStorefront,
  FabishStorefront,
  OrganicaStorefront,
  ShadesStorefront,
  BelletnyStorefront,
  SmeticStorefront,
  DezelStorefront,
  DtSpalabStorefront,
  LipuraStorefront,
} from '../../templates/cosmetics'
export { VelocityStorefront, ArenaStorefront, SprintStorefront, ProGearStorefront, FitCoreStorefront, GameDayStorefront, PeakStorefront, StreetAthleteStorefront, EliteSportStorefront, MotionStorefront, BelleFashionStorefront, VogalFashionStorefront, OptimalFashionStorefront, NaturyaFashionStorefront, TrendyFashionStorefront, FragranceFashionStorefront, JenieFashionStorefront, ChuttiFashionStorefront, BaggoFashionStorefront, MrTevorFashionStorefront, DiamondJewelryStorefront, JoharyJewelryStorefront, LopezJewelryStorefront, PSJewelshopStorefront, TimzeeStorefront, JewelsWorkDoStorefront, DiamondWorkDoStorefront, VtOlightStorefront, SwarnaStorefront, JewStorefront, HappyFeetStorefront, ShoeZoneStorefront, SusieShoesStorefront, FashionFeetStorefront, FootwearWorkDoStorefront, ShoesWorkDoStorefront, SensationStorefront, GiarosStorefront, StepGlamStorefront, ApShoesStorefront, BeauxStorefront, GlowingStorefront, FabishStorefront, OrganicaStorefront, ShadesStorefront, BelletnyStorefront, SmeticStorefront, DezelStorefront, DtSpalabStorefront, LipuraStorefront, HAPPY_FEET_TEMPLATE, SHOE_ZONE_TEMPLATE, SUSIE_SHOES_TEMPLATE, FASHION_FEET_TEMPLATE, FOOTWEAR_WORKDO_TEMPLATE, SHOES_WORKDO_TEMPLATE, SENSATION_WORKDO_TEMPLATE, GIAROS_TEMPLATE, STEPGLAM_TEMPLATE, AP_SHOES_TEMPLATE, BEAUX_TEMPLATE, GLOWING_TEMPLATE, FABISH_TEMPLATE, ORGANICA_TEMPLATE, SHADES_TEMPLATE, BELLETNY_TEMPLATE, SMETIC_TEMPLATE, DEZEL_TEMPLATE, DTSPALAB_TEMPLATE, LIPURA_TEMPLATE, ALL_COSMETICS_MARKETPLACE_TEMPLATES }


// Re-export domain types
export type {
  Template,
  TemplateStyle,
  CatalogSize,
  TemplateBadge,
  TemplateLayoutType,
  MarketplaceTemplate,
  CategoryData,
  SelectTemplatePayload,
  SelectTemplateResponse,
  OtherCategoryItem,
  BusinessTypeItem,
} from '../../types'

import type {
  MarketplaceTemplate,
  BusinessTypeItem,
} from '../../types'

// Re-export extracted data
export {
  SPORTS_TEMPLATES_CONFIG,
  ALL_SPORTS_MARKETPLACE_TEMPLATES,
} from '../../data/sportsTemplatesData'
export type {
  SportsProduct,
  SportsTemplateConfig,
} from '../../data/sportsTemplatesData'

export {
  SHOES_TEMPLATES_CONFIG,
  ALL_SHOES_MARKETPLACE_TEMPLATES,
} from '../../data/shoesTemplatesData'
export type {
  ShoesProduct,
  ShoesTemplateConfig,
} from '../../data/shoesTemplatesData'

export {
  BELLE_FASHION_TEMPLATE,
  VOGAL_FASHION_TEMPLATE,
  OPTIMAL_FASHION_TEMPLATE,
  NATURYA_FASHION_TEMPLATE,
  ALL_FASHION_MARKETPLACE_TEMPLATES,
} from '../../data/fashionTemplatesData'

export {
  DIAMOND_JEWELRY_TEMPLATE,
  JOHARY_JEWELRY_TEMPLATE,
  LOPEZ_JEWELRY_TEMPLATE,
  PS_JEWELSHOP_TEMPLATE,
  TIMZEE_WATCHES_TEMPLATE,
  JEWELS_WORKDO_TEMPLATE,
  DIAMOND_WORKDO_TEMPLATE,
  VT_OLIGHT_TEMPLATE,
  SWARNA_TEMPLATE,
  JEW_TEMPLATE,
  ALL_JEWELRY_MARKETPLACE_TEMPLATES,
} from '../../data/jewelryTemplatesData'



export {
  TEMPLATE_REGISTRY,
  getTemplateCategoryKey,
  getTemplateComponent,
} from '../../data/templateRegistry'

export {
  CUSTOM_PRESETS,
  getCustomTemplatesForPrompt,
} from '../../data/customPresetsData'
export type { CustomPreset } from '../../data/customPresetsData'

export {
  FLAGSHIP_MARKETPLACE_TEMPLATES,
  getAllMarketplaceTemplates,
} from '../../data/marketplaceTemplatesData'

import {
  getTemplateCategoryKey,
  getTemplateIdFromPrompt,
  isBelleFashionTemplate,
  isCosmeticsPrompt,
  TEMPLATE_REGISTRY,
} from '../../data/templateRegistry'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from '../../data/sportsTemplatesData'
/* =========================================================================
   INLINE WILLOVATE ONE LOGO
   ========================================================================= */
export const WillovateLogo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <a
    href="/"
    onClick={(e) => {
      if (onClick) {
        e.preventDefault()
        onClick()
      }
    }}
    className="template-logo-link"
    aria-label="Willovate One Home"
  >
    <img
      src="/willovate-one-logo.png"
      alt="Willovate One"
      className="template-logo-img"
    />
  </a>
)

/* =========================================================================
   UPGRADED TEMPLATE CARD COMPONENT
   ========================================================================= */
export interface TemplateCardProps {
  template: MarketplaceTemplate
  isSelected: boolean
  onSelect: (templateId: string) => void
  onPreview: (template: MarketplaceTemplate) => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
}) => {
  const isFeatured =
    template.badge === 'recommended' || template.badge === "editor's pick"

  const fallbackHero =
    template.businessType === 'jewelry-accessories' ||
    template.industryCategory?.toLowerCase().includes('jewel') ||
    template.tags?.some((t) => t.toLowerCase().includes('jewel') || t.toLowerCase().includes('diamond'))
      ? 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80'
      : template.businessType === 'sporting-goods'
      ? 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
  const heroImage = template.thumbnailUrl || template.modelImage || template.fullPreviewUrl || fallbackHero

  return (
    <div
      className={`marketplace-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(template.id)
        }
      }}
      aria-label={`${template.name} - ${template.industryCategory} template`}
    >
      {/* Clean Template Image */}
      <div className="marketplace-preview-stage">
        {isFeatured && (
          <div className="card-floating-badge">
            <span>FEATURED</span>
          </div>
        )}

        <div className="stage-hero-showcase">
          <img
            src={heroImage}
            alt={template.name}
            className="stage-hero-bg-img"
            loading="lazy"
            onError={(e) => {
              const t = e.currentTarget
              t.onerror = null
              t.src = fallbackHero
            }}
          />
        </div>
      </div>

      {/* Simple & Professional Card Body */}
      <div className="marketplace-card-info">
        <div className="card-title-row">
          <h3 className="card-theme-name">{template.name}</h3>
          <span className="card-industry-label">{template.industryCategory}</span>
        </div>

        <p className="card-short-desc">{template.shortDescription}</p>

        <div className="card-bottom-action">
          <button
            type="button"
            className="card-quick-preview-link"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(template)
            }}
          >
            Preview
          </button>
          <button
            type="button"
            className={`card-select-btn ${isSelected ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(template.id)
            }}
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SPORTS STOREFRONT WRAPPER (Velocity reference storefront)
   ========================================================================= */
export interface SportsStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}

export const SportsStorefront: React.FC<SportsStorefrontProps> = ({
  template,
  device = 'desktop',
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate,
  onClose,
}) => {
  if (
    template &&
    (template.slug === 'sports-motion' ||
      template.id === 'sports-motion' ||
      template.name?.toLowerCase() === 'motion')
  ) {
    return (
      <MotionStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  if (
    template && 
    (template.slug === 'sports-elitesport' ||
      template.id === 'sports-elitesport' ||
      template.name?.toLowerCase() === 'elitesport')
  ) {
    return <EliteSportStorefront deviceView={device} />
  }

  if (
    template &&
    (template.slug === 'sports-streetathlete' ||
      template.id === 'sports-streetathlete' ||
      template.name?.toLowerCase() === 'streetathlete')
  ) {
    return <StreetAthleteStorefront deviceView={device} />
  }

  const isPeak =
    template &&
    (template.slug === 'sports-peak' ||
      template.id === 'sports-peak' ||
      template.name?.toLowerCase().includes('peak'))

  if (isPeak) {
    return (
      <PeakStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isGameDay =
    template &&
    (template.slug === 'sports-gameday' ||
      template.id === 'sports-gameday' ||
      template.name?.toLowerCase().includes('gameday'))

  if (isGameDay) {
    return (
      <GameDayStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isProGear =
    template &&
    (template.slug === 'sports-progear' ||
      template.id === 'sports-progear' ||
      template.name?.toLowerCase().includes('progear'))

  if (isProGear) {
    return (
      <ProGearStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isFitCore =
    template &&
    (template.slug === 'sports-fitcore' ||
      template.id === 'sports-fitcore' ||
      template.name?.toLowerCase().includes('fitcore'))

  if (isFitCore) {
    return (
      <FitCoreStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isSprint =
    template &&
    (template.slug === 'sports-sprint' ||
      template.id === 'sports-sprint' ||
      template.name?.toLowerCase().includes('sprint'))

  if (isSprint) {
    return (
      <SprintStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  const isArena =
    template &&
    (template.slug === 'sports-arena' ||
      template.id === 'sports-arena' ||
      template.name?.toLowerCase().includes('arena'))

  if (isArena) {
    return (
      <ArenaStorefront
        deviceView={device}
        customAccentColor={customAccentColor || undefined}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-vogal' ||
      template.id === 'fashion-vogal' ||
      template.name?.toLowerCase().includes('vogal'))
  ) {
    return (
      <VogalFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-optimal' ||
      template.id === 'fashion-optimal' ||
      template.name?.toLowerCase().includes('optimal'))
  ) {
    return (
      <OptimalFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-naturya' ||
      template.id === 'fashion-naturya' ||
      template.name?.toLowerCase().includes('naturya'))
  ) {
    return (
      <NaturyaFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-trendy' ||
      template.id === 'fashion-trendy' ||
      template.name?.toLowerCase().includes('trendy'))
  ) {
    return (
      <TrendyFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-fragrance' ||
      template.id === 'fashion-fragrance' ||
      template.name?.toLowerCase().includes('fragrance'))
  ) {
    return (
      <FragranceFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-jenie' ||
      template.id === 'fashion-jenie' ||
      template.slug === 'jenie-denim' ||
      template.name?.toLowerCase().includes('jenie'))
  ) {
    return (
      <JenieFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-chutti' ||
      template.id === 'fashion-chutti' ||
      template.slug === 'chutti-kids' ||
      template.name?.toLowerCase().includes('chutti'))
  ) {
    return (
      <ChuttiFashionStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-baggo' ||
      template.id === 'fashion-baggo' ||
      template.slug === 'baggo-leather' ||
      template.name?.toLowerCase().includes('baggo'))
  ) {
    return (
      <BaggoFashionStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'fashion-mr-tevor' ||
      template.id === 'fashion-mr-tevor' ||
      template.slug === 'mr-tevor' ||
      template.slug === 'mr-tevor-suiting' ||
      template.name?.toLowerCase().includes('mr-tevor') ||
      template.name?.toLowerCase().includes('tevor'))
  ) {
    return (
      <MrTevorFashionStorefront
        device={device}
        deviceView={device}
        onBackToDirectory={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-johary' ||
      template.id === 'jewelry-johary' ||
      template.slug === 'johary' ||
      template.name?.toLowerCase().includes('johary'))
  ) {
    return (
      <JoharyJewelryStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-lopez' ||
      template.id === 'jewelry-lopez' ||
      template.slug === 'lopez' ||
      template.slug === 'lopez-jewelry' ||
      template.name?.toLowerCase().includes('lopez'))
  ) {
    return (
      <LopezJewelryStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-ps-jewelshop' ||
      template.id === 'jewelry-ps-jewelshop' ||
      template.slug === 'ps-jewelshop' ||
      template.name?.toLowerCase().includes('jewelshop') ||
      template.name?.toLowerCase().includes('ps-jewelshop') ||
      template.name?.toLowerCase().includes('ps jewelshop'))
  ) {
    return (
      <PSJewelshopStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-timzee' ||
      template.id === 'jewelry-timzee' ||
      template.slug === 'timzee' ||
      template.id === 'timzee' ||
      template.name?.toLowerCase().includes('timzee'))
  ) {
    return (
      <TimzeeStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-jewels-workdo' ||
      template.id === 'jewelry-jewels-workdo' ||
      template.slug === 'jewels-workdo' ||
      template.slug === 'jewels' ||
      template.name?.toLowerCase().includes('jewels'))
  ) {
    return (
      <JewelsWorkDoStorefront
        device={device}
        deviceView={device}
        onBack={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }


  if (
    template &&
    (template.slug === 'jewelry-diamond-workdo' ||
      template.id === 'jewelry-diamond-workdo' ||
      template.slug === 'diamond-workdo' ||
      template.name?.toLowerCase().includes('diamond-workdo') ||
      template.name?.toLowerCase().includes('diamond workdo'))
  ) {
    return (
      <DiamondWorkDoStorefront
        device={device}
        deviceView={device}
        onBack={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-vt-olight' ||
      template.id === 'jewelry-vt-olight' ||
      template.slug === 'vt-olight' ||
      template.slug === 'olight' ||
      template.name?.toLowerCase().includes('vt-olight') ||
      template.name?.toLowerCase().includes('vt olight') ||
      template.name?.toLowerCase().includes('olight'))
  ) {
    return (
      <VtOlightStorefront
        device={device}
        deviceView={device}
        onBack={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-swarna' ||
      template.id === 'jewelry-swarna' ||
      template.slug === 'swarna' ||
      template.name?.toLowerCase().includes('swarna'))
  ) {
    return (
      <SwarnaStorefront
        device={device}
        deviceView={device}
        onBack={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-jew' ||
      template.id === 'jewelry-jew' ||
      template.slug === 'jew' ||
      template.name?.toLowerCase().includes('jew luxury') ||
      template.name?.toLowerCase() === 'jew' ||
      template.headline?.toLowerCase().includes('featherweight finds'))
  ) {
    return (
      <JewStorefront
        device={device}
        deviceView={device}
        onBack={onClose}
        onUseTemplate={onUseTemplate}
      />
    )
  }

  if (
    template &&
    (template.slug === 'jewelry-diamond' ||
      template.id === 'jewelry-diamond' ||
      template.slug === 'clothing-reference-jewelry-accessories' ||
      template.name?.toLowerCase().includes('diamond') ||
      template.name?.toLowerCase().includes('aurelia') ||
      template.businessType === 'jewelry-accessories' ||
      template.industryCategory?.toLowerCase().includes('jewel'))
  ) {
    return (
      <DiamondJewelryStorefront
        templateData={template}
        device={device}
        deviceView={device}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (isBelleFashionTemplate(template) || template.businessType === 'clothing-store')
  ) {
    return (
      <BelleFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-workdo' ||
      template.id === 'shoes-workdo' ||
      template.slug === 'shoesworkdo' ||
      template.id === 'shoesworkdo' ||
      template.name?.toLowerCase().includes('shoes workdo'))
  ) {
    return (
      <ShoesWorkDoStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-beaux' ||
      template.id === 'cosmetics-beaux' ||
      template.slug === 'beaux' ||
      template.id === 'beaux' ||
      template.name?.toLowerCase().includes('beaux') ||
      template.brandName?.toLowerCase().includes('beaux'))
  ) {
    return (
      <BeauxStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-glowing' ||
      template.id === 'cosmetics-glowing' ||
      template.slug === 'glowing' ||
      template.id === 'glowing' ||
      template.name?.toLowerCase().includes('glowing') ||
      template.brandName?.toLowerCase().includes('glowing'))
  ) {
    return (
      <GlowingStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-fabish' ||
      template.id === 'cosmetics-fabish' ||
      template.slug === 'fabish' ||
      template.id === 'fabish' ||
      template.slug === 'fabish-theme' ||
      template.name?.toLowerCase().includes('fabish') ||
      template.brandName?.toLowerCase().includes('fabish'))
  ) {
    return (
      <FabishStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-organica' ||
      template.id === 'cosmetics-organica' ||
      template.slug === 'organica' ||
      template.id === 'organica' ||
      template.slug === 'organica-1' ||
      template.slug === 'organica-theme' ||
      template.name?.toLowerCase().includes('organica') ||
      template.brandName?.toLowerCase().includes('organica'))
  ) {
    return (
      <OrganicaStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-shades' ||
      template.id === 'cosmetics-shades' ||
      template.slug === 'shades' ||
      template.id === 'shades' ||
      template.slug === 'theme-shade' ||
      template.name?.toLowerCase().includes('shade') ||
      template.brandName?.toLowerCase().includes('shade'))
  ) {
    return (
      <ShadesStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-belletny' ||
      template.id === 'cosmetics-belletny' ||
      template.slug === 'belletny' ||
      template.id === 'belletny' ||
      template.slug === 'belletny-codezeel' ||
      template.name?.toLowerCase().includes('belletny') ||
      template.brandName?.toLowerCase().includes('belletny'))
  ) {
    return (
      <BelletnyStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-smetic' ||
      template.id === 'cosmetics-smetic' ||
      template.slug === 'smetic' ||
      template.id === 'smetic' ||
      template.slug === 'smetic-store-demo' ||
      template.name?.toLowerCase() === 'smetic' ||
      template.name?.toLowerCase().startsWith('smetic') ||
      template.name?.toLowerCase().includes('smetic organic') ||
      template.brandName?.toLowerCase() === 'smetic')
  ) {
    return (
      <SmeticStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-dezel' ||
      template.id === 'cosmetics-dezel' ||
      template.slug === 'dezel' ||
      template.id === 'dezel' ||
      template.slug === 'dezel-perfume' ||
      template.name?.toLowerCase().includes('dezel') ||
      template.brandName?.toLowerCase().includes('dezel'))
  ) {
    return (
      <DezelStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-dt-spalab' ||
      template.id === 'cosmetics-dt-spalab' ||
      template.slug === 'dt-spalab' ||
      template.id === 'dt-spalab' ||
      template.slug === 'spalab' ||
      template.id === 'spalab' ||
      template.name?.toLowerCase().includes('dt-spalab') ||
      template.name?.toLowerCase().includes('spalab') ||
      template.brandName?.toLowerCase().includes('spalab'))
  ) {
    return (
      <DtSpalabStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'cosmetics-lipura' ||
      template.id === 'cosmetics-lipura' ||
      template.slug === 'lipura' ||
      template.id === 'lipura' ||
      template.slug === 'lipura-store-newdemo' ||
      template.name?.toLowerCase().includes('lipura') ||
      template.brandName?.toLowerCase().includes('lipura'))
  ) {
    return (
      <LipuraStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        onBack={onClose}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-sensation' ||
      template.id === 'shoes-sensation' ||
      template.slug === 'sensation' ||
      template.id === 'sensation' ||
      template.name?.toLowerCase().includes('sensation'))
  ) {
    return (
      <SensationStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-giaros' ||
      template.id === 'shoes-giaros' ||
      template.slug === 'giaros' ||
      template.id === 'giaros' ||
      template.name?.toLowerCase().includes('giaros'))
  ) {
    return (
      <GiarosStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-stepglam' ||
      template.id === 'shoes-stepglam' ||
      template.slug === 'stepglam' ||
      template.id === 'stepglam' ||
      template.name?.toLowerCase().includes('stepglam'))
  ) {
    return (
      <StepGlamStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-ap-shoes' ||
      template.id === 'shoes-ap-shoes' ||
      template.slug === 'ap-shoes' ||
      template.id === 'ap-shoes' ||
      template.slug === 'noz' ||
      template.id === 'noz' ||
      template.name?.toLowerCase().includes('ap shoes') ||
      template.name?.toLowerCase().includes('n.o.z') ||
      template.brandName?.toLowerCase().includes('n.o.z'))
  ) {
    return (
      <ApShoesStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-fashion-feet' ||
      template.id === 'shoes-fashion-feet' ||
      template.slug === 'fashion-feet' ||
      template.id === 'fashion-feet' ||
      template.slug === 'fashionfeet' ||
      template.id === 'fashionfeet' ||
      template.name?.toLowerCase().includes('fashionfeet') ||
      template.name?.toLowerCase().includes('fashion feet') ||
      template.name?.toLowerCase().includes('mens shoe'))
  ) {
    return (
      <FashionFeetStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-footwear-workdo' ||
      template.id === 'shoes-footwear-workdo' ||
      template.slug === 'footwear-workdo' ||
      template.id === 'footwear-workdo' ||
      template.name?.toLowerCase().includes('footwear workdo') ||
      template.name?.toLowerCase().includes('footwear.'))
  ) {
    return (
      <FootwearWorkDoStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-susie' ||
      template.id === 'shoes-susie' ||
      template.slug === 'susie-shoes' ||
      template.id === 'susie-shoes' ||
      template.name?.toLowerCase().includes('susie'))
  ) {
    return (
      <SusieShoesStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-shoezone' ||
      template.id === 'shoes-shoezone' ||
      template.slug === 'shoezone' ||
      template.id === 'shoezone' ||
      template.name?.toLowerCase().includes('shoezone') ||
      template.name?.toLowerCase().includes('shoe zone'))
  ) {
    return (
      <ShoeZoneStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (
    template &&
    (template.slug === 'shoes-happy-feet' ||
      template.id === 'shoes-happy-feet' ||
      template.slug === 'happy-feet' ||
      template.id === 'happy-feet' ||
      template.name?.toLowerCase().includes('happy feet') ||
      template.businessType === 'shoes' ||
      template.industryCategory?.toLowerCase().includes('shoe') ||
      template.industryCategory?.toLowerCase().includes('footwear'))
  ) {
    return (
      <HappyFeetStorefront
        template={template}
        device={device === 'fullscreen' ? 'desktop' : device}
        customAccentColor={customAccentColor || undefined}
        onUseTemplate={() => {
          onUseTemplate?.(template.id)
          onClose?.()
        }}
      />
    )
  }

  if (template && template.businessType !== 'sporting-goods') {
    return (
      <BelleFashionStorefront
        template={template}
        device={device}
        deviceView={device}
        customAccentColor={customAccentColor}
        onColorChange={_onColorChange}
        onUseTemplate={onUseTemplate}
        onClose={onClose}
      />
    )
  }

  return (
    <VelocityStorefront
      device={device}
      customAccentColor={customAccentColor}
      onClose={onClose}
      onUseTemplate={onUseTemplate}
    />
  )
}

/* =========================================================================
   FULLSCREEN MULTI-DEVICE PREVIEW MODAL
   ========================================================================= */
export interface TemplatePreviewModalProps {
  template: MarketplaceTemplate | null
  isOpen: boolean
  onClose: () => void
  onUseTemplate: (templateId: string) => void
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile' | 'fullscreen'>('desktop')
  const [selectedColorOverride, setSelectedColorOverride] = useState<{ templateId: string; color: string } | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0
      const innerScroll = viewportRef.current.querySelector('.simulated-frame > div:not(.mobile-chrome-notch)') as HTMLElement | null
      if (innerScroll) {
        innerScroll.scrollTop = 0
      }
    }
    const dialog = document.querySelector('.preview-modal-dialog')
    if (dialog) dialog.scrollTop = 0
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const allRoots = document.querySelectorAll('.jew-root, .swarna-root, .vto-root, .jwd-root, .diamond-workdo-root')
    allRoots.forEach((el) => {
      ;(el as HTMLElement).scrollTop = 0
    })
  }, [template?.id, device, isOpen])

  const handleColorSelect = (color: string) => {
    if (template) {
      setSelectedColorOverride({ templateId: template.id, color })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const isDark = Boolean(template?.isDark)
  const activeThemeColor = (selectedColorOverride && selectedColorOverride.templateId === template?.id)
    ? selectedColorOverride.color
    : (template?.accentColor || '#ccff00')

  const availableSwatches = useMemo(() => {
    return [
      { name: 'Default', hex: template?.accentColor || '#ccff00' },
      { name: 'Electric Volt', hex: '#ccff00' },
      { name: 'Vivid Cyan', hex: '#06b6d4' },
      { name: 'Hyper Orange', hex: '#ff6b00' },
      { name: 'Crimson Red', hex: '#ef4444' },
      { name: 'Royal Gold', hex: '#d4af37' },
      { name: 'Cobalt Blue', hex: '#2563eb' },
      { name: 'Emerald Green', hex: '#10b981' },
    ]
  }, [template?.accentColor])

  if (!isOpen || !template) return null

  return (
    <div className="preview-modal-backdrop" onClick={onClose}>
      <div className="preview-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Toolbar */}
        <div className="preview-modal-toolbar">
          <div className="toolbar-info">
            <h2>{template.name}</h2>
            <div className="toolbar-tags">
              <span className="toolbar-tag-pill">{template.industryCategory}</span>
              <span className="toolbar-tag-pill">{template.style}</span>
              <span className="toolbar-tag-pill">Large catalog</span>
            </div>
          </div>

          {/* Device Switcher Controls */}
          <div className="toolbar-device-switcher" role="radiogroup" aria-label="Device Viewport">
            <button
              type="button"
              className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => setDevice('desktop')}
              title="Desktop View (100%)"
            >
              🖥️ Desktop
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => setDevice('tablet')}
              title="Tablet View (768px)"
            >
              📱 Tablet
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => setDevice('mobile')}
              title="Mobile View (375px)"
            >
              📲 Mobile
            </button>
            <button
              type="button"
              className={`device-btn ${device === 'fullscreen' ? 'active' : ''}`}
              onClick={() => setDevice(device === 'fullscreen' ? 'desktop' : 'fullscreen')}
              title="Fullscreen Live View"
            >
              ⛶ Fullscreen
            </button>
          </div>

          <div className="toolbar-actions-group">
            <button type="button" className="toolbar-close-btn" onClick={onClose} aria-label="Close preview">
              ✕
            </button>
          </div>
        </div>

        {/* Modal Workspace / Body */}
        <div className="preview-modal-body">
          {/* Main Simulated Storefront Frame */}
          <div ref={viewportRef} className={`preview-viewport-container device-${device}`}>
            <div
              className={`simulated-frame frame-${device}`}
              style={{
                backgroundColor: isDark ? '#090d16' : '#ffffff',
                color: isDark ? '#ffffff' : '#0f172a',
              }}
            >
              {device === 'mobile' && (
                <div className="mobile-chrome-notch">
                  <div className="notch-speaker" />
                  <div className="notch-camera" />
                </div>
              )}

              {/* Render Velocity Storefront */}
              <SportsStorefront
                template={template}
                device={device}
                customAccentColor={activeThemeColor}
                onColorChange={handleColorSelect}
                onUseTemplate={(t: string) => {
                  onUseTemplate(t)
                  onClose()
                }}
                onClose={onClose}
              />
            </div>
          </div>

          {/* Right Specs Sidebar */}
          <aside className="preview-specs-drawer">
            <div className="specs-card">
              <h3>Template Overview</h3>
              <p className="specs-desc">{template.shortDescription}</p>

              <div className="specs-metric-row">
                <div className="metric-box">
                  <span className="metric-num">★ {template.rating?.toFixed(1) || '4.96'}</span>
                  <small>Rating (140+ reviews)</small>
                </div>
                <div className="metric-box">
                  <span className="metric-num">100%</span>
                  <small>Responsive</small>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Design Attributes</h4>
                <div className="attr-row">
                  <span>Visual Style</span>
                  <strong>Bold / Kinetic</strong>
                </div>
                <div className="attr-row">
                  <span>Catalog Fit</span>
                  <strong>Large (50+ items)</strong>
                </div>
                <div className="attr-row">
                  <span>Primary Layout</span>
                  <strong>Bold Minimal</strong>
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Color Scheme <span className="specs-subtext">(Click to apply live)</span></h4>
                <div className="palette-strip interactive-palette">
                  {availableSwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      className={`palette-circle-btn ${activeThemeColor.toLowerCase() === swatch.hex.toLowerCase() ? 'active-palette-circle' : ''}`}
                      style={{ backgroundColor: swatch.hex }}
                      onClick={() => handleColorSelect(swatch.hex)}
                      title={`${swatch.name} (${swatch.hex})`}
                      aria-label={`Apply ${swatch.name} theme`}
                    />
                  ))}
                </div>
              </div>

              <div className="specs-list-group">
                <h4>Included Core Features</h4>
                <ul className="specs-features-list">
                  {(template.features || []).map((f) => (
                    <li key={f}>
                      <span className="check-bullet">✓</span> {f}
                    </li>
                  ))}
                  <li>
                    <span className="check-bullet">✓</span> Core Web Vitals performance optimized
                  </li>
                  <li>
                    <span className="check-bullet">✓</span> Interactive cart drawer & quick view
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Modal Bottom Footer */}
        <div className="preview-modal-footer">
          <button type="button" className="footer-back-btn" onClick={onClose}>
            Back to Marketplace
          </button>
          <button
            type="button"
            className="footer-use-btn"
            onClick={() => {
              onUseTemplate(template.id)
              onClose()
            }}
          >
            Use This Template →
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   STEP 1: TEMPLATE DIRECTORY PAGE COMPONENT
   Strictly the 8 main categories as displayed on the main page screenshot:
   1. Online Store
   2. Clothing Store
   3. Restaurant
   4. Salon
   5. Fitness
   6. Education
   7. Business Website
   8. Other
   All other industry options (Sports Store, etc.) appear in Suggestions under Other.
   ========================================================================= */
export interface TemplateDirectoryPageProps {
  initialBusinessType?: string
  initialCustomPrompt?: string
  onBack?: () => void
  onSelectBusinessType: (businessType: string, displayName: string, customPrompt?: string) => void
}


export const BUSINESS_TYPES: BusinessTypeItem[] = [
  {
    id: 'online-store',
    name: 'Online Store',
    description: 'Sell products online and manage your orders.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'clothing-store',
    name: 'Fashion Store',
    description: 'High-end fashion editorial storefronts and designer collections.',
    tone: 'blue',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'shoes',
    name: 'Shoes Store',
    description: 'High-performance sneakers, running footwear, casual trainers, and boots.',
    tone: 'orange',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 13.5c0-2.2 1.8-4 4-4h2.5l3.5-3.5h4c1.4 0 2.5 1.1 2.5 2.5v1.5c0 1.4-.8 2.3-2 2.5h-1.5l-2 3.5h-7c-2.2 0-4-1.1-4-2.5z" />
        <path d="M2 17.5h20v2H2z" />
        <circle cx="7.5" cy="13.5" r="1" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Show your menu and take orders online.',
    tone: 'orange',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Promote your programs and manage memberships.',
    tone: 'green',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11" />
        <path d="M6.5 17.5h11" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
        <path d="M6 4v2a6 6 0 0 0 12 0V4" />
      </svg>
    ),
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Create courses and share knowledge.',
    tone: 'purple',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 'business-website',
    name: 'Business Website',
    description: 'Build a professional website for your business.',
    tone: 'gold',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Something different or unique.',
    tone: 'indigo',
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
      </svg>
    ),
  },
]

export interface OtherSuggestionItem {
  id: string
  label: string
  icon: string
  prompt: string
}

export const ALL_OTHER_SUGGESTIONS: OtherSuggestionItem[] = [
  { id: 'salon', label: 'Salon', icon: '✂️', prompt: 'Manage hair styling, spa services, beauty appointments and bookings' },
  { id: 'sporting-goods', label: 'Sports Store', icon: '⚽', prompt: 'Athletic wear, workout equipment and outdoor adventure gear' },
  { id: 'food-beverages', label: 'Food & Beverages', icon: '☕', prompt: 'Specialty roasters, gourmet pantry and beverage store' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️', prompt: 'Artisan furniture, modern home decor and interior design' },
  { id: 'health-beauty', label: 'Cosmetics & Beauty', icon: '💄', prompt: 'Cosmetics, luxury makeup, skincare and fragrance' },
  { id: 'home-garden', label: 'Home & Garden', icon: '🌿', prompt: 'Indoor houseplants, designer planters and gardening goods' },
  { id: 'luggage-bags', label: 'Luggage & Bags', icon: '🎒', prompt: 'Handcrafted leather travel bags, totes and backpacks' },
  { id: 'office-supplies', label: 'Office Supplies', icon: '📁', prompt: 'Fine stationery, minimalist notebooks and desk equipment' },
  { id: 'toys-games', label: 'Toys & Games', icon: '🎮', prompt: 'Designer board games, puzzles and creative toys' },
  { id: 'vehicles-parts', label: 'Vehicles & Parts', icon: '🚗', prompt: 'Auto performance accessories, motorcycle gear and parts' },
  { id: 'jewelry-accessories', label: 'Jewelry & Accessories', icon: '💎', prompt: 'Fine handcrafted jewelry, gold rings and luxury watches' },
  { id: 'baby-kids', label: 'Baby & Kids', icon: '👶', prompt: 'Organic baby clothing, nursery essentials and toys' },
  { id: 'pet-supplies', label: 'Pet Supplies', icon: '🐾', prompt: 'Organic pet food, luxury beds, treats and pet accessories' },
  { id: 'books-media', label: 'Books & Media', icon: '📚', prompt: 'Curated hardcovers, independent publishers and vinyl records' },
  { id: 'arts-crafts', label: 'Arts & Crafts', icon: '🎨', prompt: 'Studio ceramics, fine pigments and handmade craft supplies' },
  { id: 'grocery-store', label: 'Grocery Store', icon: '🛒', prompt: 'Organic supermarket, fresh local produce, artisan bakery and pantry' },
  { id: 'home-decor', label: 'Home Décor Store', icon: '🏺', prompt: 'Artisan home decor, ceramic vases, linen textiles and aesthetic living accents' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠', prompt: 'Real estate platform with luxury villa listings' },
  { id: 'healthcare', label: 'Healthcare', icon: '➕', prompt: 'Modern dental and medical health clinic' },
  { id: 'travel-tourism', label: 'Travel & Tourism', icon: '✈️', prompt: 'Travel booking website with guided tours' },
  { id: 'photography', label: 'Photography', icon: '📷', prompt: 'Minimal photography and art director portfolio' },
  { id: 'professional-services', label: 'Professional Services', icon: '💼', prompt: 'Professional consulting and agency business' },
  { id: 'events', label: 'Events', icon: '📅', prompt: 'Luxury wedding and event production agency' },
  { id: 'ngo-nonprofit', label: 'NGO / Nonprofit', icon: '🤍', prompt: 'Environmental non-profit NGO foundation' },
  { id: 'portfolio', label: 'Portfolio', icon: '👤', prompt: 'Creative personal portfolio and resume showcase' },
]

export function TemplateDirectoryPage({
  initialBusinessType,
  initialCustomPrompt,
  onBack,
  onSelectBusinessType,
}: TemplateDirectoryPageProps) {
  const initialCategoryKey = getTemplateCategoryKey(initialBusinessType || '')
  const [selectedType, setSelectedType] = useState<string>(() => {
    if (initialCustomPrompt && (!initialBusinessType || initialBusinessType === 'other')) {
      return 'other'
    }
    if (initialCategoryKey && BUSINESS_TYPES.some((b) => b.id === initialCategoryKey && b.id !== 'other')) {
      return initialCategoryKey
    }
    if (initialBusinessType && ALL_OTHER_SUGGESTIONS.some(
      (suggestion) => suggestion.id === initialBusinessType || getTemplateCategoryKey(suggestion.id) === initialCategoryKey
    )) {
      return 'other'
    }
    return 'online-store'
  })

  const [selectedSuggestion, setSelectedSuggestion] = useState<OtherSuggestionItem | null>(() => {
    if (initialBusinessType && initialBusinessType !== 'online-store') {
      return ALL_OTHER_SUGGESTIONS.find(
        (suggestion) => suggestion.id === initialBusinessType ||
          getTemplateCategoryKey(suggestion.id) === initialCategoryKey
      ) || null
    }
    return null
  })

  const [customPrompt, setCustomPrompt] = useState<string>(() => initialCustomPrompt || '')

  const [promptError, setPromptError] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    setSelectedType(id)
    setPromptError(null)
    if (id !== 'other') {
      setSelectedSuggestion(null)
    }
  }

  const handleSuggestionClick = (item: OtherSuggestionItem) => {
    if (selectedSuggestion?.id === item.id) {
      setSelectedSuggestion(null)
      setCustomPrompt('')
    } else {
      setSelectedSuggestion(item)
      setCustomPrompt(item.prompt)
    }
    setPromptError(null)
  }

  const handleContinue = () => {
    if (!selectedType) {
      setPromptError('Please select what you want to build.')
      return
    }

    if (selectedType !== 'other') {
      const selected = BUSINESS_TYPES.find((b) => b.id === selectedType)
      if (selected) {
        onSelectBusinessType(selected.id, selected.name)
      } else {
        onSelectBusinessType('online-store', 'Online Store')
      }
      return
    }

    // When 'other' is selected:
    if (selectedSuggestion) {
      const catKey = getTemplateCategoryKey(selectedSuggestion.id)
      const category = TEMPLATE_REGISTRY[catKey]
      onSelectBusinessType(
        category ? catKey : 'other',
        category?.displayName || selectedSuggestion.label,
        customPrompt || selectedSuggestion.prompt,
      )
      return
    }

    if (customPrompt.trim()) {
      const lower = customPrompt.toLowerCase()
      if (
        lower.includes('shoe') ||
        lower.includes('footwear') ||
        lower.includes('sneaker') ||
        lower.includes('kicks') ||
        lower.includes('boot') ||
        lower.includes('loafer') ||
        lower.includes('shoezone') ||
        lower.includes('susie') ||
        lower.includes('happy feet')
      ) {
        onSelectBusinessType('shoes', 'Shoes Store', customPrompt.trim())
        return
      }

      if (
        lower.includes('jewel') ||
        lower.includes('diamond') ||
        lower.includes('ring') ||
        lower.includes('necklace') ||
        lower.includes('earring') ||
        lower.includes('bracelet') ||
        lower.includes('watch') ||
        lower.includes('gold')
      ) {
        onSelectBusinessType('jewelry-accessories', 'Jewelry & Accessories', customPrompt.trim())
        return
      }

      if (
        lower.includes('sport') ||
        lower.includes('athletic') ||
        lower.includes('gym') ||
        lower.includes('fitness') ||
        lower.includes('workout')
      ) {
        onSelectBusinessType('sporting-goods', 'Sports Store', customPrompt.trim())
        return
      }

      if (
        lower.includes('salon') ||
        lower.includes('barber') ||
        lower.includes('spa') ||
        lower.includes('beauty parlor')
      ) {
        onSelectBusinessType('salon', 'Salon', customPrompt.trim())
        return
      }

      if (isCosmeticsPrompt(lower)) {
        onSelectBusinessType('health-beauty', 'Cosmetics & Beauty', customPrompt.trim())
        return
      }

      if (
        lower.includes('fashion') ||
        lower.includes('cloth') ||
        lower.includes('apparel') ||
        lower.includes('wear') ||
        lower.includes('dress')
      ) {
        onSelectBusinessType('clothing-store', 'Fashion Store', customPrompt.trim())
        return
      }

      if (
        lower.includes('hair') ||
        lower.includes('hairdresser')
      ) {
        onSelectBusinessType('salon', 'Salon', customPrompt.trim())
        return
      }

      const match = ALL_OTHER_SUGGESTIONS.find(
        (s) => lower.includes(s.label.toLowerCase()) || s.label.toLowerCase().includes(lower)
      )
      const catKey = match ? getTemplateCategoryKey(match.id) : 'other'
      const category = TEMPLATE_REGISTRY[catKey]
      onSelectBusinessType(
        category ? catKey : 'other',
        category?.displayName || (match ? match.label : 'Other'),
        customPrompt.trim(),
      )
      return
    }

    onSelectBusinessType('other', 'Other')
  }

  const canContinue = Boolean(
    selectedType && (selectedType !== 'other' || selectedSuggestion || customPrompt.trim())
  )

  return (
    <div className="directory-page">
      <header className="directory-header">
        <WillovateLogo onClick={onBack} />
      </header>

      <main className="directory-main">
        {/* Stepper Header: 3-step Unified Flow */}
        <div className="stepper-container" aria-label="Step 2: Build your idea">
          <div className="stepper-item">
            <span className="stepper-circle completed">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="stepper-label completed">1. Registration</span>
          </div>

          <div className="stepper-track completed" />

          <div className="stepper-item">
            <span className="stepper-circle active">2</span>
            <span className="stepper-label active">2. Build your idea</span>
          </div>

          <div className="stepper-track step-1" />

          <div className="stepper-item">
            <span className="stepper-circle inactive">3</span>
            <span className="stepper-label inactive">3. Choose template</span>
          </div>
        </div>


        {/* Directory Hero Title */}
        <section className="directory-intro directory-hero">
          <h1>What do you want to build?</h1>
          <p>Choose what you&apos;re building. We&apos;ll help you start with the right setup.</p>
        </section>

        {/* 4x2 Balanced Grid matching the 8 main categories */}
        <section className="business-grid" aria-label="Business types" role="radiogroup">
          {BUSINESS_TYPES.map((businessType) => {
            const isSelected = selectedType === businessType.id

            return (
              <div
                className={`business-choice ${isSelected ? 'selected' : ''}`}
                key={businessType.id}
                onClick={() => handleCardClick(businessType.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                aria-label={businessType.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(businessType.id)
                  }
                }}
              >
                <div className="business-choice-content">
                  <span className={`business-icon ${businessType.tone}`}>
                    {businessType.iconSvg}
                  </span>

                  <div className="business-copy">
                    <strong>{businessType.name}</strong>
                    <small>{businessType.description}</small>
                  </div>
                </div>

                <span className="business-radio" aria-hidden="true">
                  {isSelected && <span className="business-radio-dot" />}
                </span>
              </div>
            )
          })}
        </section>

        {/* Appears when 'Other' is Selected */}
        {selectedType === 'other' && (
          <section className="other-custom-panel" aria-label="Describe what you are building">
            <label className="other-prompt-label" htmlFor="custom-prompt-input">
              Describe what you are building:
            </label>
            <div className="other-textarea-wrapper">
              <textarea
                id="custom-prompt-input"
                className="other-prompt-textarea"
                value={customPrompt}
                onChange={(e) => {
                  setCustomPrompt(e.target.value.slice(0, 500))
                  if (promptError) setPromptError(null)
                }}
                placeholder="Describe your unique business or store concept..."
                maxLength={500}
                rows={3}
              />
              <span className="other-prompt-counter">{customPrompt.length}/500</span>
            </div>

            <div className="other-suggestions-section">
              <span className="other-suggestions-label">Suggestions</span>
              <div className="other-suggestions-pills">
                {ALL_OTHER_SUGGESTIONS.map((item) => {
                  const isPillActive = selectedSuggestion?.id === item.id || customPrompt.trim().toLowerCase() === item.label.toLowerCase()
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`suggestion-pill ${isPillActive ? 'active' : ''}`}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <span className="pill-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {promptError && (
              <div className="other-error-banner" role="alert" style={{ marginTop: '1rem' }}>
                <span>⚠️</span>
                <span>{promptError}</span>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="directory-footer">
        <button className="directory-back" type="button" onClick={onBack}>
          ← Back
        </button>
        <button
          className={`directory-continue ${canContinue ? 'active' : ''}`}
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue to Templates →
        </button>
      </footer>
    </div>
  )
}

/* =========================================================================
   STEP 2: MASTER CATEGORY TEMPLATES PAGE COMPONENT
   ========================================================================= */
export interface CategoryTemplatesPageProps {
  businessType?: string
  businessTypeDisplay?: string
  customPrompt?: string
  sessionId?: string
  onBack?: () => void
  onComplete?: (projectId: string, nextStepUrl: string, templateName: string, message: string) => void
}

const CLOTHING_REFERENCE_TEMPLATE: MarketplaceTemplate = BELLE_FASHION_TEMPLATE

export const CategoryTemplatesPage: React.FC<CategoryTemplatesPageProps> = ({
  businessType = 'online-store',
  businessTypeDisplay,
  customPrompt,
  sessionId: _sessionId = 'sess_onboarding_101',
  onBack,
  onComplete,
}) => {
  const normPrompt = (customPrompt || '').toLowerCase()
  const isShoePrompt =
    normPrompt.includes('shoe') ||
    normPrompt.includes('sneaker') ||
    normPrompt.includes('footwear') ||
    normPrompt.includes('kicks') ||
    normPrompt.includes('boot') ||
    normPrompt.includes('loafer') ||
    normPrompt.includes('shoezone') ||
    normPrompt.includes('susie') ||
    normPrompt.includes('happy feet')

  const effectiveBusinessType =
    isShoePrompt && (businessType === 'other' || !businessType)
      ? 'shoes'
      : businessType

  const categoryKey = getTemplateCategoryKey(effectiveBusinessType)
  // Resolve display title and category
  const resolvedCategory = useMemo(() => {
    return TEMPLATE_REGISTRY[categoryKey] || TEMPLATE_REGISTRY['online-store']
  }, [categoryKey])

  const displayTitle = useMemo(() => {
    if (
      categoryKey === 'health-beauty' ||
      categoryKey === 'cosmetics' ||
      categoryKey === 'cosmetic' ||
      categoryKey === 'cosmetic-store' ||
      categoryKey === 'beauty' ||
      businessType?.toLowerCase().includes('cosmetic') ||
      businessTypeDisplay?.toLowerCase().includes('cosmetic')
    ) {
      return 'Cosmetic Store'
    }
    if (
      categoryKey === 'shoes' ||
      isShoePrompt ||
      businessType?.toLowerCase().includes('shoe') ||
      businessTypeDisplay?.toLowerCase().includes('shoe')
    ) {
      return 'Shoes Store'
    }
    return businessTypeDisplay || resolvedCategory?.displayName || 'Online Store'
  }, [categoryKey, isShoePrompt, businessType, businessTypeDisplay, resolvedCategory])

  // Sports keeps its full catalog; clothing-store uses fashion templates; jewelry uses jewelry templates; shoes uses shoes templates; health-beauty uses cosmetics templates.
  const categoryTemplates: MarketplaceTemplate[] = useMemo(() => {
    if (
      categoryKey === 'health-beauty' ||
      categoryKey === 'cosmetics' ||
      categoryKey === 'cosmetic' ||
      categoryKey === 'cosmetic-store' ||
      categoryKey === 'beauty' ||
      displayTitle.toLowerCase().includes('cosmetic') ||
      displayTitle.toLowerCase().includes('beauty') ||
      displayTitle.toLowerCase().includes('skincare')
    ) {
      return ALL_COSMETICS_MARKETPLACE_TEMPLATES
    }
    if (
      categoryKey === 'shoes' ||
      categoryKey === 'shoes-store' ||
      categoryKey === 'shoes-footwear' ||
      categoryKey === 'sneakers' ||
      categoryKey === 'footwear' ||
      isShoePrompt ||
      displayTitle.toLowerCase().includes('shoe') ||
      displayTitle.toLowerCase().includes('footwear') ||
      displayTitle.toLowerCase().includes('sneaker')
    ) {
      return ALL_SHOES_MARKETPLACE_TEMPLATES
    }
    if (categoryKey === 'sporting-goods') {
      return ALL_SPORTS_MARKETPLACE_TEMPLATES
    }
    if (categoryKey === 'clothing-store') {
      return ALL_FASHION_MARKETPLACE_TEMPLATES
    }
    if (categoryKey === 'jewelry-accessories' || categoryKey === 'jewelry') {
      return ALL_JEWELRY_MARKETPLACE_TEMPLATES
    }
    if (TEMPLATE_REGISTRY[categoryKey]?.templates?.length) {
      return TEMPLATE_REGISTRY[categoryKey].templates as unknown as MarketplaceTemplate[]
    }

    return [{
      ...CLOTHING_REFERENCE_TEMPLATE,
      id: `clothing-reference-${categoryKey}`,
      slug: `clothing-reference-${categoryKey}`,
      businessType: categoryKey,
      industryCategory: displayTitle,
      shortDescription: `A high-end fashion storefront for ${displayTitle}.`,
    }]
  }, [categoryKey, displayTitle, isShoePrompt])

  // Selection state
  const defaultTemplateId =
    getTemplateIdFromPrompt(customPrompt || '', categoryTemplates) || categoryTemplates[0]?.id || null
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(defaultTemplateId)

  // Sub-filter & sort state within this chosen category
  const [activeTag, setActiveTag] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('popular')

  // Preview Modal state
  const [previewTemplate, setPreviewTemplate] = useState<MarketplaceTemplate | null>(() => {
    const rawHash = typeof window !== 'undefined' ? window.location.hash.toLowerCase().replace(/^#/, '') : ''
    if (
      rawHash === 'beaux' ||
      rawHash === 'cosmetics-beaux' ||
      rawHash === 'beaux-theme' ||
      rawHash === 'beaux-skincare'
    ) {
      return BEAUX_TEMPLATE
    }
    if (
      rawHash === 'glowing' ||
      rawHash === 'cosmetics-glowing' ||
      rawHash === 'glowing-theme' ||
      rawHash === 'glowing-skincare'
    ) {
      return GLOWING_TEMPLATE
    }
    if (
      rawHash === 'fabish' ||
      rawHash === 'cosmetics-fabish' ||
      rawHash === 'fabish-theme' ||
      rawHash === 'fabish-cosmetics'
    ) {
      return FABISH_TEMPLATE
    }
    if (
      rawHash === 'organica' ||
      rawHash === 'cosmetics-organica' ||
      rawHash === 'organica-1' ||
      rawHash === 'organica-theme'
    ) {
      return ORGANICA_TEMPLATE
    }
    if (
      rawHash === 'shades' ||
      rawHash === 'cosmetics-shades' ||
      rawHash === 'theme-shade' ||
      rawHash === 'shade'
    ) {
      return SHADES_TEMPLATE
    }
    if (
      rawHash === 'belletny' ||
      rawHash === 'cosmetics-belletny' ||
      rawHash === 'belletny-codezeel' ||
      rawHash === 'belletny-theme'
    ) {
      return BELLETNY_TEMPLATE
    }
    if (
      rawHash === 'smetic' ||
      rawHash === 'cosmetics-smetic' ||
      rawHash === 'smetic-store' ||
      rawHash === 'smetic-theme' ||
      rawHash === 'smetic-store-demo'
    ) {
      return SMETIC_TEMPLATE
    }
    if (
      rawHash === 'dezel' ||
      rawHash === 'cosmetics-dezel' ||
      rawHash === 'dezel-perfume' ||
      rawHash === 'dezel-theme' ||
      rawHash === 'perfume'
    ) {
      return DEZEL_TEMPLATE
    }
    if (
      rawHash === 'dt-spalab' ||
      rawHash === 'cosmetics-dt-spalab' ||
      rawHash === 'spalab' ||
      rawHash === 'spa-lab' ||
      rawHash === 'dt-spa'
    ) {
      return DTSPALAB_TEMPLATE
    }
    if (
      rawHash === 'lipura' ||
      rawHash === 'cosmetics-lipura' ||
      rawHash === 'lipura-store' ||
      rawHash === 'lipura-theme' ||
      rawHash === 'lipura-store-newdemo'
    ) {
      return LIPURA_TEMPLATE
    }
    if (
      rawHash === 'shoes-workdo' ||
      rawHash === 'shoesworkdo' ||
      rawHash === 'workdo-shoes-store'
    ) {
      return SHOES_WORKDO_TEMPLATE
    }
    if (
      rawHash === 'sensation' ||
      rawHash === 'shoes-sensation' ||
      rawHash === 'sensation-workdo' ||
      rawHash === 'sensation-shoes'
    ) {
      return SENSATION_WORKDO_TEMPLATE
    }
    if (
      rawHash === 'giaros' ||
      rawHash === 'shoes-giaros' ||
      rawHash === 'giaros-shoes'
    ) {
      return GIAROS_TEMPLATE
    }
    if (
      rawHash === 'stepglam' ||
      rawHash === 'shoes-stepglam' ||
      rawHash === 'stepglam-workdo' ||
      rawHash === 'stepglam-shoes'
    ) {
      return STEPGLAM_TEMPLATE
    }
    if (
      rawHash === 'ap-shoes' ||
      rawHash === 'shoes-ap-shoes' ||
      rawHash === 'ap-shoes-store' ||
      rawHash === 'noz' ||
      rawHash === 'noz-shoes'
    ) {
      return AP_SHOES_TEMPLATE
    }
    if (
      rawHash === 'fashion-feet' ||
      rawHash === 'fashionfeet' ||
      rawHash === 'shoes-fashion-feet' ||
      rawHash === 'mensshoe'
    ) {
      return FASHION_FEET_TEMPLATE
    }
    if (
      rawHash === 'footwear-workdo' ||
      rawHash === 'shoes-footwear-workdo' ||
      rawHash === 'workdo-shoes'
    ) {
      return FOOTWEAR_WORKDO_TEMPLATE
    }
    if (
      rawHash === 'susie' ||
      rawHash === 'shoes-susie' ||
      rawHash === 'susie-shoes' ||
      rawHash === 'kids-shoes'
    ) {
      return SUSIE_SHOES_TEMPLATE
    }
    if (
      rawHash === 'shoezone' ||
      rawHash === 'shoes-shoezone'
    ) {
      return SHOE_ZONE_TEMPLATE
    }
    if (
      rawHash === 'happy-feet' ||
      rawHash === 'shoes-happy-feet'
    ) {
      return HAPPY_FEET_TEMPLATE
    }
    if (rawHash === 'sports-storefront' || rawHash === 'velocity' || rawHash === 'sports-preview' || rawHash === 'velocity-preview') {
      return ALL_SPORTS_MARKETPLACE_TEMPLATES[0] || null
    }
    if (
      rawHash === 'fashion' ||
      rawHash === 'fashion-store' ||
      rawHash === 'fashion-templates' ||
      rawHash === 'belle' ||
      rawHash === 'belle-fashion' ||
      rawHash === 'fashion-belle'
    ) {
      return BELLE_FASHION_TEMPLATE
    }
    if (
      rawHash === 'vogal' ||
      rawHash === 'fashion-vogal' ||
      rawHash === 'vogal-fashion'
    ) {
      return VOGAL_FASHION_TEMPLATE
    }
    if (
      rawHash === 'optimal' ||
      rawHash === 'fashion-optimal' ||
      rawHash === 'optimal-fashion'
    ) {
      return OPTIMAL_FASHION_TEMPLATE
    }
    if (
      rawHash === 'naturya' ||
      rawHash === 'fashion-naturya' ||
      rawHash === 'naturya-fashion'
    ) {
      return NATURYA_FASHION_TEMPLATE
    }
    if (
      rawHash === 'trendy' ||
      rawHash === 'fashion-trendy' ||
      rawHash === 'trendy-fashion' ||
      rawHash === 'trendy-templates'
    ) {
      return TRENDY_FASHION_TEMPLATE
    }
    if (
      rawHash === 'fragrance' ||
      rawHash === 'fashion-fragrance' ||
      rawHash === 'fragrance-fashion' ||
      rawHash === 'fragrance-templates'
    ) {
      return FRAGRANCE_FASHION_TEMPLATE
    }
    if (
      rawHash === 'johary' ||
      rawHash === 'johary-jewelry' ||
      rawHash === 'jewelry-johary' ||
      rawHash === 'johary-templates' ||
      rawHash === 'johary-template'
    ) {
      return JOHARY_JEWELRY_TEMPLATE
    }
    if (
      rawHash === 'lopez' ||
      rawHash === 'lopez-jewelry' ||
      rawHash === 'jewelry-lopez' ||
      rawHash === 'lopez-templates' ||
      rawHash === 'lopez-template'
    ) {
      return LOPEZ_JEWELRY_TEMPLATE
    }
    if (
      rawHash === 'ps-jewelshop' ||
      rawHash === 'ps-jewelshop-jewelry' ||
      rawHash === 'jewelry-ps-jewelshop' ||
      rawHash === 'ps-jewelshop-templates' ||
      rawHash === 'ps-jewelshop-template' ||
      rawHash === 'jewelshop' ||
      rawHash === 'jewelshop-templates' ||
      rawHash === 'jewelshop-template'
    ) {
      return PS_JEWELSHOP_TEMPLATE
    }
    if (
      rawHash === 'timzee' ||
      rawHash === 'jewelry-timzee' ||
      rawHash === 'timzee-watches' ||
      rawHash === 'timzee-templates' ||
      rawHash === 'timzee-template' ||
      rawHash === 'watches' ||
      rawHash === 'watches-timzee'
    ) {
      return TIMZEE_WATCHES_TEMPLATE
    }
    if (
      rawHash === 'jewels' ||
      rawHash === 'jewels-workdo' ||
      rawHash === 'jewelry-jewels-workdo' ||
      rawHash === 'jewels-templates' ||
      rawHash === 'jewels-template'
    ) {
      return JEWELS_WORKDO_TEMPLATE
    }

    if (
      rawHash === 'diamond-workdo' ||
      rawHash === 'jewelry-diamond-workdo' ||
      rawHash === 'diamond-workdo-templates' ||
      rawHash === 'diamond-workdo-template'
    ) {
      return DIAMOND_WORKDO_TEMPLATE
    }

    if (
      rawHash === 'vt-olight' ||
      rawHash === 'jewelry-vt-olight' ||
      rawHash === 'olight' ||
      rawHash === 'vt-olight-templates' ||
      rawHash === 'vt-olight-template' ||
      rawHash === 'olight-templates' ||
      rawHash === 'olight-template'
    ) {
      return VT_OLIGHT_TEMPLATE
    }

    if (
      rawHash === 'swarna' ||
      rawHash === 'jewelry-swarna' ||
      rawHash === 'swarna-templates' ||
      rawHash === 'swarna-template'
    ) {
      return SWARNA_TEMPLATE
    }

    if (
      rawHash === 'jew' ||
      rawHash === 'jewelry-jew' ||
      rawHash === 'jew-templates' ||
      rawHash === 'jew-template' ||
      rawHash === 'jew-theme'
    ) {
      return JEW_TEMPLATE
    }

    if (
      rawHash === 'diamond' ||
      rawHash === 'jewelry' ||
      rawHash === 'jewelry-diamond' ||
      rawHash === 'jewelry-accessories' ||
      rawHash === 'diamond-jewelry' ||
      rawHash === 'diamond-templates' ||
      rawHash === 'diamond-template' ||
      rawHash === 'diamond-luxury' ||
      rawHash === 'jwell' ||
      rawHash === 'jwell-templet' ||
      rawHash === 'jwell-template' ||
      rawHash === 'jwell-templates' ||
      rawHash === 'jwellery' ||
      rawHash === 'jwellery-templet' ||
      rawHash === 'jwellery-template' ||
      rawHash === 'jewel' ||
      rawHash === 'jewel-template' ||
      rawHash === 'jewel-templates' ||
      rawHash === 'jewellery' ||
      rawHash === 'jewellery-templates' ||
      rawHash === 'jewellery-templet' ||
      rawHash === 'jewelry-templates' ||
      rawHash === 'jewelry-templet' ||
      rawHash === 'aurelia'
    ) {
      return DIAMOND_JEWELRY_TEMPLATE
    }
    return null
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const previousBusinessType = useRef(businessType)
  useEffect(() => {
    if (previousBusinessType.current === businessType) return
    previousBusinessType.current = businessType
    setSelectedTemplateId(defaultTemplateId)
    setActiveTag('All')
    setPreviewTemplate(null)
  }, [businessType, categoryTemplates, defaultTemplateId])

  // Auto-launch preview if URL hash changes to sports, fashion, jewelry, or shoes presets
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.toLowerCase().replace(/^#/, '')
      if (
        rawHash === 'beaux' ||
        rawHash === 'cosmetics-beaux' ||
        rawHash === 'beaux-theme' ||
        rawHash === 'beaux-skincare'
      ) {
        setPreviewTemplate(BEAUX_TEMPLATE)
      } else if (
        rawHash === 'glowing' ||
        rawHash === 'cosmetics-glowing' ||
        rawHash === 'glowing-theme' ||
        rawHash === 'glowing-skincare'
      ) {
        setPreviewTemplate(GLOWING_TEMPLATE)
      } else if (
        rawHash === 'fabish' ||
        rawHash === 'cosmetics-fabish' ||
        rawHash === 'fabish-theme' ||
        rawHash === 'fabish-cosmetics'
      ) {
        setPreviewTemplate(FABISH_TEMPLATE)
      } else if (
        rawHash === 'organica' ||
        rawHash === 'cosmetics-organica' ||
        rawHash === 'organica-1' ||
        rawHash === 'organica-theme'
      ) {
        setPreviewTemplate(ORGANICA_TEMPLATE)
      } else if (
        rawHash === 'shades' ||
        rawHash === 'cosmetics-shades' ||
        rawHash === 'theme-shade' ||
        rawHash === 'shade'
      ) {
        setPreviewTemplate(SHADES_TEMPLATE)
      } else if (
        rawHash === 'belletny' ||
        rawHash === 'cosmetics-belletny' ||
        rawHash === 'belletny-codezeel' ||
        rawHash === 'belletny-theme'
      ) {
        setPreviewTemplate(BELLETNY_TEMPLATE)
      } else if (
        rawHash === 'smetic' ||
        rawHash === 'cosmetics-smetic' ||
        rawHash === 'smetic-store' ||
        rawHash === 'smetic-theme' ||
        rawHash === 'smetic-store-demo'
      ) {
        setPreviewTemplate(SMETIC_TEMPLATE)
      } else if (
        rawHash === 'dezel' ||
        rawHash === 'cosmetics-dezel' ||
        rawHash === 'dezel-perfume' ||
        rawHash === 'dezel-theme' ||
        rawHash === 'perfume'
      ) {
        setPreviewTemplate(DEZEL_TEMPLATE)
      } else if (
        rawHash === 'dt-spalab' ||
        rawHash === 'cosmetics-dt-spalab' ||
        rawHash === 'spalab' ||
        rawHash === 'spa-lab' ||
        rawHash === 'dt-spa'
      ) {
        setPreviewTemplate(DTSPALAB_TEMPLATE)
      } else if (
        rawHash === 'lipura' ||
        rawHash === 'cosmetics-lipura' ||
        rawHash === 'lipura-store' ||
        rawHash === 'lipura-theme' ||
        rawHash === 'lipura-store-newdemo'
      ) {
        setPreviewTemplate(LIPURA_TEMPLATE)
      } else if (
        rawHash === 'shoes-workdo' ||
        rawHash === 'shoesworkdo' ||
        rawHash === 'workdo-shoes-store'
      ) {
        setPreviewTemplate(SHOES_WORKDO_TEMPLATE)
      } else if (
        rawHash === 'sensation' ||
        rawHash === 'shoes-sensation' ||
        rawHash === 'sensation-workdo' ||
        rawHash === 'sensation-shoes'
      ) {
        setPreviewTemplate(SENSATION_WORKDO_TEMPLATE)
      } else if (
        rawHash === 'giaros' ||
        rawHash === 'shoes-giaros' ||
        rawHash === 'giaros-shoes'
      ) {
        setPreviewTemplate(GIAROS_TEMPLATE)
      } else if (
        rawHash === 'stepglam' ||
        rawHash === 'shoes-stepglam' ||
        rawHash === 'stepglam-workdo' ||
        rawHash === 'stepglam-shoes'
      ) {
        setPreviewTemplate(STEPGLAM_TEMPLATE)
      } else if (
        rawHash === 'ap-shoes' ||
        rawHash === 'shoes-ap-shoes' ||
        rawHash === 'ap-shoes-store' ||
        rawHash === 'noz' ||
        rawHash === 'noz-shoes'
      ) {
        setPreviewTemplate(AP_SHOES_TEMPLATE)
      } else if (
        rawHash === 'fashion-feet' ||
        rawHash === 'fashionfeet' ||
        rawHash === 'shoes-fashion-feet' ||
        rawHash === 'mensshoe'
      ) {
        setPreviewTemplate(FASHION_FEET_TEMPLATE)
      } else if (
        rawHash === 'footwear-workdo' ||
        rawHash === 'shoes-footwear-workdo' ||
        rawHash === 'workdo-shoes'
      ) {
        setPreviewTemplate(FOOTWEAR_WORKDO_TEMPLATE)
      } else if (
        rawHash === 'susie' ||
        rawHash === 'shoes-susie' ||
        rawHash === 'susie-shoes' ||
        rawHash === 'kids-shoes'
      ) {
        setPreviewTemplate(SUSIE_SHOES_TEMPLATE)
      } else if (
        rawHash === 'shoezone' ||
        rawHash === 'shoes-shoezone'
      ) {
        setPreviewTemplate(SHOE_ZONE_TEMPLATE)
      } else if (
        rawHash === 'happy-feet' ||
        rawHash === 'shoes-happy-feet'
      ) {
        setPreviewTemplate(HAPPY_FEET_TEMPLATE)
      } else if (
        rawHash === 'shoes' ||
        rawHash === 'shoes-store' ||
        rawHash === 'shoes-footwear' ||
        rawHash === 'shoes-templates' ||
        rawHash === 'shoes-template' ||
        rawHash === 'footwear' ||
        rawHash === 'sneakers'
      ) {
        setPreviewTemplate(null)
      } else if (rawHash === 'sports-storefront' || rawHash === 'velocity' || rawHash === 'sports-preview' || rawHash === 'velocity-preview') {
        const match = ALL_SPORTS_MARKETPLACE_TEMPLATES[0]
        if (match) setPreviewTemplate(match)
      } else if (
        rawHash === 'fashion' ||
        rawHash === 'fashion-store' ||
        rawHash === 'fashion-templates' ||
        rawHash === 'belle' ||
        rawHash === 'belle-fashion' ||
        rawHash === 'fashion-belle'
      ) {
        setPreviewTemplate(BELLE_FASHION_TEMPLATE)
      } else if (
        rawHash === 'vogal' ||
        rawHash === 'fashion-vogal' ||
        rawHash === 'vogal-fashion'
      ) {
        setPreviewTemplate(VOGAL_FASHION_TEMPLATE)
      } else if (
        rawHash === 'optimal' ||
        rawHash === 'fashion-optimal' ||
        rawHash === 'optimal-fashion'
      ) {
        setPreviewTemplate(OPTIMAL_FASHION_TEMPLATE)
      } else if (
        rawHash === 'naturya' ||
        rawHash === 'fashion-naturya' ||
        rawHash === 'naturya-fashion'
      ) {
        setPreviewTemplate(NATURYA_FASHION_TEMPLATE)
      } else if (
        rawHash === 'trendy' ||
        rawHash === 'fashion-trendy' ||
        rawHash === 'trendy-fashion' ||
        rawHash === 'trendy-templates'
      ) {
        setPreviewTemplate(TRENDY_FASHION_TEMPLATE)
      } else if (
        rawHash === 'fragrance' ||
        rawHash === 'fashion-fragrance' ||
        rawHash === 'fragrance-fashion' ||
        rawHash === 'fragrance-templates'
      ) {
        setPreviewTemplate(FRAGRANCE_FASHION_TEMPLATE)
      } else if (
        rawHash === 'johary' ||
        rawHash === 'johary-jewelry' ||
        rawHash === 'jewelry-johary' ||
        rawHash === 'johary-templates' ||
        rawHash === 'johary-template'
      ) {
        setPreviewTemplate(JOHARY_JEWELRY_TEMPLATE)
      } else if (
        rawHash === 'lopez' ||
        rawHash === 'lopez-jewelry' ||
        rawHash === 'jewelry-lopez' ||
        rawHash === 'lopez-templates' ||
        rawHash === 'lopez-template'
      ) {
        setPreviewTemplate(LOPEZ_JEWELRY_TEMPLATE)
      } else if (
        rawHash === 'ps-jewelshop' ||
        rawHash === 'ps-jewelshop-jewelry' ||
        rawHash === 'jewelry-ps-jewelshop' ||
        rawHash === 'ps-jewelshop-templates' ||
        rawHash === 'ps-jewelshop-template' ||
        rawHash === 'jewelshop' ||
        rawHash === 'jewelshop-templates' ||
        rawHash === 'jewelshop-template'
      ) {
        setPreviewTemplate(PS_JEWELSHOP_TEMPLATE)
      } else if (
        rawHash === 'timzee' ||
        rawHash === 'jewelry-timzee' ||
        rawHash === 'timzee-watches' ||
        rawHash === 'timzee-templates' ||
        rawHash === 'timzee-template' ||
        rawHash === 'watches' ||
        rawHash === 'watches-timzee'
      ) {
        setPreviewTemplate(TIMZEE_WATCHES_TEMPLATE)
      } else if (
        rawHash === 'jewels' ||
        rawHash === 'jewels-workdo' ||
        rawHash === 'jewelry-jewels-workdo' ||
        rawHash === 'jewels-templates' ||
        rawHash === 'jewels-template'
      ) {
        setPreviewTemplate(JEWELS_WORKDO_TEMPLATE)
      } else if (
        rawHash === 'diamond-workdo' ||
        rawHash === 'jewelry-diamond-workdo' ||
        rawHash === 'diamond-workdo-templates' ||
        rawHash === 'diamond-workdo-template'
      ) {
        setPreviewTemplate(DIAMOND_WORKDO_TEMPLATE)
      } else if (
        rawHash === 'vt-olight' ||
        rawHash === 'jewelry-vt-olight' ||
        rawHash === 'olight' ||
        rawHash === 'vt-olight-templates' ||
        rawHash === 'vt-olight-template' ||
        rawHash === 'olight-templates' ||
        rawHash === 'olight-template'
      ) {
        setPreviewTemplate(VT_OLIGHT_TEMPLATE)
      } else if (
        rawHash === 'swarna' ||
        rawHash === 'jewelry-swarna' ||
        rawHash === 'swarna-templates' ||
        rawHash === 'swarna-template'
      ) {
        setPreviewTemplate(SWARNA_TEMPLATE)
      } else if (
        rawHash === 'jew' ||
        rawHash === 'jewelry-jew' ||
        rawHash === 'jew-templates' ||
        rawHash === 'jew-template' ||
        rawHash === 'jew-theme'
      ) {
        setPreviewTemplate(JEW_TEMPLATE)
      } else if (

        rawHash === 'diamond' ||
        rawHash === 'jewelry' ||
        rawHash === 'jewelry-diamond' ||
        rawHash === 'jewelry-accessories' ||
        rawHash === 'diamond-jewelry' ||
        rawHash === 'diamond-templates' ||
        rawHash === 'diamond-template' ||
        rawHash === 'diamond-luxury' ||
        rawHash === 'jwell' ||
        rawHash === 'jwell-templet' ||
        rawHash === 'jwell-template' ||
        rawHash === 'jwell-templates' ||
        rawHash === 'jwellery' ||
        rawHash === 'jwellery-templet' ||
        rawHash === 'jwellery-template' ||
        rawHash === 'jewel' ||
        rawHash === 'jewel-template' ||
        rawHash === 'jewel-templates' ||
        rawHash === 'jewellery' ||
        rawHash === 'jewellery-templates' ||
        rawHash === 'jewellery-templet' ||
        rawHash === 'jewelry-templates' ||
        rawHash === 'jewelry-templet' ||
        rawHash === 'aurelia'
      ) {
        setPreviewTemplate(DIAMOND_JEWELRY_TEMPLATE)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Sub-filter tags available specifically for this category's templates
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    tags.add('All')
    categoryTemplates.forEach((t) => {
      if (t.style) {
        tags.add(t.style.charAt(0).toUpperCase() + t.style.slice(1))
      }
      t.tags.forEach((tag) => {
        if (tag.length < 18 && tag.toLowerCase() !== 'all') {
          tags.add(tag)
        }
      })
    })
    return Array.from(tags).slice(0, 8)
  }, [categoryTemplates])

  // Filter and sort the category's templates
  const filteredTemplates = useMemo(() => {
    let list = [...categoryTemplates]

    if (activeTag !== 'All') {
      const normTag = activeTag.toLowerCase()
      list = list.filter(
        (t) =>
          t.style?.toLowerCase() === normTag ||
          t.tags.some((tag) => tag.toLowerCase() === normTag)
      )
    }

    if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0) || b.popularityScore - a.popularityScore)
    } else {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.popularityScore - a.popularityScore)
    }

    return list
  }, [categoryTemplates, activeTag, sortBy])

  // Active selected template
  const selectedTemplate = useMemo(() => {
    return categoryTemplates.find((t) => t.id === selectedTemplateId) || categoryTemplates[0] || null
  }, [categoryTemplates, selectedTemplateId])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
  }

  const handleContinue = async () => {
    if (!selectedTemplate) return

    try {
      setIsSubmitting(true)
      const chosen = selectedTemplate

      if (onComplete) {
        onComplete(
          `proj_${categoryKey}_${Date.now()}`,
          '/workspace',
          chosen.name ?? `${displayTitle} Template`,
          `Your ${chosen.name || displayTitle} template is ready in your workspace.`,
        )
      } else {
        window.location.href = '/workspace'
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to proceed to workspace. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasSelection = Boolean(selectedTemplateId)

  return (
    <div className="marketplace-page-container">
      {/* Top Application Header: Logo on left, balanced layout */}
      <header className="marketplace-top-header">
        <div className="header-left">
          <WillovateLogo onClick={onBack} />
        </div>
        <div className="header-right" />
      </header>

      {/* Stepper & Category Title Section */}
      <section className="marketplace-hero-section">
        <div className="marketplace-stepper-wrap">
          <div className="stepper-container" aria-label="Step 3: Choose a template">
            <div className="stepper-item">
              <span className="stepper-circle completed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="stepper-label completed">1. Registration</span>
            </div>

            <div className="stepper-track completed" />

            <div className="stepper-item">
              <span className="stepper-circle completed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="stepper-label completed">2. Build your idea</span>
            </div>

            <div className="stepper-track completed" />

            <div className="stepper-item">
              <span className="stepper-circle active">3</span>
              <span className="stepper-label active">3. Choose template</span>
            </div>
          </div>
        </div>


        {/* Title and Context Badge for the Chosen Category */}
        <div className="marketplace-title-group">
          <h1 className="marketplace-main-title">Choose your template</h1>

          <div className="selection-pill-badge">
            <svg
              className="selection-pill-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="selection-pill-text">
              Based on your selection: <strong>{displayTitle}</strong>
            </span>
          </div>

          <p className="marketplace-subtitle">
            Choose a design to get started. You can customize it later.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="marketplace-body-container">
       
        {/* Category Controls: Filter Tags & Sorting (only when templates exist) */}
        {categoryTemplates.length > 0 && (
          <div className="category-control-row">
            <div className="control-filter-pills">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="control-sort-box">
              <label htmlFor="category-sort-select" className="sr-only">Sort by:</label>
              <select
                id="category-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="marketplace-sort-select"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="newest">Sort by: Newest</option>
                <option value="name_asc">Sort by: Name (A-Z)</option>
              </select>
            </div>
          </div>
        )}

        {/* Empty State: Rendered when category has no templates (clean and clear) */}
        {filteredTemplates.length === 0 && (
          <div className="marketplace-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No templates found for {displayTitle}</h3>
            <p>There are no templates for this filter yet. View the available reference storefront instead.</p>
            <button
              type="button"
              className="empty-clear-btn"
              onClick={() => setActiveTag('All')}
            >
              Show Available Reference
            </button>
          </div>
        )}

        {/* Grid of Templates (ONLY for categories that have templates) */}
        {filteredTemplates.length > 0 && (
          <div className="templates-cards-grid">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleSelectTemplate}
                onPreview={(tpl) => setPreviewTemplate(tpl)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="bottom-nav-footer">
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            if (onBack) onBack()
            else window.history.back()
          }}
        >
          ← Back
        </button>

        <div className="bottom-right-group">
          {selectedTemplate && (
            <button
              type="button"
              className="selected-template-chip-btn"
              onClick={() => setPreviewTemplate(selectedTemplate)}
              title="Click to preview selected template"
            >
              <span className="chip-check-icon">✓</span>
              <span className="chip-text">Selected:</span>
              <strong className="chip-name">{selectedTemplate.name}</strong>
            </button>
          )}

          <button
            type="button"
            className={`continue-btn ${hasSelection ? 'active' : ''}`}
            disabled={!hasSelection || isSubmitting}
            onClick={handleContinue}
          >
            {isSubmitting ? 'Initializing Workspace...' : 'Continue to Workspace →'}
          </button>
        </div>
      </footer>

      {/* Interactive Multi-Device Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={(templateId) => {
            handleSelectTemplate(templateId)
          }}
        />
      )}
    </div>
  )
}

/* =========================================================================
   MASTER TEMPLATES PAGE FLOW (Step 1 -> Step 2)
   ========================================================================= */
export interface TemplatesPageProps {
  initialBusinessType?: string
  initialStep?: 1 | 2
  onBack?: () => void
  onComplete?: (projectId: string, nextStepUrl: string, templateName: string, message: string) => void
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  initialBusinessType = 'online-store',
  initialStep = 1,
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(initialStep)
  const [selectedType, setSelectedType] = useState<string>(initialBusinessType)
  const [selectedDisplay, setSelectedDisplay] = useState<string>('Online Store')
  const [customPrompt, setCustomPrompt] = useState<string>('')

  if (step === 1) {
    return (
      <TemplateDirectoryPage
        initialBusinessType={selectedType}
        onBack={onBack}
        onSelectBusinessType={(businessType, displayName, prompt) => {
          setSelectedType(businessType)
          setSelectedDisplay(displayName)
          if (prompt) setCustomPrompt(prompt)
          setStep(2)
        }}
      />
    )
  }

  return (
    <CategoryTemplatesPage
      businessType={selectedType}
      businessTypeDisplay={selectedDisplay}
      customPrompt={customPrompt}
      onBack={() => setStep(1)}
      onComplete={onComplete}
    />
  )
}

export const ClothingStoreTemplatesPage = CategoryTemplatesPage
export const RestaurantTemplatesPage = CategoryTemplatesPage
export default TemplatesPage