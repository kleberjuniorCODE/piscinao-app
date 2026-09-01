import { useState, FormEvent } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, MessageCircle, Clock, Mail, Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Orçamento de Piscina',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <SEOHead 
        title="Fale Conosco — Contato & Localização | Piscinão Araçatuba" 
        description="Entre em contato com o Piscinão Araçatuba. Atendimento presencial e online via WhatsApp para orçamentos e dúvidas." 
        path="/contato" 
      />

      <div className="catalog-header-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Contato' }]} />
          <h1>Entre em Contato</h1>
          <p className="editorial-title">"Estamos prontos para atender você e realizar seu projeto."</p>
        </div>
      </div>

      <section className="section bg-cream">
        <div className="container">
          <div className="contact-grid-container">
            
            {/* Contact Form */}
            <div className="contact-form-card">
              <h2 style={{ fontSize: '1.75rem', color: 'var(--chocolate)', marginBottom: '8px' }}>
                Envie uma Mensagem
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
                Preencha o formulário abaixo e nossa equipe técnica retornará em até 2 horas úteis.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--cream)', borderRadius: 'var(--radius-lg)' }}>
                  <CheckCircle2 size={54} color="var(--whatsapp)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: 'var(--chocolate)', marginBottom: '8px' }}>Mensagem Enviada com Sucesso!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Obrigado pelo contato, {formData.name}. Em breve nossa equipe entrará em contato via WhatsApp/E-mail.
                  </p>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Orçamento de Piscina', message: '' });
                    }}
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: João da Silva" 
                      className="form-control"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input 
                        type="email" 
                        required
                        placeholder="seuemail@exemplo.com" 
                        className="form-control"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Telefone / WhatsApp</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="(18) 99999-9999" 
                        className="form-control"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Assunto de Interesse</label>
                    <select 
                      className="form-control"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Orçamento de Piscina">Orçamento de Piscina de Fibra</option>
                      <option value="Aquecedor Solar/Gás">Aquecimento de Piscina</option>
                      <option value="Filtros e Bombas">Filtros, Bombas e Automação</option>
                      <option value="Robôs Aspiradores">Robôs Aspiradores</option>
                      <option value="Tratamento Químico">Produtos Químicos & Tratamento</option>
                      <option value="Serviços & Manutenção">Serviços e Manutenção</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mensagem / Dimensões do Espaço</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Conte-nos sobre o que você precisa ou as medidas do seu espaço..."
                      className="form-control"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={18} />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Cards */}
            <div>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--chocolate)', marginBottom: '24px' }}>
                Canais de Atendimento
              </h2>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Endereço da Loja</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Araçatuba - SP • Região Noroeste Paulista</p>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box" style={{ background: 'rgba(37, 211, 102, 0.15)', color: 'var(--whatsapp)' }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>WhatsApp Direto</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>(18) 99102-4742 (Atendimento imediato)</p>
                  <a 
                    href="https://wa.me/5518991024742" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ color: 'var(--whatsapp-dark)', fontWeight: 700, fontSize: '0.85rem' }}
                  >
                    Iniciar Conversa no WhatsApp →
                  </a>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Telefone Comercial</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(18) 99102-4742</p>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>Horário de Funcionamento</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Segunda a Sexta: 08:00 às 18:00</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sábado: 08:00 às 12:00</p>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'var(--chocolate)', fontSize: '1.05rem', marginBottom: '4px' }}>E-mail Oficial</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>contato@piscinao.com</p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Google Maps */}
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118895.29960498495!2d-50.5085!3d-21.2089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94966cae026c2e3d%3A0xc3924c55986968d9!2sAra%C3%A7atuba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Localização Piscinão Araçatuba"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
