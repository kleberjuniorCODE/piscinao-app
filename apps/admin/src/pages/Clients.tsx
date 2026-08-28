import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Ban, Ticket, Pencil, PlusCircle, MinusCircle, X, CheckCircle2 } from 'lucide-react';
import { mockClients } from '../services/api';
import { User } from '../types';
import './Clients.css';

interface ClientItem extends User {
  coupons?: number;
  status?: string;
  phone?: string;
}

export default function Clients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getInitialClients = (): ClientItem[] => {
    return mockClients.map((c) => {
      const savedProfile = localStorage.getItem(`piscinao_client_profile_${c.id}`);
      let phone = c.phone || '(18) 99123-4567';
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.phone) phone = parsed.phone;
        } catch (e) {}
      }

      const savedCoupons = localStorage.getItem(`piscinao_client_coupons_${c.id}`);
      const coupons = savedCoupons !== null ? parseInt(savedCoupons, 10) : 27;
      return { ...c, phone, coupons, status: c.isActive ? 'active' : 'blocked' };
    });
  };

  const [clients, setClients] = useState<ClientItem[]>(getInitialClients);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [adjustValue, setAdjustValue] = useState(0);

  const fetchBackendClients = () => {
    fetch('http://localhost:3002/sync/clients')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          localStorage.setItem('piscinao_all_backend_clients', JSON.stringify(data.data));

          const merged = data.data.map((c: any) => {
            const savedCoupons = localStorage.getItem(`piscinao_client_coupons_${c.id}`);
            const coupons = savedCoupons !== null ? parseInt(savedCoupons, 10) : (c.coupons || 0);
            return {
              ...c,
              coupons,
              status: c.isActive !== false ? 'active' : 'blocked',
            };
          });
          setClients(merged);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchBackendClients();
    const interval = setInterval(fetchBackendClients, 2000);

    const handleStorageChange = () => {
      fetchBackendClients();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const filteredClients = clients.filter((c: ClientItem) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdjustCoupons = async () => {
    if (selectedClient) {
      const newCoupons = Math.max(0, (selectedClient.coupons || 0) + adjustValue);
      setClients(clients.map((c: ClientItem) => 
        c.id === selectedClient.id ? { ...c, coupons: newCoupons } : c
      ));
      localStorage.setItem(`piscinao_client_coupons_${selectedClient.id}`, newCoupons.toString());

      try {
        const bc = new BroadcastChannel('piscinao_coupons_channel');
        bc.postMessage({ clientId: selectedClient.id, coupons: newCoupons });
        bc.close();
      } catch (e) {}

      try {
        await fetch('http://localhost:3002/sync/coupons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: selectedClient.id, coupons: newCoupons }),
        });
      } catch (e) {}
    }
    setShowAdjustModal(false);
    setAdjustValue(0);
  };

  const toggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClients(clients.map((c: ClientItem) =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c
    ));
  };

  const openCouponsModal = (client: ClientItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClient(client);
    setShowAdjustModal(true);
  };

  return (
    <div className="clients-page animate-fade-up">
      <header className="page-header">
        <div>
          <h1 className="clients-title">Gerenciamento de Clientes</h1>
          <p className="page-subtitle">Visualize clientes, gerencie cupons e acesse o perfil completo de edição</p>
        </div>
      </header>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container card">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Cliente</th>
              <th style={{ width: '25%' }}>Contato (Email & WhatsApp)</th>
              <th style={{ width: '15%' }}>Cupons Acumulados</th>
              <th style={{ width: '15%' }}>Progresso na Trilha</th>
              <th style={{ width: '8%' }}>Status</th>
              <th className="actions-header" style={{ width: '15%' }}>Ações do Admin</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client: ClientItem) => {
              const coupons = client.coupons || 0;
              const stepProgress = (coupons % 10) * 10;

              return (
                <tr 
                  key={client.id} 
                  className="client-row"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  <td>
                    <div className="client-name-wrap">
                      <div className="client-avatar-table">{client.name.charAt(0).toUpperCase()}</div>
                      <div className="client-name">{client.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="email-text">{client.email}</div>
                      <div className="phone-text">{client.phone || '(18) 99123-4567'}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge-gold-pill">{coupons} cupons</span>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar-small">
                        <div className="fill" style={{ width: `${stepProgress}%` }}></div>
                      </div>
                      <span className="progress-bar-text">{coupons % 10}/10 cupons</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${client.status === 'active' ? 'active' : 'blocked'}`}>
                      {client.status === 'active' ? 'Ativo' : 'Bloqueado'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      type="button"
                      className="btn-action btn-view" 
                      title="Ver & Editar Perfil Completo"
                      onClick={(e) => { e.stopPropagation(); navigate(`/clients/${client.id}`); }}
                    >
                      <Pencil size={15} /> Editar / Perfil
                    </button>

                    <button 
                      type="button"
                      className="btn-action btn-coupons" 
                      title="Ajustar Saldo de Cupons"
                      onClick={(e) => openCouponsModal(client, e)}
                    >
                      <Ticket size={15} /> Cupons
                    </button>

                    <button 
                      type="button"
                      className={`btn-action ${client.status === 'blocked' ? 'btn-unblock' : 'btn-block'}`}
                      title={client.status === 'blocked' ? 'Desbloquear Acesso' : 'Bloquear Acesso'}
                      onClick={(e) => toggleStatus(client.id, e)}
                    >
                      <Ban size={15} /> {client.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL DE AJUSTE RÁPIDO DE CUPONS */}
      {showAdjustModal && selectedClient && (
        <div className="popup-modal-overlay">
          <div className="popup-modal-content" style={{ maxWidth: 420 }}>
            <div className="popup-modal-header">
              <h3><Ticket size={20} style={{ color: 'var(--primary)' }} /> Ajustar Cupons de {selectedClient.name}</h3>
              <button className="popup-modal-close" onClick={() => setShowAdjustModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="popup-modal-body text-center" style={{ padding: '24px 20px' }}>
              <p className="text-secondary" style={{ marginBottom: 16 }}>
                Saldo atual: <strong>{selectedClient.coupons || 0} cupons</strong>
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <button 
                  className="btn-icon btn-outline" 
                  onClick={() => setAdjustValue(prev => prev - 1)}
                  style={{ width: 44, height: 44, borderRadius: '50%' }}
                >
                  <MinusCircle size={22} />
                </button>
                <input 
                  type="number" 
                  className="form-control adjust-input"
                  value={adjustValue}
                  onChange={(e) => setAdjustValue(parseInt(e.target.value) || 0)}
                />
                <button 
                  className="btn-icon btn-outline" 
                  onClick={() => setAdjustValue(prev => prev + 1)}
                  style={{ width: 44, height: 44, borderRadius: '50%' }}
                >
                  <PlusCircle size={22} />
                </button>
              </div>

              <span className="adjust-preview">
                Novo Saldo: <strong>{Math.max(0, (selectedClient.coupons || 0) + adjustValue)} cupons</strong>
              </span>
            </div>

            <div className="popup-modal-footer" style={{ justifyContent: 'flex-end', padding: '16px 20px' }}>
              <button className="btn btn-secondary" onClick={() => setShowAdjustModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleAdjustCoupons}>
                <CheckCircle2 size={16} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
