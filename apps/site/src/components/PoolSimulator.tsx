import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, Check } from 'lucide-react';
import { formatPrice } from '../data/products';

export function PoolSimulator() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<string>('');
  const [usage, setUsage] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const sizes = [
    { id: 'compacto', label: 'Compacto', desc: 'Até 20m² (quintais menores)', reco: 'Piscina Oásis 3.500L' },
    { id: 'medio', label: 'Médio', desc: '20m² a 50m² (residencial padrão)', reco: 'Piscina Tropical 6.000L' },
    { id: 'grande', label: 'Grande', desc: 'Acima de 50m² (espaço amplo)', reco: 'Piscina Marajó 12.000L' }
  ];

  const usages = [
    { id: 'familia', label: 'Lazer em Família', desc: 'Diversão para crianças e adultos' },
    { id: 'natacao', label: 'Exercício & Natação', desc: 'Foco em raia e atividade física' },
    { id: 'relax', label: 'Relaxamento & SPA', desc: 'Hidromassagem e água aquecida' }
  ];

  const budgets = [
    { id: 'low', label: 'Até R$ 15.000', desc: 'Modelos compactos e essenciais' },
    { id: 'mid', label: 'R$ 15.000 a R$ 35.000', desc: 'Piscinas médias completas com filtro' },
    { id: 'high', label: 'Acima de R$ 35.000', desc: 'Projetos premium com aquecimento e cascata' }
  ];

  const getRecommendation = () => {
    if (size === 'grande' || budget === 'high') {
      return {
        title: 'Piscina Marajó 12.000L + Aquecedor 25k BTU',
        desc: 'Ideal para o seu espaço amplo com conforto térmico para o ano todo.',
        price: 32500,
        discount: 28900
      };
    }
    if (size === 'compacto' || budget === 'low') {
      return {
        title: 'Piscina Oásis Compacta 3.500L',
        desc: 'Perfeita para espaços compactos com rápida instalação e baixo custo de manutenção.',
        price: 12500,
        discount: null
      };
    }
    return {
      title: 'Piscina Tropical 6.000L + Filtro & Bomba',
      desc: 'Nossa campeã de vendas! Perfeita para lazer em família com excelente custo-benefício.',
      price: 18900,
      discount: 16990
    };
  };

  const reco = getRecommendation();

  return (
    <div className="simulator-card">
      <div className="sim-steps-indicator">
        <div className={`sim-step-dot ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>1</div>
        <div style={{ width: '32px', height: '2px', background: step > 1 ? 'var(--sky-blue)' : 'var(--cream-dark)' }} />
        <div className={`sim-step-dot ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>2</div>
        <div style={{ width: '32px', height: '2px', background: step > 2 ? 'var(--sky-blue)' : 'var(--cream-dark)' }} />
        <div className={`sim-step-dot ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>3</div>
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '8px' }}>
            Qual o tamanho do seu espaço disponível?
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Selecione a metragem aproximada do seu quintal ou área de lazer.
          </p>
          <div className="sim-options-grid">
            {sizes.map((s) => (
              <div 
                key={s.id} 
                className={`sim-option-btn ${size === s.id ? 'selected' : ''}`}
                onClick={() => setSize(s.id)}
              >
                <div className="sim-option-title">{s.label}</div>
                <div className="sim-option-desc">{s.desc}</div>
                {size === s.id && <Check size={20} color="var(--chocolate)" style={{ marginTop: '6px' }} />}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button 
              className="btn btn-primary"
              disabled={!size}
              onClick={() => setStep(2)}
              style={{ opacity: size ? 1 : 0.5 }}
            >
              <span>Próximo Passo</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '8px' }}>
            Qual o objetivo principal de uso?
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Isso nos ajuda a sugerir os acessórios e bombas corretos.
          </p>
          <div className="sim-options-grid">
            {usages.map((u) => (
              <div 
                key={u.id} 
                className={`sim-option-btn ${usage === u.id ? 'selected' : ''}`}
                onClick={() => setUsage(u.id)}
              >
                <div className="sim-option-title">{u.label}</div>
                <div className="sim-option-desc">{u.desc}</div>
                {usage === u.id && <Check size={20} color="var(--chocolate)" style={{ marginTop: '6px' }} />}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              <ChevronLeft size={18} />
              <span>Voltar</span>
            </button>
            <button 
              className="btn btn-primary"
              disabled={!usage}
              onClick={() => setStep(3)}
              style={{ opacity: usage ? 1 : 0.5 }}
            >
              <span>Próximo Passo</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '8px' }}>
            Qual a sua faixa de investimento planejada?
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Temos opções com parcelamento facilitado em até 12x.
          </p>
          <div className="sim-options-grid">
            {budgets.map((b) => (
              <div 
                key={b.id} 
                className={`sim-option-btn ${budget === b.id ? 'selected' : ''}`}
                onClick={() => setBudget(b.id)}
              >
                <div className="sim-option-title">{b.label}</div>
                <div className="sim-option-desc">{b.desc}</div>
                {budget === b.id && <Check size={20} color="var(--chocolate)" style={{ marginTop: '6px' }} />}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button className="btn btn-secondary" onClick={() => setStep(2)}>
              <ChevronLeft size={18} />
              <span>Voltar</span>
            </button>
            <button 
              className="btn btn-primary"
              disabled={!budget}
              onClick={() => setStep(4)}
              style={{ opacity: budget ? 1 : 0.5 }}
            >
              <span>Ver Resultado</span>
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="sim-result-box">
          <span className="section-tag" style={{ background: 'var(--white)' }}>
            ✦ Sugestão Personalizada Piscinão
          </span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--chocolate)', margin: '12px 0 8px' }}>
            {reco.title}
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 20px' }}>
            {reco.desc}
          </p>

          <div style={{ marginBottom: '24px' }}>
            {reco.discount && (
              <div style={{ textDecoration: 'line-through', color: 'var(--text-light)', fontSize: '1rem' }}>
                {formatPrice(reco.price)}
              </div>
            )}
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--chocolate)' }}>
              {formatPrice(reco.discount || reco.price)}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ou em até 12x sem juros no cartão
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href={`https://wa.me/5518991024742?text=${encodeURIComponent(`Olá Piscinão! Fiz a simulação no site para ${reco.title} e gostaria de mais informações e visita técnica.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={22} />
              <span>Solicitar Orçamento no WhatsApp</span>
            </a>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              Refazer Simulação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
