import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User as UserIcon, Ticket, ShoppingBag, PlusCircle, 
  MinusCircle, Ban, MessageSquare, Clock, Send, CheckCircle2, 
  Sparkles, Bot, Calendar, Tag, Pencil, X, MapPin, Phone, Mail, Edit3
} from 'lucide-react';
import { mockClients, mockPurchases } from '../services/api';
import { formatCurrency, formatDate } from '../utils/format';
import { Purchase, User } from '../types';
import './ClientDetail.css';

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

export interface ExtendedClientProfile extends User {
  phone?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
  coupons: number;
  status: string;
}

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
    customMessage: 'Olá {nome}! Notamos que faz quase 1 mês da sua compra de Cloro Granulado 10kg. Precisa de reposição para as suas piscinas?',
    notes: 'Cliente possui 2 piscinas grandes',
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
    customMessage: 'Olá {nome}! Como está a manutenção da piscina com o Algicida de Choque 1L?',
    notes: 'Usa com alta frequência no verão',
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
    customMessage: 'Olá {nome}! Faz 90 dias que comprou seu Kit Limpeza Completo. Gostaria de verificar acessórios de reposição?',
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
    customMessage: 'Olá {nome}! Sua Motobomba 1/2 CV está completando 6 meses de uso. Recomendamos uma revisão preventiva!',
    notes: 'Piscina residencial simples',
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
    customMessage: 'Olá {nome}! Lembramos de fazer a verificação periódica do seu filtro e bomba.',
    notes: 'Prefere receber aviso via mensagem primeiro',
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
    customMessage: 'Olá {nome}! Seu estoque de Cloro 10kg deve estar acabando. Deseja pedir mais um balde com frete grátis?',
    notes: '',
  },
];

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const resolveClientData = (targetId: string | undefined): ExtendedClientProfile => {
    const cleanId = targetId || 'c1';

    // 1. Check in mockClients
    let matched = mockClients.find((c) => c.id === cleanId);

    // 2. Check in backend clients cache
    const savedBackendClients = localStorage.getItem('piscinao_all_backend_clients');
    if (savedBackendClients) {
      try {
        const parsed = JSON.parse(savedBackendClients);
        const backendMatch = parsed.find((c: any) => c.id === cleanId);
        if (backendMatch) matched = backendMatch;
      } catch (e) {}
    }

    // 3. Check in active user session
    const savedSession = localStorage.getItem('piscinao_user_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.id === cleanId) matched = parsed;
      } catch (e) {}
    }

    // 4. Check saved profile override
    const savedProfile = localStorage.getItem(`piscinao_client_profile_${cleanId}`);
    let profileOverride = {};
    if (savedProfile) {
      try {
        profileOverride = JSON.parse(savedProfile);
      } catch (e) {}
    }

    const savedCoupons = localStorage.getItem(`piscinao_client_coupons_${cleanId}`);
    const coupons = savedCoupons !== null ? parseInt(savedCoupons, 10) : ((matched as any)?.coupons || 0);

    const name = (matched as any)?.name || 'Cliente';
    const email = (matched as any)?.email || 'cliente@email.com';
    const phone = (matched as any)?.phone || '(18) 99123-4567';
    const address = (matched as any)?.address || 'Rua das Palmeiras, 450';
    const neighborhood = (matched as any)?.neighborhood || 'Jardim Primavera';
    const city = (matched as any)?.city || 'Araçatuba';
    const state = (matched as any)?.state || 'SP';
    const zipCode = (matched as any)?.zipCode || '16050-000';
    const isActive = (matched as any)?.isActive !== false;

    return {
      id: cleanId,
      name,
      email,
      phone,
      address,
      neighborhood,
      city,
      state,
      zipCode,
      notes: (matched as any)?.notes || 'Cliente cadastrado no aplicativo.',
      coupons,
      status: isActive ? 'active' : 'blocked',
      role: 'CLIENT',
      isActive,
      createdAt: (matched as any)?.createdAt || new Date().toISOString(),
      ...profileOverride
    };
  };

  const [client, setClient] = useState<ExtendedClientProfile>(() => resolveClientData(id));
  const clientId = client.id;

  // Sync client when route ID changes or backend updates
  useEffect(() => {
    setClient(resolveClientData(id));

    // Fetch live backend client detail
    if (id) {
      fetch('http://localhost:3002/sync/clients')
        .then(r => r.json())
        .then(data => {
          if (data.success && Array.isArray(data.data)) {
            const found = data.data.find((c: any) => c.id === id);
            if (found) {
              const savedCoupons = localStorage.getItem(`piscinao_client_coupons_${id}`);
              const coupons = savedCoupons !== null ? parseInt(savedCoupons, 10) : (found.coupons || 0);
              setClient(prev => ({
                ...prev,
                ...found,
                coupons,
                status: found.isActive !== false ? 'active' : 'blocked',
              }));
            }
          }
        })
        .catch(() => {});
    }
  }, [id]);

  // Draft coupons state for inline adjuster
  const [draftCoupons, setDraftCoupons] = useState<number>(client.coupons);

  useEffect(() => {
    setDraftCoupons(client.coupons);
  }, [client.coupons]);

  // Save inline adjusted coupons
  const saveInlineCoupons = async () => {
    const newCoupons = Math.max(0, draftCoupons);
    setClient(prev => ({ ...prev, coupons: newCoupons }));
    localStorage.setItem(`piscinao_client_coupons_${clientId}`, newCoupons.toString());

    try {
      const bc = new BroadcastChannel('piscinao_coupons_channel');
      bc.postMessage({ clientId, coupons: newCoupons });
      bc.close();
    } catch (e) {}

    try {
      await fetch('http://localhost:3002/sync/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, coupons: newCoupons }),
      });
    } catch (e) {}

    setSaveSuccessMsg('Saldo de cupons atualizado com sucesso!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Modals state
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustValue, setAdjustValue] = useState(0);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Edit Client Profile Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editNeighborhood, setEditNeighborhood] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editZipCode, setEditZipCode] = useState('');
  const [editClientNotes, setEditClientNotes] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'purchases' | 'coupons'>('recommendations');

  // Product Recommendation Customization state
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

  // Modal State for Product Recommendation Editing
  const [editingProductConfig, setEditingProductConfig] = useState<ClientProductConfig | null>(null);
  const [modalDays, setModalDays] = useState<number>(30);
  const [modalAutoSend, setModalAutoSend] = useState<boolean>(true);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalNotes, setModalNotes] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Fetch coupons sync
  useEffect(() => {
    fetch(`http://localhost:3002/sync/coupons/${clientId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && typeof data.coupons === 'number') {
          setClient(prev => ({ ...prev, coupons: data.coupons }));
          localStorage.setItem(`piscinao_client_coupons_${clientId}`, data.coupons.toString());
        }
      })
      .catch(() => {});
  }, [clientId]);

  // Persist Product Configs
  const saveAllConfigs = (updated: ClientProductConfig[]) => {
    setProductConfigs(updated);
    localStorage.setItem('piscinao_client_product_configs', JSON.stringify(updated));
  };

  const clientPurchases = mockPurchases.filter((p: Purchase) => p.clientId === client.id);
  const clientProductConfigs = productConfigs.filter(cfg => cfg.clientId === clientId);

  const handleAdjustCoupons = async () => {
    const newCoupons = Math.max(0, client.coupons + adjustValue);
    setClient(prev => ({ ...prev, coupons: newCoupons }));
    localStorage.setItem(`piscinao_client_coupons_${clientId}`, newCoupons.toString());

    try {
      const bc = new BroadcastChannel('piscinao_coupons_channel');
      bc.postMessage({ clientId, coupons: newCoupons });
      bc.close();
    } catch (e) {}

    try {
      await fetch('http://localhost:3002/sync/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, coupons: newCoupons }),
      });
    } catch (e) {}

    setShowAdjustModal(false);
    setAdjustValue(0);
  };

  const toggleStatus = () => {
    setClient(prev => ({ ...prev, status: prev.status === 'active' ? 'blocked' : 'active' }));
  };

  // Open Edit Profile Modal
  const openEditProfileModal = () => {
    setEditName(client.name);
    setEditEmail(client.email);
    setEditPhone(client.phone || '');
    setEditAddress(client.address || '');
    setEditNeighborhood(client.neighborhood || '');
    setEditCity(client.city || 'Araçatuba');
    setEditState(client.state || 'SP');
    setEditZipCode(client.zipCode || '');
    setEditClientNotes(client.notes || '');
    setShowEditProfileModal(true);
  };

  // Save Client Profile Modal Changes
  const handleSaveProfileModal = () => {
    const updatedClient: ExtendedClientProfile = {
      ...client,
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress,
      neighborhood: editNeighborhood,
      city: editCity,
      state: editState,
      zipCode: editZipCode,
      notes: editClientNotes,
    };

    setClient(updatedClient);
    localStorage.setItem(`piscinao_client_profile_${clientId}`, JSON.stringify({
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress,
      neighborhood: editNeighborhood,
      city: editCity,
      state: editState,
      zipCode: editZipCode,
      notes: editClientNotes,
    }));

    setShowEditProfileModal(false);
    setSaveSuccessMsg('Dados do cliente atualizados com sucesso!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Open Product Recommendation Editing Modal
  const openProductConfigModal = (cfg: ClientProductConfig) => {
    setEditingProductConfig(cfg);
    setModalDays(cfg.customIntervalDays !== null ? cfg.customIntervalDays : cfg.defaultIntervalDays);
    setModalAutoSend(cfg.autoSend);
    setModalMessage(cfg.customMessage || '');
    setModalNotes(cfg.notes || '');
  };

  // Save Product Recommendation Config inside Modal
  const handleSaveProductModal = () => {
    if (!editingProductConfig) return;

    const updated = productConfigs.map(cfg => {
      if (cfg.clientId === clientId && cfg.productId === editingProductConfig.productId) {
        return {
          ...cfg,
          customIntervalDays: modalDays,
          autoSend: modalAutoSend,
          customMessage: modalMessage,
          notes: modalNotes,
        };
      }
      return cfg;
    });

    saveAllConfigs(updated);
    setEditingProductConfig(null);
    setSaveSuccessMsg(`Recomendação para "${editingProductConfig.productName}" salva com sucesso!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Add a new product recommendation rule for this client
  const handleAddNewProductRecommendation = () => {
    const prodName = prompt('Digite o nome do produto para recomendar a este cliente (ex: Cloro Granulado 10kg, Algicida, etc.):');
    if (!prodName || !prodName.trim()) return;

    const newCfg: ClientProductConfig = {
      clientId,
      productId: `p_custom_${Date.now()}`,
      productName: prodName.trim(),
      category: 'Geral',
      lastPurchaseDaysAgo: 0,
      defaultIntervalDays: 30,
      customIntervalDays: 30,
      autoSend: true,
      customMessage: `Olá {nome}! Notamos que pode precisar de ${prodName.trim()} novamente. Podemos agendar a entrega?`,
      notes: 'Adicionado manualmente pelo admin',
    };

    saveAllConfigs([...productConfigs, newCfg]);
  };

  // Quick Toggle Auto-Send
  const toggleAutoSendForProduct = (productId: string) => {
    const updated = productConfigs.map(cfg => {
      if (cfg.clientId === clientId && cfg.productId === productId) {
        return { ...cfg, autoSend: !cfg.autoSend };
      }
      return cfg;
    });
    saveAllConfigs(updated);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#E53935';
    if (progress >= 75) return '#FF9800';
    if (progress >= 50) return '#FFC107';
    return '#4CAF50';
  };

  const formatInterval = (days: number) => {
    if (days === 0) return 'Imediato';
    if (days === 1) return '1 dia';
    if (days < 30) return `${days} dias`;
    if (days === 30) return '1 mês';
    if (days < 365) return `${Math.round(days / 30)} meses`;
    return `${Math.round(days / 365)} ano(s)`;
  };

  return (
    <div className="client-detail-page">
      <header className="page-header">
        <div className="header-left-group">
          <Link to="/recommendations" className="back-link">
            <ArrowLeft size={20} /> Voltar para Recomendações
          </Link>
          <h1 className="client-header-title">Perfil do Cliente: <span>{client.name}</span></h1>
        </div>
        <div className="header-actions">
          <button className="btn-edit-profile-top" onClick={openEditProfileModal}>
            <Pencil size={16} /> Editar Dados do Cliente
          </button>
          <button className="btn-secondary" onClick={() => setShowAdjustModal(true)}>
            <Ticket size={18} /> Ajustar Cupons
          </button>
          <button className={`btn-icon ${client.status === 'blocked' ? 'unblock' : 'block'}`} onClick={toggleStatus}>
            <Ban size={20} /> {client.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
          </button>
        </div>
      </header>

      {saveSuccessMsg && (
        <div className="alert-banner success">
          <CheckCircle2 size={20} /> {saveSuccessMsg}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="client-tabs">
        <button 
          className={`client-tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          <MessageSquare size={18} /> Recomendações & Envio Automático
          <span className="tab-badge">{clientProductConfigs.length}</span>
        </button>
        <button 
          className={`client-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <UserIcon size={18} /> Visão Geral & Dados
        </button>
        <button 
          className={`client-tab ${activeTab === 'purchases' ? 'active' : ''}`}
          onClick={() => setActiveTab('purchases')}
        >
          <ShoppingBag size={18} /> Histórico de Compras
          <span className="tab-badge">{clientPurchases.length}</span>
        </button>
        <button 
          className={`client-tab ${activeTab === 'coupons' ? 'active' : ''}`}
          onClick={() => setActiveTab('coupons')}
        >
          <Ticket size={18} /> Cupons & Fidelidade
          <span className="tab-badge gold">{client.coupons}</span>
        </button>
      </div>

      {/* ==================== OVERVIEW TAB ==================== */}
      {(activeTab === 'overview') && (
        <div className="detail-grid">
          {/* Client Profile Card */}
          <div className="card profile-card">
            <div className="profile-header">
              <div className="avatar-placeholder">{client.name.charAt(0)}</div>
              <div>
                <h2>{client.name}</h2>
                <span className={`status-badge ${client.status === 'active' ? 'active' : 'blocked'}`}>
                  {client.status === 'active' ? 'Ativo' : 'Bloqueado'}
                </span>
              </div>
              <button className="btn-edit-inline" onClick={openEditProfileModal} title="Editar Cadastro">
                <Pencil size={16} /> Editar
              </button>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <span className="label"><Mail size={14} /> Email:</span>
                <span className="value">{client.email}</span>
              </div>
              <div className="detail-item">
                <span className="label"><Phone size={14} /> Telefone / WhatsApp:</span>
                <span className="value">{client.phone || '(18) 99123-4567'}</span>
              </div>
              <div className="detail-item">
                <span className="label"><MapPin size={14} /> Endereço Completo:</span>
                <span className="value">
                  {client.address || 'Não cadastrado'}{client.neighborhood ? `, ${client.neighborhood}` : ''}
                  {client.city ? ` — ${client.city}/${client.state}` : ''} {client.zipCode ? `(${client.zipCode})` : ''}
                </span>
              </div>
              <div className="detail-item">
                <span className="label"><Calendar size={14} /> Cliente desde:</span>
                <span className="value">{client.createdAt ? formatDate(client.createdAt) : 'Janeiro 2026'}</span>
              </div>
              {client.notes && (
                <div className="client-notes-callout">
                  <strong>Observações do Cliente:</strong>
                  <p>{client.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="card overview-stats-card">
            <h3>Resumo de Atividade</h3>
            <div className="quick-stats-grid">
              <div className="stat-box gold">
                <Ticket size={24} />
                <div>
                  <span className="stat-val">{client.coupons}</span>
                  <span className="stat-lbl">Cupons Acumulados</span>
                </div>
              </div>
              <div className="stat-box primary">
                <ShoppingBag size={24} />
                <div>
                  <span className="stat-val">{clientPurchases.length}</span>
                  <span className="stat-lbl">Compras Realizadas</span>
                </div>
              </div>
              <div className="stat-box bot">
                <Bot size={24} />
                <div>
                  <span className="stat-val">{clientProductConfigs.filter(c => c.autoSend).length}</span>
                  <span className="stat-lbl">Produtos c/ Envio Auto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== RECOMMENDATIONS & AUTO-SEND TAB ==================== */}
      {(activeTab === 'recommendations' || activeTab === 'overview') && (
        <div className="card recommendations-customization-card full-width">
          <div className="card-header-with-btn">
            <div>
              <h3 className="section-title-icon">
                <Sparkles size={22} className="icon-sparkle" /> Personalização de Recomendações por Produto
              </h3>
              <p className="card-section-desc">
                Cartões compactos de produto. Use o botão ⚡ para alternar envio automático ou clique em ✏️ Editar para alterar a mensagem em um pop-up.
              </p>
            </div>
            <button className="btn-primary small" onClick={handleAddNewProductRecommendation}>
              <PlusCircle size={18} /> Adicionar Produto
            </button>
          </div>

          {/* COMPACT SQUARE CARDS GRID */}
          <div className="compact-cards-grid">
            {clientProductConfigs.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size= {44} />
                <p>Nenhuma recomendação individualizada para este cliente.</p>
                <button className="btn-primary" onClick={handleAddNewProductRecommendation}>
                  <PlusCircle size={18} /> Configurar Primeiro Produto
                </button>
              </div>
            ) : (
              clientProductConfigs.map((cfg) => {
                const targetDays = cfg.customIntervalDays !== null ? cfg.customIntervalDays : cfg.defaultIntervalDays;
                const progress = targetDays > 0 ? Math.min(100, Math.round((cfg.lastPurchaseDaysAgo / targetDays) * 100)) : 100;
                const isOverdue = cfg.lastPurchaseDaysAgo >= targetDays;

                return (
                  <div 
                    key={cfg.productId} 
                    className={`square-product-card ${isOverdue ? 'overdue' : ''} ${cfg.autoSend ? 'auto-active' : ''}`}
                    onClick={() => openProductConfigModal(cfg)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Top Row: Product Title & Fast Auto-Send Toggle */}
                    <div className="square-card-top">
                      <div className="square-title-wrap">
                        <Tag size={16} className="tag-icon-sm" />
                        <h4 className="square-product-name" title={cfg.productName}>{cfg.productName}</h4>
                      </div>
                      <span className="badge-category-sm">{cfg.category}</span>
                    </div>

                    {/* Quick Auto-Send Toggle Button */}
                    <div className="square-auto-toggle-row">
                      <button 
                        className={`btn-auto-toggle-sm ${cfg.autoSend ? 'enabled' : 'disabled'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAutoSendForProduct(cfg.productId);
                        }}
                        title={cfg.autoSend ? 'Envio automático ativado! Clique para desativar' : 'Envio manual. Clique para ativar disparo automático'}
                      >
                        <Bot size={14} />
                        {cfg.autoSend ? '⚡ ENVIO AUTO' : '✋ MANUAL'}
                      </button>
                      <span className="recurrence-pill">
                        <Clock size={12} /> {formatInterval(targetDays)}
                      </span>
                    </div>

                    {/* Compact Progress Bar */}
                    <div className="square-progress-wrap">
                      <div className="square-progress-bar">
                        <div 
                          className="square-progress-fill"
                          style={{ width: `${progress}%`, background: getProgressColor(progress) }}
                        />
                      </div>
                      <div className="square-progress-info">
                        <span>Há {cfg.lastPurchaseDaysAgo}d</span>
                        <strong style={{ color: getProgressColor(progress) }}>{progress}%</strong>
                      </div>
                    </div>

                    {/* Compact Action Buttons */}
                    <div className="square-card-actions">
                      <button 
                        className="btn-square-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductConfigModal(cfg);
                        }}
                        title="Editar Recorrência e Mensagem em Pop-up"
                      >
                        <Pencil size={14} /> Editar
                      </button>
                      <button 
                        className="btn-square-whatsapp"
                        onClick={(e) => {
                          e.stopPropagation();
                          const msg = (cfg.customMessage || `Olá {nome}! Notamos que pode precisar de ${cfg.productName} novamente.`)
                            .replace('{nome}', client.name.split(' ')[0]);
                          window.open(`https://wa.me/55${client.phone?.replace(/\D/g, '') || '18991234567'}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        title="Disparar mensagem no WhatsApp agora"
                      >
                        <Send size={14} /> Enviar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ==================== PURCHASES TAB ==================== */}
      {(activeTab === 'purchases') && (
        <div className="card purchases-card full-width">
          <div className="card-header-with-btn">
            <h3 className="section-title-icon"><ShoppingBag size={20} /> Histórico Detalhado de Compras</h3>
            <span className="badge-count">{clientPurchases.length} compras</span>
          </div>

          {clientPurchases.length > 0 ? (
            <table className="data-table purchases-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Produtos Adquiridos</th>
                  <th>Valor Total</th>
                  <th>Cupons Gerados</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                {clientPurchases.map((p: Purchase) => (
                  <tr key={p.id}>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        {formatDate(p.purchaseDate)}
                      </div>
                    </td>
                    <td>
                      <div className="purchase-items-list">
                        {p.items && p.items.length > 0 ? (
                          p.items.map((item, idx) => (
                            <div key={idx} className="item-pill">
                              <strong>{item.productName || 'Produto'}</strong> x{item.quantity} ({formatCurrency(item.unitPrice)})
                            </div>
                          ))
                        ) : (
                          <div className="item-pill">Cloro Granulado 10kg x2</div>
                        )}
                      </div>
                    </td>
                    <td><strong className="price-tag">{formatCurrency(p.totalAmount)}</strong></td>
                    <td><span className="badge-gold">+{p.couponsEarned} cupons</span></td>
                    <td><span className="text-sub">{p.notes || 'Compra efetuada na loja'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <ShoppingBag size={48} />
              <p>Nenhuma compra registrada para este cliente.</p>
            </div>
          )}
        </div>
      )}

      {/* ==================== COUPONS TAB ==================== */}
      {(activeTab === 'coupons' || activeTab === 'overview') && (
        <div className="card coupons-card full-width">
          <div className="coupons-card-header">
            <div>
              <h3 className="section-title-icon"><Ticket size={22} className="gold-icon" /> Saldo & Histórico de Cupons</h3>
              <p className="card-section-desc">Gerenciamento do programa de fidelidade do cliente.</p>
            </div>
          </div>

          <div className="coupons-visual-box">
            <div className="coupons-big-counter">
              <span className="big-num">{draftCoupons}</span>
              <span className="big-lbl">Cupons Ativos</span>
            </div>
            <div className="coupons-progress-info">
              <h4>Progresso na Trilha do Tesouro</h4>
              <div className="trail-bar">
                <div className="trail-fill" style={{ width: `${Math.min(100, (draftCoupons / 50) * 100)}%` }}></div>
              </div>
              <p className="trail-text">{draftCoupons} / 50 cupons para o Baú do Tesouro Final</p>

              {/* Inline Circular +/- Buttons & Save Button right below text */}
              <div className="inline-coupon-adjuster">
                <div className="circular-buttons-row">
                  <button 
                    className="btn-circle-minus" 
                    onClick={() => setDraftCoupons(prev => Math.max(0, prev - 1))}
                    title="Remover 1 cupom"
                  >
                    <MinusCircle size={20} />
                  </button>
                  <button 
                    className="btn-circle-plus" 
                    onClick={() => setDraftCoupons(prev => prev + 1)}
                    title="Adicionar 1 cupom"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>

                {draftCoupons !== client.coupons && (
                  <button className="btn-save-inline-coupons" onClick={saveInlineCoupons}>
                    <CheckCircle2 size={16} /> Salvar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== POPUP MODAL 1: EDIT CLIENT PROFILE ==================== */}
      {showEditProfileModal && (
        <div className="modal-backdrop">
          <div className="modal-card popup-modal-lg">
            <div className="popup-modal-header">
              <h3><Edit3 size={20} /> Editar Cadastro do Cliente</h3>
              <button className="btn-close-modal" onClick={() => setShowEditProfileModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="popup-modal-body">
              <div className="modal-form-grid">
                <div className="form-group-modal">
                  <label>Nome Completo:</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />
                </div>

                <div className="form-group-modal">
                  <label>Email:</label>
                  <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                </div>

                <div className="form-group-modal">
                  <label>Telefone / WhatsApp:</label>
                  <input type="text" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                </div>

                <div className="form-group-modal">
                  <label>CEP:</label>
                  <input type="text" value={editZipCode} onChange={e => setEditZipCode(e.target.value)} placeholder="16050-000" />
                </div>

                <div className="form-group-modal full-col">
                  <label>Endereço / Rua e Número:</label>
                  <input type="text" value={editAddress} onChange={e => setEditAddress(e.target.value)} placeholder="Rua..." />
                </div>

                <div className="form-group-modal">
                  <label>Bairro:</label>
                  <input type="text" value={editNeighborhood} onChange={e => setEditNeighborhood(e.target.value)} />
                </div>

                <div className="form-group-modal">
                  <label>Cidade / Estado:</label>
                  <div className="city-state-row">
                    <input type="text" value={editCity} onChange={e => setEditCity(e.target.value)} placeholder="Araçatuba" />
                    <input type="text" style={{ width: 60 }} value={editState} onChange={e => setEditState(e.target.value)} placeholder="SP" />
                  </div>
                </div>

                <div className="form-group-modal full-col">
                  <label>Observações Internas (Ex: Piscinas, restrições de entrega):</label>
                  <textarea 
                    rows={3}
                    value={editClientNotes} 
                    onChange={e => setEditClientNotes(e.target.value)}
                    placeholder="Escreva anotações importantes sobre o cliente..."
                  />
                </div>
              </div>
            </div>

            <div className="popup-modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditProfileModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSaveProfileModal}>
                <CheckCircle2 size={16} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== POPUP MODAL 2: EDIT PRODUCT RECOMMENDATION CONFIG ==================== */}
      {editingProductConfig && (
        <div className="modal-backdrop">
          <div className="modal-card popup-modal-lg">
            <div className="popup-modal-header">
              <div>
                <h3><Clock size={20} /> Personalizar Recomendação</h3>
                <span className="popup-subtitle">{editingProductConfig.productName} ({editingProductConfig.category})</span>
              </div>
              <button className="btn-close-modal" onClick={() => setEditingProductConfig(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="popup-modal-body">
              <div className="modal-form-grid">
                <div className="form-group-modal">
                  <label>Recorrência de Compra (em Dias):</label>
                  <input 
                    type="number" 
                    min={1} 
                    value={modalDays} 
                    onChange={e => setModalDays(parseInt(e.target.value, 10) || 1)} 
                  />
                  <span className="modal-hint">Equivale a <strong>{formatInterval(modalDays)}</strong></span>
                </div>

                <div className="form-group-modal">
                  <label>Disparo Automático (Robô WhatsApp):</label>
                  <select 
                    value={modalAutoSend ? 'true' : 'false'}
                    onChange={e => setModalAutoSend(e.target.value === 'true')}
                  >
                    <option value="true">⚡ SIM — Enviar mensagem automaticamente</option>
                    <option value="false">✋ NÃO — Apenas avisar para envio manual</option>
                  </select>
                </div>

                <div className="form-group-modal full-col">
                  <label>Mensagem WhatsApp Customizada para este Cliente:</label>
                  <textarea 
                    rows={3}
                    value={modalMessage}
                    onChange={e => setModalMessage(e.target.value)}
                    placeholder="Olá {nome}! Notamos que pode precisar de mais produto..."
                  />
                  <span className="modal-hint">Use <code>{'{nome}'}</code> para o primeiro nome do cliente.</span>
                </div>

                <div className="form-group-modal full-col">
                  <label>Observações do Produto para este Cliente:</label>
                  <input 
                    type="text"
                    value={modalNotes}
                    onChange={e => setModalNotes(e.target.value)}
                    placeholder="Ex: Usa 2 baldes no verão"
                  />
                </div>
              </div>
            </div>

            <div className="popup-modal-footer">
              <button className="btn-secondary" onClick={() => setEditingProductConfig(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSaveProductModal}>
                <CheckCircle2 size={16} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adjust Coupons Modal */}
      {showAdjustModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="popup-modal-header">
              <h3>Ajustar Cupons de {client.name}</h3>
              <button className="btn-close-modal" onClick={() => setShowAdjustModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <p style={{ marginTop: 12 }}>Cupons Atuais: <strong>{client.coupons}</strong></p>
            
            <div className="adjust-controls">
              <button onClick={() => setAdjustValue(v => v - 1)}><MinusCircle size={22} /></button>
              <input 
                type="number" 
                value={adjustValue} 
                onChange={e => setAdjustValue(parseInt(e.target.value) || 0)} 
              />
              <button onClick={() => setAdjustValue(v => v + 1)}><PlusCircle size={22} /></button>
            </div>
            
            <div className="modal-actions" style={{ marginTop: 20 }}>
              <button className="btn-secondary" onClick={() => setShowAdjustModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleAdjustCoupons}>Salvar Ajuste</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
