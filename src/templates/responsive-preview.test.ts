// @ts-nocheck
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Store Editor Responsive Preview Architecture', () => {
  const cssPath = path.resolve(__dirname, '../styles/storefront-responsive.css');
  const workspaceCssPath = path.resolve(__dirname, '../styles/workspace.css');

  it('storefront-responsive.css should exist and contain container query definitions', () => {
    expect(fs.existsSync(cssPath)).toBe(true);
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Container Query inline-size and container-name: storefront
    expect(cssContent).toContain('container-type: inline-size;');
    expect(cssContent).toContain('container-name: storefront;');

    // Box-sizing reset on all canvas elements and data-viewports
    expect(cssContent).toContain('box-sizing: border-box;');

    // Viewport selectors
    expect(cssContent).toContain('.ws-canvas-tablet');
    expect(cssContent).toContain('.ws-canvas-mobile');
    expect(cssContent).toContain('[data-viewport="tablet"]');
    expect(cssContent).toContain('[data-viewport="mobile"]');

    // Container queries
    expect(cssContent).toContain('@container storefront (max-width: 840px)');
    expect(cssContent).toContain('@container storefront (max-width: 500px)');
  });

  it('workspace.css should import storefront-responsive.css and define canvas dimensions', () => {
    expect(fs.existsSync(workspaceCssPath)).toBe(true);
    const workspaceCss = fs.readFileSync(workspaceCssPath, 'utf-8');

    expect(workspaceCss).toContain("@import './storefront-responsive.css';");
    expect(workspaceCss).toContain('.ws-canvas-desktop');
    expect(workspaceCss).toContain('.ws-canvas-tablet');
    expect(workspaceCss).toContain('.ws-canvas-mobile');

    // Mobile width should be 390px with border-box
    expect(workspaceCss).toMatch(/\.ws-canvas-mobile\s*\{[^}]*width:\s*390px/);
    expect(workspaceCss).toMatch(/\.ws-canvas-mobile\s*\{[^}]*box-sizing:\s*border-box/);

    // Tablet width should be 768px with border-box
    expect(workspaceCss).toMatch(/\.ws-canvas-tablet\s*\{[^}]*width:\s*768px/);
    expect(workspaceCss).toMatch(/\.ws-canvas-tablet\s*\{[^}]*box-sizing:\s*border-box/);

    // Desktop width should be 1200px with border-box
    expect(workspaceCss).toMatch(/\.ws-canvas-desktop\s*\{[^}]*width:\s*1200px/);
    expect(workspaceCss).toMatch(/\.ws-canvas-desktop\s*\{[^}]*box-sizing:\s*border-box/);

    // Bottom padding safety on storefront-frame-container so theme bottom is never clipped
    expect(workspaceCss).toMatch(/\.storefront-frame-container\s*\{[^}]*padding:[^}]*48px/);
  });

  it('FoodStorefrontCore should provide responsive classes across hero, features, products, craft, story, gallery, reviews, and footer', () => {
    const foodCorePath = path.resolve(__dirname, 'food-restaurants/shared/FoodStorefrontCore.tsx');
    expect(fs.existsSync(foodCorePath)).toBe(true);
    const content = fs.readFileSync(foodCorePath, 'utf-8');

    expect(content).toContain('className="fs-hero"');
    expect(content).toContain('className="fs-hero-title"');
    expect(content).toContain('className="fs-hero-desc"');
    expect(content).toContain('className="fs-hero-actions"');
    expect(content).toContain('className="fs-features-grid"');
    expect(content).toContain('className="fs-product-grid"');
    expect(content).toContain('className="fs-craft-grid"');
    expect(content).toContain('className="fs-story-grid"');
    expect(content).toContain('className="fs-story-quote-badge"');
    expect(content).toContain('className="fs-promo-card"');
    expect(content).toContain('className="fs-promo-content"');
    expect(content).toContain('className="fs-reviews-grid"');
    expect(content).toContain('className="fs-location-grid"');
    expect(content).toContain('className="fs-footer"');
    expect(content).toContain('className="fs-footer-grid"');

    // No hardcoded negative bleed on quote badge overlay
    expect(content).not.toContain("right: '-16px'");
  });

  it('RestaurantCore should provide responsive classes and eliminate viewport-unaware media queries', () => {
    const restaurantCorePath = path.resolve(__dirname, 'food-restaurants/components/RestaurantCore.tsx');
    expect(fs.existsSync(restaurantCorePath)).toBe(true);
    const content = fs.readFileSync(restaurantCorePath, 'utf-8');

    // Should have rt-dish-grid, rt-story-grid, rt-visit-grid, rt-modal-dialog
    expect(content).toContain('className="rt-dish-grid"');
    expect(content).toContain('className="rt-story-grid"');
    expect(content).toContain('className="rt-visit-grid"');
    expect(content).toContain('className="rt-modal-dialog"');
    expect(content).toContain('className="rt-deco-frame"');
    expect(content).toContain('className="rt-accolade-badge"');

    // Navbar style block must support container queries and viewport classes
    expect(content).toContain('.ws-canvas-mobile .rt-desktop-nav');
    expect(content).toContain('.ws-canvas-tablet .rt-desktop-nav');
    expect(content).toContain('.ws-canvas-desktop .rt-desktop-nav');
    expect(content).toContain('@container storefront (max-width: 680px)');
  });

  it('Desktop preview should keep desktop menus visible and mobile toggles hidden', () => {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Desktop nav must be flex !important
    expect(cssContent).toContain('.ws-canvas-desktop .fs-desktop-nav');
    expect(cssContent).toContain('.ws-canvas-desktop .rt-desktop-nav');
    expect(cssContent).toContain('[data-viewport="desktop"] .rt-desktop-nav');

    // Desktop mobile toggle must be hidden
    expect(cssContent).toContain('.ws-canvas-desktop .rt-mobile-toggle');
    expect(cssContent).toContain('[data-viewport="desktop"] .rt-mobile-toggle');

    // Desktop canvas must expand to 100% for full screen view, while editor workspace frame uses 1200px
    expect(cssContent).toContain('.ws-canvas-desktop {\n  width: 100% !important;');
    expect(cssContent).toContain('.storefront-frame-container .ws-canvas-desktop {\n  width: 1200px !important;');
  });

  it('Mobile preview must maintain a 390px device frame and not occupy full screen', () => {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Mobile canvas must be 390px !important
    expect(cssContent).toContain('.ws-canvas-mobile {\n  width: 390px !important;');

    // Only inner elements should have width 100% !important
    expect(cssContent).toContain('.ws-canvas-mobile > *');
  });

  it('PageEditor inner wrappers must not duplicate canvas frame classes', () => {
    const editorPath = path.resolve(__dirname, '../components/PageEditor.tsx');
    expect(fs.existsSync(editorPath)).toBe(true);
    const content = fs.readFileSync(editorPath, 'utf-8');

    // pe-template should not have ws-canvas-${previewMode}
    expect(content).not.toContain('pe-template pe-template--restaurant ws-canvas');
  });

  it('Tablet and mobile viewports must strictly contain overflow and suppress header taglines', () => {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Overflow containment on tablet and mobile frames
    expect(cssContent).toContain('.ws-canvas-tablet');
    expect(cssContent).toContain('.ws-canvas-mobile');
    expect(cssContent).toContain('overflow-x: clip !important;');

    // Header brand tagline suppression on tablet and mobile
    expect(cssContent).toContain('.ws-canvas-tablet .fs-brand-sub');
    expect(cssContent).toContain('.ws-canvas-mobile .fs-brand-sub');
    expect(cssContent).toContain('display: none !important;');

    // Single-line truncated brand title
    expect(cssContent).toContain('.ws-canvas-mobile .fs-brand-name');
    expect(cssContent).toContain('overflow: hidden !important;');
    expect(cssContent).toContain('text-overflow: ellipsis !important;');
    expect(cssContent).toContain('white-space: nowrap !important;');

    // Contained category pills with touch scrolling on mobile
    expect(cssContent).toContain('.ws-canvas-mobile .fs-category-pills');
    expect(cssContent).toContain('overflow-x: auto !important;');
  });
});

