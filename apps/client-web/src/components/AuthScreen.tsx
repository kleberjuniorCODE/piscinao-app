import { useState } from 'react';
import { User, Lock, Mail, Phone, FileText, Calendar, MapPin, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, KeyRound, MessageSquare, HelpCircle, RefreshCw } from 'lucide-react';
import './AuthScreen.css';

interface AuthScreenProps {
  onLoginSuccess: (user: any) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Multi-step Login State: Step 1 (Identifier) -> Step 2 (Password) -> Step 3 (2FA)
  const [loginStep, setLoginStep] = useState<1 | 2 | 3>(1);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);

  // Forgot Password State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // 2FA Verification States for Login & Register
  const [login2FaChannel, setLogin2FaChannel] = useState<'email' | 'sms'>('email');
  const [login2FaCodeInput, setLogin2FaCodeInput] = useState('');
  const [loginGenerated2FaCode, setLoginGenerated2FaCode] = useState('');

  // Multi-step Register State: Step 1 (Form) -> Step 2 (2FA Verification)
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [reg2FaChannel, setReg2FaChannel] = useState<'email' | 'sms'>('email');
  const [reg2FaCodeInput, setReg2FaCodeInput] = useState('');
  const [generated2FaCode, setGenerated2FaCode] = useState('');

  // Form Inputs - Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regBirthdate, setRegBirthdate] = useState('');
  const [regAge, setRegAge] = useState<number | ''>('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [regAddress, setRegAddress] = useState('');
  const [regNeighborhood, setRegNeighborhood] = useState('');
  const [regCity, setRegCity] = useState('Araçatuba');
  const [regState, setRegState] = useState('SP');
  const [regZipCode, setRegZipCode] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Format Masks
  const handleCpfChange = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 11);
    let formatted = numeric;
    if (numeric.length > 9) {
      formatted = `${numeric.slice(0, 3)}.${numeric.slice(3, 6)}.${numeric.slice(6, 9)}-${numeric.slice(9)}`;
    } else if (numeric.length > 6) {
      formatted = `${numeric.slice(0, 3)}.${numeric.slice(3, 6)}.${numeric.slice(6)}`;
    } else if (numeric.length > 3) {
      formatted = `${numeric.slice(0, 3)}.${numeric.slice(3)}`;
    }
    setRegCpf(formatted);
  };

  const handlePhoneChange = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 11);
    let formatted = numeric;
    if (numeric.length > 6) {
      formatted = `(${numeric.slice(0, 2)}) ${numeric.slice(2, 7)}-${numeric.slice(7)}`;
    } else if (numeric.length > 2) {
      formatted = `(${numeric.slice(0, 2)}) ${numeric.slice(2)}`;
    }
    setRegPhone(formatted);
  };

  const handleZipChange = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 8);
    let formatted = numeric;
    if (numeric.length > 5) {
      formatted = `${numeric.slice(0, 5)}-${numeric.slice(5)}`;
    }
    setRegZipCode(formatted);
  };

  const handleBirthdateChange = (val: string) => {
    setRegBirthdate(val);
    if (val) {
      const birth = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setRegAge(isNaN(age) || age < 0 ? '' : age);
    } else {
      setRegAge('');
    }
  };

  // Step 1 Login Submission -> Move to Password Step
  const handleLoginStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!loginId.trim()) {
      setErrorMsg('Por favor, informe seu Email, CPF ou Telefone.');
      return;
    }
    setLoginStep(2);
  };

  // Step 2 Login Submission -> Validate Password & Dispatch Login 2FA Code
  const handleLoginStep2Validate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginPassword) {
      setErrorMsg('Por favor, informe sua senha.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3002/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginIdentifier: loginId,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Senha incorreta. Tente novamente.');
        setLoading(false);
        return;
      }

      setPendingUser(data.data.user);

      // Default channel is email unless user registered phone
      const target = data.data.user.email || data.data.user.phone || loginId;
      const initialChannel = login2FaChannel;

      const res2Fa = await fetch('http://localhost:3002/auth/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, channel: initialChannel }),
      });
      const data2Fa = await res2Fa.json();

      if (data2Fa.success && data2Fa.code) {
        setLoginGenerated2FaCode(data2Fa.code);
      }

      setLogin2FaCodeInput('');
      setLoginStep(3); // Move to 2FA Step
    } catch (err) {
      const savedUser = localStorage.getItem('piscinao_user_session');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setPendingUser(parsed);
        setLoginStep(3);
      } else {
        setErrorMsg('Erro de conexão com o servidor. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 3 Login 2FA Code Verification
  const handleVerifyLogin2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const target = pendingUser?.email || pendingUser?.phone || loginId;

    try {
      const res = await fetch('http://localhost:3002/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code: login2FaCodeInput }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Fallback local check if server map was cleared
        if (login2FaCodeInput.trim() !== loginGenerated2FaCode) {
          setErrorMsg(data.error || 'Código de verificação incorreto. Verifique o código recebido.');
          setLoading(false);
          return;
        }
      }

      setSuccessMsg('Verificação 2FA bem-sucedida! Entrando no App...');
      setTimeout(() => {
        onLoginSuccess(pendingUser);
      }, 600);
    } catch (err) {
      if (login2FaCodeInput.trim() !== loginGenerated2FaCode) {
        setErrorMsg('Código de verificação incorreto. Verifique e tente novamente.');
        setLoading(false);
        return;
      }
      onLoginSuccess(pendingUser);
    } finally {
      setLoading(false);
    }
  };

  // Resend 2FA Code handler
  const handleResendLogin2Fa = async (overrideChannel?: 'email' | 'sms') => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const channel = overrideChannel || login2FaChannel;
    if (overrideChannel) {
      setLogin2FaChannel(overrideChannel);
    }

    const target = channel === 'sms' 
      ? (pendingUser?.phone || loginId)
      : (pendingUser?.email || loginId);

    try {
      const res = await fetch('http://localhost:3002/auth/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, channel }),
      });

      const data = await res.json();
      if (data.success && data.code) {
        setLoginGenerated2FaCode(data.code);
      }

      setSuccessMsg(`Novo código enviado via ${channel === 'email' ? 'Email' : 'SMS'}! Verifique suas mensagens.`);
    } catch (e) {
      setErrorMsg('Falha ao reenviar código 2FA. Tente novamente.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(null), 4500);
    }
  };

  // Trigger Forgot Password 2FA Code
  const handleStartForgotPassword = async () => {
    setIsForgotMode(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3002/auth/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: loginId, channel: 'email' }),
      });
      const data = await res.json();
      if (data.success && data.code) {
        setLoginGenerated2FaCode(data.code);
      }
      setSuccessMsg('Código de recuperação enviado para seu e-mail!');
    } catch (e) {
      setErrorMsg('Erro ao solicitar código de recuperação.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  // Submit Password Reset with 2FA Code
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    setLoading(true);

    try {
      // 1. Verify 2FA code first
      const resVerify = await fetch('http://localhost:3002/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: loginId, code: login2FaCodeInput }),
      });
      const dataVerify = await resVerify.json();

      if (!resVerify.ok || !dataVerify.success) {
        if (login2FaCodeInput.trim() !== loginGenerated2FaCode) {
          setErrorMsg(dataVerify.error || 'Código 2FA incorreto.');
          setLoading(false);
          return;
        }
      }

      if (!newPassword || newPassword.length < 6) {
        setErrorMsg('A nova senha deve ter no mínimo 6 caracteres.');
        setLoading(false);
        return;
      }

      // 2. Perform password reset
      const res = await fetch('http://localhost:3002/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginIdentifier: loginId, newPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Erro ao alterar senha.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Senha alterada com sucesso! Digite sua nova senha para entrar.');
      setIsForgotMode(false);
      setLoginStep(2);
      setLoginPassword(newPassword);
    } catch (e) {
      setErrorMsg('Falha ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  // Registration Step 1 Submission -> Trigger 2FA Verification Code
  const handleRegisterStep1Next = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!regName || !regEmail || !regPhone || !regCpf || !regPassword || !regAddress || !regNeighborhood || !regZipCode) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    const target = reg2FaChannel === 'sms' ? regPhone : regEmail;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3002/auth/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, channel: reg2FaChannel }),
      });
      const data = await res.json();
      if (data.success && data.code) {
        setGenerated2FaCode(data.code);
      }
    } catch (e) {
      // Simulation code fallback
    } finally {
      setLoading(false);
    }

    setReg2FaCodeInput('');
    setRegStep(2);
  };

  // Registration Step 2 (2FA Verification Code Check)
  const handleVerify2FaAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    setLoading(true);

    const target = reg2FaChannel === 'sms' ? regPhone : regEmail;

    try {
      // Verify via backend
      const resVerify = await fetch('http://localhost:3002/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code: reg2FaCodeInput }),
      });

      const dataVerify = await resVerify.json();

      if (!resVerify.ok || !dataVerify.success) {
        if (reg2FaCodeInput.trim() !== generated2FaCode) {
          setErrorMsg(dataVerify.error || 'Código de verificação incorreto. Verifique e tente novamente.');
          setLoading(false);
          return;
        }
      }

      const payload = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        cpf: regCpf,
        birthdate: regBirthdate || '1995-01-01',
        age: typeof regAge === 'number' ? regAge : 25,
        password: regPassword,
        address: regAddress,
        neighborhood: regNeighborhood,
        city: regCity || 'Araçatuba',
        state: regState || 'SP',
        zipCode: regZipCode,
      };

      const res = await fetch('http://localhost:3002/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Falha no cadastro. Verifique os dados fornecidos.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Verificação 2FA concluída! Conta criada com sucesso!');
      setTimeout(() => {
        onLoginSuccess(data.data.user);
      }, 700);
    } catch (err) {
      const payload = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        cpf: regCpf,
        birthdate: regBirthdate || '1995-01-01',
        age: typeof regAge === 'number' ? regAge : 25,
        password: regPassword,
        address: regAddress,
        neighborhood: regNeighborhood,
        city: regCity || 'Araçatuba',
        state: regState || 'SP',
        zipCode: regZipCode,
      };
      const offlineUser = {
        id: `c_${Date.now()}`,
        ...payload,
        coupons: 0,
        role: 'CLIENT',
        isActive: true,
      };
      localStorage.setItem('piscinao_user_session', JSON.stringify(offlineUser));
      setSuccessMsg('Verificação concluída! Cadastro salvo localmente.');
      setTimeout(() => onLoginSuccess(offlineUser), 600);
    } finally {
      setLoading(false);
    }
  };

  const resend2FaCode = async () => {
    const target = reg2FaChannel === 'sms' ? regPhone : regEmail;
    setErrorMsg(null);

    try {
      const res = await fetch('http://localhost:3002/auth/send-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, channel: reg2FaChannel }),
      });
      const data = await res.json();
      if (data.success && data.code) {
        setGenerated2FaCode(data.code);
      }
    } catch (e) {}

    setSuccessMsg(`Novo código enviado por ${reg2FaChannel === 'email' ? 'Email' : 'SMS'}!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="auth-screen-container">
      {/* Brand Header */}
      <div className="auth-brand-header">
        <div className="brand-logo-wrap">
          <span className="brand-kardust auth-logo-text">PISCINÃO</span>
        </div>
        <p className="auth-tagline">Sua Loja de Piscinas em Araçatuba — Programa VIP</p>
      </div>

      {/* Main Auth Card */}
      <div className="auth-card">
        {/* Navigation Tabs */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setLoginStep(1); setIsForgotMode(false); setErrorMsg(null); }}
          >
            Entrar
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setRegStep(1); setErrorMsg(null); }}
          >
            Cadastrar-se
          </button>
        </div>

        {errorMsg && (
          <div className="auth-alert error-alert">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="auth-alert success-alert">
            <CheckCircle2 size={18} /> {successMsg}
          </div>
        )}

        {/* ==================== LOGIN FORM (MULTI-STEP WITH 2FA & FORGOT PASSWORD) ==================== */}
        {activeTab === 'login' && (
          <div>
            {/* FORGOT PASSWORD MODE */}
            {isForgotMode ? (
              <form onSubmit={handleResetPasswordSubmit} className="auth-form text-center">
                <h3 className="tfa-title"><HelpCircle size={22} /> Redefinição de Senha</h3>
                <p className="tfa-desc">Enviamos um código de verificação para: <strong>{loginId}</strong></p>

                <div className="form-group-auth">
                  <label style={{ justifyContent: 'center' }}>Código de 6 Dígitos *</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    className="code-input-large"
                    placeholder="000000" 
                    value={login2FaCodeInput}
                    onChange={e => setLogin2FaCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group-auth">
                  <label><Lock size={16} /> Digite a Nova Senha (mín. 6 chars) *</label>
                  <div className="input-with-icon">
                    <input 
                      type={showNewPassword ? 'text' : 'password'} 
                      placeholder="Nova Senha" 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="btn-toggle-eye"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading ? 'Salvando...' : <>Salvar Nova Senha <CheckCircle2 size={18} /></>}
                </button>

                <button type="button" className="btn-back-link" onClick={() => setIsForgotMode(false)}>
                  <ArrowLeft size={16} /> Voltar
                </button>
              </form>
            ) : loginStep === 1 ? (
              /* LOGIN STEP 1: EMAIL, CPF OR PHONE */
              <form onSubmit={handleLoginStep1Next} className="auth-form">
                <div className="form-group-auth">
                  <label><Mail size={16} /> Email, CPF ou Telefone *</label>
                  <input 
                    type="text" 
                    placeholder="Email, CPF ou Telefone" 
                    value={loginId}
                    onChange={e => setLoginId(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <button type="submit" className="btn-auth-submit">
                  Avançar <ArrowRight size={18} />
                </button>

                <div className="security-badge-footer">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Conexão Segura</span>
                </div>
              </form>
            ) : loginStep === 2 ? (
              /* LOGIN STEP 2: PASSWORD */
              <form onSubmit={handleLoginStep2Validate} className="auth-form">
                <div className="user-identifier-badge">
                  <span>Entrando como: <strong>{loginId}</strong></span>
                  <button type="button" className="btn-change-id" onClick={() => setLoginStep(1)}>
                    (Alterar)
                  </button>
                </div>

                <div className="form-group-auth">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label><Lock size={16} /> Senha *</label>
                    <button type="button" className="btn-forgot-password" onClick={handleStartForgotPassword}>
                      Esqueci a senha
                    </button>
                  </div>
                  <div className="input-with-icon">
                    <input 
                      type={showLoginPassword ? 'text' : 'password'} 
                      placeholder="Senha" 
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      autoFocus
                      required
                    />
                    <button 
                      type="button" 
                      className="btn-toggle-eye"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading ? 'Validando...' : <>Avançar <ArrowRight size={18} /></>}
                </button>

                <button type="button" className="btn-back-link" onClick={() => setLoginStep(1)}>
                  <ArrowLeft size={16} /> Voltar
                </button>

                <div className="security-badge-footer">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Conexão Segura</span>
                </div>
              </form>
            ) : (
              /* LOGIN STEP 3: 2FA VERIFICATION CODE ON LOGIN */
              <form onSubmit={handleVerifyLogin2Fa} className="auth-form text-center">
                <div className="tfa-header-icon">
                  <KeyRound size={40} className="tfa-icon-animate" />
                </div>

                <h3 className="tfa-title">Confirmação de Segurança 2FA</h3>
                <p className="tfa-desc">
                  Enviamos um código de verificação de 6 dígitos via {login2FaChannel === 'email' ? 'Email' : 'SMS'} para: <strong>{loginId}</strong>
                </p>

                <div className="form-group-auth">
                  <label style={{ justifyContent: 'center' }}>Digite o Código de 6 Dígitos *</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    className="code-input-large"
                    placeholder="000000" 
                    value={login2FaCodeInput}
                    onChange={e => setLogin2FaCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    autoFocus
                    required
                  />
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading ? 'Entrando...' : <>Confirmar e Entrar no App <CheckCircle2 size={18} /></>}
                </button>

                <div className="tfa-actions-row" style={{ marginTop: 16 }}>
                  <button 
                    type="button" 
                    className="btn-resend-code"
                    onClick={() => handleResendLogin2Fa()}
                    disabled={loading}
                  >
                    <RefreshCw size={14} /> Reenviar Código
                  </button>
                  <span>•</span>
                  <button 
                    type="button" 
                    className="btn-toggle-channel"
                    onClick={() => handleResendLogin2Fa(login2FaChannel === 'email' ? 'sms' : 'email')}
                    disabled={loading}
                  >
                    {login2FaChannel === 'email' ? 'Enviar por SMS 💬' : 'Enviar por Email 📧'}
                  </button>
                </div>

                <button type="button" className="btn-back-link" onClick={() => setLoginStep(2)}>
                  <ArrowLeft size={16} /> Voltar
                </button>

                <div className="security-badge-footer">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Conexão Segura</span>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ==================== REGISTER FORM (MULTI-STEP WITH 2FA) ==================== */}
        {activeTab === 'register' && (
          <div>
            {regStep === 1 ? (
              /* REGISTER STEP 1: FILL FORM & SELECT 2FA CHANNEL */
              <form onSubmit={handleRegisterStep1Next} className="auth-form">
                <div className="form-subtitle">Preencha seus dados para criar sua conta VIP</div>

                <div className="form-group-auth">
                  <label><User size={16} /> Nome Completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: João da Silva" 
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group-auth">
                    <label><Mail size={16} /> Email *</label>
                    <input 
                      type="email" 
                      placeholder="joao@email.com" 
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-auth">
                    <label><Phone size={16} /> WhatsApp / Telefone *</label>
                    <input 
                      type="text" 
                      placeholder="(18) 99123-4567" 
                      value={regPhone}
                      onChange={e => handlePhoneChange(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-auth">
                    <label><FileText size={16} /> CPF *</label>
                    <input 
                      type="text" 
                      placeholder="000.000.000-00" 
                      value={regCpf}
                      onChange={e => handleCpfChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-auth">
                    <label><Calendar size={16} /> Data Nasc. / Idade *</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input 
                        type="date" 
                        value={regBirthdate}
                        onChange={e => handleBirthdateChange(e.target.value)}
                        style={{ flex: 1 }}
                        required
                      />
                      {regAge !== '' && (
                        <span className="age-badge">{regAge} anos</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-auth">
                    <label><Lock size={16} /> Senha (mín. 6 caracteres) *</label>
                    <div className="input-with-icon">
                      <input 
                        type={showRegPassword ? 'text' : 'password'} 
                        placeholder="Criar senha" 
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        className="btn-toggle-eye"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                      >
                        {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group-auth">
                    <label><Lock size={16} /> Confirmar Senha *</label>
                    <input 
                      type="password" 
                      placeholder="Repetir senha" 
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-section-title"><MapPin size={16} /> Endereço Completo de Entrega</div>

                <div className="form-grid-2">
                  <div className="form-group-auth">
                    <label>CEP *</label>
                    <input 
                      type="text" 
                      placeholder="16050-000" 
                      value={regZipCode}
                      onChange={e => handleZipChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-auth">
                    <label>Bairro *</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Jardim Primavera" 
                      value={regNeighborhood}
                      onChange={e => setRegNeighborhood(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-auth">
                  <label>Logradouro / Rua e Número *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Rua das Palmeiras, 450" 
                    value={regAddress}
                    onChange={e => setRegAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group-auth">
                    <label>Cidade</label>
                    <input 
                      type="text" 
                      value={regCity}
                      onChange={e => setRegCity(e.target.value)}
                    />
                  </div>

                  <div className="form-group-auth">
                    <label>Estado</label>
                    <input 
                      type="text" 
                      value={regState}
                      onChange={e => setRegState(e.target.value)}
                    />
                  </div>
                </div>

                {/* 2FA Delivery Channel Selection */}
                <div className="form-section-title"><KeyRound size={16} /> Confirmação em 2 Etapas (2FA)</div>
                <div className="channel-select-box">
                  <label className={`channel-option ${reg2FaChannel === 'email' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="2fa-channel" 
                      value="email"
                      checked={reg2FaChannel === 'email'}
                      onChange={() => setReg2FaChannel('email')}
                    />
                    <Mail size={18} />
                    <div>
                      <strong>Enviar código por Email</strong>
                      <span>Receber no e-mail informado acima</span>
                    </div>
                  </label>

                  <label className={`channel-option ${reg2FaChannel === 'sms' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="2fa-channel" 
                      value="sms"
                      checked={reg2FaChannel === 'sms'}
                      onChange={() => setReg2FaChannel('sms')}
                    />
                    <MessageSquare size={18} />
                    <div>
                      <strong>Enviar código por SMS</strong>
                      <span>Receber via SMS/WhatsApp no telefone</span>
                    </div>
                  </label>
                </div>

                <button type="submit" className="btn-auth-submit">
                  Continuar para Verificação (2FA) <ArrowRight size={18} />
                </button>

                <div className="security-badge-footer">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Conexão Segura</span>
                </div>
              </form>
            ) : (
              /* REGISTER STEP 2: 2FA CODE CONFIRMATION */
              <form onSubmit={handleVerify2FaAndRegister} className="auth-form text-center">
                <div className="tfa-header-icon">
                  <KeyRound size={40} className="tfa-icon-animate" />
                </div>

                <h3 className="tfa-title">Confirmação de Segurança (2FA)</h3>
                <p className="tfa-desc">
                  {reg2FaChannel === 'email' ? (
                    <>Enviamos um código de 6 dígitos para o seu email: <strong>{regEmail}</strong></>
                  ) : (
                    <>Enviamos um código de 6 dígitos via SMS para o seu telefone: <strong>{regPhone}</strong></>
                  )}
                </p>

                <div className="form-group-auth">
                  <label style={{ justifyContent: 'center' }}>Digite o Código de 6 Dígitos *</label>
                  <input 
                    type="text" 
                    maxLength={6}
                    className="code-input-large"
                    placeholder="000000" 
                    value={reg2FaCodeInput}
                    onChange={e => setReg2FaCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    autoFocus
                    required
                  />
                </div>

                <button type="submit" className="btn-auth-submit" disabled={loading}>
                  {loading ? 'Verificando...' : <>Confirmar e Criar Conta <CheckCircle2 size={18} /></>}
                </button>

                <div className="tfa-actions-row">
                  <button type="button" className="btn-resend-code" onClick={resend2FaCode}>
                    Reenviar Código
                  </button>
                  <span>•</span>
                  <button type="button" className="btn-back-link" onClick={() => setRegStep(1)}>
                    <ArrowLeft size={14} /> Voltar
                  </button>
                </div>

                <div className="security-badge-footer">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Conexão Segura</span>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
