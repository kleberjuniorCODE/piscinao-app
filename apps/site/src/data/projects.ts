export interface PoolProject {
  id: string;
  title: string;
  model: string;
  location: string;
  dimensions: string;
  category: 'deck' | 'cascata' | 'gourmet' | 'led' | 'compacta';
  categoryLabel: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export const poolProjects: PoolProject[] = [
  {
    id: 'proj-01',
    title: 'Piscina Tropical com Deck em Cumaru & Cascata',
    model: 'Piscina Tropical 6.000L',
    location: 'Residencial Alphaville • Araçatuba - SP',
    dimensions: '6,00m × 3,00m × 1,40m',
    category: 'deck',
    categoryLabel: 'Com Deck de Madeira',
    description: 'Integração completa da piscina de fibra com deck de madeira nobre, cascata em inox 60cm e iluminação LED RGB subaquática para banhos noturnos.',
    features: ['Deck de Madeira Cumaru', 'Cascata Inox 60cm', 'Iluminação LED RGB', 'Filtro & Bomba CMB 1 CV'],
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-02',
    title: 'Piscina Marajó com Prainha Molhada & Aquecimento',
    model: 'Piscina Marajó 12.000L',
    location: 'Condomínio Quinta da Mata • Birigui - SP',
    dimensions: '8,00m × 4,00m × 1,60m',
    category: 'gourmet',
    categoryLabel: 'Área Gourmet Integrada',
    description: 'Projeto de grande porte com prainha para espreguiçadeiras dentro d\'água, trocador de calor de 25.000 BTU e integração direta à varanda gourmet.',
    features: ['Prainha Molhada para Espreguiçadeiras', 'Aquecedor 25k BTU', 'Borda Atérmica', 'Automação de Filtro'],
    imageUrl: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-03',
    title: 'Piscina Oásis em Espaço Compacto Residencial',
    model: 'Piscina Oásis Compacta 3.500L',
    location: 'Jardim Nova Iorque • Araçatuba - SP',
    dimensions: '4,00m × 2,50m × 1,20m',
    category: 'compacta',
    categoryLabel: 'Espaço Compacto',
    description: 'Solução sob medida para quintais compactos com aproveitamento inteligente do espaço, paisagismo lateral e hidroterapia.',
    features: ['Instalação Rápida em 4 Dias', 'Bicos de Hidromassagem', 'Piso Antiderrapante', 'Capa Térmica Protetora'],
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-04',
    title: 'Projeto Vinil Mosaico com Cascata & Paisagismo',
    model: 'Alvenaria com Vinil Premium 0.8mm',
    location: 'Vila Mendonça • Araçatuba - SP',
    dimensions: '7,00m × 3,50m × 1,50m',
    category: 'cascata',
    categoryLabel: 'Borda & Cascata',
    description: 'Revestimento em vinil estampado imitando mosaico cerâmico com cascata embutida na parede de pedra natural e jardinagem tropical.',
    features: ['Vinil 0.8mm Alta Resistência', 'Parede de Pedra com Cascata', 'Clorador Salino Ecológico', 'Refletores LED White'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-05',
    title: 'Piscina Lagoa Premium com Iluminação Noturna',
    model: 'Piscina Lagoa Premium 18.000L',
    location: 'Chácaras Alvorada • Araçatuba - SP',
    dimensions: '10,00m × 5,00m × 1,80m',
    category: 'led',
    categoryLabel: 'Iluminação Noturna',
    description: 'Estrutura ampla e profunda ideal para natação e grandes encontros de família, com sistema de refletores subaquáticos controlados por smartphone.',
    features: ['Dimensão Monumental 10m', 'Controle Remoto de Cores', 'Aquecimento Solar 8m²', 'Robô Aspirador Automático'],
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-06',
    title: 'Piscina Tropical com Espaço Gourmet & Pergolado',
    model: 'Piscina Tropical 6.000L',
    location: 'Residencial Ipanema • Araçatuba - SP',
    dimensions: '6,00m × 3,00m × 1,40m',
    category: 'gourmet',
    categoryLabel: 'Área Gourmet Integrada',
    description: 'Ambiente aconchegante com pergolado de madeira, churrasqueira, ducha externa em inox e piscina com água aquecida o ano todo.',
    features: ['Ducha Externa em Inox', 'Pergolado de Madeira', 'Aquecedor 25.000 BTU', 'Tratamento Fácil com Cloro Granulado'],
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
  }
];
