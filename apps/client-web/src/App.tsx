import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Ticket, ShoppingBag, Gift, User, Check, MessageCircle, 
  Compass, LogOut, MapPin, Sparkles, Droplets, Wrench, Lightbulb, 
  Tag, Store, Info, ShieldCheck, Award, Heart, ChevronRight, X, Phone, Clock, ShoppingCart, Send
} from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import { SkeletonProductCard } from './components/Skeleton';

// WhatsApp helper
function openWhatsApp(productName: string = 'um produto ou serviço') {
  const msg = encodeURIComponent(`Olá Piscinão! Gostaria de mais informações sobre ${productName}. Podem me atender?`);
  window.open(`https://wa.me/5518991024742?text=${msg}`, '_blank');
}

const defaultProducts = [
  { 
    id: '1', 
    name: 'Aspirador Automático Max Clean', 
    category: 'Equipamentos', 
    price: 1290.00, 
    oldPrice: 1490.00,
    badge: 'LANÇAMENTO ✦',
    desc: 'Mais tecnologia para uma limpeza completa e sem esforço.', 
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop' 
  },
  { 
    id: '2', 
    name: 'Bomba para Piscina CMB Prime 1/2 CV', 
    category: 'Equipamentos', 
    price: 699.00, 
    oldPrice: 899.00,
    badge: 'OFERTA ESPECIAL ✦',
    desc: 'Motor potente e silencioso 220V com pré-filtro integrado.', 
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop' 
  },
  { 
    id: '3', 
    name: 'Cloro Granulado Tripla Ação 10kg', 
    category: 'Químicos', 
    price: 189.90, 
    oldPrice: 219.00,
    badge: 'MAIS VENDIDO',
    desc: 'Desinfetante concentrado para manter a água cristalina e protegida.', 
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop' 
  },
  { 
    id: '4', 
    name: 'Kit de Limpeza Master com Haste e Mangueira', 
    category: 'Acessórios', 
    price: 210.00, 
    oldPrice: 250.00,
    badge: 'KIT COMPLETO',
    desc: 'Haste telescópica 3m, escova, peneira e mangueira flutuante 7m.', 
    imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop' 
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('piscinao_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const [coupons, setCoupons] = useState(() => {
    if (currentUser?.id) {
      const saved = localStorage.getItem(`piscinao_client_coupons_${currentUser.id}`);
      return saved !== null ? parseInt(saved, 10) : (currentUser.coupons || 27);
    }
    return 27;
  });

  const [productsList, setProductsList] = useState<any[]>(() => {
    const saved = localStorage.getItem('piscinao_admin_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('piscinao_user_session', JSON.stringify(user));
    if (typeof user.coupons === 'number') {
      setCoupons(user.coupons);
      localStorage.setItem(`piscinao_client_coupons_${user.id}`, user.coupons.toString());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('piscinao_user_session');
    setCurrentUser(null);
  };

  const fetchBackendData = () => {
    if (!currentUser?.id) return;

    fetch(`http://localhost:3002/sync/coupons/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && typeof data.coupons === 'number') {
          setCoupons(data.coupons);
          localStorage.setItem(`piscinao_client_coupons_${currentUser.id}`, data.coupons.toString());
        }
      })
      .catch(() => {});

    fetch('http://localhost:3002/sync/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
          localStorage.setItem('piscinao_admin_products', JSON.stringify(data.data));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchBackendData();

    let bcCoupons: BroadcastChannel | null = null;
    try {
      bcCoupons = new BroadcastChannel('piscinao_coupons_channel');
      bcCoupons.onmessage = (event) => {
        if (event.data && typeof event.data.coupons === 'number') {
          setCoupons(event.data.coupons);
          localStorage.setItem(`piscinao_client_coupons_${currentUser.id}`, event.data.coupons.toString());
        }
      };
    } catch (e) {}

    const interval = setInterval(fetchBackendData, 1500);

    return () => {
      if (bcCoupons) bcCoupons.close();
      clearInterval(interval);
    };
  }, [currentUser]);

  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const clientUser = {
    name: currentUser.name || 'João Silva',
    coupons: coupons,
    targetCoupons: 50,
    phone: currentUser.phone || '(18) 99123-4567',
  };

  return (
    <div className="app-container animate-fade-in">
      {/* Editorial Luxury Header */}
      <header className="app-header-editorial">
        <div className="app-header-top">
          <div className="brand-logo-editorial">
            <span className="brand-title brand-kardust">PISCINÃO</span>
            <span className="brand-slogan-italic">Confiança que se constrói.</span>
          </div>

          <div className="header-coupon-badge" title="Saldo de Cupons">
            <Ticket size={16} className="text-sky" />
            <span className="coupon-badge-num">{coupons}</span>
            <span className="coupon-badge-txt">CUPONS</span>
          </div>
        </div>

        <div className="app-header-welcome">
          <h2>Olá, {clientUser.name.split(' ')[0]} 👋</h2>
          <p>Seu clube exclusivo de cuidados com piscina e vantagens VIP.</p>
        </div>
      </header>

      {/* Main App Content */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage clientUser={clientUser} productsList={productsList} openModal={setActiveModal} />} />
          <Route path="/coupons" element={<CouponsPage coupons={coupons} />} />
          <Route path="/products" element={<ProductsPage productsList={productsList} />} />
          <Route path="/rewards" element={<RewardsPage coupons={coupons} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} coupons={coupons} onLogout={handleLogout} />} />
        </Routes>
      </div>

      {/* Modal Dialogs for Highlights */}
      {activeModal && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="modal-card modal-highlight-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              <X size={20} />
            </button>

            {activeModal === 'servicos' && (
              <div className="modal-content-inner">
                <div className="modal-icon-circle sky"><Wrench size={32} /></div>
                <h3>Serviços Especializados Piscinão</h3>
                <p className="modal-desc">
                  Oferecemos manutenção preventiva, troca de areia de filtro, instalação de aquecedores e análise química completa da água da sua piscina.
                </p>
                <div className="modal-features-list">
                  <div className="feature-item"><Check size={18} /> Troca e limpeza de elemento filtrante</div>
                  <div className="feature-item"><Check size={18} /> Instalação de bombas e motobombas</div>
                  <div className="feature-item"><Check size={18} /> Tratamento de choque para água verde</div>
                </div>
                <button className="btn-modal-action" onClick={() => { openWhatsApp('Serviços de Manutenção'); setActiveModal(null); }}>
                  <MessageCircle size={18} /> Agendar Visita pelo WhatsApp
                </button>
              </div>
            )}

            {activeModal === 'dicas' && (
              <div className="modal-content-inner">
                <div className="modal-icon-circle chocolate"><Lightbulb size={32} /></div>
                <span className="badge-editorial-pill">02 - DICA TÉCNICA</span>
                <h3 className="serif-title">Você sabe quando é hora de trocar o filtro?</h3>
                <p className="modal-desc">
                  Ficar atento a alguns sinais faz toda a diferença para manter sua piscina sempre limpa e segura:
                </p>
                <div className="modal-features-list">
                  <div className="feature-item"><strong>1.</strong> Pressão alta constante no manômetro.</div>
                  <div className="feature-item"><strong>2.</strong> Água turva mesmo após tratamento químico.</div>
                  <div className="feature-item"><strong>3.</strong> Areia retornando para o fundo da piscina.</div>
                </div>
                <button className="btn-modal-action" onClick={() => { openWhatsApp('Troca de Areia do Filtro'); setActiveModal(null); }}>
                  <MessageCircle size={18} /> Solicitar Avaliação Técnica
                </button>
              </div>
            )}

            {activeModal === 'loja' && (
              <div className="modal-content-inner">
                <div className="modal-icon-circle terracotta"><Store size={32} /></div>
                <h3>Loja Piscinão Araçatuba</h3>
                <p className="modal-desc">
                  Visite nosso showroom e encontre tudo para sua piscina com a maior variedade e os melhores preços da região.
                </p>
                <div className="modal-features-list">
                  <div className="feature-item"><MapPin size={18} /> Av. Principal de Araçatuba, SP</div>
                  <div className="feature-item"><Clock size={18} /> Seg a Sex: 08:00 às 18:00 | Sáb: 08:00 às 13:00</div>
                  <div className="feature-item"><Phone size={18} /> (18) 99102-4742</div>
                </div>
                <button className="btn-modal-action" onClick={() => { openWhatsApp('Localização da Loja'); setActiveModal(null); }}>
                  <MessageCircle size={18} /> Conversar com a Equipe da Loja
                </button>
              </div>
            )}

            {activeModal === 'sobre' && (
              <div className="modal-content-inner">
                <div className="modal-icon-circle chocolate"><ShieldCheck size={32} /></div>
                <span className="badge-editorial-pill">03 - INSTITUCIONAL</span>
                <h3 className="serif-title">Há mais de 20 anos cuidando da sua piscina.</h3>
                <p className="modal-desc">
                  Qualidade, atendimento consultivo e produtos que garantem bem-estar, segurança e momentos inesquecíveis para você e sua família.
                </p>
                <div className="badges-triple-row">
                  <div className="badge-triple-box"><ShieldCheck size={20} /><span>Confiança que se constrói</span></div>
                  <div className="badge-triple-box"><Award size={20} /><span>Credibilidade que se renova</span></div>
                  <div className="badge-triple-box"><Heart size={20} /><span>Parceiro para toda a vida</span></div>
                </div>
                <button className="btn-modal-action" onClick={() => setActiveModal(null)}>
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Bar */}
      <nav className="bottom-nav-luxury">
        <NavLink to="/" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Início</span>
        </NavLink>
        <NavLink to="/coupons" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
          <Ticket size={20} />
          <span>Cupons</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
          <ShoppingBag size={20} />
          <span>Produtos</span>
        </NavLink>
        <NavLink to="/rewards" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
          <Gift size={20} />
          <span>Prêmios</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
}

// 🏠 HomePage with Editorial Cards & Highlights
function HomePage({ clientUser, productsList, openModal }: { clientUser: any; productsList: any[]; openModal: (modal: string) => void }) {
  const navigate = useNavigate();

  return (
    <div className="home-editorial-wrapper animate-fade-up">
      {/* 1. Circular Categories Highlights Bar (From Reference Design) */}
      <section className="categories-circular-section">
        <div className="categories-circular-row">
          <div className="category-circle-item" onClick={() => navigate('/products')}>
            <div className="circle-avatar chocolate"><ShoppingBag size={22} /></div>
            <span>PRODUTOS</span>
          </div>
          <div className="category-circle-item" onClick={() => openModal('servicos')}>
            <div className="circle-avatar sky"><Wrench size={22} /></div>
            <span>SERVIÇOS</span>
          </div>
          <div className="category-circle-item" onClick={() => openModal('dicas')}>
            <div className="circle-avatar terracotta"><Lightbulb size={22} /></div>
            <span>DICAS</span>
          </div>
          <div className="category-circle-item" onClick={() => navigate('/products')}>
            <div className="circle-avatar sky"><Tag size={22} /></div>
            <span>OFERTAS</span>
          </div>
          <div className="category-circle-item" onClick={() => openModal('loja')}>
            <div className="circle-avatar terracotta"><Store size={22} /></div>
            <span>LOJA</span>
          </div>
          <div className="category-circle-item" onClick={() => openModal('sobre')}>
            <div className="circle-avatar chocolate"><Info size={22} /></div>
            <span>SOBRE</span>
          </div>
        </div>
      </section>

      {/* 2. Editorial Stories & Promotional Carousel (The 4 Distinct Cards) */}
      <section className="editorial-cards-section">
        <div className="section-header-editorial">
          <span className="section-eyebrow">DESTAQUES EM FOCO</span>
          <h2 className="section-title-editorial">Especial para Você</h2>
        </div>

        <div className="editorial-cards-scroll">
          {/* Card 01 - PRODUTO / LANÇAMENTO */}
          <div className="editorial-card card-produto card-hover-motion">
            <div className="editorial-card-header">
              <span className="card-tag-pill">- PRODUTO</span>
              <span className="badge-sky-pill">LANÇAMENTO ✦</span>
            </div>
            
            <div className="card-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop" 
                alt="Aspirador Max Clean" 
                loading="lazy"
                className="editorial-img"
              />
            </div>

            <div className="editorial-card-body">
              <div className="bullet-points-box">
                <div className="bullet-item"><Droplets size={14} /> Limpeza mais eficiente</div>
                <div className="bullet-item"><Check size={14} /> Ideal para todos os tipos de piscina</div>
                <div className="bullet-item"><Sparkles size={14} /> Mais praticidade no seu dia a dia</div>
              </div>

              <h3 className="editorial-title">ASPIRADOR AUTOMÁTICO MAX CLEAN</h3>
              <p className="editorial-desc">Mais tecnologia para uma limpeza completa e sem esforço.</p>

              <div className="editorial-action-row">
                <button className="btn-sky-action" onClick={() => openWhatsApp('Aspirador Automático Max Clean')}>
                  SAIBA MAIS
                </button>
                <button className="btn-icon-whatsapp" onClick={() => openWhatsApp('Aspirador Automático Max Clean')}>
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 02 - DICA / FILTRO */}
          <div className="editorial-card card-dica card-hover-motion">
            <div className="editorial-card-header">
              <span className="card-tag-pill dark">02 - DICA</span>
              <span className="badge-sky-pill">DICA DE OURO</span>
            </div>

            <div className="editorial-dica-body">
              <h3 className="serif-editorial-title">
                VOCÊ SABE <br />
                <span>quando é hora de</span> <br />
                <span className="text-sky-highlight">TROCAR O FILTRO?</span>
              </h3>
              
              <p className="editorial-desc-light">
                Ficar atento a alguns sinais faz toda a diferença para manter sua piscina sempre limpa e segura.
              </p>

              <div className="dica-image-center">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop" 
                  alt="Filtro de Piscina" 
                  loading="lazy"
                  className="filter-sample-img"
                />
              </div>

              <button className="btn-dica-link" onClick={() => openModal('dicas')}>
                Leia a dica completa e saiba mais! <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 03 - INSTITUCIONAL / CONFIANÇA */}
          <div className="editorial-card card-institucional card-hover-motion">
            <div className="editorial-card-header">
              <span className="card-tag-pill">03 - INSTITUCIONAL</span>
            </div>

            <div className="institucional-banner-wrap">
              <img 
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop" 
                alt="Piscina Piscinão" 
                loading="lazy"
                className="editorial-img"
              />
            </div>

            <div className="institucional-card-inner">
              <div className="brand-logo-sm brand-kardust">PISCINÃO</div>
              <h4 className="institucional-title">
                HÁ MAIS DE <span className="text-sky">20 ANOS</span> CUIDANDO DA SUA PISCINA.
              </h4>
              <p className="institucional-desc">
                Qualidade, atendimento e produtos que garantem bem-estar, segurança e momentos inesquecíveis.
              </p>

              <div className="badges-triple-mini">
                <div className="mini-badge"><ShieldCheck size={16} /><span>CONFIANÇA</span></div>
                <div className="mini-badge"><Award size={16} /><span>CREDIBILIDADE</span></div>
                <div className="mini-badge"><Heart size={16} /><span>PARCEIRO</span></div>
              </div>
            </div>
          </div>

          {/* Card 04 - OFERTA ESPECIAL */}
          <div className="editorial-card card-oferta card-hover-motion">
            <div className="editorial-card-header">
              <span className="card-tag-pill">04 - OFERTA</span>
              <span className="badge-sky-pill">OFERTA ESPECIAL ✦</span>
            </div>

            <div className="card-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop" 
                alt="Bomba para Piscina" 
                loading="lazy"
                className="editorial-img"
              />
            </div>

            <div className="editorial-card-body">
              <h3 className="editorial-title">BOMBA PARA PISCINA CMB PRIME</h3>
              <span className="specs-text">1/2 CV - 220V</span>

              <div className="pricing-box-editorial">
                <span className="old-price">DE: R$ 899,00</span>
                <div className="new-price-wrap">
                  <span className="por-txt">POR:</span>
                  <span className="price-val">R$ 699<small>,00</small></span>
                </div>
                <span className="discount-pill-sky">10% OFF À VISTA</span>
              </div>

              <button className="btn-buy-whatsapp-dark" onClick={() => openWhatsApp('Bomba CMB Prime por R$ 699')}>
                <MessageCircle size={18} />
                <div>
                  <strong>COMPRE AGORA</strong>
                  <span>Fale com a gente pelo WhatsApp!</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pirate VIP Loyalty Progress & Interactive Map */}
      <section className="loyalty-progress-section">
        <div className="card loyalty-card-luxury">
          <div className="loyalty-card-header">
            <div className="loyalty-title-wrap">
              <Ticket size={22} className="text-terracotta" />
              <div>
                <h3>Seu Saldo de Cupons</h3>
                <span className="loyalty-subtitle">Programa de Vantagens Piscinão</span>
              </div>
            </div>
            <span className="level-badge">Nível {Math.floor(clientUser.coupons / 5) + 1}</span>
          </div>

          <div className="coupon-big-display">
            <span className="coupon-number-huge">{clientUser.coupons}</span>
            <span className="coupon-target-text">de {clientUser.targetCoupons} cupons para o Baú de Prêmios</span>
          </div>

          <div className="progress-bar-luxury">
            <div 
              className="progress-bar-fill-luxury" 
              style={{ width: `${Math.min(100, (clientUser.coupons / clientUser.targetCoupons) * 100)}%` }}
            />
          </div>

          <div className="loyalty-footer-cta">
            <button className="btn-loyalty-action" onClick={() => navigate('/coupons')}>
              Ver Histórico & Como Ganhar Mais <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// 🎟️ Coupons Page
function CouponsPage({ coupons }: { coupons: number }) {
  return (
    <div className="page-wrapper-padding animate-fade-up">
      <div className="page-title-box">
        <span className="section-eyebrow">FIDELIDADE</span>
        <h2>🎟️ Meus Cupons VIP ({coupons})</h2>
      </div>

      <div className="card card-luxury-white">
        <h3 className="card-title-brown">Como acumular cupons?</h3>
        <p className="card-text-muted">
          A cada <strong>R$ 100,00</strong> em compras na Piscinão Araçatuba, você ganha <strong>1 cupom</strong> para avançar na sua trilha de recompensas!
        </p>

        <div className="rule-highlight-box">
          <span className="rule-badge">REGRA OFICIAL</span>
          <strong>R$ 100,00 em compras = 1 Cupom VIP</strong>
        </div>
      </div>

      <div className="card card-luxury-white">
        <h3 className="card-title-brown">Extrato de Cupons</h3>
        <div className="coupon-history-item">
          <div className="history-info">
            <strong>Saldo Atual Sincronizado</strong>
            <span>Atualizado automaticamente a cada compra</span>
          </div>
          <span className="history-amount">{coupons} Cupons</span>
        </div>
      </div>
    </div>
  );
}

// 🛍️ Products Page
function ProductsPage({ productsList }: { productsList: any[] }) {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Químicos', 'Acessórios', 'Equipamentos'];

  const activeProducts = productsList.filter(p => p.isActive !== false);
  const filtered = filter === 'Todos' ? activeProducts : activeProducts.filter(p => p.category === filter);

  return (
    <div className="page-wrapper-padding animate-fade-up">
      <div className="page-title-box">
        <span className="section-eyebrow">CATÁLOGO COMPLETO</span>
        <h2>🛍️ Produtos & Equipamentos</h2>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pill-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-pill-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid-catalog">
        {filtered.map((prod) => (
          <div key={prod.id} className="card-product-catalog card-hover-motion animate-fade-up">
            {prod.imageUrl && (
              <div className="product-catalog-img-wrap">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.name} 
                  loading="lazy"
                  className="product-catalog-img"
                />
                {prod.badge && <span className="badge-product-overlay">{prod.badge}</span>}
              </div>
            )}

            <div className="product-catalog-body">
              <span className="product-category-tag">{prod.category || 'Geral'}</span>
              <h3 className="product-name-heading">{prod.name || prod.title}</h3>
              <p className="product-desc-text">{prod.description || prod.desc}</p>

              <div className="product-pricing-row">
                <div className="price-stack">
                  {prod.oldPrice && <span className="old-price-strike">R$ {prod.oldPrice.toFixed(2)}</span>}
                  <span className="current-price-bold">R$ {(prod.price || 0).toFixed(2)}</span>
                </div>
              </div>

              <button className="btn-order-whatsapp-product" onClick={() => openWhatsApp(prod.name || prod.title)}>
                <MessageCircle size={18} /> Pedir pelo WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎁 Rewards Page
function RewardsPage({ coupons }: { coupons: number }) {
  return (
    <div className="page-wrapper-padding animate-fade-up">
      <div className="page-title-box">
        <span className="section-eyebrow">RECOMPENSAS EXCLUSIVAS</span>
        <h2>🎁 Baú de Prêmios VIP</h2>
      </div>

      <div className="card reward-hero-card">
        <div className="trophy-huge">🏆</div>
        <h3 className="serif-title" style={{ fontSize: '1.4rem', color: '#5B3422' }}>Grande Baú Piscinão</h3>
        <p className="reward-hero-desc">
          Conclua os 50 cupons e desbloqueie um <strong>Kit Completo de Tratamento de Verão</strong> inteiramente grátis!
        </p>

        <div className="reward-progress-box">
          <span>Seu Progresso: <strong>{coupons} / 50 Cupons</strong></span>
          <div className="progress-bar-luxury" style={{ marginTop: 8 }}>
            <div className="progress-bar-fill-luxury" style={{ width: `${Math.min(100, (coupons / 50) * 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 👤 Profile Page
function ProfilePage({ user, coupons, onLogout }: { user: any; coupons: number; onLogout: () => void }) {
  return (
    <div className="page-wrapper-padding animate-fade-up">
      <div className="page-title-box">
        <span className="section-eyebrow">SUA CONTA</span>
        <h2>👤 Perfil do Cliente</h2>
      </div>

      <div className="card profile-info-card">
        <div className="profile-avatar-big">
          {(user?.name || 'J').charAt(0).toUpperCase()}
        </div>

        <h3 className="profile-name">{user?.name || 'Cliente Piscinão'}</h3>
        <span className="profile-phone">{user?.phone || '(18) 99123-4567'}</span>

        <div className="profile-stats-row">
          <div className="stat-pill-item">
            <strong>{coupons}</strong>
            <span>Cupons</span>
          </div>
          <div className="stat-pill-item">
            <strong>Nível {Math.floor(coupons / 5) + 1}</strong>
            <span>Status VIP</span>
          </div>
        </div>

        <button className="btn-logout-luxury" onClick={onLogout}>
          <LogOut size={18} /> Sair da Conta
        </button>
      </div>
    </div>
  );
}
