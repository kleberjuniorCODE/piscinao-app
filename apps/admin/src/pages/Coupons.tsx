import { useState } from 'react';
import { Settings, Plus, Percent, Calendar } from 'lucide-react';
import './Coupons.css';

export default function Coupons() {
  const [baseValue, setBaseValue] = useState(100);

  return (
    <div className="coupons-page">
      <header className="page-header">
        <h1>Configuração de Cupons</h1>
      </header>

      <div className="config-grid">
        <div className="card base-rule-card">
          <div className="card-header">
            <h2><Settings size={20} /> Regra Base</h2>
          </div>
          <div className="card-body">
            <p className="rule-description">Define o valor gasto necessário para gerar 1 cupom.</p>
            
            <div className="rule-form">
              <div className="form-group">
                <label>Cada R$</label>
                <input 
                  type="number" 
                  value={baseValue} 
                  onChange={(e) => setBaseValue(Number(e.target.value))}
                />
              </div>
              <div className="equals-sign">=</div>
              <div className="coupon-result">
                <span className="coupon-number">1</span>
                <span>Cupom</span>
              </div>
            </div>
            
            <button className="btn-primary mt-4">Salvar Regra Base</button>
          </div>
        </div>

        <div className="card bonus-rules-card">
          <div className="card-header d-flex justify-between">
            <h2><Percent size={20} /> Regras Bônus</h2>
            <button className="btn-secondary small">
              <Plus size={16} /> Nova Regra
            </button>
          </div>
          <div className="card-body">
            <ul className="rules-list">
              <li className="rule-item">
                <div className="rule-info">
                  <h4>Compra de Robô Aspirador</h4>
                  <p>Categoria: Equipamentos</p>
                  <div className="rule-meta">
                    <span className="bonus-tag">+5 Cupons</span>
                    <span className="date-tag"><Calendar size={14}/> Até 31/12</span>
                  </div>
                </div>
                <div className="rule-actions">
                  <span className="status-badge active">Ativa</span>
                </div>
              </li>
              <li className="rule-item">
                <div className="rule-info">
                  <h4>Dobro de Cupons (Aniversário da Loja)</h4>
                  <p>Multiplicador: 2x em todas as compras</p>
                  <div className="rule-meta">
                    <span className="bonus-tag">Multiplicador 2x</span>
                    <span className="date-tag"><Calendar size={14}/> Encerrado</span>
                  </div>
                </div>
                <div className="rule-actions">
                  <span className="status-badge blocked">Inativa</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
