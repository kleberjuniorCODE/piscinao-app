import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';

const PRICE_RANGES = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: 'Até R$ 500', min: 0, max: 500 },
  { label: 'R$ 500 - R$ 2.000', min: 500, max: 2000 },
  { label: 'R$ 2.000 - R$ 5.000', min: 2000, max: 5000 },
  { label: 'Acima de R$ 5.000', min: 5000, max: Infinity },
];

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('categoria') || 'Todos';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activePriceRange, setActivePriceRange] = useState(PRICE_RANGES[0]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const actualPrice = product.priceDiscount || product.price;
      const matchesPrice = actualPrice >= activePriceRange.min && actualPrice <= activePriceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, activeCategory, activePriceRange]);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'Todos') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', categoryId);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActivePriceRange(PRICE_RANGES[0]);
    searchParams.delete('categoria');
    setSearchParams(searchParams);
  };

  return (
    <main className="page-catalog">
      <SEOHead 
        title="Catálogo de Produtos | Piscinão Araçatuba" 
        description="Explore nosso catálogo completo de piscinas, equipamentos, produtos químicos e acessórios." 
        path="/produtos" 
      />
      
      <div className="container py-lg">
        <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Produtos' }]} />
        
        <div className="section-header mt-md">
          <h1 className="h2">Nossos Produtos</h1>
          <p className="text-muted">{filteredProducts.length} produtos encontrados</p>
        </div>

        <div className="filters-section mb-xl">
          <div className="mb-md">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="form-control w-100 max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-md">
            <h3 className="h6 mb-sm">Categorias</h3>
            <div className="flex gap-sm flex-wrap">
              <button 
                className={`btn btn-sm ${activeCategory === 'Todos' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleCategoryClick('Todos')}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`btn btn-sm ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-md">
            <h3 className="h6 mb-sm">Faixa de Preço</h3>
            <div className="flex gap-sm flex-wrap">
              {PRICE_RANGES.map(range => (
                <button 
                  key={range.label}
                  className={`btn btn-sm ${activePriceRange.label === range.label ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActivePriceRange(range)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-3 catalog-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-xl bg-cream border-radius-lg">
            <h3 className="h4 mb-md">Nenhum produto encontrado</h3>
            <p className="text-muted mb-lg">Tente ajustar seus filtros de busca para encontrar o que procura.</p>
            <button onClick={clearFilters} className="btn btn-primary">Limpar Filtros</button>
          </div>
        )}
      </div>
    </main>
  );
};
