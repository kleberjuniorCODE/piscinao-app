import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Catálogo & Piscinas', path: '/produtos' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Quem Somos', path: '/sobre' },
    { name: 'Contato', path: '/contato' }
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="brand-wrapper">
            <span className="brand-logo-text">Piscinão</span>
            <span className="brand-badge-sub">Araçatuba • Desde 2004</span>
          </Link>

          <nav className="header-nav">
            <ul className="header-nav-list">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path === '/produtos' && location.pathname.startsWith('/produto'));
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`header-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <a
              href="https://wa.me/5518991024742?text=Ol%C3%A1%20Piscin%C3%A3o!%20Gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm header-cta"
            >
              <MessageCircle size={18} />
              <span>Orçamento Rápido</span>
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-drawer-overlay ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <aside className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="brand-wrapper">
            <span className="brand-logo-text">Piscinão</span>
            <span className="brand-badge-sub">Araçatuba</span>
          </div>
          <button 
            onClick={() => setMenuOpen(false)} 
            aria-label="Fechar menu"
            style={{ padding: '8px', color: 'var(--chocolate)' }}
          >
            <X size={24} />
          </button>
        </div>

        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <a
            href="https://wa.me/5518991024742"
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp w-100"
            style={{ width: '100%' }}
          >
            <MessageCircle size={20} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  );
}
