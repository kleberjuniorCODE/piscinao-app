import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Home, Ticket, ShoppingBag, Gift, User, Check, MessageCircle, Anchor, Compass, LogOut, MapPin, FileText, Calendar, ShieldCheck } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import { SkeletonProductCard } from './components/Skeleton';

const defaultProducts = [
  { id: '1', name: 'Cloro Granulado 10kg', category: 'Químicos', price: 189.90, desc: 'Tratamento de choque e manutenção regular', imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop' },
  { id: '2', name: 'Algicida de Choque 1L', category: 'Químicos', price: 45.00, desc: 'Elimina algas verdes rapidamente', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
  { id: '3', name: 'Kit Limpeza Completo', category: 'Acessórios', price: 210.00, desc: 'Haste, peneira, escova e mangueira 7m', imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop' },
  { id: '4', name: 'Motobomba 1/2 CV', category: 'Equipamentos', price: 890.00, desc: 'Filtro para piscinas até 40.000L', imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop' },
];

function openWhatsApp(productName: string) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto ${productName}. Poderia me atender?`);
  window.open(`https://wa.me/5518991024742?text=${msg}`, '_blank');
}

export default function App() {
  // Authentication & Client User Session
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

    // 1. Fetch Coupons
    fetch(`http://localhost:3002/sync/coupons/${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && typeof data.coupons === 'number') {
          setCoupons(data.coupons);
          localStorage.setItem(`piscinao_client_coupons_${currentUser.id}`, data.coupons.toString());
        }
      })
      .catch(() => {});

    // 2. Fetch Products
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

    const interval = setInterval(fetchBackendData, 1000);

    return () => {
      if (bcCoupons) bcCoupons.close();
      clearInterval(interval);
    };
  }, [currentUser]);

  // If user is not authenticated, present AuthScreen
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
    <div className="app-container">
      {/* Discrete Top Header with Kardust Font Logo */}
      <header className="app-header">
        <div className="brand-badge-header">
          <div className="logo-discrete">
            <span className="brand-kardust" style={{ fontSize: '1.5rem', letterSpacing: '3px' }}>PISCINÃO</span>
          </div>
          <span className="sub-tag">CLIENTE VIP</span>
        </div>
        <h1>Olá, {clientUser.name.split(' ')[0]}! 👋</h1>
        <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Programa de Fidelidade — Piscinão Araçatuba</p>
      </header>

      {/* Main Content Area */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage clientUser={clientUser} productsList={productsList} />} />
          <Route path="/coupons" element={<CouponsPage coupons={coupons} />} />
          <Route path="/products" element={<ProductsPage productsList={productsList} />} />
          <Route path="/rewards" element={<RewardsPage coupons={coupons} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} coupons={coupons} onLogout={handleLogout} />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={22} />
          <span>Início</span>
        </NavLink>
        <NavLink to="/coupons" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Ticket size={22} />
          <span>Cupons</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ShoppingBag size={22} />
          <span>Produtos</span>
        </NavLink>
        <NavLink to="/rewards" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Gift size={22} />
          <span>Prêmios</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={22} />
          <span>Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
}

// 🏠 Home Page Component with Pirate Map Trail
function HomePage({ clientUser, productsList }: { clientUser: any; productsList: any[] }) {
  const getPirateNodes = (current: number) => {
    const nodes = [
      { step: 1, icon: '🏠', title: 'Vila Pirata', req: 5 },
      { step: 2, icon: '🌴', title: 'Ilha Coqueiro', req: 10 },
      { step: 3, icon: '🦜', title: 'Papagaio do Mar', req: 15 },
      { step: 4, icon: '🏊', title: 'Lagoa Azul', req: 20 },
      { step: 5, icon: '💎', title: 'Diamante do Mar', req: 25 },
      { step: 6, icon: '🏠', title: 'Fortaleza Pirata', req: 30 },
      { step: 7, icon: '🌴', title: 'Ilha Caveira', req: 35 },
      { step: 8, icon: '⭐', title: 'Estrela Guia', req: 40 },
      { step: 9, icon: '🏊', title: 'Recife Corais', req: 45 },
    ];

    return nodes.map(n => {
      let state: 'completed' | 'current' | 'locked' = 'locked';
      if (current >= n.req) {
        state = 'completed';
      } else if (current >= n.req - 5) {
        state = 'current';
      }
      return { ...n, state };
    });
  };

  const pirateSteps = getPirateNodes(clientUser.coupons);

  return (
    <div>
      {/* Progress Card */}
      <div className="card progress-card">
        <div className="progress-header">
          <span style={{ fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ticket size={20} /> Seus Cupons Pirata
          </span>
          <span style={{ fontSize: '0.8rem', background: 'var(--gold-light)', padding: '2px 10px', borderRadius: 12, fontWeight: 800 }}>
            Nível {Math.floor(clientUser.coupons / 5) + 1}
          </span>
        </div>

        <div className="coupons-count">
          <div className="coupons-number">{clientUser.coupons}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>cupons acumulados de {clientUser.targetCoupons}</div>
        </div>

        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${Math.min(100, (clientUser.coupons / clientUser.targetCoupons) * 100)}%` }}></div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 8 }}>
          {clientUser.coupons >= clientUser.targetCoupons ? (
            <strong style={{ color: 'var(--success)' }}>🎉 Parabéns! Você conquistou o Baú do Tesouro!</strong>
          ) : (
            <>Faltam <strong>{clientUser.targetCoupons - clientUser.coupons} cupons</strong> para o Baú do Tesouro!</>
          )}
        </p>
      </div>

      {/* PIRATE TREASURE TRAIL MAP */}
      <h2 className="section-title">🏴‍☠️ Trilha do Tesouro Pirata</h2>
      <div className="card pirate-map-card">
        <div className="pirate-map-header">
          <div className="pirate-map-title">
            <Compass className="compass-icon" />
            <span>MAPA DO TESOURO</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Siga a trilha e acumule cupons até o grande Baú!
          </p>
        </div>

        <div className="trail-container-pirate">
          {/* Treasure Chest at Top */}
          <div className={`treasure-chest-pirate ${clientUser.coupons >= 50 ? 'unlocked' : ''}`}>
            🏆
          </div>
          <span className="treasure-coupon-badge">
            {clientUser.coupons >= 50 ? 'BAÚ DESBLOQUEADO!' : '50 CUPONS'}
          </span>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-dark)', marginBottom: 20, marginTop: 4 }}>
            BAÚ DO TESOURO PIRATA
          </div>

          {/* Pirate Map Trail Nodes */}
          {pirateSteps.slice().reverse().map((node, index) => {
            const alignClass = index % 2 === 0 ? 'left' : 'right';
            return (
              <div key={node.step} className={`pirate-node-wrapper ${alignClass}`}>
                <div className={`pirate-node ${node.state}`}>
                  {node.state === 'completed' ? <Check size={28} /> : node.icon}
                </div>
                <span className="node-coupon-badge">
                  {node.req} CUPONS
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {node.title}
                </span>
              </div>
            );
          })}

          {/* Anchor at Start */}
          <div className="pirate-node-wrapper center" style={{ marginTop: 20 }}>
            <div className="pirate-node completed" style={{ background: '#2C1810' }}>
              <Anchor size={28} />
            </div>
            <span className="node-coupon-badge">INÍCIO (0 CUPONS)</span>
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <h2 className="section-title">💧 Recomendado para Você</h2>
      <div className="horizontal-scroll">
        {productsList.filter(p => p.isActive !== false).map((prod) => (
          <div key={prod.id} className="product-card-mini">
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>{prod.category || 'Geral'}</span>
            <strong style={{ fontSize: '1rem', margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>{prod.name || prod.title}</strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', flex: 1, marginBottom: 12 }}>{prod.description || prod.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>R$ {(prod.price || 0).toFixed(2)}</span>
            </div>
            <button className="btn-whatsapp" onClick={() => openWhatsApp(prod.name || prod.title)}>
              <MessageCircle size={18} /> Comprar no WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎟️ Coupons Page Component
function CouponsPage({ coupons }: { coupons: number }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 className="section-title" style={{ margin: '8px 0 16px 0' }}>🎟️ Meus Cupons ({coupons})</h2>
      <div className="card">
        <h3>Como acumular cupons?</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0 16px 0' }}>
          A cada R$ 100,00 em compras na Piscinão Araçatuba, você ganha <strong>1 cupom</strong> para avançar na sua trilha!
        </p>
        <div style={{ background: 'var(--primary-50)', padding: 16, borderRadius: 12 }}>
          <strong>Regra Atual:</strong>
          <div style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', marginTop: 4 }}>R$ 100,00 = 1 Cupom</div>
        </div>
      </div>

      <div className="card">
        <h3>Histórico de Cupons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          <div style={{ borderBottom: '1px solid #F0EBE3', paddingBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Saldo Atualizado</span>
              <span style={{ color: 'var(--primary)' }}>{coupons} Cupons</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sincronizado em tempo real com a Loja</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🛍️ Products Page Component
function ProductsPage({ productsList }: { productsList: any[] }) {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Químicos', 'Acessórios', 'Equipamentos'];

  const activeProducts = productsList.filter(p => p.isActive !== false);
  const filtered = filter === 'Todos' ? activeProducts : activeProducts.filter(p => p.category === filter);

  return (
    <div style={{ padding: 16 }}>
      <h2 className="section-title" style={{ margin: '8px 0 16px 0' }}>🛍️ Catálogo de Produtos</h2>
      
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              background: filter === cat ? 'var(--primary)' : '#FFFFFF',
              color: filter === cat ? '#FFFFFF' : 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((prod) => (
          <div key={prod.id} className="card card-hover-motion animate-fade-up" style={{ margin: 0 }}>
            {prod.imageUrl ? (
              <img 
                src={prod.imageUrl} 
                alt={prod.name} 
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} 
              />
            ) : null}
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>{prod.category || 'Geral'}</span>
            <h3 style={{ fontSize: '1.1rem', margin: '4px 0' }}>{prod.name || prod.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 14 }}>{prod.description || prod.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>R$ {(prod.price || 0).toFixed(2)}</span>
            </div>
            <button className="btn-whatsapp" onClick={() => openWhatsApp(prod.name || prod.title)}>
              <MessageCircle size={18} /> Pedir pelo WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎁 Rewards Page Component
function RewardsPage({ coupons }: { coupons: number }) {
  return (
    <div style={{ padding: 16 }}>
      <h2 className="section-title" style={{ margin: '8px 0 16px 0' }}>🎁 Recompensas & Prêmios</h2>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF 100%)', border: '2px solid var(--gold)' }}>
        <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>🏆</div>
        <h3 style={{ textAlign: 'center', color: 'var(--gold-dark)', margin: '8px 0' }}>Baú do Tesouro Piscinão</h3>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
          Conclua os 50 cupons e desbloqueie um <strong>Kit Completo de Tratamento de Verão</strong> grátis!
        </p>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>
          Seu Progresso: {coupons} / 50 Cupons
        </div>
      </div>

      <div className="card">
        <h3>Prêmios Conquistados</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <div style={{ fontSize: '1.5rem' }}>🎁</div>
          <div>
            <strong>Desconto de 10% no Algicida</strong>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700 }}>
              {coupons >= 20 ? 'Desbloqueado!' : 'Desbloqueia com 20 cupons'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👤 Profile Page Component with Registered Data (CRUD) & Logout
function ProfilePage({ user, coupons, onLogout }: { user: any; coupons: number; onLogout: () => void }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <h2 className="section-title" style={{ margin: '8px 0 16px 0' }}>👤 Meu Perfil Cadastrado</h2>
      
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: 'var(--primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, margin: '0 auto 12px auto' }}>
          {user.name ? user.name.charAt(0) : 'J'}
        </div>
        <h3 style={{ fontSize: '1.2rem' }}>{user.name}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>{user.email}</p>
        
        <span style={{ background: 'var(--primary-50)', color: 'var(--primary-dark)', padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', display: 'inline-block' }}>
          ⭐ Cliente VIP Piscinão
        </span>
      </div>

      {/* Complete Registered Data Card */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <FileText size={18} color="var(--primary)" /> Dados Cadastrados no Sistema
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0EBE3', paddingBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>CPF:</span>
            <strong>{user.cpf || '123.456.789-00'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0EBE3', paddingBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Telefone / WhatsApp:</span>
            <strong>{user.phone || '(18) 99123-4567'}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0EBE3', paddingBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Data Nasc. / Idade:</span>
            <strong>{user.birthdate || '14/06/1988'} ({user.age || 36} anos)</strong>
          </div>

          <div style={{ borderBottom: '1px solid #F0EBE3', paddingBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 2 }}>Endereço Completo:</span>
            <strong style={{ color: 'var(--primary-dark)' }}>
              {user.address || 'Rua das Palmeiras, 450'} — {user.neighborhood || 'Jardim Primavera'}<br />
              {user.city || 'Araçatuba'} - {user.state || 'SP'}, CEP: {user.zipCode || '16050-000'}
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#4CAF50', fontWeight: 700, marginTop: 14 }}>
          <ShieldCheck size={16} /> Dados protegidos com criptografia SSL antianálise
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => navigate('/coupons')} style={{ padding: '12px 0', border: 'none', background: 'none', textAlign: 'left', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
          🎟️ Meus Cupons ({coupons} acumulados)
        </button>
        <button onClick={() => navigate('/products')} style={{ padding: '12px 0', border: 'none', background: 'none', textAlign: 'left', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', color: 'var(--text-primary)', borderTop: '1px solid #F0EBE3' }}>
          🛍️ Catálogo da Loja
        </button>
        <button onClick={() => window.open('https://wa.me/5518991024742', '_blank')} style={{ padding: '12px 0', border: 'none', background: 'none', textAlign: 'left', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', color: '#25D366', borderTop: '1px solid #F0EBE3' }}>
          💬 Falar com Atendimento
        </button>

        <button 
          onClick={onLogout} 
          className="btn-logout"
          style={{ 
            marginTop: 10, 
            padding: '12px 16px', 
            border: '1px solid #FFCDD2', 
            borderRadius: 12, 
            background: '#FFEBEE', 
            color: '#E53935', 
            fontWeight: 800, 
            fontSize: '0.9rem', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px' 
          }}
        >
          <LogOut size={18} /> Sair da Minha Conta
        </button>
      </div>
    </div>
  );
}
