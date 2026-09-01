import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '50vh' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-dark)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ color: 'var(--color-chocolate)', marginBottom: '2rem' }}>Página não encontrada</h2>
      <Link to="/" style={{ 
        display: 'inline-block', 
        padding: '12px 24px', 
        backgroundColor: 'var(--color-chocolate)', 
        color: 'var(--color-white)', 
        textDecoration: 'none', 
        borderRadius: '4px',
        fontWeight: '600'
      }}>
        Voltar para o início
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="site-wrapper">
      <ScrollToTop />
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Catalog />} />
          <Route path="/piscinas" element={<Catalog />} />
          <Route path="/produto/:slug" element={<ProductDetail />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
