import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const items = [
    {
      id: 1,
      text: "Excelente atendimento! A equipe do Piscinão nos ajudou a escolher a piscina perfeita para nossa casa. Instalação impecável.",
      author: "Maria S.",
      location: "Jd. Nova Iorque, Araçatuba",
      rating: 5
    },
    {
      id: 2,
      text: "Compro todos os produtos de tratamento aqui há 10 anos. Preço justo e sempre tem tudo que preciso.",
      author: "Carlos R.",
      location: "Vila Mendonça, Araçatuba",
      rating: 5
    },
    {
      id: 3,
      text: "O serviço de manutenção é nota 10. Minha piscina está sempre cristalina graças à consultoria química deles.",
      author: "Ana P.",
      location: "Conj. Habitacional, Birigui",
      rating: 5
    }
  ];

  return (
    <div className="testimonials-grid">
      {items.map(item => (
        <div key={item.id} className="testimonial-card">
          <Quote className="testimonial-icon" size={32} />
          <p className="testimonial-text">{item.text}</p>
          <div className="testimonial-footer">
            <div className="testimonial-author-info">
              <span className="testimonial-author">{item.author}</span>
              <span className="testimonial-location">{item.location}</span>
            </div>
            <div className="testimonial-rating">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
