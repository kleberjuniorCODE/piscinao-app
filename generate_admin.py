import os
import json

base_dir = r"C:\Users\Home\.gemini\antigravity\scratch\piscinao-app\apps\admin"
os.makedirs(base_dir, exist_ok=True)

files = {
    "package.json": """{
  "name": "admin",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "lucide-react": "^0.453.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.53.0",
    "react-router-dom": "^7.0.0",
    "recharts": "^2.13.0",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.9.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.2",
    "typescript": "~5.6.2",
    "vite": "^5.4.9"
  }
}
""",
    "vite.config.ts": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
""",
    "tsconfig.json": """{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
""",
    "tsconfig.app.json": """{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
""",
    "tsconfig.node.json": """{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
""",
    "index.html": """<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Piscinão Araçatuba - Admin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""",
    "src/index.css": """
:root {
  --primary: #7D5A3C;
  --primary-light: #A67C5B;
  --primary-dark: #5C3D28;
  --primary-50: #F5EDE3;
  --primary-100: #E8D5C4;
  
  --accent: #2E86AB;
  --accent-light: #A8D5E2;
  
  --gold: #D4A853;
  --gold-light: #F0DCA0;
  
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #E53935;
  
  --bg: #FAF7F4;
  --bg-sidebar: #2C1810;
  --bg-card: #FFFFFF;
  
  --text: #2C1810;
  --text-secondary: #6B5B4F;
  --text-muted: #8C7A6E;
  --text-inverse: #FFFFFF;
  
  --border: #E0D6CC;
  --shadow: rgba(44, 24, 16, 0.08);
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
""",
    "src/App.css": """
.app-container {
  display: flex;
  min-height: 100vh;
}
""",
    "src/main.tsx": """import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
""",
    "src/types/index.ts": """
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  coupons: number;
  status: 'active' | 'blocked';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  show_price: boolean;
  image_url: string;
  whatsapp_message?: string;
  active: boolean;
}

export interface Purchase {
  id: string;
  clientId: string;
  date: string;
  total: number;
  couponsGenerated: number;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
""",
    "src/services/api.ts": """
import { Client, Product, Purchase } from '../types';

export const mockClients: Client[] = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', phone: '18999999999', coupons: 5, status: 'active' },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', phone: '18988888888', coupons: 12, status: 'active' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Cloro 10kg', description: 'Cloro granulado', category: 'Químicos', price: 150.00, show_price: true, image_url: '', active: true },
];

export const mockPurchases: Purchase[] = [];
""",
    "src/utils/format.ts": """
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};
""",
    "src/store/authStore.ts": """
import { User } from '../types';

let currentUser: User | null = { id: 'admin1', name: 'Admin', email: 'admin@piscinao.com.br', role: 'admin' };

export const authStore = {
  getUser: () => currentUser,
  login: () => { currentUser = { id: 'admin1', name: 'Admin', email: 'admin@piscinao.com.br', role: 'admin' }; },
  logout: () => { currentUser = null; }
};
""",
    "src/App.tsx": """
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Purchases from './pages/Purchases';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="purchases" element={<Purchases />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
""",
    "src/components/Layout/Layout.tsx": """
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
""",
    "src/components/Layout/Layout.css": """
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
""",
    "src/components/Layout/Sidebar.tsx": """
import { NavLink } from 'react-router-dom';
import { Home, Users, Package, ShoppingCart } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        PISCINÃO
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
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Package size={20} />
          <span>Produtos</span>
        </NavLink>
        <NavLink to="/purchases" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <ShoppingCart size={20} />
          <span>Compras</span>
        </NavLink>
      </nav>
    </aside>
  );
}
""",
    "src/components/Layout/Sidebar.css": """
.sidebar {
  width: 280px;
  background-color: var(--bg-sidebar);
  color: var(--text-inverse);
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 24px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: var(--text-inverse);
}

.sidebar-nav {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  gap: 12px;
  color: rgba(255,255,255,0.7);
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: rgba(255,255,255,0.05);
  color: var(--text-inverse);
}

.nav-item.active {
  background-color: var(--primary);
  color: var(--text-inverse);
  border-right: 4px solid var(--gold);
}
""",
    "src/components/Layout/Header.tsx": """
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-title">Painel Administrativo</div>
      <div className="header-user">Admin</div>
    </header>
  );
}
""",
    "src/components/Layout/Header.css": """
.header {
  height: 64px;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}
""",
    "src/pages/Login.tsx": """
import './Login.css';
export default function Login() {
  return <div className="login-page">Login Page (stub)</div>;
}
""",
    "src/pages/Login.css": ".login-page { padding: 20px; }",
    "src/pages/Dashboard.tsx": """
import './Dashboard.css';
export default function Dashboard() {
  return <div className="dashboard-page"><h1>Dashboard</h1><p>Bem-vindo ao painel.</p></div>;
}
""",
    "src/pages/Dashboard.css": ".dashboard-page { padding: 20px; }",
    "src/pages/Clients.tsx": """
import './Clients.css';
export default function Clients() {
  return <div className="clients-page"><h1>Clientes</h1></div>;
}
""",
    "src/pages/Clients.css": ".clients-page { padding: 20px; }",
    "src/pages/Products.tsx": """
import './Products.css';
export default function Products() {
  return <div className="products-page"><h1>Produtos</h1></div>;
}
""",
    "src/pages/Products.css": ".products-page { padding: 20px; }",
    "src/pages/Purchases.tsx": """
import './Purchases.css';
export default function Purchases() {
  return <div className="purchases-page"><h1>Compras</h1><p>Registro de compras (Stub)</p></div>;
}
""",
    "src/pages/Purchases.css": ".purchases-page { padding: 20px; }",
}

for file_path, content in files.items():
    full_path = os.path.join(base_dir, file_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files generated successfully.")
