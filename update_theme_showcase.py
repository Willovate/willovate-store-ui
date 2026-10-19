import sys
import re

print("Updating files for the new Theme Showcase...")

# 1. We will create a new file `src/data/themeShowcases.ts` to hold the rich data generator instead of cluttering `templateCategories.ts` further.
showcases_ts = """
import { templateCategories } from './templateCategories';

export interface ThemeShowcaseSection {
  title: string;
  description: string;
  image: string;
}

export interface ThemeShowcase {
  themeSlug: string;
  storyHeading: string;
  storyText: string;
  storyImage: string;
  features: ThemeShowcaseSection[];
  gallery: string[];
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const categoryImageBanks: Record<string, { story: string[], features: string[], gallery: string[] }> = {
  'fine-dining': {
    story: ['photo-1514933651103-005eec06c04b', 'photo-1559339352-11d035aa65de', 'photo-1414235077428-338988692309'],
    features: ['photo-1550966871-3ed3cdb5ed0c', 'photo-1578474846511-04ba529f0b88', 'photo-1507652313519-d4e9174996cb', 'photo-1600891964092-4316c2883c44'],
    gallery: ['photo-1544148103-0773bf10d330', 'photo-1551632436-cbf8dd35adfa', 'photo-1582169505937-b9992bd01ed9', 'photo-1514361892635-6b07e31e75f9', 'photo-1505826759037-406b40feb4cd', 'photo-1559329007-40df8a9345d8']
  },
  'cafe': {
    story: ['photo-1497935586351-b67a49e012bf', 'photo-1509042239860-f550ce710b93', 'photo-1445116572660-236099ac95f5'],
    features: ['photo-1507133750076-13d82084c05e', 'photo-1461023058943-0708e52db352', 'photo-1511920170033-f8396924c348', 'photo-1481833761820-0509d3217039'],
    gallery: ['photo-1498804103079-a6351b050096', 'photo-1495474472287-4d71bcdd2085', 'photo-1501339817309-158cb04ce88d', 'photo-1514432324607-a09d9b4aefdd', 'photo-1509042239860-f550ce710b93', 'photo-1497935586351-b67a49e012bf']
  },
  'bakery': {
    story: ['photo-1509440159596-0249088772ff', 'photo-1517686469429-8bdb88b9f907', 'photo-1555507036-ab1f4038808a'],
    features: ['photo-1549931319-a545dcf3bc7b', 'photo-1612201142855-7873bc1661b4', 'photo-1588195538326-c5b1e9f80a1b', 'photo-1483695028939-5bb13f8648b0'],
    gallery: ['photo-1509440159596-0249088772ff', 'photo-1555507036-ab1f4038808a', 'photo-1549931319-a545dcf3bc7b', 'photo-1612201142855-7873bc1661b4', 'photo-1588195538326-c5b1e9f80a1b', 'photo-1517686469429-8bdb88b9f907']
  },
  'fast-food': {
    story: ['photo-1565299624946-b28f40a0ae38', 'photo-1550547660-d9450f859349'],
    features: ['photo-1571091718767-18b5b1457add', 'photo-1551782450-a2132b4ba21d', 'photo-1594007654729-407eedc4be65'],
    gallery: ['photo-1565299624946-b28f40a0ae38', 'photo-1550547660-d9450f859349', 'photo-1571091718767-18b5b1457add', 'photo-1551782450-a2132b4ba21d', 'photo-1594007654729-407eedc4be65', 'photo-1586190848861-99aa4a171e90']
  },
  'cloud-kitchen': {
    story: ['photo-1556911220-bff31c812dba', 'photo-1556740749-887f6717d7e4'],
    features: ['photo-1600891964092-4316c2883c44', 'photo-1547592180-85f173990554', 'photo-1528712306091-ed0763094c98'],
    gallery: ['photo-1556911220-bff31c812dba', 'photo-1556740749-887f6717d7e4', 'photo-1600891964092-4316c2883c44', 'photo-1547592180-85f173990554', 'photo-1528712306091-ed0763094c98', 'photo-1587314168485-3236d6710814']
  },
  'pizza': {
    story: ['photo-1548365328-8b849e6f6b92', 'photo-1513104890138-7c749659a591'],
    features: ['photo-1574071318508-1cdbab80d002', 'photo-1593560708920-61dd98c46a4e', 'photo-1604382354936-07c5d9983bd3'],
    gallery: ['photo-1548365328-8b849e6f6b92', 'photo-1513104890138-7c749659a591', 'photo-1574071318508-1cdbab80d002', 'photo-1593560708920-61dd98c46a4e', 'photo-1604382354936-07c5d9983bd3', 'photo-1565299624946-b28f40a0ae38']
  },
  'indian': {
    story: ['photo-1585937421612-70a008356fbe', 'photo-1601050690597-df0568f70950'],
    features: ['photo-1631452180519-c014fe946bc0', 'photo-1567188040759-fb8a883dc6d8', 'photo-1626132647523-66f5bf380027'],
    gallery: ['photo-1585937421612-70a008356fbe', 'photo-1601050690597-df0568f70950', 'photo-1631452180519-c014fe946bc0', 'photo-1567188040759-fb8a883dc6d8', 'photo-1626132647523-66f5bf380027', 'photo-1517244683847-7456b63c5969']
  },
  'dessert-shop': {
    story: ['photo-1551024506-0bccd828d307', 'photo-1578985545062-69928b1d9587'],
    features: ['photo-1511381939415-e44015466834', 'photo-1563805042-7684c019e1cb', 'photo-1558303420-f814d8a590f5'],
    gallery: ['photo-1551024506-0bccd828d307', 'photo-1578985545062-69928b1d9587', 'photo-1511381939415-e44015466834', 'photo-1563805042-7684c019e1cb', 'photo-1558303420-f814d8a590f5', 'photo-1550617931-e17a7b70dce2']
  },
  'food-delivery': {
    story: ['photo-1526367790999-0150786686a2', 'photo-1569058242253-92a9c755a0ec'],
    features: ['photo-1546069901-ba9599a7e63c', 'photo-1515003197210-e0cd71810b5f', 'photo-1540189549336-e6e99c3679fe'],
    gallery: ['photo-1526367790999-0150786686a2', 'photo-1569058242253-92a9c755a0ec', 'photo-1546069901-ba9599a7e63c', 'photo-1515003197210-e0cd71810b5f', 'photo-1540189549336-e6e99c3679fe', 'photo-1583847268964-b28dc8f51f92']
  },
  'bbq-grill': {
    story: ['photo-1529193591184-b1d58069ecdd', 'photo-1558030006-450675393462'],
    features: ['photo-1544025162-d76694265947', 'photo-1555939594-58d7cb561ad1', 'photo-1529042410759-befb1204b468'],
    gallery: ['photo-1529193591184-b1d58069ecdd', 'photo-1558030006-450675393462', 'photo-1544025162-d76694265947', 'photo-1555939594-58d7cb561ad1', 'photo-1529042410759-befb1204b468', 'photo-1555939594-58d7cb561ad1']
  }
}

// Fallback images if something goes wrong
const fallback = { story: 'photo-1414235077428-338988692309', feature: 'photo-1507652313519-d4e9174996cb' };

export const getThemeShowcase = (categorySlug: string, subsectionSlug: string, themeSlug: string): ThemeShowcase => {
  const bank = categoryImageBanks[subsectionSlug] || categoryImageBanks['fine-dining'];
  
  // Use a pseudo-random index based on the themeSlug so it stays consistent per theme but differs between themes
  const hash = themeSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    themeSlug,
    storyHeading: 'Crafted for an unforgettable experience.',
    storyText: 'Create an atmosphere online that reflects the experience guests feel when they walk through your doors. This template is designed from the ground up to showcase your culinary vision with elegance and clarity.',
    storyImage: unsplash(bank.story[hash % bank.story.length]),
    features: [
      {
        title: 'Signature Dishes',
        description: 'Highlight your finest creations with edge-to-edge photography and elegant typography.',
        image: unsplash(bank.features[hash % bank.features.length])
      },
      {
        title: 'The Experience',
        description: 'Immerse visitors in the atmosphere of your space before they even book a table.',
        image: unsplash(bank.features[(hash + 1) % bank.features.length])
      },
      {
        title: 'Seamless Reservations',
        description: 'Integrated booking paths ensure high conversion and a smooth customer journey.',
        image: unsplash(bank.features[(hash + 2) % bank.features.length])
      }
    ],
    gallery: bank.gallery.map(id => unsplash(id))
  };
}
"""

