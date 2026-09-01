import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { Wrench, Droplets, Sparkles, FlaskConical, Hammer, CalendarCheck, MessageCircle } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: <Wrench size={48} className="text-primary mb-md" />,
      title: 'Instalação de Piscinas',
      description: 'Instalação profissional de piscinas de fibra com preparação de terreno, escavação, nivelamento e acabamento. Garantia de 5 anos no serviço.'
    },
    {
      icon: <Droplets size={48} className="text-primary mb-md" />,
      title: 'Tratamento de Água',
      description: 'Análise completa e tratamento químico da água. Balanceamento de pH, cloro, alcalinidade e combate a algas.'
    },
    {
      icon: <Sparkles size={48} className="text-primary mb-md" />,
      title: 'Limpeza Profissional',
      description: 'Serviço de limpeza completa: aspiração, escovação de bordas, limpeza de filtro e tratamento de choque.'
    },
    {
      icon: <FlaskConical size={48} className="text-primary mb-md" />,
      title: 'Consultoria Química',
      description: 'Orientação especializada sobre os produtos corretos e dosagens ideais para manter sua piscina sempre cristalina.'
    },
    {
      icon: <Hammer size={48} className="text-primary mb-md" />,
      title: 'Reforma e Reparo',
      description: 'Reparo de trincas, troca de vinil, substituição de equipamentos e modernização de sistemas antigos.'
    },
    {
      icon: <CalendarCheck size={48} className="text-primary mb-md" />,
      title: 'Manutenção Preventiva',
      description: 'Planos mensais e semanais de manutenção para manter sua piscina em perfeitas condições o ano todo.'
    }
  ];

  return (
    <main className="page-services">
      <SEOHead 
        title="Serviços | Piscinão Araçatuba" 
        description="Instalação, manutenção, limpeza e consultoria química para sua piscina." 
        path="/servicos" 
      />
      
      <div className="container py-lg">
        <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Serviços' }]} />
        
        <section className="hero-services text-center py-xl mb-md">
          <h1 className="h1 mb-md">Nossos Serviços</h1>
          <p className="h4 text-muted max-w-md mx-auto">Cuidamos da sua piscina do início ao fim</p>
        </section>

        <section className="services-grid grid grid-2 gap-xl mb-xxl">
          {services.map((service, idx) => (
            <div key={idx} className="service-card p-lg bg-cream border-radius-lg border border-transparent hover:border-primary transition flex flex-column h-100">
              {service.icon}
              <h3 className="h4 mb-sm">{service.title}</h3>
              <p className="text-muted mb-lg flex-grow-1">{service.description}</p>
              <a 
                href={`https://wa.me/5518991024742?text=Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary font-bold flex align-center gap-xs hover:text-dark transition"
              >
                <MessageCircle size={18} />
                Agendar pelo WhatsApp
              </a>
            </div>
          ))}
        </section>

        <section className="cta-services bg-dark text-white text-center py-xl border-radius-lg">
          <h2 className="h2 mb-md text-white">Precisa de um serviço personalizado?</h2>
          <p className="mb-lg opacity-80 max-w-md mx-auto">Nossa equipe está pronta para avaliar sua necessidade e propor a melhor solução.</p>
          <a href="https://wa.me/5518991024742" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg flex align-center justify-center gap-sm mx-auto max-w-xs">
            <MessageCircle size={24} />
            Falar com Especialista
          </a>
        </section>
      </div>
    </main>
  );
};
