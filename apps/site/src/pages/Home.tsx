import { Link } from 'react-router-dom';
import { categories, getFeaturedProducts } from '../data/products';
import { HeroCarousel } from '../components/HeroCarousel';
import { PoolShowcase } from '../components/PoolShowcase';
import { CategoryCircle } from '../components/CategoryCircle';
import { ProductCard } from '../components/ProductCard';
import { PoolSimulator } from '../components/PoolSimulator';
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

export function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <SEOHead 
        title="Piscinão Araçatuba — Piscinas, Equipamentos e Serviços" 
        description="Há mais de 20 anos realizando o sonho da piscina perfeita em Araçatuba e região. Piscinas de fibra, equipamentos, produtos químicos e acessórios." 
        path="/" 
      />

      {/* 1. Grand Hero Carousel with Large Visual Slides */}
      <HeroCarousel />

      {/* 2. Trust Bar Metrics immediately below the carousel */}
      <section className="hero-metrics-bar">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-item">
              <Award size={28} className="metric-icon" />
              <div>
                <span className="metric-number">20+ Anos</span>
                <span className="metric-label">Tradição em Araçatuba</span>
              </div>
            </div>
            <div className="metric-item">
              <Sparkles size={28} className="metric-icon" />
              <div>
                <span className="metric-number">+500 Piscinas</span>
                <span className="metric-label">Instaladas na Região</span>
              </div>
            </div>
            <div className="metric-item">
              <ShieldCheck size={28} className="metric-icon" />
              <div>
                <span className="metric-number">15 Anos</span>
                <span className="metric-label">Garantia Estrutural</span>
              </div>
            </div>
            <div className="metric-item">
              <HeartHandshake size={28} className="metric-icon" />
              <div>
                <span className="metric-number">100% Suporte</span>
                <span className="metric-label">Assistência & Químicos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pool Demonstrations & Finished Projects Showcase (Like iGUI) */}
      <PoolShowcase />

      {/* 4. Category Highlights */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Departamentos</span>
            <h2 className="section-title">Tudo o que sua Piscina Precisa</h2>
            <p className="section-subtitle">
              Navegue pelos nossos departamentos de piscinas, tecnologia de aquecimento e tratamento.
            </p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <CategoryCircle key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Destaques da Loja</span>
            <h2 className="section-title">Equipamentos & Modelos Mais Vendidos</h2>
            <p className="section-subtitle">
              Produtos com pronta entrega e condições especiais de pagamento em até 12x.
            </p>
          </div>

          <div className="grid-3">
            {featuredProducts.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-xl">
            <Link to="/produtos" className="btn btn-primary btn-lg">
              <span>Ver Todo o Catálogo (27 Produtos)</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Interactive Pool Simulator */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Simulador Inteligente</span>
            <h2 className="section-title">Qual a Piscina Perfeita para Você?</h2>
            <p className="section-subtitle">
              Responda a 3 perguntas rápidas e descubra o modelo e os equipamentos ideais para o seu espaço.
            </p>
          </div>

          <PoolSimulator />
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Contact / Visit Store Preview */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Atendimento Presencial & Online</span>
            <h2 className="section-title">Venha Conhecer Nossa Loja Conceito</h2>
            <p className="section-subtitle">
              Estamos em Araçatuba com showroom completo de modelos, aquecedores e consultoria química.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Endereço</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Araçatuba - SP • Atendimento regional</p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Telefone & WhatsApp</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(18) 99102-4742</p>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-box">
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Horário de Funcionamento</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Seg a Sex: 8h às 18h | Sáb: 8h às 12h</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contato" className="btn btn-primary btn-lg">
              <span>Ver Mapa e Formulário de Contato</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
