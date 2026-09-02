import { Link } from 'react-router-dom';
import { categories, getFeaturedProducts } from '../data/products';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryCircle } from '../components/CategoryCircle';
import { ProductCard } from '../components/ProductCard';
import { PoolSimulator } from '../components/PoolSimulator';
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <SEOHead 
        title="Piscinão Araçatuba — Piscinas, Equipamentos e Serviços" 
        description="Há mais de 20 anos realizando o sonho da piscina perfeita em Araçatuba e região. Piscinas de fibra, equipamentos, produtos químicos e acessórios." 
        path="/" 
      />

      {/* 1. Hero Banner with Facade Background */}
      <HeroBanner />

      {/* 2. Category Highlights */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Categorias Completas</span>
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

      {/* 3. Featured Products */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Destaques da Loja</span>
            <h2 className="section-title">Mais Procurados em Araçatuba</h2>
            <p className="section-subtitle">
              Equipamentos e modelos de piscinas mais vendidos com pronta entrega e condições especiais.
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

      {/* 4. About Preview with Real Facade Photo */}
      <section className="section about-preview-section">
        <div className="container">
          <div className="about-card-container">
            <div>
              <span className="section-tag">Tradição & Excelência</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
                Mais de 20 Anos Cuidando do Seu Lazer
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px', lineHeight: '1.7' }}>
                Fundado em 2004 em Araçatuba, o <strong>Piscinão</strong> nasceu com a missão de oferecer produtos da mais alta qualidade, desde o planejamento e escavação até a manutenção química diária.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '24px', lineHeight: '1.7' }}>
                Nossa equipe técnica é especializada em balanceamento e automação, garantindo água cristalina e segura para toda a família o ano inteiro.
              </p>

              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-value">20+</div>
                  <div className="stat-label">Anos em Araçatuba</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">5.000+</div>
                  <div className="stat-label">Clientes Atendidos</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Projetos Entregues</div>
                </div>
              </div>

              <Link to="/sobre" className="btn btn-secondary">
                <span>Conheça Nossa História Completa</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="about-store-photo-box">
              <img 
                src="/images/piscinao-fachada.jpg" 
                alt="Fachada Loja Piscinão Araçatuba" 
                className="about-store-photo"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Pool Simulator */}
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

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Contact / Visit Store Preview */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Atendimento Presencial & Online</span>
            <h2 className="section-title">Venha Tomar um Café Conosco</h2>
            <p className="section-subtitle">
              Conheça nossa loja em Araçatuba e converse com nossos especialistas.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
            <div className="contact-card-item">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Endereço</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Araçatuba - SP (Atendimento para toda a região)</p>
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
