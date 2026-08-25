import { MapPin, GripVertical, Edit2, Plus } from 'lucide-react';
import './Trail.css';

export default function Trail() {
  const steps = [
    { id: 1, name: 'Iniciante', coupons: 10, reward: 'Limpa Bordas' },
    { id: 2, name: 'Intermediário', coupons: 20, reward: 'Cloro 1kg' },
    { id: 3, name: 'Avançado', coupons: 30, reward: 'Escova Curva' },
    { id: 4, name: 'Especialista', coupons: 40, reward: 'Cabo Telescópico' },
    { id: 5, name: 'Mestre', coupons: 50, reward: 'Balde de Cloro 10kg (Prêmio Final)' },
  ];

  return (
    <div className="trail-page">
      <header className="page-header">
        <h1>Configuração da Trilha de Recompensas</h1>
        <button className="btn-primary">Salvar Alterações</button>
      </header>

      <div className="trail-grid">
        <div className="card trail-settings">
          <h2>Configurações Gerais</h2>
          <div className="form-group">
            <label>Nome da Trilha</label>
            <input type="text" defaultValue="Trilha do Cliente Fiel" />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea defaultValue="Complete a trilha para ganhar o grande prêmio de um balde de Cloro 10kg." rows={3} />
          </div>
        </div>

        <div className="card trail-steps">
          <div className="card-header d-flex justify-between">
            <h2>Casas da Trilha</h2>
            <button className="btn-secondary small"><Plus size={16} /> Adicionar Casa</button>
          </div>
          
          <div className="steps-list">
            {steps.map(step => (
              <div key={step.id} className="step-item">
                <div className="step-drag-handle">
                  <GripVertical size={20} />
                </div>
                <div className="step-icon">
                  <MapPin size={24} />
                  <span className="step-number">{step.id}</span>
                </div>
                <div className="step-content">
                  <h4>{step.name}</h4>
                  <div className="step-details">
                    <span className="badge-gold">{step.coupons} Cupons</span>
                    <span className="reward-text">Recompensa: {step.reward}</span>
                  </div>
                </div>
                <div className="step-actions">
                  <button className="btn-icon"><Edit2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
