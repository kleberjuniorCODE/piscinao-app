import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { formatPrice } from '../data/products';

export function PoolSimulator() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<string>('');
  const [usage, setUsage] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const getRecommendation = () => {
    // Simple logic mock
    if (size === 'Compacto' && budget === 'Até R$15.000') {
      return { name: 'Piscina de Fibra Master 4m', price: 12000, slug: 'piscina-master-4m' };
    }
    return { name: 'Piscina de Vinil Personalizada', price: 25000, slug: 'piscina-vinil' };
  };

  return (
    <div className="pool-simulator">
      <h2>Simulador de Projetos</h2>
      <div className="progress-dots">
        {[1, 2, 3, 4].map(s => (
          <span key={s} className={`dot ${step >= s ? 'active' : ''}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="simulator-step">
          <h3>Qual o tamanho do seu espaço?</h3>
          <div className="options-grid">
            {['Compacto (até 20m²)', 'Médio (20-50m²)', 'Grande (acima de 50m²)'].map(opt => (
              <button 
                key={opt} 
                className={`option-btn ${size === opt ? 'selected' : ''}`}
                onClick={() => { setSize(opt); handleNext(); }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="simulator-step">
          <h3>Qual o principal uso?</h3>
          <div className="options-grid">
            {['Lazer em Família', 'Exercícios/Natação', 'Relaxamento/SPA'].map(opt => (
              <button 
                key={opt} 
                className={`option-btn ${usage === opt ? 'selected' : ''}`}
                onClick={() => { setUsage(opt); handleNext(); }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={handlePrev} className="btn-secondary mt-4"><ChevronLeft /> Voltar</button>
        </div>
      )}

      {step === 3 && (
        <div className="simulator-step">
          <h3>Qual sua faixa de orçamento?</h3>
          <div className="options-grid">
            {['Até R$15.000', 'R$15.000-R$35.000', 'Acima de R$35.000'].map(opt => (
              <button 
                key={opt} 
                className={`option-btn ${budget === opt ? 'selected' : ''}`}
                onClick={() => { setBudget(opt); handleNext(); }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={handlePrev} className="btn-secondary mt-4"><ChevronLeft /> Voltar</button>
        </div>
      )}

      {step === 4 && (
        <div className="simulator-step result-step">
          <h3>Recomendação Ideal</h3>
          <div className="recommendation-card">
            <h4>{getRecommendation().name}</h4>
            <p>A partir de <strong>{formatPrice(getRecommendation().price)}</strong></p>
            <a 
              href={`https://wa.me/5518991024742?text=Olá, fiz o simulador e me interessei pela ${getRecommendation().name}`} 
              target="_blank" 
              rel="noreferrer"
              className="btn-whatsapp"
            >
              Falar com Consultor
            </a>
          </div>
          <button onClick={() => setStep(1)} className="btn-secondary mt-4">Refazer</button>
        </div>
      )}
    </div>
  );
};
