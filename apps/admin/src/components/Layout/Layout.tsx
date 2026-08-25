import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ShoppingCart,
  Ticket,
  Map,
  Gift,
  Megaphone,
  Lightbulb,
  Settings,
  LogOut,
} from 'lucide-react';
import PiscinaoLogo from '../ui/PiscinaoLogo';
import './Layout.css';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/clients', icon: Users, label: 'Clientes' },
  { path: '/products', icon: ShoppingBag, label: 'Produtos' },
  { path: '/purchases', icon: ShoppingCart, label: 'Compras' },
  { path: '/coupons', icon: Ticket, label: 'Cupons' },
  { path: '/trail', icon: Map, label: 'Trilha' },
  { path: '/rewards', icon: Gift, label: 'Recompensas' },
  { path: '/promotions', icon: Megaphone, label: 'Promoções' },
  { path: '/recommendations', icon: Lightbulb, label: 'Recomendações' },
  { path: '/settings', icon: Settings, label: 'Configurações' },
];

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const [activeAdmin, setActiveAdmin] = useState<{ name: string; role?: string }>(() => {
    const saved = localStorage.getItem('piscinao_active_admin');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { name: 'Administrador', role: 'Administrador Geral' };
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('piscinao_active_admin');
      if (saved) {
        try {
          setActiveAdmin(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const getPageTitle = () => {
    const item = navItems.find((n) => n.path === location.pathname);
    if (location.pathname.startsWith('/products/new')) return 'Novo Produto';
    if (location.pathname.startsWith('/products/edit')) return 'Editar Produto';
    if (location.pathname.startsWith('/recommendations/new')) return 'Nova Recomendação';
    if (location.pathname.startsWith('/recommendations/edit')) return 'Editar Recomendação';
    return item?.label || 'Dashboard';
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <PiscinaoLogo width={180} height={40} color="#FFFFFF" />
          <span className="logo-subtitle brand-kardust">ADMIN</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn">
            <LogOut size={22} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="header-title-group">
            <h1 className="page-title">{getPageTitle()}</h1>
            <span className="brand-slogan">Confiança que se constrói.</span>
          </div>
          <div className="header-user" title={`Logado como: ${activeAdmin.name} (${activeAdmin.role || 'Admin'})`}>
            <div className="header-avatar" style={{ background: '#5B3422', color: '#FFF', fontWeight: 800 }}>
              {activeAdmin.name.charAt(0).toUpperCase()}
            </div>
            <span className="header-name brand-kardust" style={{ fontWeight: 800, letterSpacing: '0.5px' }}>
              {activeAdmin.name}
            </span>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
