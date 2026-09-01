import React from 'react';
import { Link } from 'react-router-dom';

export const HeroBanner: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="brand-logo hero-title">Piscinão Araçatuba</h1>
        <h2 className="editorial-title hero-subtitle">Confiança que se constrói</h2>
        <p className="hero-description">
          Há mais de 20 anos realizando o sonho da piscina perfeita em Araçatuba e região
        </p>
        <div className="hero-actions">
          <Link to="/produtos" className="btn-primary">
            Ver Catálogo
          </Link>
          <a 
            href="https://wa.me/5518991024742" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-whatsapp"
          >
            Fale no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
