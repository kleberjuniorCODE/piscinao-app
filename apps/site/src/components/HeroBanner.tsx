import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="hero-wrapper">
      <div className="hero-overlay" />
      <div className="container hero-content">
        
        <div className="hero-pill">
          <Sparkles size={16} />
          <span>Loja Conceito em Araçatuba • Mais de 20 Anos de Tradição</span>
        </div>

        <h1 className="hero-title">
          Piscinas & Equipamentos <br />
          <span className="brand-accent">Piscinão Araçatuba</span>
        </h1>

        <p className="hero-subtitle">
          "Confiança que se constrói, mergulho por mergulho."
        </p>

        <p className="hero-description">
          Da escolha da piscina de fibra ao tratamento químico inteligente. Transformamos seu espaço em um verdadeiro resort particular com garantia de até 15 anos.
        </p>

        <div className="hero-actions">
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
            <span>Chamar no WhatsApp</span>
          </a>
        </div>

        <div className="hero-trust-bar">
          <div className="trust-item">
            <span className="trust-number">20+</span>
            <span className="trust-label">Anos de Experiência</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">+5.000</span>
            <span className="trust-label">Clientes Satisfeitos</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">15 Anos</span>
            <span className="trust-label">Garantia Estrutural</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">100%</span>
            <span className="trust-label">Suporte & Manutenção</span>
          </div>
        </div>

      </div>
    </section>
  );
}
