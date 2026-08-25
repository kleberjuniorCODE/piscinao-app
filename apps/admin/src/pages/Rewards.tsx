import { useState } from 'react';
import { Gift, Plus } from 'lucide-react';
import './Rewards.css';

export default function Rewards() {
  const [rewards] = useState([
    { id: 1, name: 'Cloro 1kg', description: 'Balde de 1kg de cloro granulado', coupons: 10, isFinal: false, active: true },
    { id: 2, name: 'Limpa Bordas', description: 'Limpa bordas especial 1L', coupons: 5, isFinal: false, active: true },
    { id: 3, name: 'Balde Cloro 10kg', description: 'Prêmio máximo da trilha', coupons: 50, isFinal: true, active: true },
  ]);

  return (
    <div className="rewards-page">
      <header className="page-header">
        <h1>Recompensas</h1>
        <button className="btn-primary">
          <Plus size={20} /> Nova Recompensa
        </button>
      </header>

      <div className="rewards-grid">
        {rewards.map(reward => (
          <div key={reward.id} className={`reward-card card ${reward.isFinal ? 'final-reward' : ''}`}>
            {reward.isFinal && <div className="final-badge">Prêmio Final</div>}
            <div className="reward-icon-container">
              <Gift size={48} className={reward.isFinal ? 'gold-icon' : 'primary-icon'} />
            </div>
            <div className="reward-info">
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
              <div className="reward-cost">
                <span className="badge-gold">{reward.coupons} Cupons</span>
              </div>
              <div className="reward-actions mt-4">
                <button className="btn-secondary">Editar</button>
                <button className="btn-secondary">Desativar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
