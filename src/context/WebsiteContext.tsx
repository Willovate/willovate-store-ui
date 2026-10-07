import React, { createContext, useContext, type ReactNode } from 'react';
import type { Website, Page, PageElement } from '../types';
import { getSyntheticElement } from '../utils/editorUtils';

export interface WebsiteContextType {
  website: Website;
  page: Page;
  selectedElementId?: string;
  onSelectElement?: (element: PageElement | null) => void;
}

export const WebsiteContext = createContext<WebsiteContextType | null>(null);

export function useWebsiteContext() {
  return useContext(WebsiteContext);
}

export function useEditableOverrides(id: string, defaultProps: any = {}) {
  const ctx = useWebsiteContext();
  if (!ctx?.page) return defaultProps;
  const syntheticEl = getSyntheticElement(id, ctx.page);
  return { ...defaultProps, ...syntheticEl?.properties };
}

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

  const isSelected = ctx.selectedElementId === (syntheticEl?.id || id);

  return (
    <div 
      id={`pe-${id}`}
      className={`${className} ${isSelected ? 'pe-selected' : ''}`}
      onClick={(e) => {
        // Find the closest clickable parent to prevent unexpected clicks
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button')) {
            e.preventDefault();
        }
        e.stopPropagation();
        ctx.onSelectElement?.(element);
      }}
      style={{ position: 'relative' }}
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
            padding: '2px 8px', 
            fontSize: '10px', 
            fontWeight: 'bold', 
            zIndex: 10,
            borderBottomRightRadius: '4px'
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
}
