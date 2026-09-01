import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { Shield, Award, Heart, MessageCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <main className="page-about">
      <SEOHead 
        title="Sobre Nós | Piscinão Araçatuba" 
        description="Conheça a história do Piscinão Araçatuba. Mais de 20 anos de tradição em piscinas e equipamentos." 
        path="/sobre" 
      />
      
      <div className="container py-lg">
        <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Sobre Nós' }]} />
        
        <section className="hero-about text-center py-xl">
          <h1 className="h1 playfair italic mb-md text-dark">Nossa História</h1>
          <p className="h4 text-muted max-w-md mx-auto">Confiança que se constrói, há mais de duas décadas</p>
        </section>

        <section className="story-section grid grid-2 gap-xl align-center mb-xxl">
          <div className="story-image bg-cream border-radius-lg aspect-square flex-center text-muted">
            <span>Imagem Fachada/Histórica</span>
          </div>
          <div className="story-content text-lg">
            <p className="mb-md">
              Fundado em 2004, o Piscinão Araçatuba nasceu do sonho de democratizar o acesso a piscinas de qualidade na região noroeste paulista. Começamos como uma pequena loja de produtos químicos e acessórios, e hoje somos referência completa em piscinas de fibra, equipamentos, instalação e manutenção.
            </p>
            <p className="mb-md">
              Nossa equipe é formada por profissionais especializados que acompanham cada projeto do início ao fim. Da escolha do modelo ideal para seu espaço até a instalação, tratamento da água e manutenção contínua — estamos ao lado dos nossos clientes em cada etapa.
            </p>
            <p>
              Com mais de 5.000 clientes atendidos e 500 projetos realizados, o Piscinão se orgulha de ser a escolha de famílias em Araçatuba, Birigui, Penápolis, Andradina e toda a região.
            </p>
          </div>
        </section>

        <section className="values-section bg-cream py-xl border-radius-lg mb-xxl px-lg">
          <h2 className="h2 text-center mb-xl">Nossos Valores</h2>
          <div className="grid grid-3 gap-lg">
            <div className="value-card text-center">
              <div className="icon-wrapper bg-white aspect-square border-radius-circle flex-center mx-auto mb-md" style={{ width: '80px' }}>
                <Shield size={40} className="text-gold" />
              </div>
              <h3 className="h4 mb-sm">Confiança</h3>
              <p className="text-muted">Relações transparentes e compromisso com o que prometemos aos nossos clientes.</p>
            </div>
            <div className="value-card text-center">
              <div className="icon-wrapper bg-white aspect-square border-radius-circle flex-center mx-auto mb-md" style={{ width: '80px' }}>
                <Award size={40} className="text-gold" />
              </div>
              <h3 className="h4 mb-sm">Qualidade</h3>
              <p className="text-muted">Trabalhamos apenas com as melhores marcas e profissionais capacitados.</p>
            </div>
            <div className="value-card text-center">
              <div className="icon-wrapper bg-white aspect-square border-radius-circle flex-center mx-auto mb-md" style={{ width: '80px' }}>
                <Heart size={40} className="text-gold" />
              </div>
              <h3 className="h4 mb-sm">Dedicação</h3>
              <p className="text-muted">Amamos o que fazemos e cuidamos do seu projeto como se fosse nosso.</p>
            </div>
          </div>
        </section>

        <section className="timeline-section mb-xxl">
          <h2 className="h2 text-center mb-xl">Linha do Tempo</h2>
          <div className="timeline flex flex-column gap-lg max-w-md mx-auto">
            <div className="timeline-item flex gap-md">
              <div className="timeline-year h4 text-gold font-bold min-w-100">2004</div>
              <div className="timeline-content">
                <h4 className="h5 mb-xs">Fundação</h4>
                <p className="text-muted">Inauguração da primeira loja em Araçatuba, focada em produtos químicos.</p>
              </div>
            </div>
            <div className="timeline-item flex gap-md">
              <div className="timeline-year h4 text-gold font-bold min-w-100">2010</div>
              <div className="timeline-content">
                <h4 className="h5 mb-xs">Expansão para Piscinas</h4>
                <p className="text-muted">Início da comercialização e instalação de piscinas de fibra.</p>
              </div>
            </div>
            <div className="timeline-item flex gap-md">
              <div className="timeline-year h4 text-gold font-bold min-w-100">2018</div>
              <div className="timeline-content">
                <h4 className="h5 mb-xs">Serviços Profissionais</h4>
                <p className="text-muted">Criação da equipe especializada em manutenção preventiva e reparos.</p>
              </div>
            </div>
            <div className="timeline-item flex gap-md">
              <div className="timeline-year h4 text-gold font-bold min-w-100">2024</div>
              <div className="timeline-content">
                <h4 className="h5 mb-xs">20 Anos de História</h4>
                <p className="text-muted">Celebração de duas décadas de sucesso e mais de 5.000 clientes.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section text-center py-xl bg-sky-blue text-white border-radius-lg">
          <h2 className="h2 mb-md text-white">Quer fazer parte dessa história?</h2>
          <p className="mb-lg h5 opacity-90">Deixe-nos ajudar a realizar o seu projeto.</p>
          <a href="https://wa.me/5518991024742" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg flex align-center justify-center gap-sm mx-auto max-w-xs">
            <MessageCircle size={24} />
            Fale com a gente
          </a>
        </section>
      </div>
    </main>
  );
};
