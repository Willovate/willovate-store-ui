import { useParams, useNavigate, Link } from 'react-router-dom';
import { registry } from '../templates/registry';
import TemplatesLayout from '../components/TemplatesLayout';
import { Folder, ChevronRight, ArrowLeft } from 'lucide-react';

export default function TemplateCategoryFolders() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const group = registry.find(g => g.id === groupId);

  if (!group) {
    return (
      <TemplatesLayout>
        <div style={{ padding: '2rem 3rem' }}>
          <h2>Group not found</h2>
          <button onClick={() => navigate('/templates')}>Back to Browse</button>
        </div>
      </TemplatesLayout>
    );
  }

  return (
    <TemplatesLayout>
      <div style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
          <Link to="/templates" style={{ color: '#64748b', textDecoration: 'none' }}>Browse Templates</Link>
          <ChevronRight size={16} />
          <span style={{ color: '#1e1b4b' }}>{group.name}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => navigate('/templates')} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1e1b4b' }}>
            <ArrowLeft size={18} />
          </button>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>{group.name} Categories</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {group.categories.map(category => (
            <div 
              key={category.id} 
              onClick={() => navigate(`/templates/${group.id}/${category.slug}`)}
              style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '1.5rem', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid #eef0f5',
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EEF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                  <Folder size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e1b4b', margin: '0 0 0.25rem 0' }}>{category.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{category.templates.length} templates</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                {category.templates.slice(0, 3).map((t, idx) => (
                  <div key={t.id} style={{ flex: 1, height: '60px', borderRadius: '8px', background: t.palette?.background || '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ height: '20px', background: t.palette?.primary || '#cbd5e1' }}></div>
                    <div style={{ padding: '4px', flex: 1, display: 'flex', gap: '4px', flexDirection: 'column' }}>
                      <div style={{ width: '60%', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}></div>
                      <div style={{ width: '40%', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TemplatesLayout>
  );
}
