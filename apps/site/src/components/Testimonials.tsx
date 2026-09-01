import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      name: 'Maria Silveira',
      neighborhood: 'Jd. Nova Iorque, Araçatuba',
      text: 'Excelente atendimento! A equipe do Piscinão nos auxiliou desde o projeto até a instalação da piscina de fibra. Foi super rápido e o resultado superou todas as expectativas da nossa família.',
      rating: 5,
      avatar: 'MS'
    },
    {
      name: 'Carlos Roberto',
      neighborhood: 'Vila Mendonça, Araçatuba',
      text: 'Compro cloro e produtos de tratamento no Piscinão há mais de 10 anos. Eles fazem o teste da água na hora e indicam exatamente a dosagem certa sem desperdício.',
      rating: 5,
      avatar: 'CR'
    },
    {
      name: 'Ana Paula Zanini',
      neighborhood: 'Condomínio Quinta da Mata, Birigui',
      text: 'Instalamos o trocador de calor e o robô aspirador. Agora nossa piscina fica quentinha o ano todo e a limpeza é 100% automática. Recomendo de olhos fechados!',
      rating: 5,
      avatar: 'AZ'
    }
  ];

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Depoimentos Reais</span>
          <h2 className="section-title">O que Dizem Nossos Clientes</h2>
          <p className="section-subtitle">
            Mais de 5.000 famílias atendidas em Araçatuba, Birigui e toda a região.
          </p>
        </div>

        <div className="grid-3">
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="stars-row">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={18} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <Quote size={28} style={{ opacity: 0.2, color: 'var(--chocolate)' }} />
              </div>

              <p className="testimonial-quote">
                "{r.text}"
              </p>

              <div className="testimonial-author-box">
                <div className="author-avatar">{r.avatar}</div>
                <div className="author-info">
                  <h4>{r.name}</h4>
                  <p>{r.neighborhood}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
