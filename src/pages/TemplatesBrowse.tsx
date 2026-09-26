import { useNavigate } from 'react-router-dom';
import TemplatesLayout from '../components/TemplatesLayout';
import TemplateCategoryCard from '../components/TemplateCategoryCard';
import { templateCategories } from '../data/templateCategories';
import '../styles/template-gallery.css';

export default function TemplatesBrowse() {
  const navigate = useNavigate();

  return (
    <TemplatesLayout>
      <div style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>Browse Templates</h1>
        <p style={{ color: '#475569', marginBottom: '2rem' }}>Choose a category to browse its subsections and themes.</p>
        <div className="template-category-grid">
          {templateCategories.map(category => (
            <TemplateCategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(`/browse-templates/${category.slug}`)}
            />
          ))}
          <TemplateCategoryCard />
        </div>
      </div>
    </TemplatesLayout>
  );
}
