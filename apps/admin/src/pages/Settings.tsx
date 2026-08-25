import { useState, useEffect } from 'react';
import { Save, Plus, Pencil, Ban, Trash2, UserCheck, ShieldCheck, X, CheckCircle2, UserPlus, Key, Mail, Phone, User, Briefcase } from 'lucide-react';
import './Settings.css';

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  password?: string;
}

const defaultAdminsList: AdminAccount[] = [
  {
    id: 'adm_1',
    name: 'Administrador Principal',
    email: 'admin@piscinao.com.br',
    phone: '(18) 99999-9999',
    role: 'Administrador Geral',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'adm_2',
    name: 'Kleber Araújo',
    email: 'kleber.admin@piscinao.com.br',
    phone: '(18) 99122-5211',
    role: 'Gerente da Loja',
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

export default function Settings() {
  // Store Info State
  const [storeName, setStoreName] = useState('Piscinão Araçatuba');
  const [storePhone, setStorePhone] = useState('(18) 99999-9999');
  const [storeAddress, setStoreAddress] = useState('Av. Brasília, 1000 - Araçatuba, SP');
  const [weekHours, setWeekHours] = useState('Segunda a Sexta: 08:00 às 18:00');
  const [satHours, setSatHours] = useState('Sábado: 08:00 às 12:00');
  const [sunHours, setSunHours] = useState('Fechado');
  const [aboutText, setAboutText] = useState('O Piscinão Araçatuba é a sua loja completa para produtos e acessórios para piscina. Qualidade, preço justo e o melhor atendimento da região.');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Admins List State
  const [admins, setAdmins] = useState<AdminAccount[]>(() => {
    const saved = localStorage.getItem('piscinao_admin_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return defaultAdminsList;
  });

  // Modal State for Create/Edit Admin
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);

  // Admin Form Fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState('Administrador Geral');
  const [formPassword, setFormPassword] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [modalError, setModalError] = useState<string | null>(null);

  // Fetch Admins from Backend API
  const fetchBackendAdmins = () => {
    fetch('http://localhost:3002/sync/settings/admins')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAdmins(data.data);
          localStorage.setItem('piscinao_admin_accounts', JSON.stringify(data.data));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchBackendAdmins();
    const interval = setInterval(fetchBackendAdmins, 3000);
    return () => clearInterval(interval);
  }, []);

  // Save Store Settings
  const handleSaveStoreSettings = () => {
    localStorage.setItem('piscinao_store_info', JSON.stringify({
      storeName, storePhone, storeAddress, weekHours, satHours, sunHours, aboutText
    }));
    setSaveSuccessMsg('Configurações da loja salvas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingAdmin(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('(18) 9');
    setFormRole('Administrador Geral');
    setFormPassword('');
    setFormIsActive(true);
    setModalError(null);
    setShowAdminModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (admin: AdminAccount) => {
    setEditingAdmin(admin);
    setFormName(admin.name);
    setFormEmail(admin.email);
    setFormPhone(admin.phone || '(18) 99999-9999');
    setFormRole(admin.role || 'Administrador Geral');
    setFormPassword('');
    setFormIsActive(admin.isActive);
    setModalError(null);
    setShowAdminModal(true);
  };

  // Submit Admin Form (Create or Update)
  const handleSubmitAdminForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!formName.trim() || !formEmail.trim()) {
      setModalError('Nome e E-mail são obrigatórios.');
      return;
    }

    if (!editingAdmin && (!formPassword || formPassword.length < 6)) {
      setModalError('A senha deve ter no mínimo 6 caracteres para uma nova conta.');
      return;
    }

    const payload = {
      name: formName.trim(),
      email: formEmail.trim().toLowerCase(),
      phone: formPhone.trim(),
      role: formRole.trim(),
      password: formPassword || undefined,
      isActive: formIsActive,
    };

    if (editingAdmin) {
      // Update Admin
      const updatedList = admins.map(a => 
        a.id === editingAdmin.id ? { ...a, ...payload } : a
      );
      setAdmins(updatedList);
      localStorage.setItem('piscinao_admin_accounts', JSON.stringify(updatedList));

      try {
        await fetch(`http://localhost:3002/sync/settings/admins/${editingAdmin.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {}

      setSaveSuccessMsg(`Administrador "${formName}" atualizado com sucesso!`);
    } else {
      // Create New Admin
      const newAdmin: AdminAccount = {
        id: `adm_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: payload.role,
        isActive: payload.isActive,
        createdAt: new Date().toISOString(),
      };

      const updatedList = [...admins, newAdmin];
      setAdmins(updatedList);
      localStorage.setItem('piscinao_admin_accounts', JSON.stringify(updatedList));

      try {
        await fetch('http://localhost:3002/sync/settings/admins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {}

      setSaveSuccessMsg(`Administrador "${formName}" criado com sucesso!`);
    }

    setShowAdminModal(false);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  // Toggle Admin Block/Active status
  const handleToggleAdminStatus = async (admin: AdminAccount) => {
    const newStatus = !admin.isActive;
    const updatedList = admins.map(a => 
      a.id === admin.id ? { ...a, isActive: newStatus } : a
    );
    setAdmins(updatedList);
    localStorage.setItem('piscinao_admin_accounts', JSON.stringify(updatedList));

    try {
      await fetch(`http://localhost:3002/sync/settings/admins/${admin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });
    } catch (e) {}
  };

  // Delete Admin
  const handleDeleteAdmin = async (admin: AdminAccount) => {
    if (admins.length <= 1) {
      alert('Você não pode excluir o único administrador do sistema.');
      return;
    }

    if (window.confirm(`Tem certeza que deseja remover o administrador "${admin.name}"?`)) {
      const updatedList = admins.filter(a => a.id !== admin.id);
      setAdmins(updatedList);
      localStorage.setItem('piscinao_admin_accounts', JSON.stringify(updatedList));

      try {
        await fetch(`http://localhost:3002/sync/settings/admins/${admin.id}`, {
          method: 'DELETE',
        });
      } catch (e) {}

      setSaveSuccessMsg(`Administrador "${admin.name}" removido.`);
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    }
  };

  // Select active admin for session display
  const handleSelectActiveAdmin = (admin: AdminAccount) => {
    localStorage.setItem('piscinao_active_admin', JSON.stringify(admin));
    window.dispatchEvent(new Event('storage'));
    setSaveSuccessMsg(`Sessão alterada para: ${admin.name}`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  return (
    <div className="settings-page">
      <header className="page-header">
        <div>
          <h1 className="settings-title">Configurações & Administradores</h1>
          <p className="page-subtitle">Gerencie as informações da loja e as contas da equipe administrativa</p>
        </div>

        <button className="btn-primary" onClick={handleSaveStoreSettings}>
          <Save size={18} /> Salvar Alterações
        </button>
      </header>

      {saveSuccessMsg && (
        <div className="settings-alert success">
          <CheckCircle2 size={18} /> {saveSuccessMsg}
        </div>
      )}

      {/* ==================== GERENCIAMENTO DE ADMINISTRADORES / EQUIPE ==================== */}
      <div className="card full-width admin-management-card">
        <div className="card-header-flex">
          <div>
            <h2 className="section-title"><ShieldCheck size={22} style={{ color: 'var(--primary)' }} /> Contas de Administradores & Equipe</h2>
            <p className="section-desc">Cadastre, edite e controle o acesso das pessoas que gerenciam a plataforma do Piscinão</p>
          </div>

          <button className="btn-primary btn-add-admin" onClick={handleOpenCreateModal}>
            <UserPlus size={18} /> + Criar Novo Administrador
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrador</th>
                <th>Contato (Email / WhatsApp)</th>
                <th>Cargo / Função</th>
                <th>Status</th>
                <th className="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="admin-row">
                  <td>
                    <div className="admin-user-info">
                      <div className="admin-avatar">{admin.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="admin-name">{admin.name}</div>
                        <span className="admin-id-tag">ID: {admin.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-contact">
                      <div className="email-link">{admin.email}</div>
                      <div className="phone-sub">{admin.phone || '(18) 99999-9999'}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge-role">{admin.role || 'Administrador Geral'}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${admin.isActive ? 'active' : 'blocked'}`}>
                      {admin.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="btn-action-sm btn-session" 
                      title="Usar esta conta como ativa"
                      onClick={() => handleSelectActiveAdmin(admin)}
                    >
                      <UserCheck size={14} /> Usar Perfil
                    </button>

                    <button 
                      className="btn-action-sm btn-edit" 
                      title="Editar dados deste Administrador"
                      onClick={() => handleOpenEditModal(admin)}
                    >
                      <Pencil size={14} /> Editar
                    </button>

                    <button 
                      className={`btn-action-sm ${admin.isActive ? 'btn-block' : 'btn-unblock'}`}
                      title={admin.isActive ? 'Desativar Conta' : 'Ativar Conta'}
                      onClick={() => handleToggleAdminStatus(admin)}
                    >
                      <Ban size={14} /> {admin.isActive ? 'Bloquear' : 'Ativar'}
                    </button>

                    <button 
                      className="btn-action-sm btn-delete" 
                      title="Excluir Administrador"
                      onClick={() => handleDeleteAdmin(admin)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== CONFIGURAÇÕES GERAIS DA LOJA ==================== */}
      <div className="settings-grid">
        <div className="card">
          <h2>Informações Básicas</h2>
          <div className="form-group">
            <label>Nome da Loja</label>
            <input 
              type="text" 
              value={storeName} 
              onChange={e => setStoreName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>WhatsApp de Suporte / Atendimento</label>
            <input 
              type="text" 
              value={storePhone} 
              onChange={e => setStorePhone(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Endereço Físico</label>
            <input 
              type="text" 
              value={storeAddress} 
              onChange={e => setStoreAddress(e.target.value)} 
            />
          </div>
        </div>

        <div className="card">
          <h2>Horário de Funcionamento</h2>
          <div className="form-group">
            <label>Dias Úteis</label>
            <input 
              type="text" 
              value={weekHours} 
              onChange={e => setWeekHours(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Sábados</label>
            <input 
              type="text" 
              value={satHours} 
              onChange={e => setSatHours(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Domingos e Feriados</label>
            <input 
              type="text" 
              value={sunHours} 
              onChange={e => setSunHours(e.target.value)} 
            />
          </div>
        </div>

        <div className="card full-width">
          <h2>Sobre (Aplicativo do Cliente)</h2>
          <div className="form-group">
            <label>Texto descritivo exibido no app cliente</label>
            <textarea 
              rows={4} 
              value={aboutText} 
              onChange={e => setAboutText(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ==================== POPUP MODAL COM 'X' PARA CRIAR / EDITAR ADMINISTRADOR ==================== */}
      {showAdminModal && (
        <div className="popup-modal-overlay">
          <div className="popup-modal-content" style={{ maxWidth: 500 }}>
            <div className="popup-modal-header">
              <h3>
                {editingAdmin ? (
                  <><Pencil size={20} style={{ color: 'var(--primary)' }} /> Editar Administrador</>
                ) : (
                  <><UserPlus size={20} style={{ color: 'var(--primary)' }} /> Criar Novo Administrador</>
                )}
              </h3>
              <button className="popup-modal-close" onClick={() => setShowAdminModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitAdminForm}>
              <div className="popup-modal-body" style={{ padding: '20px' }}>
                {modalError && (
                  <div className="settings-alert error" style={{ marginBottom: 16 }}>
                    ⚠️ {modalError}
                  </div>
                )}

                <div className="form-group">
                  <label><User size={15} /> Nome Completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Carlos Eduardo" 
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label><Mail size={15} /> E-mail de Acesso *</label>
                  <input 
                    type="email" 
                    placeholder="carlos@piscinaoaracatuba.com.br" 
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label><Phone size={15} /> WhatsApp / Telefone</label>
                    <input 
                      type="text" 
                      placeholder="(18) 99765-4321" 
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label><Briefcase size={15} /> Cargo / Função *</label>
                    <select 
                      className="form-control-select"
                      value={formRole}
                      onChange={e => setFormRole(e.target.value)}
                    >
                      <option value="Administrador Geral">Administrador Geral</option>
                      <option value="Gerente de Vendas">Gerente de Vendas</option>
                      <option value="Atendimento / Suporte">Atendimento / Suporte</option>
                      <option value="Estoque & Logística">Estoque & Logística</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label><Key size={15} /> {editingAdmin ? 'Alterar Senha (opcional)' : 'Senha de Acesso *'}</label>
                  <input 
                    type="password" 
                    placeholder={editingAdmin ? 'Deixe em branco para manter a atual' : 'Digite a senha (mín. 6 chars)'} 
                    value={formPassword}
                    onChange={e => setFormPassword(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginTop: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formIsActive}
                      onChange={e => setFormIsActive(e.target.checked)}
                      style={{ width: 18, height: 18 }}
                    />
                    <span>Conta de Administrador Ativa</span>
                  </label>
                </div>
              </div>

              <div className="popup-modal-footer" style={{ justifyContent: 'flex-end', padding: '16px 20px', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAdminModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} /> {editingAdmin ? 'Salvar Alterações' : 'Criar Administrador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
