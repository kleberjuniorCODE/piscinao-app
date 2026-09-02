import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="hero-split-section">
      <div className="container">
        <div className="hero-split-grid">
          
          {/* Left Column: Headlines, Slogan & CTAs */}
          <div className="hero-split-content">
            
            <div className="hero-pill-dark">
              <Sparkles size={16} />
              <span>Loja Conceito em Araçatuba • Desde 2004</span>
            </div>

            <h1 className="hero-split-title">
              Piscinas & Equipamentos <br />
              <span className="brand-accent-chocolate">Piscinão Araçatuba</span>
            </h1>

            <p className="hero-split-subtitle">
              "Confiança que se constrói, mergulho por mergulho."
            </p>

            <p className="hero-split-desc">
              Da escolha da piscina de fibra ao tratamento químico inteligente. Realize o sonho da sua área de lazer com quem é referência há mais de 20 anos em Araçatuba e região.
            </p>

            <div className="hero-split-actions">
              <Link to="/produtos" className="btn btn-primary btn-lg">
                <span>Explorar Catálogo</span>
                <ArrowRight size={20} />
              </Link>
              
              <a 
                href="https://wa.me/5518991024742?text=Ol%C3%A1%20Piscin%C3%A3o!%20Vi%20o%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20personalizado."
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={22} />
                <span>WhatsApp da Loja</span>
              </a>
            </div>

            {/* Trust Mini Bar */}
            <div className="hero-split-trust">
              <div className="trust-mini-item">
                <span className="trust-mini-number">20+</span>
                <span className="trust-mini-label">Anos de Tradição</span>
              </div>
              <div className="trust-mini-item">
                <span className="trust-mini-number">+5.000</span>
                <span className="trust-mini-label">Famílias Atendidas</span>
              </div>
              <div className="trust-mini-item">
                <span className="trust-mini-number">15 Anos</span>
                <span className="trust-mini-label">Garantia Estrutural</span>
              </div>
              <div className="trust-mini-item">
                <span className="trust-mini-number">100%</span>
                <span className="trust-mini-label">Suporte e Manutenção</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Unobstructed Store Facade Image */}
          <div className="hero-split-media">
            <div className="hero-clean-photo-frame">
              <img 
                src="/images/piscinao-fachada.jpg" 
                alt="Fachada Oficial Loja Conceito Piscinão Araçatuba" 
                className="hero-clean-photo"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
