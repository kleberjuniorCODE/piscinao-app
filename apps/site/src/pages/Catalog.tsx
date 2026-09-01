import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories, Category } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { Search, Filter, RefreshCw } from 'lucide-react';

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = (searchParams.get('categoria') as Category | null) || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Search term match
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(term);
        const matchesDesc = product.description.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc) return false;
      }
      // Price range match
      const price = product.priceDiscount ?? product.price;
      if (priceRange === 'under500' && price > 500) return false;
      if (priceRange === '500to2000' && (price < 500 || price > 2000)) return false;
      if (priceRange === '2000to5000' && (price < 2000 || price > 5000)) return false;
      if (priceRange === 'above5000' && price < 5000) return false;

      return true;
    });
  }, [activeCategory, searchTerm, priceRange]);

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: catId });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setPriceRange('all');
    searchParams.delete('categoria');
    setSearchParams(searchParams);
  };

  return (
    <main>
      <SEOHead 
        title="Catálogo Geral & Piscinas | Piscinão Araçatuba" 
        description="Explore o catálogo completo de piscinas de fibra, aquecedores, filtros, químicos e robôs com entrega rápida." 
        path="/produtos" 
      />

      <div className="catalog-header-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Catálogo de Produtos' }]} />
          <h1>Catálogo Completo</h1>
          <p className="editorial-title">"Qualidade comprovada para o seu lazer e conforto."</p>
        </div>
      </div>

      <div className="container catalog-layout">
        
        {/* Search & Filter Bar */}
        <div className="catalog-filter-bar">
          
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome do produto, modelo ou descrição (ex: Tropical, Bomba, Cloro)..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--chocolate)' }}>
              <Filter size={16} />
              <span>Filtrar por Categoria:</span>
            </div>
            <div className="filter-chips-list">
              <button 
                className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                Todas ({products.length})
              </button>
              {categories.map(c => {
                const count = products.filter(p => p.category === c.id).length;
                return (
                  <button 
                    key={c.id} 
                    className={`filter-chip ${activeCategory === c.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(c.id)}
                  >
                    {c.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--cream)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--chocolate)' }}>Faixa de Preço:</span>
              <select 
                value={priceRange} 
                onChange={e => setPriceRange(e.target.value)}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: 'var(--radius-xs)', 
                  border: '1px solid var(--cream-dark)',
                  background: 'var(--cream)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--chocolate)'
                }}
              >
                <option value="all">Todos os Valores</option>
                <option value="under500">Até R$ 500</option>
                <option value="500to2000">R$ 500 a R$ 2.000</option>
                <option value="2000to5000">R$ 2.000 a R$ 5.000</option>
                <option value="above5000">Acima de R$ 5.000</option>
              </select>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Exibindo <strong>{filteredProducts.length}</strong> de {products.length} produtos
            </div>
          </div>

        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ color: 'var(--chocolate)', marginBottom: '8px' }}>Nenhum produto encontrado</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Tente alterar os termos da busca ou limpar os filtros de categoria e preço.
            </p>
            <button className="btn btn-primary" onClick={handleClearFilters}>
              <RefreshCw size={16} />
              <span>Limpar Todos os Filtros</span>
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