with open('src/data/themeShowcases.ts', 'w', encoding='utf-8') as f:
    f.write(showcases_ts)


# 2. Update BrowseThemePreview.tsx
preview_ts = """
import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import TemplatesLayout from '../components/TemplatesLayout'
import { templateCategories } from '../data/templateCategories'
import { getThemeShowcase } from '../data/themeShowcases'
import { RestaurantTheme, restaurantThemePresets } from '../themes/RestaurantTheme'
import { registry } from '../templates/registry'
import '../styles/theme-showcase.css'

export default function BrowseThemePreview() {
  const { categorySlug, subsectionSlug, themeSlug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const isIframePreview = new URLSearchParams(location.search).get('preview') === '1'
  const isLivePreview = new URLSearchParams(location.search).get('live') === '1'
  
  const category = templateCategories.find(item => item.slug === categorySlug)
  const subsection = category?.subsections.find(item => item.slug === subsectionSlug)
  const theme = subsection?.themes.find(item => item.slug === themeSlug)
  
  const preset = theme?.presetId ? restaurantThemePresets[theme.presetId] : undefined
  const template = theme?.templateSlug
    ? registry.find(group => group.id === 'food-restaurants')?.categories
      .find(item => item.slug === subsectionSlug)?.templates.find(item => item.slug === theme.templateSlug)
    : undefined
  const TemplateComponent = template ? lazy(template.component) : undefined

  const showcase = theme && subsection ? getThemeShowcase(categorySlug!, subsectionSlug!, themeSlug!) : null
  
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Escape key handler for lightbox and live preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null)
        else if (isLivePreview) {
          // close live preview by navigating back to showcase
          navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${themeSlug}`)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, isLivePreview, navigate, categorySlug, subsectionSlug, themeSlug])

  if (!theme || !subsection || !showcase) {
    return <TemplatesLayout><div style={{ padding: '4rem', textAlign: 'center' }}>Theme not found</div></TemplatesLayout>
  }

  // Raw Template Component for iframes
  if (isIframePreview) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
        {preset ? (
          <RestaurantTheme theme={preset} />
        ) : TemplateComponent ? (
          <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading template…</div>}>
            <TemplateComponent />
          </Suspense>
        ) : (
          <h1 style={{ padding: '2rem', textAlign: 'center' }}>Theme preview not found</h1>
        )}
      </div>
    )
  }

  // Full-screen live preview
  if (isLivePreview) {
    return (
      <div className="live-preview-overlay">
        <div className="live-preview-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-close-preview" onClick={() => navigate(`/browse-templates/${categorySlug}/${subsectionSlug}/${themeSlug}`)}>
              <X size={20} /> Close Preview
            </button>
            <span style={{ color: '#fff', fontWeight: 600 }}>{theme.name}</span>
          </div>
          <button className="btn-use-template-primary">Use This Template</button>
        </div>
        <div className="live-preview-content">
          {preset ? (
            <RestaurantTheme theme={preset} />
          ) : TemplateComponent ? (
            <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>Loading template…</div>}>
              <TemplateComponent />
            </Suspense>
          ) : null}
        </div>
      </div>
    )
  }

  const livePreviewUrl = `/browse-templates/${categorySlug}/${subsectionSlug}/${themeSlug}?live=1`;

  // SHOWCASE PAGE
  return (
    <TemplatesLayout>
      <div className="theme-showcase-page">
        {/* LIGHTBOX */}
        {lightboxImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <button className="lightbox-close"><X size={32} /></button>
            <img src={lightboxImage} alt="Gallery view" className="lightbox-image" onClick={e => e.stopPropagation()} />
          </div>
        )}

        {/* HERO SECTION */}
        <section className="ts-hero">
          <div className="ts-hero-container">
            <Link to={`/browse-templates/${categorySlug}/${subsectionSlug}`} className="ts-back-link">
              <ArrowLeft size={16} /> Back to {subsection.name}
            </Link>
            
            <div className="ts-hero-content">
              <h1 className="ts-title">{theme.name}</h1>
              <div className="ts-tags">
                {theme.styleTags.map(tag => <span key={tag} className="ts-tag">{tag}</span>)}
              </div>
              <p className="ts-description">{theme.description}</p>
              
              <div className="ts-actions">
                <Link to={livePreviewUrl} className="ts-btn-preview">
                  Live Preview <Expand size={16} />
                </Link>
                <button className="ts-btn-use">Use This Template</button>
              </div>
            </div>

            <div className="ts-large-preview-wrapper" onClick={() => navigate(livePreviewUrl)}>
              <div className="ts-large-preview-overlay">
                <span className="ts-preview-label">Click to interact</span>
              </div>
              <iframe
                src={`/browse-templates/${categorySlug}/${subsectionSlug}/${themeSlug}?preview=1`}
                className="ts-large-preview-iframe"
                title={`${theme.name} preview`}
                scrolling="no"
                tabIndex={-1}
              />
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="ts-story-section">
          <div className="ts-container ts-split-layout">
            <div className="ts-split-text">
              <h2 className="ts-section-title">{showcase.storyHeading}</h2>
              <p className="ts-section-body">{showcase.storyText}</p>
            </div>
            <div className="ts-split-image">
              <img src={showcase.storyImage} alt="Story" loading="lazy" />
            </div>
          </div>
        </section>

        {/* FEATURES (Food Showcase / Experience) */}
        <section className="ts-features-section">
          <div className="ts-container">
            <h2 className="ts-section-title ts-center">Designed for the senses</h2>
            <div className="ts-features-grid">
              {showcase.features.map((feature, idx) => (
                <div key={idx} className="ts-feature-card">
                  <div className="ts-feature-image">
                    <img src={feature.image} alt={feature.title} loading="lazy" />
                  </div>
                  <h3 className="ts-feature-title">{feature.title}</h3>
                  <p className="ts-feature-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="ts-gallery-section">
          <div className="ts-container">
            <h2 className="ts-section-title ts-center">Visual Identity</h2>
            <div className="ts-gallery-masonry">
              {showcase.gallery.map((imgUrl, idx) => (
                <div key={idx} className={`ts-gallery-item ${idx === 0 || idx === 3 ? 'ts-gallery-item-large' : ''}`} onClick={() => setLightboxImage(imgUrl)}>
                  <img src={imgUrl} alt={`Gallery ${idx}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="ts-cta-section">
          <div className="ts-container ts-center">
            <h2 className="ts-cta-title">Bring your vision to life.</h2>
            <p className="ts-cta-desc">Start building your restaurant's digital presence with {theme.name}.</p>
            <button className="ts-btn-use ts-btn-large">Use This Template <ArrowRight size={20} /></button>
          </div>
        </section>
      </div>
    </TemplatesLayout>
  )
}
"""

