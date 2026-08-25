import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import './RecommendationEdit.css';

interface RecommendationRule {
  id: string;
  trigger: string;
  triggerType: 'purchase' | 'inactivity' | 'seasonal';
  recommendedProduct: string;
  category: string;
  intervalDays: number;
  messageTemplate: string;
  status: 'active' | 'inactive';
}

export default function RecommendationEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [rules, setRules] = useState<RecommendationRule[]>(() => {
    const saved = localStorage.getItem('piscinao_recommendation_rules');
    return saved ? JSON.parse(saved) : [];
  });

  const categoryDefaults: Record<string, number> = (() => {
    const saved = localStorage.getItem('piscinao_category_timers');
    return saved ? JSON.parse(saved) : { 'Químicos': 30, 'Acessórios': 90, 'Equipamentos': 180 };
  })();

  const existingRule = isNew ? null : rules.find(r => r.id === id);

  // Form states
  const [triggerType, setTriggerType] = useState<'purchase' | 'inactivity' | 'seasonal'>('inactivity');
  const [trigger, setTrigger] = useState('');
  const [recommendedProduct, setRecommendedProduct] = useState('');
  const [category, setCategory] = useState('Químicos');
  const [intervalDays, setIntervalDays] = useState(30);
  const [intervalUnit, setIntervalUnit] = useState<'days' | 'hours' | 'minutes'>('days');
  const [intervalValue, setIntervalValue] = useState(30);
  const [messageTemplate, setMessageTemplate] = useState('Olá {nome}! ');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load existing rule
  useEffect(() => {
    if (existingRule) {
      setTriggerType(existingRule.triggerType);
      setTrigger(existingRule.trigger);
      setRecommendedProduct(existingRule.recommendedProduct);
      setCategory(existingRule.category);
      setIntervalDays(existingRule.intervalDays);
      setMessageTemplate(existingRule.messageTemplate);
      setStatus(existingRule.status);

      // Determine best unit for display
      if (existingRule.intervalDays === 0) {
        setIntervalUnit('minutes');
        setIntervalValue(0);
      } else if (existingRule.intervalDays < 1) {
        setIntervalUnit('hours');
        setIntervalValue(Math.round(existingRule.intervalDays * 24));
      } else {
        setIntervalUnit('days');
        setIntervalValue(existingRule.intervalDays);
      }
    }
  }, [existingRule]);

  // When category changes on a new rule, apply default timer
  useEffect(() => {
    if (isNew && categoryDefaults[category] !== undefined) {
      setIntervalDays(categoryDefaults[category]);
      setIntervalValue(categoryDefaults[category]);
      setIntervalUnit('days');
    }
  }, [category, isNew]);

  // Convert interval value + unit to days for storage
  const computeIntervalDays = (): number => {
    switch (intervalUnit) {
      case 'minutes': return intervalValue / 1440;
      case 'hours': return intervalValue / 24;
      case 'days': return intervalValue;
      default: return intervalValue;
    }
  };

  // Auto-generate trigger text
  useEffect(() => {
    if (triggerType === 'purchase') {
      setTrigger(`Compra de ${recommendedProduct || 'produto'}`);
    } else if (triggerType === 'inactivity') {
      const label = intervalValue === 0 ? 'Imediato' : `${intervalValue} ${intervalUnit === 'days' ? 'dias' : intervalUnit === 'hours' ? 'horas' : 'minutos'}`;
      setTrigger(`${label} sem comprar ${category}`);
    } else if (triggerType === 'seasonal') {
      setTrigger(`Campanha sazonal - ${category}`);
    }
  }, [triggerType, recommendedProduct, category, intervalValue, intervalUnit]);

  const handleSave = () => {
    const finalDays = computeIntervalDays();

    const ruleData: RecommendationRule = {
      id: isNew ? `r${Date.now()}` : id!,
      trigger,
      triggerType,
      recommendedProduct,
      category,
      intervalDays: finalDays,
      messageTemplate,
      status,
    };

    let updated: RecommendationRule[];
    if (isNew) {
      updated = [...rules, ruleData];
    } else {
      updated = rules.map(r => r.id === id ? ruleData : r);
    }

    localStorage.setItem('piscinao_recommendation_rules', JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/recommendations');
    }, 800);
  };

  const formatPreview = () => {
    return messageTemplate
      .replace('{nome}', 'João')
      .replace('{produto}', recommendedProduct || 'Produto')
      .replace('{categoria}', category);
  };

  return (
    <div className="recommendation-edit-page">
      {/* Header */}
      <header className="edit-header">
        <button className="back-btn" onClick={() => navigate('/recommendations')}>
          <ArrowLeft size={20} /> Voltar
        </button>
        <h1>{isNew ? 'Nova Regra de Recomendação' : 'Editar Regra de Recomendação'}</h1>
      </header>

      <div className="edit-form-grid">
        {/* Left: Form */}
        <div className="edit-form-main">
          {/* Trigger Type */}
          <div className="form-section">
            <h2 className="form-section-title">Tipo de Gatilho</h2>
            <div className="trigger-type-grid">
              <button
                className={`trigger-type-btn ${triggerType === 'purchase' ? 'selected' : ''}`}
                onClick={() => setTriggerType('purchase')}
              >
                <span className="trigger-type-icon">🛒</span>
                <span className="trigger-type-label">Após Compra</span>
                <span className="trigger-type-desc">Envia quando o cliente compra um produto</span>
              </button>
              <button
                className={`trigger-type-btn ${triggerType === 'inactivity' ? 'selected' : ''}`}
                onClick={() => setTriggerType('inactivity')}
              >
                <span className="trigger-type-icon">⏰</span>
                <span className="trigger-type-label">Inatividade</span>
                <span className="trigger-type-desc">Envia quando o cliente fica sem comprar</span>
              </button>
              <button
                className={`trigger-type-btn ${triggerType === 'seasonal' ? 'selected' : ''}`}
                onClick={() => setTriggerType('seasonal')}
              >
                <span className="trigger-type-icon">🌞</span>
                <span className="trigger-type-label">Sazonal</span>
                <span className="trigger-type-desc">Campanha por época do ano</span>
              </button>
            </div>
          </div>

          {/* Category & Product */}
          <div className="form-section">
            <h2 className="form-section-title">Produto & Categoria</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Categoria do Produto</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {Object.keys(categoryDefaults).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <span className="form-hint">
                  Tempo padrão desta categoria: <strong>{categoryDefaults[category] ?? 30} dias</strong>
                </span>
              </div>
              <div className="form-group">
                <label>Produto Recomendado</label>
                <input
                  type="text"
                  value={recommendedProduct}
                  onChange={(e) => setRecommendedProduct(e.target.value)}
                  placeholder="Ex: Cloro 10kg, Algicida..."
                />
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="form-section">
            <h2 className="form-section-title">
              <Clock size={18} /> Tempo de Acionamento
            </h2>
            <p className="form-section-desc">
              Defina exatamente quando a mensagem será enviada ao cliente.
            </p>
            <div className="timing-controls">
              <div className="timing-main">
                <div className="form-group">
                  <label>Valor</label>
                  <input
                    type="number"
                    min={0}
                    max={999}
                    value={intervalValue}
                    onChange={(e) => setIntervalValue(parseInt(e.target.value, 10) || 0)}
                    className="timing-value-input"
                  />
                </div>
                <div className="form-group">
                  <label>Unidade</label>
                  <select value={intervalUnit} onChange={(e) => setIntervalUnit(e.target.value as any)}>
                    <option value="minutes">Minutos</option>
                    <option value="hours">Horas</option>
                    <option value="days">Dias</option>
                  </select>
                </div>
              </div>
              <div className="timing-preview">
                {intervalValue === 0 ? (
                  <span className="timing-badge immediate">⚡ Imediato — Mensagem enviada logo após o evento</span>
                ) : (
                  <span className="timing-badge scheduled">
                    ⏱️ A mensagem será enviada <strong>{intervalValue} {intervalUnit === 'days' ? 'dias' : intervalUnit === 'hours' ? 'horas' : 'minutos'}</strong> após o gatilho
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Message Template */}
          <div className="form-section">
            <h2 className="form-section-title">
              <MessageSquare size={18} /> Mensagem WhatsApp
            </h2>
            <p className="form-section-desc">
              Use <code>{'{nome}'}</code> para o nome do cliente, <code>{'{produto}'}</code> para o produto e <code>{'{categoria}'}</code> para a categoria.
            </p>
            <div className="form-group">
              <label>Template da Mensagem</label>
              <textarea
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                rows={4}
                placeholder="Olá {nome}! Sua piscina precisa de manutenção..."
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-section">
            <div className="status-toggle-row">
              <div>
                <h2 className="form-section-title" style={{ marginBottom: 2 }}>Status da Regra</h2>
                <p className="form-section-desc">Ative ou desative esta regra de recomendação</p>
              </div>
              <button
                className={`status-toggle-btn ${status}`}
                onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}
              >
                {status === 'active' ? 'Ativa' : 'Inativa'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="edit-form-sidebar">
          <div className="preview-card">
            <h3 className="preview-title">📱 Prévia da Mensagem</h3>
            <div className="whatsapp-preview">
              <div className="whatsapp-bubble">
                {formatPreview()}
              </div>
            </div>
          </div>

          <div className="preview-card summary-card">
            <h3 className="preview-title">📋 Resumo</h3>
            <div className="summary-list">
              <div className="summary-item">
                <span>Tipo:</span>
                <strong>{triggerType === 'purchase' ? 'Após Compra' : triggerType === 'inactivity' ? 'Inatividade' : 'Sazonal'}</strong>
              </div>
              <div className="summary-item">
                <span>Categoria:</span>
                <strong>{category}</strong>
              </div>
              <div className="summary-item">
                <span>Produto:</span>
                <strong>{recommendedProduct || '—'}</strong>
              </div>
              <div className="summary-item">
                <span>Acionamento:</span>
                <strong>{intervalValue === 0 ? 'Imediato' : `${intervalValue} ${intervalUnit === 'days' ? 'dias' : intervalUnit === 'hours' ? 'horas' : 'min'}`}</strong>
              </div>
              <div className="summary-item">
                <span>Status:</span>
                <strong className={status === 'active' ? 'text-success' : 'text-muted'}>{status === 'active' ? 'Ativa' : 'Inativa'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="save-bar">
        <button className="btn-cancel" onClick={() => navigate('/recommendations')}>
          Cancelar
        </button>
        <button className={`btn-save ${savedSuccess ? 'saved' : ''}`} onClick={handleSave}>
          {savedSuccess ? (
            <><CheckCircle2 size={18} /> Salvo!</>
          ) : (
            <><Save size={18} /> {isNew ? 'Criar Regra' : 'Salvar Alterações'}</>
          )}
        </button>
      </div>
    </div>
  );
}
