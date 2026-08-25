import { NavLink } from 'react-router-dom';
import { Home, Users, Package, ShoppingCart, Gift, Percent, MessageSquare, Settings as SettingsIcon, MapPin } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo brand-kardust">
        PISCINÃO
        <span className="logo-sub">ADMIN</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/clients" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Users size={20} />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/purchases" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <ShoppingCart size={20} />
          <span>Registrar Compra</span>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Package size={20} />
          <span>Produtos</span>
        </NavLink>
        <NavLink to="/trail" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <MapPin size={20} />
          <span>Trilha</span>
        </NavLink>
        <NavLink to="/rewards" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Gift size={20} />
          <span>Recompensas</span>
        </NavLink>
        <NavLink to="/promotions" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Percent size={20} />
          <span>Promoções</span>
        </NavLink>
        <NavLink to="/recommendations" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <MessageSquare size={20} />
          <span>Recomendações</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <SettingsIcon size={20} />
          <span>Configurações</span>
        </NavLink>
      </nav>
    </aside>
  );
}
