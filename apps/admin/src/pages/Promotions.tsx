import { useState } from 'react';
import { Tag, Plus, Calendar } from 'lucide-react';
import './Promotions.css';

export default function Promotions() {
  const [promotions] = useState([
    { id: 1, title: 'Oferta de Verão', discount: 15, product: 'Cloro 10kg', validity: '31/12/2023', active: true },
    { id: 2, title: 'Limpeza Completa', discount: 20, product: 'Kit Limpeza', validity: '15/11/2023', active: false },
  ]);

  return (
    <div className="promotions-page">
      <header className="page-header">
        <h1>Promoções</h1>
        <button className="btn-primary">
          <Plus size={20} /> Nova Promoção
        </button>
      </header>

      <div className="promotions-grid">
        {promotions.map(promo => (
          <div key={promo.id} className="promo-card card">
            <div className="promo-header">
              <div className="discount-badge">-{promo.discount}%</div>
              <span className={`status-badge ${promo.active ? 'active' : 'blocked'}`}>
                {promo.active ? 'Ativa' : 'Inativa'}
              </span>
            </div>
            
            <div className="promo-info">
              <h3>{promo.title}</h3>
              <p className="promo-product">Produto: {promo.product}</p>
              
              <div className="promo-meta">
                <span className="validity"><Calendar size={16} /> Válido até {promo.validity}</span>
              </div>
              
              <div className="promo-actions">
                <button className="btn-secondary w-100">Editar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
