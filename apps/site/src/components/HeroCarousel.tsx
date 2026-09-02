import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  isExternalWhatsApp?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/piscinao-fachada-wide.png',
    badge: '★ Loja Conceito Piscinão Araçatuba',
    title: 'Nova Loja Conceito',
    highlight: 'Piscinão Araçatuba',
    subtitle: 'Mais de 20 anos de história e confiança. Conheça nosso showroom completo com modelos de piscinas, equipamentos e químicos.',
    primaryCtaText: 'Ver Catálogo Completo',
    primaryCtaLink: '/produtos'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
    badge: '✦ Piscinas de Fibra & Vinil',
    title: 'Transforme seu Espaço em um',
    highlight: 'Resort Particular',
    subtitle: 'Modelos de 4m a 10m com prainha, bancos e garantia estrutural de até 15 anos. Instalação rápida e suporte completo.',
    primaryCtaText: 'Explorar Piscinas',
    primaryCtaLink: '/produtos?categoria=piscinas-fibra'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=85',
    badge: '☀️ Conforto Térmico o Ano Todo',
    title: 'Aquecimento Solar &',
    highlight: 'Trocadores de Calor',
    subtitle: 'Mantenha sua piscina na temperatura ideal 365 dias por ano com economia e tecnologia de ponta.',
    primaryCtaText: 'Ver Aquecedores',
    primaryCtaLink: '/produtos?categoria=aquecedores'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=85',
    badge: '🤖 Limpeza & Automação Inteligente',
    title: 'Robôs Aspiradores &',
    highlight: 'Água Sempre Cristalina',
    subtitle: 'Tecnologia que cuida da limpeza da sua piscina enquanto você apenas relaxa e aproveita com a família.',
    primaryCtaText: 'Conhecer Robôs',
    primaryCtaLink: '/produtos?categoria=robos-aspiradores'
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <div 
      className="hero-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-carousel-track">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div 
              key={slide.id} 
              className={`hero-slide ${isActive ? 'active' : ''}`}
            >
              {/* Grand Background Image */}
              <div 
                className="hero-slide-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Bottom/Side Luxury Gradient Bar (Non-obstructive) */}
              <div className="hero-slide-gradient" />

              {/* Elegant Lower Content Banner */}
              <div className="container hero-slide-content-wrap">
                <div className="hero-slide-glass-card">
                  <div className="hero-slide-badge">
                    <Sparkles size={14} />
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="hero-slide-title">
                    {slide.title} <span className="hero-slide-highlight">{slide.highlight}</span>
                  </h1>

                  <p className="hero-slide-subtitle">
                    {slide.subtitle}
                  </p>

                  <div className="hero-slide-actions">
                    <Link to={slide.primaryCtaLink} className="btn btn-primary btn-lg">
                      <span>{slide.primaryCtaText}</span>
                      <ArrowRight size={18} />
                    </Link>

                    <a 
                      href="https://wa.me/5518991024742?text=Ol%C3%A1%20Piscin%C3%A3o!%20Vi%20o%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20personalizado."
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-whatsapp btn-lg"
                    >
                      <MessageCircle size={20} />
                      <span>Falar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button 
        className="hero-carousel-nav prev"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        className="hero-carousel-nav next"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Pagination Dots */}
      <div className="hero-carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`hero-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
