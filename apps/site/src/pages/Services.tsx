import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { 
  Wrench, 
  Droplets, 
  Sparkles, 
  FlaskConical, 
  Hammer, 
  CalendarCheck,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Services() {
  const servicesList = [
    {
      icon: Wrench,
      title: 'Instalação de Piscinas de Fibra',
      desc: 'Execução completa da obra: preparação do terreno, escavação especializada, assentamento, nivelamento e hidráulica. Garantia estrutural de até 15 anos.',
      benefits: ['Instalação rápida e limpa em poucos dias', 'Garantia comprovada de fábrica', 'Suporte pós-instalação completo']
    },
    {
      icon: Droplets,
      title: 'Tratamento & Recuperação de Água',
      desc: 'Análise técnica de parâmetros químicos (pH, alcalinidade, cloro livre) e recuperação de águas verdes ou turvas para ficarem 100% cristalinas.',
      benefits: ['Equilíbrio químico exato sem desperdício', 'Produtos certificados e de alta pureza', 'Eliminação total de algas e bactérias']
    },
    {
      icon: Sparkles,
      title: 'Limpeza Profissional Especializada',
      desc: 'Limpeza física profunda com aspiração, escovação de paredes e bordas, retrolavagem de filtros e remoção de detritos com maquinário moderno.',
      benefits: ['Aspiração sem perda excessiva de água', 'Limpeza minuciosa de bordas e skimmers', 'Equipe treinada e uniformizada']
    },
    {
      icon: FlaskConical,
      title: 'Consultoria Química Gratuita',
      desc: 'Traga uma amostra da água da sua piscina em nossa loja em Araçatuba. Fazemos o teste na hora e fornecemos o relatório exato de dosagem.',
      benefits: ['Teste gratuito na loja física', 'Economia evitando uso incorreto de produtos', 'Orientação passo a passo para o proprietário']
    },
    {
      icon: Hammer,
      title: 'Reforma & Modernização de Piscinas',
      desc: 'Troca de vinil estampado, repintura em gel coat de piscinas de fibra, substituição de bombas antigas e instalação de iluminação em LED RGB.',
      benefits: ['Renovação visual completa', 'Troca por equipamentos econômicos', 'Instalação de cascatas e hidro']
    },
    {
      icon: CalendarCheck,
      title: 'Planos de Manutenção Preventiva',
      desc: 'Visitas periódicas (semanais ou quinzenais) para cuidar da sua piscina o ano todo, mantendo-a sempre pronta para o banho sem qualquer preocupação.',
      benefits: ['Visitas regulares com horário marcado', 'Monitoramento contínuo dos equipamentos', 'Tranquilidade total para sua família']
    }
  ];

  return (
    <main>
      <SEOHead 
        title="Serviços Especializados em Piscinas | Piscinão Araçatuba" 
        description="Instalação de piscinas, tratamento de água, limpeza profissional, consultoria química e reformas em Araçatuba e região." 
        path="/servicos" 
      />

      <div className="catalog-header-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Início', path: '/' }, { label: 'Serviços' }]} />
          <h1>Serviços Especializados</h1>
          <p className="editorial-title">"Cuidamos da sua piscina do projeto inicial à manutenção contínua."</p>
        </div>
      </div>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Excelência Técnica</span>
            <h2 className="section-title">Como Podemos Ajudar Você?</h2>
            <p className="section-subtitle">
              Soluções completas com profissionais treinados para garantir tranquilidade e segurança.
            </p>
          </div>

          <div className="grid-2">
            {servicesList.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={idx} 
                  style={{
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px 32px',
                    boxShadow: 'var(--shadow-xs)',
                    border: '1px solid var(--cream-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all var(--transition-normal)'
                  }}
                  className="service-card-hover"
                >
                  <div>
                    <div className="category-icon-wrapper" style={{ marginBottom: '20px' }}>
                      <Icon size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--chocolate)', marginBottom: '12px' }}>
                      {s.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
                      {s.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                      {s.benefits.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--chocolate)', fontWeight: 600 }}>
                          <CheckCircle2 size={16} color="var(--terracotta)" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/5518991024742?text=${encodeURIComponent(`Olá Piscinão! Gostaria de agendar ou orçar o serviço de ${s.title}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={18} />
                    <span>Agendar pelo WhatsApp</span>
                  </a>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '64px', background: 'var(--chocolate)', borderRadius: 'var(--radius-xl)', padding: '48px 36px', color: 'var(--white)', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '12px' }}>
              Precisa de um Serviço Personalizado?
            </h2>
            <p style={{ color: 'var(--cream-light)', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.05rem' }}>
              Fale diretamente com nossa equipe técnica de Araçatuba e receba um orçamento sob medida sem compromisso.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/5518991024742" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={22} />
                <span>Chamar no WhatsApp (18) 99102-4742</span>
              </a>
              <Link to="/contato" className="btn btn-outline-white btn-lg">
                <span>Formulário de Contato</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
