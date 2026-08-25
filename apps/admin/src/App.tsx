import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Clients from './pages/Clients';
import Products from './pages/Products';
import ProductEdit from './pages/ProductEdit';
import Purchases from './pages/Purchases';
import Coupons from './pages/Coupons';
import Trail from './pages/Trail';
import Rewards from './pages/Rewards';
import Promotions from './pages/Promotions';
import Recommendations from './pages/Recommendations';
import RecommendationEdit from './pages/RecommendationEdit';
import Settings from './pages/Settings';
import ClientDetail from './pages/ClientDetail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout><DashboardRoute /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/clients" element={<Layout><Clients /></Layout>} />
      <Route path="/clients/:id" element={<Layout><ClientDetail /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/products/new" element={<Layout><ProductEdit /></Layout>} />
      <Route path="/products/edit/:id" element={<Layout><ProductEdit /></Layout>} />
      <Route path="/purchases" element={<Layout><Purchases /></Layout>} />
      <Route path="/coupons" element={<Layout><Coupons /></Layout>} />
      <Route path="/trail" element={<Layout><Trail /></Layout>} />
      <Route path="/rewards" element={<Layout><Rewards /></Layout>} />
      <Route path="/promotions" element={<Layout><Promotions /></Layout>} />
      <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
      <Route path="/recommendations/new" element={<Layout><RecommendationEdit /></Layout>} />
      <Route path="/recommendations/edit/:id" element={<Layout><RecommendationEdit /></Layout>} />
      <Route path="/settings" element={<Layout><Settings /></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function DashboardRoute() {
  return <Dashboard />;
}

export default App;
