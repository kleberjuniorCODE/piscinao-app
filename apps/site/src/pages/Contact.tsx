import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { MapPin, Phone, MessageCircle, Clock, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: 'Orçamento de Piscina',
    mensagem: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: 'Orçamento de Piscina',
        mensagem: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 500);
  };

  return (
    <main className="page-contact">
      <SEOHead 
        title="Contato | Piscinão Araçatuba" 
        description="Entre em contato com o Piscinão Araçatuba. Visite nossa loja ou fale conosco pelo WhatsApp." 
        path="/contato" 
      />
      
      <div className="container py-lg">
        <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Contato' }]} />
        
        <section className="contact-header text-center py-xl mb-md">
          <h1 className="h1 mb-md">Entre em Contato</h1>
          <p className="h4 text-muted max-w-md mx-auto">Estamos prontos para atender você</p>
        </section>

        <section className="contact-content grid grid-2 gap-xl mb-xxl align-start">
          <div className="contact-form-wrapper bg-cream p-lg border-radius-lg">
            <h2 className="h3 mb-lg">Envie uma Mensagem</h2>
            
            {submitted ? (
              <div className="alert bg-success-light text-success p-md border-radius-md font-bold text-center">
                Mensagem enviada! Entraremos em contato em breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-column gap-md">
                <div className="form-group">
                  <label htmlFor="nome" className="d-block mb-xs font-bold text-sm">Nome Completo</label>
                  <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="form-control w-100" />
                </div>
                
                <div className="grid grid-2 gap-md">
                  <div className="form-group">
                    <label htmlFor="email" className="d-block mb-xs font-bold text-sm">E-mail</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-control w-100" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefone" className="d-block mb-xs font-bold text-sm">Telefone</label>
                    <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required className="form-control w-100" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="assunto" className="d-block mb-xs font-bold text-sm">Assunto</label>
                  <select id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required className="form-control w-100">
                    <option value="Orçamento de Piscina">Orçamento de Piscina</option>
                    <option value="Orçamento de Equipamentos">Orçamento de Equipamentos</option>
                    <option value="Serviço de Manutenção">Serviço de Manutenção</option>
                    <option value="Dúvida sobre Produto">Dúvida sobre Produto</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensagem" className="d-block mb-xs font-bold text-sm">Mensagem</label>
                  <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} required className="form-control w-100" rows={5}></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-sm">Enviar Mensagem</button>
              </form>
            )}
          </div>

          <div className="contact-info-cards flex flex-column gap-md">
            <div className="info-card bg-white border p-md border-radius-md flex align-start gap-md">
              <div className="icon-wrapper bg-cream p-sm border-radius-circle text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="h6 mb-xs">Endereço</h3>
                <p className="text-muted text-sm">Araçatuba - SP<br/>(Endereço completo a confirmar)</p>
              </div>
            </div>

            <div className="info-card bg-white border p-md border-radius-md flex align-start gap-md">
              <div className="icon-wrapper bg-cream p-sm border-radius-circle text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="h6 mb-xs">Telefone</h3>
                <a href="tel:+5518991024742" className="text-muted text-sm hover:text-primary transition">(18) 99102-4742</a>
              </div>
            </div>

            <div className="info-card bg-white border p-md border-radius-md flex align-start gap-md">
              <div className="icon-wrapper bg-cream p-sm border-radius-circle text-primary">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="h6 mb-xs">WhatsApp</h3>
                <a href="https://wa.me/5518991024742" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:text-primary transition">(18) 99102-4742</a>
              </div>
            </div>

            <div className="info-card bg-white border p-md border-radius-md flex align-start gap-md">
              <div className="icon-wrapper bg-cream p-sm border-radius-circle text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="h6 mb-xs">Horário</h3>
                <p className="text-muted text-sm">Seg a Sex: 8h às 18h<br/>Sáb: 8h às 12h</p>
              </div>
            </div>

            <div className="info-card bg-white border p-md border-radius-md flex align-start gap-md">
              <div className="icon-wrapper bg-cream p-sm border-radius-circle text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="h6 mb-xs">E-mail</h3>
                <a href="mailto:contato@piscinao.com" className="text-muted text-sm hover:text-primary transition">contato@piscinao.com</a>
              </div>
            </div>
          </div>
        </section>

        <section className="map-section border-radius-lg overflow-hidden border">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118895.29960498495!2d-50.50!3d-21.21!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94964344075b630b%3A0xc3b44b82d02c813!2sAra%C3%A7atuba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714580000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="400" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Piscinão Araçatuba"
          ></iframe>
        </section>
      </div>
    </main>
  );
};
