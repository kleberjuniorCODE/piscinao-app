import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { MapPin, Phone, MessageCircle, Clock, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <div className="brand-wrapper" style={{ marginBottom: '16px' }}>
              <span className="brand-logo-text" style={{ color: 'var(--white)' }}>Piscinão</span>
              <span className="brand-badge-sub" style={{ color: 'var(--sky-blue)' }}>Araçatuba • Desde 2004</span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Há mais de duas décadas realizando o sonho da piscina perfeita. Qualidade, segurança e o melhor atendimento técnico em Araçatuba e região.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--white)'
                }}
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--white)'
                }}
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--white)'
                }}
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4>Navegação</h4>
            <ul className="footer-links">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/produtos">Catálogo de Produtos</Link></li>
              <li><Link to="/servicos">Nossos Serviços</Link></li>
              <li><Link to="/sobre">Quem Somos</Link></li>
              <li><Link to="/contato">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="footer-col">
            <h4>Categorias</h4>
            <ul className="footer-links">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/produtos?categoria=${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="footer-col">
            <h4>Loja Física</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem' }}>
                <MapPin size={18} style={{ color: 'var(--sky-blue)', flexShrink: 0, marginTop: '2px' }} />
                <span>Araçatuba - SP • Atendimento regional</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem' }}>
                <Phone size={18} style={{ color: 'var(--sky-blue)', flexShrink: 0 }} />
                <a href="tel:18991024742">(18) 99102-4742</a>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem' }}>
                <MessageCircle size={18} style={{ color: 'var(--whatsapp)', flexShrink: 0 }} />
                <a href="https://wa.me/5518991024742" target="_blank" rel="noreferrer">WhatsApp da Loja</a>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem' }}>
                <Clock size={18} style={{ color: 'var(--sky-blue)', flexShrink: 0 }} />
                <span>Seg-Sex 8h-18h | Sáb 8h-12h</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem' }}>
                <Mail size={18} style={{ color: 'var(--sky-blue)', flexShrink: 0 }} />
                <span>contato@piscinao.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Piscinão Araçatuba — piscinao.com. Todos os direitos reservados. CNPJ sob consulta.</p>
        </div>
      </div>
    </footer>
  );
}
