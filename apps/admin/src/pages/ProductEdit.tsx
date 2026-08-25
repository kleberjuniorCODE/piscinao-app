import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { mockProducts } from '../services/api';
import './ProductEdit.css';

export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<any[]>(() => {
    const saved = localStorage.getItem('piscinao_admin_products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const targetProduct = isNew ? null : products.find((p) => p.id === id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Químicos');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (targetProduct) {
      setName(targetProduct.name || targetProduct.title || '');
      setDescription(targetProduct.description || targetProduct.desc || '');
      setPrice((targetProduct.price || 0).toString());
      setCategory(targetProduct.category || 'Químicos');
      setImageUrl(targetProduct.imageUrl || targetProduct.image || '');
      setIsActive(targetProduct.isActive !== false);
    }
  }, [targetProduct]);

  // Handle computer file upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedPrice = parseFloat(price.replace(',', '.')) || 0;

    let updatedProducts: any[];

    if (isNew) {
      const newProd = {
        id: Date.now().toString(),
        name,
        title: name,
        description,
        desc: description,
        price: parsedPrice,
        category,
        imageUrl,
        image: imageUrl,
        isActive,
      };
      updatedProducts = [newProd, ...products];
    } else {
      updatedProducts = products.map((p) =>
        p.id === id
          ? {
              ...p,
              name,
              title: name,
              description,
              desc: description,
              price: parsedPrice,
              category,
              imageUrl,
              image: imageUrl,
              isActive,
            }
          : p
      );
    }

    setProducts(updatedProducts);
    localStorage.setItem('piscinao_admin_products', JSON.stringify(updatedProducts));

    try {
      await fetch('http://localhost:3002/sync/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts }),
      });
    } catch (err) {}

    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/products');
    }, 600);
  };

  return (
    <div className="product-edit-page">
      <header className="page-header">
        <Link to="/products" className="back-link">
          <ArrowLeft size={20} />
          <span>Voltar para Produtos</span>
        </Link>
        <h1>{isNew ? 'Cadastrar Novo Produto' : `Editar Produto — ${name || 'Item'}`}</h1>
      </header>

      {savedSuccess && (
        <div className="alert-success">
          <CheckCircle2 size={20} />
          <span>Produto salvo com sucesso! Redirecionando...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="edit-form-grid">
        {/* Left Column: Image Uploader */}
        <div className="card image-upload-card">
          <h3>Imagem do Produto</h3>
          <p className="sub-text">Clique no quadro para escolher uma foto do seu computador</p>

          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleImageFileChange}
          />

          <div 
            className="image-dropzone" 
            onClick={() => fileInputRef.current?.click()}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="image-preview" />
            ) : (
              <div className="dropzone-placeholder">
                <Upload size={48} className="upload-icon" />
                <span className="upload-title">Clique para selecionar foto do Computador</span>
                <span className="upload-hint">PNG, JPG, WEBP até 10MB</span>
              </div>
            )}
          </div>

          <div className="url-fallback-section">
            <label>Ou cole um Link de Imagem (URL):</label>
            <input 
              type="url" 
              placeholder="https://exemplo.com/imagem.jpg" 
              value={imageUrl.startsWith('data:') ? '' : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="card details-form-card">
          <h3>Informações do Produto</h3>

          <div className="form-group">
            <label>Nome do Produto *</label>
            <input 
              type="text" 
              required 
              placeholder="Ex: Cloro Granulado 10kg" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Preço (R$) *</label>
              <input 
                type="text" 
                required 
                placeholder="189.90" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="form-group flex-1">
              <label>Categoria *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Químicos">Químicos</option>
                <option value="Acessórios">Acessórios</option>
                <option value="Equipamentos">Equipamentos</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Descrição detalhada</label>
            <textarea 
              rows={4} 
              placeholder="Descreva as características, dosagem e forma de aplicação do produto..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={isActive} 
                onChange={(e) => setIsActive(e.target.checked)} 
              />
              <span className="checkbox-text">Produto disponível para exibição e compra no app do cliente</span>
            </label>
          </div>

          <div className="form-actions-bar">
            <Link to="/products" className="btn-secondary">
              Cancelar
            </Link>
            <button type="submit" className="btn-primary-large">
              <Save size={20} />
              <span>Salvar Produto</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
