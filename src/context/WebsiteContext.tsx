import React, { createContext, useContext, type ReactNode } from 'react';
import type { Website, Page, PageElement } from '../types';
import { getSyntheticElement } from '../utils/editorUtils';

export interface WebsiteContextType {
  website: Website;
  page: Page;
  selectedElement?: PageElement | null;
  selectedElementId?: string;
  onSelectElement?: (element: PageElement | null) => void;
  previewMode?: 'desktop' | 'tablet' | 'mobile';
}

export const WebsiteContext = createContext<WebsiteContextType | null>(null);

export function useWebsiteContext() {
  return useContext(WebsiteContext);
}

export function useEditableOverrides(id: string, defaultProps: any = {}) {
  const ctx = useWebsiteContext();
  if (!ctx?.page) return defaultProps;
  const syntheticEl = getSyntheticElement(id, ctx.page, ctx.selectedElement);
  if (!syntheticEl?.properties) return defaultProps;

  // Filter out empty string / null values so rich default theme content isn't wiped by empty inputs
  const overrides: Record<string, any> = {};
  for (const [key, val] of Object.entries(syntheticEl.properties)) {
    if (val !== undefined && val !== null && val !== '') {
      // Discard legacy fashion/bag placeholder assets if defaultProps provides a theme image
      const isImgKey = key === 'image' || key === 'style_backgroundImage' || key === 'src' || key === 'banner' || key === 'heroImage';
      if (
        isImgKey &&
        isGenericPlaceholder(val) &&
        (defaultProps.image || defaultProps.style_backgroundImage || defaultProps.src || defaultProps[key])
      ) {
        continue;
      }
      overrides[key] = val;
    }
  }
  return { ...defaultProps, ...overrides };
}

export const isGenericPlaceholder = (url: any): boolean => {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return true;
  return (
    trimmed === '/assets/lifestyle.jpg' ||
    trimmed === '/assets/vase.jpg' ||
    trimmed === '/assets/tote_bag.jpg' ||
    trimmed === '/assets/candle.jpg' ||
    trimmed === '/assets/cushion.jpg' ||
    trimmed === '/mino_bag_preview.jpg' ||
    trimmed === '/assets/mino-hero-clean.jpg' ||
    trimmed === '/product_shirt.png' ||
    trimmed.includes('tote_bag') ||
    trimmed.includes('mino_bag') ||
    trimmed.includes('mino-hero') ||
    trimmed.includes('placeholder')
  );
};

export function EditableSection({ 
  id, 
  elementType, 
  name, 
  defaultProps, 
  children,
  className = ''
}: { 
  id: string; 
  elementType: string; 
  name: string; 
  defaultProps?: any; 
  children: ReactNode;
  className?: string;
}) {
  const ctx = useWebsiteContext();
  if (!ctx || !ctx.onSelectElement) return <>{children}</>;

  const syntheticEl = getSyntheticElement(id, ctx.page);
  const element = {
    ...syntheticEl,
    elementType,
    name,
    id: syntheticEl?.id || id,
    properties: { ...defaultProps, ...syntheticEl?.properties }
  } as PageElement;

  const isSelected = ctx.selectedElementId === (syntheticEl?.id || id)
    || ctx.selectedElement?.id === (syntheticEl?.id || id)
    || ctx.selectedElement?.elementType === elementType;

  return (
    <div 
      id={`pe-${id}`}
      className={`${className} ${isSelected ? 'pe-selected' : ''}`}
      onClickCapture={(e) => {
        // In editor mode, capture click on section so child interactive modals do not hijack selection
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button')) {
          e.preventDefault();
        }
        e.stopPropagation();
        ctx.onSelectElement?.(element);
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button')) {
          e.preventDefault();
        }
        e.stopPropagation();
        ctx.onSelectElement?.(element);
      }}
      style={{
        position: 'relative',
        outline: isSelected ? '2px solid #4F46E5' : undefined,
        outlineOffset: isSelected ? '-2px' : undefined,
      }}
    >
      {children}
      {isSelected && (
        <div 
          className="pe-edit-label" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            background: '#4F46E5', 
            color: 'white', 
            padding: '3px 10px', 
            fontSize: '11px', 
            fontWeight: 700, 
            letterSpacing: '0.04em',
            zIndex: 90,
            borderBottomRightRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
}
