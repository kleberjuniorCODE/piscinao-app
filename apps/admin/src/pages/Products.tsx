import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, Tag, Image as ImageIcon } from 'lucide-react';
import { mockProducts } from '../services/api';
import './Products.css';

export default function Products() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>(['Todos', 'Químicos', 'Acessórios', 'Equipamentos']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState<any[]>(() => {
    const saved = localStorage.getItem('piscinao_admin_products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Fetch initial from backend
  useEffect(() => {
    fetch('http://localhost:3002/sync/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
          localStorage.setItem('piscinao_admin_products', JSON.stringify(data.data));
        }
      })
      .catch(() => {});
  }, []);

  const saveProductsToBackend = async (newProducts: any[]) => {
    setProducts(newProducts);
    localStorage.setItem('piscinao_admin_products', JSON.stringify(newProducts));
    try {
      await fetch('http://localhost:3002/sync/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: newProducts }),
      });
    } catch (e) {}
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const updated = products.filter((p) => p.id !== id);
      saveProductsToBackend(updated);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName('');
    }
  };

  const filtered = products.filter((p: any) => {
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const nameStr = (p.name || p.title || '').toLowerCase();
    const descStr = (p.description || p.desc || '').toLowerCase();
    const matchesSearch = nameStr.includes(searchTerm.toLowerCase()) || descStr.includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="products-page">
      <header className="page-header">
        <div>
          <h1>Catálogo de Produtos</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>Gerencie o catálogo completo, preços e fotos da loja</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={() => setShowCategoryModal(true)}>
            <Tag size={18} />
            <span>Categorias</span>
          </button>
          <button className="btn-primary" onClick={() => navigate('/products/new')}>
            <Plus size={20} />
            <span>Novo Produto</span>
          </button>
        </div>
      </header>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar produtos por nome ou descrição..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filtered.map((product: any) => (
          <div key={product.id} className="product-card card">
            <div className="product-image-container">
              {product.imageUrl || product.image ? (
                <img src={product.imageUrl || product.image} alt={product.name} className="product-img" />
              ) : (
                <div className="product-image-placeholder">
                  <ImageIcon size={32} />
                </div>
              )}
              <span className="category-badge">{product.category || 'Geral'}</span>
            </div>
            <div className="product-info">
              <h3>{product.name || product.title}</h3>
              <p className="description">{product.description || product.desc}</p>
              
              <div className="price-row">
                <span className="price">R$ {(product.price || 0).toFixed(2)}</span>
                <span className={`status-badge ${product.isActive !== false ? 'active' : 'blocked'}`}>
                  {product.isActive !== false ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <div className="product-actions">
                <button className="btn-secondary flex-1" onClick={() => navigate(`/products/edit/${product.id}`)}>
                  <Edit size={16} /> Editar
                </button>
                <button className="btn-icon danger" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY MANAGEMENT MODAL */}
      {showCategoryModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Gerenciar Categorias</h3>
            <div style={{ margin: '16px 0' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, display: 'block' }}>
                Categorias Atuais:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {categories.filter(c => c !== 'Todos').map(c => (
                  <span key={c} className="category-tag">
                    {c}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <input 
                  type="text" 
                  placeholder="Nova Categoria..." 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', border: '1px solid #DDD', borderRadius: 8 }}
                />
                <button className="btn-primary" onClick={handleAddCategory}>Adicionar</button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowCategoryModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
