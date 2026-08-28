import { useState, useEffect, useMemo } from 'react';
import { 
  Plus, MessageSquare, Pencil, ToggleLeft, ToggleRight, Clock, 
  Trash2, Users, Search, ArrowUpDown, Filter, Settings2, Send, Bot, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockClients, mockProducts } from '../services/api';
import { SkeletonCard } from '../components/ui/Skeleton';
import './Recommendations.css';

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

export interface ClientProductConfig {
  clientId: string;
  productId: string;
  productName: string;
  category: string;
  lastPurchaseDaysAgo: number;
  defaultIntervalDays: number;
  customIntervalDays: number | null;
  autoSend: boolean;
  customMessage: string;
  notes: string;
}

const defaultCategoryTimers: Record<string, number> = {
  'Químicos': 30,
  'Acessórios': 90,
  'Equipamentos': 180,
};

const defaultRules: RecommendationRule[] = [
  {
    id: 'r1',
    trigger: 'Compra de Cloro Granulado 10kg',
    triggerType: 'purchase',
    recommendedProduct: 'Algicida de Choque 1L',
    category: 'Químicos',
    intervalDays: 0,
    messageTemplate: 'Olá {nome}! Você comprou Cloro Granulado 10kg recentemente. Que tal complementar com Algicida de Choque 1L para manter sua água limpa?',
    status: 'active',
  },
  {
    id: 'r2',
    trigger: '30 dias sem comprar Cloro Granulado 10kg',
    triggerType: 'inactivity',
    recommendedProduct: 'Cloro Granulado 10kg',
    category: 'Químicos',
    intervalDays: 30,
    messageTemplate: 'Olá {nome}! Faz 30 dias que você comprou Cloro Granulado 10kg. Seu balde deve estar no fim, quer encomendar outro?',
    status: 'active',
  },
  {
    id: 'r3',
    trigger: '90 dias sem comprar Kit Limpeza Completo',
    triggerType: 'inactivity',
    recommendedProduct: 'Kit Limpeza Completo',
    category: 'Acessórios',
    intervalDays: 90,
    messageTemplate: 'Olá {nome}! Seus acessórios de limpeza (peneira/escova) podem estar desgastados. Confira nosso Kit Limpeza Completo!',
    status: 'active',
  },
];

const defaultConfigsSeed: ClientProductConfig[] = [
  {
    clientId: 'c1',
    productId: 'p1',
    productName: 'Cloro Granulado 10kg',
    category: 'Químicos',
    lastPurchaseDaysAgo: 28,
    defaultIntervalDays: 30,
    customIntervalDays: 30,
    autoSend: true,
    customMessage: 'Olá {nome}! Faz quase 1 mês da sua compra de Cloro 10kg. Precisa de reposição?',
    notes: 'Possui 2 piscinas grandes',
  },
  {
    clientId: 'c1',
    productId: 'p2',
    productName: 'Algicida de Choque 1L',
    category: 'Químicos',
    lastPurchaseDaysAgo: 15,
    defaultIntervalDays: 30,
    customIntervalDays: 20,
    autoSend: false,
    customMessage: '',
    notes: 'Usa em alta frequência',
  },
  {
    clientId: 'c1',
    productId: 'p5',
    productName: 'Kit Limpeza Completo',
    category: 'Acessórios',
    lastPurchaseDaysAgo: 95,
    defaultIntervalDays: 90,
    customIntervalDays: 90,
    autoSend: true,
    customMessage: '',
    notes: '',
  },
  {
    clientId: 'c2',
    productId: 'p4',
    productName: 'Motobomba 1/2 CV',
    category: 'Equipamentos',
    lastPurchaseDaysAgo: 195,
    defaultIntervalDays: 180,
    customIntervalDays: 180,
    autoSend: false,
    customMessage: '',
    notes: 'Piscina residencial',
  },
  {
    clientId: 'c2',
    productId: 'p2',
    productName: 'Algicida de Choque 1L',
    category: 'Químicos',
    lastPurchaseDaysAgo: 8,
    defaultIntervalDays: 30,
    customIntervalDays: null,
    autoSend: true,
    customMessage: '',
    notes: '',
  },
  {
    clientId: 'c3',
    productId: 'p4',
    productName: 'Motobomba 1/2 CV',
    category: 'Equipamentos',
    lastPurchaseDaysAgo: 200,
    defaultIntervalDays: 180,
    customIntervalDays: 180,
    autoSend: false,
    customMessage: 'Olá {nome}! Lembramos de fazer a verificação periódica da sua Motobomba 1/2 CV.',
    notes: 'Prefere receber aviso manual',
  },
  {
    clientId: 'c3',
    productId: 'p1',
    productName: 'Cloro Granulado 10kg',
    category: 'Químicos',
    lastPurchaseDaysAgo: 32,
    defaultIntervalDays: 30,
    customIntervalDays: 30,
    autoSend: true,
    customMessage: '',
    notes: '',
  },
];