with open('src/pages/BrowseThemePreview.tsx', 'w', encoding='utf-8') as f:
    f.write(preview_ts)

# 3. Create theme-showcase.css
showcase_css = """
.theme-showcase-page {
  width: 100%;
  background: #fff;
  color: #1e1b4b;
  overflow-x: hidden;
}

.ts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* HERO */
.ts-hero {
  padding: 3rem 2rem 5rem;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
  border-bottom: 1px solid #f1f5f9;
}

.ts-hero-container {
  max-width: 1200px;
  margin: 0 auto;
}

.ts-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 3rem;
  transition: color 0.2s;
}
.ts-back-link:hover { color: #1e1b4b; }

.ts-hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.ts-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0 0 1rem;
  color: #0f172a;
}

.ts-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.ts-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ts-description {
  font-size: 1.25rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 2.5rem;
}

.ts-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.ts-btn-preview {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #fff;
  color: #1e1b4b;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
}
.ts-btn-preview:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}

.ts-btn-use {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: #5c3ce6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.ts-btn-use:hover {
  background: #4f33c7;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(92, 60, 230, 0.25);
}
.ts-btn-large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

/* HERO IFRAME PREVIEW */
.ts-large-preview-wrapper {
  container-type: inline-size;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  background: #000;
  cursor: pointer;
  border: 1px solid #e2e8f0;
}

.ts-large-preview-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 810px;
  transform-origin: 0 0;
  transform: scale(calc(100cqw / 1440));
  border: none;
  pointer-events: none;
}

.ts-large-preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.0);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.ts-large-preview-wrapper:hover .ts-large-preview-overlay {
  background: rgba(15, 23, 42, 0.2);
}
.ts-preview-label {
  opacity: 0;
  background: #fff;
  color: #1e1b4b;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 700;
  transform: translateY(10px);
  transition: all 0.3s;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.ts-large-preview-wrapper:hover .ts-preview-label {
  opacity: 1;
  transform: translateY(0);
}

/* SPLIT STORY SECTION */
.ts-story-section {
  padding: 8rem 0;
  background: #fff;
}
.ts-split-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}
@media (min-width: 900px) {
  .ts-split-layout { grid-template-columns: 1fr 1fr; }
}
.ts-section-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0 0 1.5rem;
  color: #0f172a;
}
.ts-section-body {
  font-size: 1.15rem;
  line-height: 1.7;
  color: #475569;
  margin: 0;
}
.ts-split-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
}
.ts-split-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 4/5;
  object-fit: cover;
  display: block;
}

/* FEATURES SECTION */
.ts-features-section {
  padding: 6rem 0;
  background: #f8fafc;
}
.ts-center { text-align: center; }
.ts-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
}
.ts-feature-card {
  text-align: left;
}
.ts-feature-image {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}
.ts-feature-image img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}
.ts-feature-card:hover .ts-feature-image img {
  transform: scale(1.05);
}
.ts-feature-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: #0f172a;
}
.ts-feature-desc {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* GALLERY SECTION */
.ts-gallery-section {
  padding: 8rem 0;
  background: #fff;
}
.ts-gallery-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 280px;
  gap: 1.5rem;
  margin-top: 4rem;
}
.ts-gallery-item {
  border-radius: 16px;
  overflow: hidden;
  cursor: zoom-in;
  position: relative;
}
.ts-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s, filter 0.3s;
}
.ts-gallery-item:hover img {
  transform: scale(1.05);
  filter: brightness(0.9);
}
.ts-gallery-item-large {
  grid-column: span 2;
  grid-row: span 2;
}
@media (max-width: 600px) {
  .ts-gallery-item-large {
    grid-column: span 1;
    grid-row: span 1;
  }
}

/* CTA SECTION */
.ts-cta-section {
  padding: 8rem 0 10rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}
.ts-cta-title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0 0 1rem;
  color: #0f172a;
}
.ts-cta-desc {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0 0 3rem;
}

/* LIGHTBOX */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(5px);
}
.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.lightbox-close:hover { opacity: 1; }
.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}

/* FULL SCREEN LIVE PREVIEW */
.live-preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
}
.live-preview-header {
  height: 60px;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  flex-shrink: 0;
}
.btn-close-preview {
  background: transparent;
  border: none;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.btn-close-preview:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}
.btn-use-template-primary {
  background: #5c3ce6;
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-use-template-primary:hover {
  background: #4f33c7;
}
.live-preview-content {
  flex: 1;
  overflow: auto;
  position: relative;
}
"""

with open('src/styles/theme-showcase.css', 'w', encoding='utf-8') as f:
    f.write(showcase_css)

print("Done creating the new showcase architecture!")
