import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const milestones = [
    {
      year: '2004',
      title: 'Fundação em Araçatuba',
      desc: 'Inauguração da primeira unidade em Araçatuba focada no comércio de produtos químicos e manutenção.'
    },
    {
      year: '2010',
      title: 'Expansão para Piscinas de Fibra',
      desc: 'Início da comercialização e instalação própria de modelos de piscinas de fibra e alvenaria estruturada.'
    },
    {
      year: '2018',
      title: 'Serviços Especializados & Automação',
      desc: 'Criação da equipe de engenharia e consultoria para automação, aquecedores e robôs inteligentes.'
    },
    {
      year: '2024+',
      title: 'Mais de 20 Anos de Confiança',
      desc: 'Celebração de duas décadas de liderança com mais de 5.000 clientes e nova loja conceito.'
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Confiança & Transparência',
      desc: 'Relacionamento sólido, garantia de até 15 anos e compromisso absoluto com o que prometemos.'
    },
    {
      icon: Award,
      title: 'Qualidade Rigorosa',
      desc: 'Apenas os melhores materiais em PRFV, bombas com alta eficiência e químicos homologados.'
    },
    {
      icon: HeartHandshake,
      title: 'Dedicação ao Cliente',
      desc: 'Suporte continuado após a entrega. Estamos presentes em todas as etapas da sua área de lazer.'
    }
  ];

  return (
    <main>
      <SEOHead 
        title="Quem Somos — Nossa História | Piscinão Araçatuba" 
        description="Conheça a trajetória de mais de 20 anos do Piscinão em Araçatuba e região. Tradição, qualidade e compromisso." 
        path="/sobre" 
      />

      <div className="catalog-header-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Quem Somos' }]} />
          <h1>Nossa História</h1>
          <p className="editorial-title">"Confiança que se constrói, há mais de duas décadas em Araçatuba."</p>
        </div>
      </div>

      {/* Main Story Section with Store Photo */}
      <section className="section bg-white">
        <div className="container">
          <div className="about-card-container">
            <div className="about-store-photo-box">
              <img 
                src="/images/piscinao-fachada.jpg" 
                alt="Loja Piscinão Araçatuba Fachada" 
                className="about-store-photo"
              />
            </div>

            <div>
              <span className="section-tag">Desde 2004</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
                O Sonho de Proporcionar Momentos Inesquecíveis
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '16px' }}>
                Fundado em 2004, o <strong>Piscinão Araçatuba</strong> nasceu da paixão por transformar quintais em verdadeiros refúgios de lazer, saúde e confraternização.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '24px' }}>
                Ao longo de mais de 20 anos, já realizamos mais de 500 instalações e atendemos mais de 5.000 clientes em Araçatuba, Birigui, Penápolis, Guararapes e toda a região noroeste do Estado de São Paulo.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--chocolate)', fontWeight: 700 }}>
                  <CheckCircle2 size={20} color="var(--terracotta)" />
                  <span>Equipe própria de instalação e suporte técnico</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--chocolate)', fontWeight: 700 }}>
                  <CheckCircle2 size={20} color="var(--terracotta)" />
                  <span>Garantia de até 15 anos na estrutura das piscinas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--chocolate)', fontWeight: 700 }}>
                  <CheckCircle2 size={20} color="var(--terracotta)" />
                  <span>Consultoria química gratuita e análise de água</span>
                </div>
              </div>

              <a 
                href="https://wa.me/5518991024742" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp"
              >
                <MessageCircle size={20} />
                <span>Conversar com Nossos Consultores</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pilares de Atuação</span>
            <h2 className="section-title">Nossos Valores</h2>
            <p className="section-subtitle">
              Princípios inegociáveis que norteiam cada atendimento e cada piscina entregue.
            </p>
          </div>

          <div className="grid-3">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="category-card" style={{ padding: '36px 24px', alignItems: 'flex-start', textAlign: 'left' }}>
                  <div className="category-icon-wrapper" style={{ marginBottom: '12px' }}>
                    <Icon size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--chocolate)', marginBottom: '8px' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Evolução</span>
            <h2 className="section-title">Linha do Tempo</h2>
            <p className="section-subtitle">Duas décadas de crescimento constante junto à comunidade.</p>
          </div>

          <div className="grid-4">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: 'var(--cream)', 
                  padding: '28px 20px', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--cream-dark)',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--chocolate)', marginBottom: '8px' }}>
                  {m.year}
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--chocolate)', marginBottom: '8px' }}>
                  {m.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-xl">
            <Link to="/produtos" className="btn btn-primary btn-lg">
              <span>Conheça Nossos Modelos de Piscinas</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