export default function Recommendations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'rules' | 'clients'>('clients');

  const [rules, setRules] = useState<RecommendationRule[]>(() => {
    const saved = localStorage.getItem('piscinao_recommendation_rules');
    return saved ? JSON.parse(saved) : defaultRules;
  });

  const [categoryDefaults, setCategoryDefaults] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('piscinao_category_timers');
    return saved ? JSON.parse(saved) : defaultCategoryTimers;
  });

  const [productConfigs, setProductConfigs] = useState<ClientProductConfig[]>(() => {
    const saved = localStorage.getItem('piscinao_client_product_configs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : defaultConfigsSeed;
      } catch (e) {}
    }
    return defaultConfigsSeed;
  });

  // Client tab filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [filterAutoSend, setFilterAutoSend] = useState<'all' | 'enabled' | 'disabled'>('all');
  const [sortOrder, setSortOrder] = useState<'progress-desc' | 'progress-asc' | 'name-asc'>('progress-desc');

  const persistRules = (updated: RecommendationRule[]) => {
    setRules(updated);
    localStorage.setItem('piscinao_recommendation_rules', JSON.stringify(updated));
  };

  const persistDefaults = (updated: Record<string, number>) => {
    setCategoryDefaults(updated);
    localStorage.setItem('piscinao_category_timers', JSON.stringify(updated));
  };

  const persistProductConfigs = (updated: ClientProductConfig[]) => {
    setProductConfigs(updated);
    localStorage.setItem('piscinao_client_product_configs', JSON.stringify(updated));
  };

  const toggleStatus = (id: string) => {
    const updated = rules.map(r =>
      r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' as const : 'active' as const } : r
    );
    persistRules(updated);
  };

  const deleteRule = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta regra?')) {
      persistRules(rules.filter(r => r.id !== id));
    }
  };

  const toggleAutoSendFast = (clientId: string, productId: string) => {
    const updated = productConfigs.map(cfg => {
      if (cfg.clientId === clientId && cfg.productId === productId) {
        return { ...cfg, autoSend: !cfg.autoSend };
      }
      return cfg;
    });
    persistProductConfigs(updated);
  };

  const formatInterval = (days: number) => {
    if (days === 0) return 'Imediato';
    if (days === 1) return '1 dia';
    if (days < 30) return `${days} dias`;
    if (days === 30) return '1 mês';
    if (days < 365) return `${Math.round(days / 30)} meses`;
    return `${Math.round(days / 365)} ano(s)`;
  };

  const triggerTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'Após Compra';
      case 'inactivity': return 'Inatividade';
      case 'seasonal': return 'Sazonal';
      default: return type;
    }
  };

  // Process list of recommendations with exact product names
  const clientRecommendationItems = useMemo(() => {
    return productConfigs.map(cfg => {
      const client = mockClients.find(c => c.id === cfg.clientId) || { name: 'Cliente', phone: '(18) 99123-4567' };
      const effectiveDays = cfg.customIntervalDays !== null ? cfg.customIntervalDays : cfg.defaultIntervalDays;
      const progress = effectiveDays > 0 ? Math.min(100, Math.round((cfg.lastPurchaseDaysAgo / effectiveDays) * 100)) : 100;
      const isOverdue = cfg.lastPurchaseDaysAgo >= effectiveDays;

      return {
        ...cfg,
        clientName: client.name,
        phone: client.phone || '(18) 99123-4567',
        effectiveDays,
        progress,
        isOverdue,
      };
    });
  }, [productConfigs]);

  // Filter & sort
  const filteredItems = useMemo(() => {
    let list = clientRecommendationItems;

    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(c => c.clientName.toLowerCase().includes(s) || c.productName.toLowerCase().includes(s));
    }

    if (filterCategory !== 'Todos') {
      list = list.filter(c => c.category === filterCategory);
    }

    if (filterAutoSend === 'enabled') {
      list = list.filter(c => c.autoSend);
    } else if (filterAutoSend === 'disabled') {
      list = list.filter(c => !c.autoSend);
    }

    switch (sortOrder) {
      case 'progress-desc':
        list = [...list].sort((a, b) => b.progress - a.progress);
        break;
      case 'progress-asc':
        list = [...list].sort((a, b) => a.progress - b.progress);
        break;
      case 'name-asc':
        list = [...list].sort((a, b) => a.clientName.localeCompare(b.clientName));
        break;
    }

    return list;
  }, [clientRecommendationItems, searchTerm, filterCategory, filterAutoSend, sortOrder]);

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#E53935';
    if (progress >= 75) return '#FF9800';
    if (progress >= 50) return '#FFC107';
    return '#4CAF50';
  };

  const overdueCount = clientRecommendationItems.filter(c => c.isOverdue).length;
  const autoSendCount = clientRecommendationItems.filter(c => c.autoSend).length;

  return (
    <div className="recommendations-page">
      <header className="page-header">
        <div>
          <h1>Recomendações (WhatsApp)</h1>
          <p className="page-subtitle">Monitore produtos por cliente, customize no perfil e controle o envio automático</p>
        </div>
        {activeTab === 'rules' && (
          <button className="btn-primary" onClick={() => navigate('/recommendations/new')}>
            <Plus size={20} /> Nova Regra Geral
          </button>
        )}
      </header>

      {/* Tabs */}
      <div className="rec-tabs">
        <button
          className={`rec-tab ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <Users size={18} />
          Clientes & Produtos Individualizados
          {overdueCount > 0 && <span className="tab-count alert">{overdueCount} Prontos</span>}
        </button>
        <button
          className={`rec-tab ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <MessageSquare size={18} />
          Regras Gerais
          <span className="tab-count">{rules.length}</span>
        </button>
      </div>

      {/* ==================== CLIENTS TAB ==================== */}
      {activeTab === 'clients' && (
        <>
          {/* Filters Bar */}
          <div className="clients-filters-bar">
            <div className="search-box-rec">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar por cliente ou produto (ex: Cloro 10kg)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <Filter size={16} />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="Todos">Todas Categorias</option>
                {Object.keys(categoryDefaults).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* NEW FILTER: Auto-Send Status */}
            <div className="filter-group highlight-filter">
              <Bot size={16} />
              <select value={filterAutoSend} onChange={(e) => setFilterAutoSend(e.target.value as any)}>
                <option value="all">Todas Automações</option>
                <option value="enabled">⚡ Envio Automático Ativado</option>
                <option value="disabled">✋ Envio Automático Desativado</option>
              </select>
            </div>

            <div className="filter-group">
              <ArrowUpDown size={16} />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
                <option value="progress-desc">Mais próximos primeiro</option>
                <option value="progress-asc">Mais distantes primeiro</option>
                <option value="name-asc">Nome A-Z</option>
              </select>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="clients-stats-bar">
            <div className="stat-chip overdue">
              <span className="stat-number">{overdueCount}</span>
              <span className="stat-label">Prontos para envio</span>
            </div>
            <div className="stat-chip bot-stat">
              <span className="stat-number">{autoSendCount}</span>
              <span className="stat-label">Com Envio Auto Ativo</span>
            </div>
            <div className="stat-chip custom">
              <span className="stat-number">{clientRecommendationItems.filter(c => c.customIntervalDays !== null).length}</span>
              <span className="stat-label">Recorrências Personalizadas</span>
            </div>
            <div className="stat-chip total">
              <span className="stat-number">{filteredItems.length}</span>
              <span className="stat-label">Exibidos</span>
            </div>
          </div>

          {/* Client Product Recommendation Cards */}
          <div className="client-rec-list">
            {filteredItems.length === 0 ? (
              <div className="empty-state card">
                <Search size={44} />
                <p>Nenhum produto ou cliente encontrado com os filtros selecionados.</p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const key = `${item.clientId}-${item.productId}`;

                return (
                  <div key={key} className={`client-rec-card card-hover-motion animate-fade-up ${item.isOverdue ? 'overdue' : ''} ${item.customIntervalDays !== null ? 'custom' : ''}`}>
                    {/* Top Identity & Badges */}
                    <div className="client-rec-top">
                      <div className="client-rec-identity">
                        <div className="client-avatar-sm">{item.clientName.charAt(0).toUpperCase()}</div>
                        <div className="client-info-wrap">
                          <h3 
                            className="client-rec-name clickable"
                            onClick={() => navigate(`/clients/${item.clientId}`)}
                            title="Ver Perfil Completo do Cliente"
                          >
                            {item.clientName} <ChevronRight size={14} className="inline-arrow" />
                          </h3>
                          <span className="client-rec-phone">{item.phone}</span>
                        </div>
                      </div>

                      <div className="client-rec-badges">
                        <button
                          className={`badge-auto-send ${item.autoSend ? 'enabled' : 'disabled'}`}
                          onClick={() => toggleAutoSendFast(item.clientId, item.productId)}
                          title="Clique para alternar envio automático"
                        >
                          <Bot size={13} />
                          {item.autoSend ? 'AUTO' : 'MANUAL'}
                        </button>
                        <span className="badge-category">{item.category}</span>
                      </div>
                    </div>

                    {/* Product Name Highlight */}
                    <div className="product-square-header">
                      <strong className="exact-product-highlight">{item.productName}</strong>
                      <span className="product-timer-badge">
                        <Clock size={12} /> {formatInterval(item.effectiveDays)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="client-rec-progress-section">
                      <div className="progress-labels">
                        <span className="progress-label-left">
                          Há <strong>{item.lastPurchaseDaysAgo}d</strong>
                        </span>
                        <span className="progress-label-right" style={{ color: getProgressColor(item.progress) }}>
                          <strong>{item.progress}%</strong>
                        </span>
                      </div>
                      <div className="progress-bar-rec">
                        <div
                          className="progress-bar-fill-rec"
                          style={{
                            width: `${Math.min(100, item.progress)}%`,
                            background: getProgressColor(item.progress),
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="client-rec-actions">
                      <button 
                        className="btn-customize"
                        onClick={() => navigate(`/clients/${item.clientId}`)}
                        title="Editar no Perfil do Cliente"
                      >
                        <Pencil size={14} /> Editar
                      </button>

                      <button
                        className="btn-send-whatsapp"
                        onClick={() => {
                          const msg = (item.customMessage || `Olá {nome}! Notamos que faz quase ${formatInterval(item.effectiveDays)} da sua compra de ${item.productName}. Precisando repor seu estoque?`)
                            .replace('{nome}', item.clientName.split(' ')[0]);
                          window.open(`https://wa.me/55${item.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                      >
                        <Send size={14} /> Enviar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* ==================== RULES TAB ==================== */}
      {activeTab === 'rules' && (
        <>
          <div className="card category-defaults-card">
            <h2 className="card-section-title">
              <Clock size={20} /> Tempo Padrão de Acionamento por Categoria
            </h2>
            <p className="card-section-desc">
              Defina o intervalo padrão (em dias) para cada tipo de produto. Novas regras usarão esses valores como base.
            </p>
            <div className="category-timers-grid">
              {Object.entries(categoryDefaults).map(([cat, days]) => (
                <div key={cat} className="category-timer-item">
                  <label className="timer-label">{cat}</label>
                  <div className="timer-input-group">
                    <input
                      type="number"
                      min={0}
                      value={days}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        persistDefaults({ ...categoryDefaults, [cat]: val });
                      }}
                      className="timer-input"
                    />
                    <span className="timer-suffix">dias</span>
                  </div>
                  <span className="timer-preview">{formatInterval(days)}</span>
                </div>
              ))}
              <button
                className="add-category-btn"
                onClick={() => {
                  const name = prompt('Nome da nova categoria:');
                  if (name && name.trim() && !categoryDefaults[name.trim()]) {
                    persistDefaults({ ...categoryDefaults, [name.trim()]: 30 });
                  }
                }}
              >
                <Plus size={16} /> Adicionar Categoria
              </button>
            </div>
          </div>

          <div className="card rules-table-card">
            <h2 className="card-section-title">
              <MessageSquare size={20} /> Regras Gerais Ativas ({rules.filter(r => r.status === 'active').length} de {rules.length})
            </h2>
            <div className="rules-list">
              {rules.map(rule => (
                <div key={rule.id} className={`rule-card ${rule.status}`}>
                  <div className="rule-card-header">
                    <div className="rule-card-info">
                      <span className={`rule-type-badge ${rule.triggerType}`}>{triggerTypeLabel(rule.triggerType)}</span>
                      <h3 className="rule-trigger">{rule.trigger}</h3>
                    </div>
                    <button
                      className={`toggle-btn ${rule.status}`}
                      onClick={() => toggleStatus(rule.id)}
                      title={rule.status === 'active' ? 'Desativar' : 'Ativar'}
                    >
                      {rule.status === 'active' ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                    </button>
                  </div>
                  <div className="rule-card-body">
                    <div className="rule-detail">
                      <span className="rule-detail-label">Produto Recomendado</span>
                      <span className="badge-gold">{rule.recommendedProduct}</span>
                    </div>
                    <div className="rule-detail">
                      <span className="rule-detail-label">Categoria</span>
                      <span className="badge-category">{rule.category}</span>
                    </div>
                    <div className="rule-detail">
                      <span className="rule-detail-label">Intervalo</span>
                      <span className="badge-interval">
                        <Clock size={14} /> {formatInterval(rule.intervalDays)}
                      </span>
                    </div>
                  </div>
                  <div className="rule-card-message">
                    <span className="rule-detail-label">Mensagem</span>
                    <p className="message-preview">{rule.messageTemplate}</p>
                  </div>
                  <div className="rule-card-actions">
                    <button className="btn-edit" onClick={() => navigate(`/recommendations/edit/${rule.id}`)}>
                      <Pencil size={16} /> Editar
                    </button>
                    <button className="btn-delete" onClick={() => deleteRule(rule.id)}>
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
