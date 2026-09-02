import { useState } from 'react';
import { poolProjects, PoolProject } from '../data/projects';
import { MapPin, Maximize2, MessageCircle, Sparkles, CheckCircle2, X } from 'lucide-react';

export function PoolShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PoolProject | null>(null);

  const filters = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'deck', label: 'Com Deck de Madeira' },
    { id: 'gourmet', label: 'Área Gourmet' },
    { id: 'cascata', label: 'Borda & Cascata' },
    { id: 'led', label: 'Iluminação Noturna' },
    { id: 'compacta', label: 'Espaço Compacto' }
  ];

  const filtered = activeFilter === 'all' 
    ? poolProjects 
    : poolProjects.filter(p => p.category === activeFilter);

  return (
    <section className="section bg-white pool-showcase-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Galeria de Inspiração
          </span>
          <h2 className="section-title">Demonstrações de Piscinas Prontas</h2>
          <p className="section-subtitle">
            Veja como ficaram alguns dos mais de 500 projetos entregues pelo Piscinão em Araçatuba e região.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="showcase-filters-bar">
          {filters.map(f => (
            <button
              key={f.id}
              className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-3 showcase-grid">
          {filtered.map(project => (
            <div key={project.id} className="project-card">
              
              {/* Photo Box with Hover Zoom & Magnifier */}
              <div 
                className="project-image-box"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="project-img"
                  loading="lazy"
                />
                
                <div className="project-category-badge">
                  {project.categoryLabel}
                </div>

                <div className="project-hover-overlay">
                  <Maximize2 size={24} color="var(--white)" />
                  <span>Ver Detalhes do Projeto</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-card-body">
                <div className="project-location-tag">
                  <MapPin size={14} color="var(--terracotta)" />
                  <span>{project.location}</span>
                </div>

                <h3 className="project-title" onClick={() => setSelectedProject(project)}>
                  {project.title}
                </h3>

                <div className="project-dims-pill">
                  <strong>Medidas:</strong> {project.dimensions}
                </div>

                <p className="project-desc">
                  {project.description}
                </p>

                {/* Features Pills */}
                <div className="project-features-list">
                  {project.features.map((feat, i) => (
                    <span key={i} className="project-feat-tag">
                      <CheckCircle2 size={12} color="var(--chocolate)" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

                {/* Direct WhatsApp Action */}
                <a
                  href={`https://wa.me/5518991024742?text=${encodeURIComponent(`Olá Piscinão! Vi o projeto "${project.title}" (${project.dimensions}) no site e gostaria de um orçamento para fazer parecido no meu espaço!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp w-100 mt-md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} />
                  <span>Quero um Projeto Assim</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal for Zoomed Project Details */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-card" onClick={e => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>

            <div className="project-modal-grid">
              <div className="project-modal-photo-wrap">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="project-modal-img"
                />
              </div>

              <div className="project-modal-details">
                <span className="section-tag">{selectedProject.categoryLabel}</span>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--chocolate)', margin: '8px 0' }}>
                  {selectedProject.title}
                </h2>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <MapPin size={16} color="var(--terracotta)" />
                  <strong>Localização:</strong> {selectedProject.location}
                </p>

                <div style={{ background: 'var(--cream)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--chocolate)', fontWeight: 700 }}>
                    Dimensões: {selectedProject.dimensions}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Modelo Base: {selectedProject.model}
                  </p>
                </div>

                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                  {selectedProject.description}
                </p>

                <h4 style={{ fontSize: '1rem', color: 'var(--chocolate)', marginBottom: '10px' }}>
                  Itens e Equipamentos Inclusos:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                  {selectedProject.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--chocolate)' }}>
                      <CheckCircle2 size={16} color="var(--whatsapp-dark)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/5518991024742?text=${encodeURIComponent(`Olá Piscinão! Estou vendo os detalhes do projeto "${selectedProject.title}" e gostaria de agendar uma visita/orçamento.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={20} />
                  <span>Pedir Orçamento Deste Projeto</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
