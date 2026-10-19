import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, X, Eye, ShoppingCart, Briefcase, Utensils, Home, SlidersHorizontal, LayoutGrid, ShoppingBag,
  ChevronDown, MoreHorizontal, Heart, Cpu, Camera, GraduationCap, Sparkles, Car, Plane, Globe
} from 'lucide-react';
import TemplatesLayout from '../components/TemplatesLayout';
import { templateCategories } from '../data/templateCategories';
import { createWebsite, updateWebsite } from '../lib/workspace-api';
import '../styles/marketplace.css';

export default function TemplatesBrowse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetWebsiteId = searchParams.get('websiteId');
  
  const [search, setSearch] = useState('');
  // Main Category Tab ('all', or specific category ID like 'food-and-restaurant')
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  // Subcategory Tab (specifically for Food & Restaurant or other subsections)
  const [activeSubTab, setActiveSubTab] = useState('all');
  
  // Tag Filter
  const [activeTag, setActiveTag] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreWrapperRef = useRef<HTMLDivElement>(null);
  const filtersWrapperRef = useRef<HTMLDivElement>(null);
  const [moreMenuAlign, setMoreMenuAlign] = useState<'left' | 'right'>('right');
  const [filtersMenuAlign, setFiltersMenuAlign] = useState<'left' | 'right'>('right');

  const toggleMore = () => {
    if (!isMoreOpen) {
      if (moreWrapperRef.current) {
        const rect = moreWrapperRef.current.getBoundingClientRect();
        // If extending 265px to the right would overflow desktop window:
        if (rect.left + 265 > window.innerWidth - 16) {
          setMoreMenuAlign('right');
        } else {
          setMoreMenuAlign('left');
        }
      }
      setIsFiltersOpen(false);
      setIsMoreOpen(true);
    } else {
      setIsMoreOpen(false);
    }
  };

  const toggleFilters = () => {
    if (!isFiltersOpen) {
      if (filtersWrapperRef.current) {
        const rect = filtersWrapperRef.current.getBoundingClientRect();
        // If extending 225px to the right would overflow desktop window:
        if (rect.left + 225 > window.innerWidth - 16) {
          setFiltersMenuAlign('right');
        } else {
          setFiltersMenuAlign('left');
        }
      }
      setIsMoreOpen(false);
      setIsFiltersOpen(true);
    } else {
      setIsFiltersOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isMoreOpen && moreWrapperRef.current) {
        const rect = moreWrapperRef.current.getBoundingClientRect();
        setMoreMenuAlign(rect.left + 265 > window.innerWidth - 16 ? 'right' : 'left');
      }
      if (isFiltersOpen && filtersWrapperRef.current) {
        const rect = filtersWrapperRef.current.getBoundingClientRect();
        setFiltersMenuAlign(rect.left + 225 > window.innerWidth - 16 ? 'right' : 'left');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMoreOpen, isFiltersOpen]);
  
  const [creatingId, setCreatingId] = useState<string | null>(null);

  // The predefined main categories (based on mockup and user layout)
  const mainCategories = [
    { id: 'all', label: 'All Templates', icon: <LayoutGrid size={16} /> },
    { id: 'e-commerce', label: 'E-Commerce', icon: <ShoppingCart size={16} /> },
    { id: 'business', label: 'Business & Corporate', icon: <Briefcase size={16} /> },
    { id: 'food-and-restaurant', label: 'Food & Restaurant', icon: <Utensils size={16} /> },
    { id: 'fashion-store', label: 'Fashion Store', icon: <ShoppingBag size={16} /> },
    { id: 'real-estate', label: 'Real Estate & Property', icon: <Home size={16} /> },
  ];

  // Extended categories under "More" option
  const moreCategories = [
    { id: 'health-wellness', label: 'Health & Wellness', icon: <Heart size={15} /> },
    { id: 'tech-saas', label: 'Technology & SaaS', icon: <Cpu size={15} /> },
    { id: 'portfolio-agency', label: 'Portfolio & Photography', icon: <Camera size={15} /> },
    { id: 'education-courses', label: 'Education & Learning', icon: <GraduationCap size={15} /> },
    { id: 'events-entertainment', label: 'Events & Entertainment', icon: <Sparkles size={15} /> },
    { id: 'automotive-transport', label: 'Automotive & Transport', icon: <Car size={15} /> },
    { id: 'travel-tourism', label: 'Travel & Tourism', icon: <Plane size={15} /> },
    { id: 'non-profit', label: 'Non-Profit & NGO', icon: <Globe size={15} /> },
  ];

  const isMoreActive = moreCategories.some(cat => cat.id === activeCategoryTab);
  const activeMoreCat = moreCategories.find(cat => cat.id === activeCategoryTab);

  const allThemes = useMemo(() => {
    return templateCategories.flatMap(cat => 
      cat.subsections.flatMap(sub => 
        sub.themes.map(theme => ({
          ...theme,
          categoryId: cat.id,
          categorySlug: cat.slug,
          categoryName: cat.name,
          subsectionName: sub.name,
          subsectionSlug: sub.slug
        }))
      )
    );
  }, []);

  const filteredThemes = useMemo(() => {
    let filtered = allThemes;

    if (activeCategoryTab !== 'all') {
      filtered = filtered.filter(t => t.categoryId === activeCategoryTab);
    }

    if (activeSubTab !== 'all') {
      filtered = filtered.filter(t => t.subsectionSlug === activeSubTab);
    }
    
    if (activeTag !== 'all') {
      filtered = filtered.filter(t => t.styleTags.includes(activeTag));
    }
    
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.styleTags.some(tag => tag.toLowerCase().includes(q)) ||
        t.subsectionName.toLowerCase().includes(q) ||
        t.categoryName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [allThemes, activeCategoryTab, activeSubTab, activeTag, search]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allThemes.forEach(t => t.styleTags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allThemes]);

  const handlePreview = (theme: typeof allThemes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const query = targetWebsiteId ? `?websiteId=${targetWebsiteId}` : '';
    navigate(`/browse-templates/${theme.categorySlug}/${theme.subsectionSlug}/${theme.slug}${query}`);
  };

  const handleUseTemplate = async (theme: typeof allThemes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setCreatingId(theme.id);
    try {
      const templateIdToUse = theme.templateSlug || theme.slug;
      
      const isRestaurant = theme.categoryId === 'food-and-restaurant';
      const sectionConfig = isRestaurant
        ? JSON.stringify([
            { type: "announcement", text: "Free delivery on your first order!", visibility: false },
            { type: "nav", logoText: theme.name },
            { type: "hero", title: theme.name, subtitle: theme.description || '', style_backgroundImage: theme.coverImage || "" },
            { type: "featured-title", title: "Signature Menu" },
            { type: "img-text", title: "Our Culinary Story", content: theme.description || '', image: theme.coverImage || "" },
            { type: "categories" },
            { type: "process" },
            { type: "promo" },
            { type: "gallery" },
            { type: "testimonials" },
            { type: "location" },
            { type: "newsletter" },
            { type: "footer", brand: theme.name, tagline: theme.description, showSocial: true }
          ])
        : JSON.stringify([
            { type: "announcement", text: "Free shipping on orders above ₹499", visibility: false },
            { type: "nav", logoText: theme.name },
            { type: "hero", title: theme.name, subtitle: theme.name + " Store", buttonText: "Explore", buttonLink: "/", style_backgroundColor: "#f6ebd9", style_textColor: "#111111", style_buttonColor: "#1A1C20", style_buttonTextColor: "#ffffff", style_backgroundImage: theme.coverImage || "" },
            { type: "featured-title", title: "Featured Collection" },
            { type: "prod-grid", title: "New Arrivals", productsToShow: 4, columns: 4 },
            { type: "img-text", title: "Designed for your lifestyle", content: "Simple, elegant and crafted with care to bring comfort into your everyday.", buttonText: "Explore Collection", buttonLink: "/about", image: "/assets/lifestyle.jpg" },
            { type: "email-signup", heading: "Join our newsletter", subtext: "Get updates on new arrivals and exclusive offers.", buttonText: "Subscribe", placeholder: "Enter your email" },
            { type: "footer", brand: theme.name, tagline: theme.name + " Store", showSocial: true }
          ]);

      if (targetWebsiteId) {
        await updateWebsite(targetWebsiteId, { templateId: templateIdToUse, sectionConfiguration: sectionConfig });
        navigate(`/workspace/${targetWebsiteId}`, { state: { viewMode: 'editor' } });
      } else {
        const website = await createWebsite(
          `${theme.name} Store`,
          `Created from ${theme.name} template`,
          templateIdToUse,
          undefined,
          sectionConfig
        );
        navigate(`/workspace/${website.id}`, { state: { viewMode: 'editor' } });
      }
    } catch (err) {
      console.error('Failed to apply template:', err);
      navigate(targetWebsiteId ? `/workspace/${targetWebsiteId}` : '/workspace/demo');
    } finally {
      setCreatingId(null);
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setActiveSubTab('all');
    setActiveCategoryTab('all');
    setActiveTag('all');
    setIsMoreOpen(false);
    setIsFiltersOpen(false);
  };

  return (
    <TemplatesLayout>
      <div className="mp-page">
        <div className="mp-header-block">
          <h1 className="mp-title">Browse Templates</h1>
          <p className="mp-subtitle">Choose a professionally designed starting point for your website. Customize it later in Workspace.</p>
          
          <div className="mp-search-container">
            <Search className="mp-search-ico" size={18} />
            <input 
              type="text" 
              className="mp-search-input-modern" 
              placeholder="Search templates..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="mp-search-clear" onClick={() => setSearch('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Main Categories and Filters Navigation */}
        <div className="mp-main-tabs">
          <div className="mp-tabs-group">
            {mainCategories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`mp-main-tab ${activeCategoryTab === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategoryTab(cat.id);
                  setActiveSubTab('all');
                  setActiveTag('all');
                  setSearch('');
                  setIsMoreOpen(false);
                  setIsFiltersOpen(false);
                }}
              >
                <span className="mp-tab-icon">{cat.icon}</span> {cat.label}
              </button>
            ))}

            {/* "More" dropdown option in between Real Estate & Property and Filters */}
            <div className="mp-more-dropdown-wrapper" ref={moreWrapperRef}>
              <button 
                type="button"
                className={`mp-main-tab mp-btn-more ${isMoreActive ? 'active' : ''}`}
                onClick={toggleMore}
                aria-expanded={isMoreOpen}
                title="More industry categories"
              >
                <span className="mp-tab-icon">
                  {isMoreActive && activeMoreCat ? activeMoreCat.icon : <MoreHorizontal size={16} />}
                </span>
                <span>{isMoreActive && activeMoreCat ? activeMoreCat.label : 'More'}</span>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    marginLeft: 2, 
                    transform: isMoreOpen ? 'rotate(180deg)' : 'none', 
                    transition: 'transform 0.2s ease' 
                  }} 
                />
              </button>
              
              {isMoreOpen && (
                <>
                  <div 
                    className="mp-more-backdrop" 
                    onClick={() => setIsMoreOpen(false)} 
                    style={{ position: 'fixed', inset: 0, zIndex: 45 }} 
                  />
                  <div className={`mp-more-menu align-${moreMenuAlign}`}>
                    <div className="mp-more-header">
                      More Categories
                    </div>
                    {moreCategories.map(cat => (
                      <button 
                        key={cat.id}
                        type="button"
                        className={`mp-more-option ${activeCategoryTab === cat.id ? 'selected' : ''}`}
                        onClick={() => { 
                          setActiveCategoryTab(cat.id); 
                          setActiveSubTab('all'); 
                          setActiveTag('all'); 
                          setSearch('');
                          setIsMoreOpen(false); 
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          {cat.icon}
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Filters Dropdown */}
            <div className="mp-filters-dropdown-wrapper" ref={filtersWrapperRef}>
              <button 
                type="button"
                className={`mp-btn-filters ${activeTag !== 'all' ? 'active' : ''}`}
                onClick={toggleFilters}
                aria-expanded={isFiltersOpen}
                title="Filter templates by style"
              >
                <SlidersHorizontal size={15} /> 
                <span>{activeTag === 'all' ? 'Filters' : activeTag.charAt(0).toUpperCase() + activeTag.slice(1)}</span>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    marginLeft: 2, 
                    transform: isFiltersOpen ? 'rotate(180deg)' : 'none', 
                    transition: 'transform 0.2s ease' 
                  }} 
                />
              </button>
              
              {isFiltersOpen && (
                <>
                  <div className="mp-filters-backdrop" onClick={() => setIsFiltersOpen(false)} />
                  <div className={`mp-filters-menu align-${filtersMenuAlign}`}>
                    <div className="mp-filters-header">
                      Filter by Style
                    </div>
                    <button 
                      type="button"
                      className={`mp-filter-option ${activeTag === 'all' ? 'selected' : ''}`}
                      onClick={() => { setActiveTag('all'); setIsFiltersOpen(false); }}
                    >
                      All Styles
                    </button>
                    {allTags.map(tag => (
                      <button 
                        key={tag}
                        type="button"
                        className={`mp-filter-option ${activeTag === tag ? 'selected' : ''}`}
                        onClick={() => { setActiveTag(tag); setIsFiltersOpen(false); }}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Clear Filters Button (shown only when any filter or search is active) */}
            {(search || activeSubTab !== 'all' || activeCategoryTab !== 'all' || activeTag !== 'all') && (
              <button 
                type="button"
                className="mp-btn-clear" 
                onClick={clearAllFilters}
                title="Reset all active filters and search"
              >
                <X size={14} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Subcategories specific to the active category */}
        {activeCategoryTab !== 'all' && (() => {
          const currentCategory = templateCategories.find(c => c.id === activeCategoryTab);
          if (currentCategory && currentCategory.subsections && currentCategory.subsections.length > 0) {
            return (
              <div className="mp-sub-tabs">
                <button 
                  type="button"
                  className={`mp-sub-tab ${activeSubTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('all')}
                >
                  All
                </button>
                {currentCategory.subsections.map(sub => (
                  <button 
                    key={sub.id}
                    type="button"
                    className={`mp-sub-tab ${activeSubTab === sub.slug ? 'active' : ''}`}
                    onClick={() => setActiveSubTab(sub.slug)}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            );
          }
          return null;
        })()}

        <div className="mp-results-info">
          <span>Showing <strong>{filteredThemes.length}</strong> templates</span>
          {(search || activeSubTab !== 'all' || activeCategoryTab !== 'all' || activeTag !== 'all') && (
            <button className="mp-btn-clear" onClick={clearAllFilters}>
              Clear Filters
            </button>
          )}
        </div>

        {filteredThemes.length === 0 ? (
          <div className="mp-empty-state">
            <div className="mp-empty-icon">🔍</div>
            <h3>No templates found</h3>
            <p>Try another search term or clear your filters.</p>
            {(search || activeSubTab !== 'all' || activeCategoryTab !== 'all' || activeTag !== 'all') && (
              <button className="mp-btn-clear" onClick={clearAllFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mp-grid-modern">
            {filteredThemes.map(theme => {
              const catIcon = mainCategories.find(c => c.id === theme.categoryId)?.icon || moreCategories.find(c => c.id === theme.categoryId)?.icon;
              return (
                <div className="mp-card-modern" key={theme.id}>
                  <div className="mp-card-image-wrap" onClick={(e) => handlePreview(theme, e)}>
                    <img
                      src={theme.coverImage}
                      alt={theme.name}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'; }}
                    />
                    <div className="mp-card-hover-overlay">
                      <span className="mp-hover-text">Click to preview</span>
                    </div>
                  </div>
                  <div className="mp-card-content">
                    <div className="mp-card-header">
                      <h3 className="mp-card-title">{theme.name}</h3>
                      {theme.badge === 'Popular' && <span className="mp-card-badge mp-badge-popular">Popular</span>}
                      {theme.badge === 'New' && <span className="mp-card-badge mp-badge-new">New</span>}
                      {theme.badge === 'Featured' && <span className="mp-card-badge mp-badge-featured">Featured</span>}
                    </div>
                    
                    <div className="mp-card-category">
                      {catIcon} {theme.subsectionName}
                      <span style={{ color: '#94a3b8', margin: '0 4px' }}>·</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{theme.categoryName}</span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0.5rem 0 1rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {theme.description}
                    </p>

                    <div className="mp-card-actions">
                      <button 
                        type="button"
                        className="mp-btn-preview" 
                        onClick={(e) => handlePreview(theme, e)}
                      >
                        <Eye size={16} /> Preview
                      </button>
                      <button 
                        type="button"
                        className="mp-btn-use" 
                        onClick={(e) => handleUseTemplate(theme, e)}
                        disabled={creatingId === theme.id}
                      >
                        {creatingId === theme.id ? 'Creating...' : 'Use Template'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TemplatesLayout>
  );
}
