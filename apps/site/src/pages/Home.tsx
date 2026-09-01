import React from 'react';
import { Link } from 'react-router-dom';
import { categories, getFeaturedProducts } from '../data/products';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryCircle } from '../components/CategoryCircle';
import { ProductCard } from '../components/ProductCard';
import { PoolSimulator } from '../components/PoolSimulator';
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <SEOHead 
        title="Piscinão Araçatuba — Piscinas, Equipamentos e Serviços" 
        description="Há mais de 20 anos realizando o sonho da piscina perfeita em Araçatuba e região. Piscinas de fibra, equipamentos, produtos químicos e acessórios." 
        path="/" 
      />

      <HeroBanner />

      <section className="categories-section section">
        <div className="container">
          <h2 className="section-title">Explore por Categoria</h2>
          <div className="grid grid-3">
            {categories.map(category => (
              <CategoryCircle key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section section bg-cream">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Destaques</h2>
            <p className="section-subtitle">Produtos selecionados para você</p>
          </div>
          <div className="grid grid-3">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-xl">
            <Link to="/produtos" className="btn btn-outline">Ver todos os produtos</Link>
          </div>
        </div>
      </section>

      <section className="about-preview section">
        <div className="container">
          <div className="grid grid-2 align-center">
            <div className="about-content">
              <h2 className="section-title playfair italic">Mais de 20 Anos de Tradição</h2>
              <p className="mb-lg">
                Desde 2004, o Piscinão Araçatuba é referência em piscinas e equipamentos na região. Nossa equipe especializada oferece desde a consultoria inicial até a instalação e manutenção completa, garantindo a melhor experiência para nossos clientes.
              </p>
              <div className="grid grid-3 stats mb-lg text-center">
                <div className="stat-item">
                  <span className="h2 d-block text-gold">20+</span>
                  <span className="small text-muted">Anos de Experiência</span>
                </div>
                <div className="stat-item">
                  <span className="h2 d-block text-gold">5.000+</span>
                  <span className="small text-muted">Clientes Atendidos</span>
                </div>
                <div className="stat-item">
                  <span className="h2 d-block text-gold">500+</span>
                  <span className="small text-muted">Projetos Realizados</span>
                </div>
              </div>
              <Link to="/sobre" className="btn btn-primary">Conheça nossa história</Link>
            </div>
            <div className="about-image bg-cream border-radius-lg aspect-square flex-center text-muted">
              <div className="text-center">
                <div className="image-placeholder bg-sky-blue border-radius-lg aspect-square"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="simulator-section section bg-sky-blue text-white">
        <div className="container">
          <h2 className="section-title text-center text-white">Descubra a Piscina Ideal</h2>
          <PoolSimulator />
        </div>
      </section>

      <Testimonials />

      <section className="contact-preview section bg-dark text-white">
        <div className="container">
          <div className="grid grid-2 align-center">
            <div className="map-placeholder bg-cream border-radius-lg overflow-hidden h-100 flex-center text-muted min-h-300">
               <span>Mapa - Araçatuba</span>
            </div>
            <div className="contact-info p-lg">
              <h2 className="h3 mb-md">Visite nossa loja</h2>
              <ul className="list-unstyled mb-lg">
                <li className="flex align-center gap-sm mb-sm">
                  <MapPin size={20} className="text-gold" />
                  <span>Araçatuba - SP</span>
                </li>
                <li className="flex align-center gap-sm mb-sm">
                  <Phone size={20} className="text-gold" />
                  <span>(18) 99102-4742</span>
                </li>
              </ul>
              <div className="flex gap-md flex-wrap">
                <a href="https://wa.me/5518991024742" target="_blank" rel="noopener noreferrer" className="btn btn-primary flex align-center gap-sm">
                  <MessageCircle size={20} />
                  Fale no WhatsApp
                </a>
                <Link to="/contato" className="btn btn-outline text-white border-white">Mais detalhes</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
