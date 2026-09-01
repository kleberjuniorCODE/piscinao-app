export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  shortDescription: string;
  specs: ProductSpec[];
  price: number;
  priceDiscount: number | null;
  installments: number;
  badges: string[];
  images: string[];
  relatedIds: string[];
  featured: boolean;
}

export type Category =
  | 'piscinas-fibra'
  | 'alvenaria-vinil'
  | 'aquecedores'
  | 'filtros-bombas'
  | 'quimicos'
  | 'robos-aspiradores'
  | 'acessorios';

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'piscinas-fibra',
    name: 'Piscinas de Fibra',
    icon: 'waves',
    description: "Piscinas de fibra de vidro com instalação rápida"
  },
  {
    id: 'alvenaria-vinil',
    name: 'Alvenaria e Vinil',
    icon: 'brick-wall',
    description: 'Piscinas de alvenaria com revestimento em vinil'
  },
  {
    id: 'aquecedores',
    name: 'Aquecedores',
    icon: 'thermometer-sun',
    description: "Aquecedores solares e a gás"
  },
  {
    id: 'filtros-bombas',
    name: 'Filtros e Bombas',
    icon: 'settings',
    description: "Sistemas de filtragem e bombas d'água"
  },
  {
    id: 'quimicos',
    name: "Produtos Químicos",
    icon: 'flask-conical',
    description: "Tratamento e manutenção da água"
  },
  {
    id: 'robos-aspiradores',
    name: "Robôs e Aspiradores",
    icon: 'bot',
    description: 'Limpeza automatizada de piscinas'
  },
  {
    id: 'acessorios',
    name: "Acessórios",
    icon: 'sparkles',
    description: "Iluminação, cascatas, capas e mais"
  }
];

export const products: Product[] = [
  {
    id: 'pf-001',
    slug: 'piscina-tropical-6000l',
    name: 'Piscina Tropical 6000L',
    category: 'piscinas-fibra',
    description: "Piscina de fibra de alta resistência com design moderno e acabamento premium. Ideal para famílias que buscam diversão e relaxamento no quintal de casa.",
    shortDescription: 'Piscina de fibra 6m com design moderno e resistente.',
    specs: [
      { label: 'Comprimento', value: '6.00m' },
      { label: 'Largura', value: '3.00m' },
      { label: 'Profundidade', value: '1.40m' },
      { label: 'Volume', value: '6.000 litros' },
      { label: 'Material', value: 'PRFV' },
      { label: 'Garantia', value: '15 anos' }
    ],
    price: 18900,
    priceDiscount: 16990,
    installments: 12,
    badges: ['MAIS VENDIDA'],
    images: ['/images/products/piscina-tropical-6000l-1.jpg', '/images/products/piscina-tropical-6000l-2.jpg'],
    relatedIds: ['pf-002', 'fb-003', 'qm-003'],
    featured: true
  },
  {
    id: 'pf-002',
    slug: 'piscina-marajo-12000l',
    name: "Piscina Marajó 12000L",
    category: 'piscinas-fibra',
    description: "Modelo espaçoso com prainha integrada e banco lateral. Perfeita para reunir a família e amigos com muito conforto e estilo.",
    shortDescription: 'Piscina ampla com prainha e banco lateral.',
    specs: [
      { label: 'Comprimento', value: '8.00m' },
      { label: 'Largura', value: '4.00m' },
      { label: 'Profundidade', value: '1.60m' },
      { label: 'Volume', value: '12.000 litros' },
      { label: 'Material', value: 'PRFV' },
      { label: 'Garantia', value: '15 anos' }
    ],
    price: 32500,
    priceDiscount: 28900,
    installments: 12,
    badges: ["LANÇAMENTO ✦"],
    images: ['/images/products/piscina-marajo-12000l-1.jpg'],
    relatedIds: ['pf-001', 'aq-001', 'fb-004'],
    featured: true
  },
  {
    id: 'pf-003',
    slug: 'piscina-oasis-compacta-3500l',
    name: "Piscina Oásis Compacta 3500L",
    category: 'piscinas-fibra',
    description: "Solução perfeita para quintais menores sem abrir mão da qualidade. Compacta, leve e com instalação rápida em poucos dias.",
    shortDescription: "Piscina compacta ideal para espaços reduzidos.",
    specs: [
      { label: 'Comprimento', value: '4.00m' },
      { label: 'Largura', value: '2.50m' },
      { label: 'Profundidade', value: '1.20m' },
      { label: 'Volume', value: '3.500 litros' },
      { label: 'Material', value: 'PRFV' },
      { label: 'Garantia', value: '15 anos' }
    ],
    price: 12500,
    priceDiscount: null,
    installments: 12,
    badges: ["IDEAL P/ ESPAÇOS PEQUENOS"],
    images: ['/images/products/piscina-oasis-compacta-3500l-1.jpg'],
    relatedIds: ['pf-001', 'fb-001', 'qm-001'],
    featured: false
  },
  {
    id: 'pf-004',
    slug: 'piscina-lagoa-premium-18000l',
    name: 'Piscina Lagoa Premium 18000L',
    category: 'piscinas-fibra',
    description: "O topo de linha em piscinas de fibra. Ampla, profunda e com acabamento premium para projetos de alto padrão.",
    shortDescription: 'Piscina premium de grande porte para projetos exclusivos.',
    specs: [
      { label: 'Comprimento', value: '10.00m' },
      { label: 'Largura', value: '5.00m' },
      { label: 'Profundidade', value: '1.80m' },
      { label: 'Volume', value: '18.000 litros' },
      { label: 'Material', value: 'PRFV' },
      { label: 'Garantia', value: '15 anos' }
    ],
    price: 48000,
    priceDiscount: 43200,
    installments: 12,
    badges: ['PREMIUM'],
    images: ['/images/products/piscina-lagoa-premium-18000l-1.jpg'],
    relatedIds: ['pf-002', 'aq-002', 'ac-001'],
    featured: false
  },
  {
    id: 'av-001',
    slug: 'kit-vinil-estampado-azul',
    name: 'Kit Vinil Estampado Azul 0.6mm',
    category: 'alvenaria-vinil',
    description: "Vinil estampado de 0.6mm de espessura com padrão azul clássico. Resistente a UV e tratamentos químicos. Ideal para reformas e novas construções.",
    shortDescription: "Vinil estampado padrão azul, resistente e acessível.",
    specs: [
      { label: 'Espessura', value: '0.6mm' },
      { label: "Padrão", value: "Azul Clássico" },
      { label: "Resistência UV", value: 'Sim' },
      { label: 'Garantia', value: '3 anos' }
    ],
    price: 2800,
    priceDiscount: null,
    installments: 6,
    badges: [],
    images: ['/images/products/kit-vinil-estampado-azul-1.jpg'],
    relatedIds: ['av-002', 'av-003'],
    featured: false
  },
  {
    id: 'av-002',
    slug: 'kit-vinil-premium-mosaico',
    name: 'Kit Vinil Premium 0.8mm Mosaico',
    category: 'alvenaria-vinil',
    description: "Vinil premium com 0.8mm de espessura e acabamento em mosaico cerâmico. Maior durabilidade e visual sofisticado para sua piscina.",
    shortDescription: "Vinil premium com estampa mosaico e espessura reforçada.",
    specs: [
      { label: 'Espessura', value: '0.8mm' },
      { label: "Padrão", value: "Mosaico Cerâmico" },
      { label: "Resistência UV", value: 'Sim' },
      { label: 'Garantia', value: '5 anos' }
    ],
    price: 4200,
    priceDiscount: 3780,
    installments: 6,
    badges: ['10% OFF'],
    images: ['/images/products/kit-vinil-premium-mosaico-1.jpg'],
    relatedIds: ['av-001', 'av-003'],
    featured: false
  },
  {
    id: 'av-003',
    slug: 'liner-sob-medida',
    name: 'Liner Sob Medida',
    category: 'alvenaria-vinil',
    description: "Fabricação personalizada de liner em vinil reforçado sob medida para qualquer formato de piscina. Consulte nossa equipe para medição e orçamento.",
    shortDescription: 'Liner fabricado sob medida para qualquer piscina.',
    specs: [
      { label: 'Espessura', value: '0.8mm' },
      { label: 'Formato', value: 'Personalizado' },
      { label: "Fabricação", value: 'Sob Encomenda' },
      { label: 'Garantia', value: '5 anos' }
    ],
    price: 5500,
    priceDiscount: null,
    installments: 12,
    badges: ['SOB CONSULTA'],
    images: ['/images/products/liner-sob-medida-1.jpg'],
    relatedIds: ['av-001', 'av-002'],
    featured: false
  },
  {
    id: 'aq-001',
    slug: 'trocador-de-calor-25000-btu',
    name: 'Trocador de Calor 25.000 BTU',
    category: 'aquecedores',
    description: "Aquecimento eficiente por troca de calor. Mantém a temperatura ideal da água de forma econômica, prolongando a temporada de uso da sua piscina.",
    shortDescription: "Aquecimento econômico por troca de calor.",
    specs: [
      { label: 'Capacidade', value: '25.000 BTU' },
      { label: 'Voltagem', value: '220V' },
      { label: 'Volume Atendido', value: "Até 18.000L" },
      { label: 'Garantia', value: '2 anos' }
    ],
    price: 4890,
    priceDiscount: 4400,
    installments: 12,
    badges: ['OFERTA ESPECIAL'],
    images: ['/images/products/trocador-de-calor-25000-btu-1.jpg'],
    relatedIds: ['aq-002', 'aq-003', 'pf-001'],
    featured: true
  },
  {
    id: 'aq-002',
    slug: 'aquecedor-solar-kit-4m2',
    name: "Aquecedor Solar Kit 4m²",
    category: 'aquecedores',
    description: "Kit de aquecimento solar com placas coletoras de 4m². Energia limpa e renovável para aquecer sua piscina sem custo de energia elétrica ou gás.",
    shortDescription: "Aquecimento solar sustentável e econômico.",
    specs: [
      { label: "Área Coletora", value: "4m²" },
      { label: 'Tipo', value: 'Solar' },
      { label: 'Volume Atendido', value: "Até 12.000L" },
      { label: 'Garantia', value: '5 anos' }
    ],
    price: 3200,
    priceDiscount: null,
    installments: 6,
    badges: ["ECOLÓGICO 🌱"],
    images: ['/images/products/aquecedor-solar-kit-4m2-1.jpg'],
    relatedIds: ['aq-001', 'aq-003'],
    featured: false
  },
  {
    id: 'aq-003',
    slug: 'aquecedor-a-gas-150000-btu',
    name: "Aquecedor a Gás 150.000 BTU",
    category: 'aquecedores',
    description: "Potência máxima para aquecer piscinas de grande volume rapidamente. Ignição eletrônica digital com controle preciso de temperatura.",
    shortDescription: "Aquecedor a gás de alta potência para piscinas grandes.",
    specs: [
      { label: 'Capacidade', value: '150.000 BTU' },
      { label: "Combustível", value: 'GN/GLP' },
      { label: 'Volume Atendido', value: "Até 55.000L" },
      { label: 'Garantia', value: '2 anos' }
    ],
    price: 7800,
    priceDiscount: null,
    installments: 12,
    badges: [],
    images: ['/images/products/aquecedor-a-gas-150000-btu-1.jpg'],
    relatedIds: ['aq-001', 'aq-002'],
    featured: false
  },
  {
    id: 'fb-001',
    slug: 'filtro-de-areia-s15',
    name: 'Filtro de Areia S-15',
    category: 'filtros-bombas',
    description: "Filtro de areia compacto para piscinas de até 18.000 litros. Filtragem eficiente com manutenção simples por retrolavagem.",
    shortDescription: 'Filtro de areia compacto para piscinas residenciais.',
    specs: [
      { label: "Vazão", value: "5.7m³/h" },
      { label: 'Volume Atendido', value: "Até 18.000L" },
      { label: "Área Filtrante", value: "0.19m²" },
      { label: 'Garantia', value: '1 ano' }
    ],
    price: 1290,
    priceDiscount: 1150,
    installments: 6,
    badges: [],
    images: ['/images/products/filtro-de-areia-s15-1.jpg'],
    relatedIds: ['fb-002', 'fb-003'],
    featured: false
  },
  {
    id: 'fb-002',
    slug: 'filtro-de-areia-s20',
    name: 'Filtro de Areia S-20',
    category: 'filtros-bombas',
    description: "Filtro de areia de maior capacidade para piscinas de até 28.000 litros. Ideal para piscinas médias e grandes com alta demanda de filtragem.",
    shortDescription: "Filtro de areia para piscinas médias e grandes.",
    specs: [
      { label: "Vazão", value: "8.5m³/h" },
      { label: 'Volume Atendido', value: "Até 28.000L" },
      { label: "Área Filtrante", value: "0.28m²" },
      { label: 'Garantia', value: '1 ano' }
    ],
    price: 1890,
    priceDiscount: null,
    installments: 6,
    badges: [],
    images: ['/images/products/filtro-de-areia-s20-1.jpg'],
    relatedIds: ['fb-001', 'fb-004'],
    featured: false
  },
  {
    id: 'fb-003',
    slug: 'bomba-centrifuga-meio-cv',
    name: "Bomba Centrífuga 1/2 CV",
    category: 'filtros-bombas',
    description: "Motor de 1/2 CV com pré-filtro integrado. Silenciosa e confiável, ideal para piscinas residenciais de até 15.000 litros.",
    shortDescription: "Motor de 1/2 CV com pré-filtro, silenciosa e confiável.",
    specs: [
      { label: "Potência", value: '1/2 CV' },
      { label: 'Voltagem', value: '127/220V' },
      { label: 'Fase', value: "Monofásica" },
      { label: "Pré-filtro", value: 'Incluso' }
    ],
    price: 890,
    priceDiscount: 799,
    installments: 6,
    badges: ['MAIS VENDIDA'],
    images: ['/images/products/bomba-centrifuga-meio-cv-1.jpg'],
    relatedIds: ['fb-001', 'fb-004'],
    featured: false
  },
  {
    id: 'fb-004',
    slug: 'bomba-centrifuga-1cv',
    name: "Bomba Centrífuga 1 CV",
    category: 'filtros-bombas',
    description: "Potência e vazão para sistemas maiores, cascata ou aquecimento. A Bomba de 1 CV garante o fluxo necessário para o bom funcionamento de todos os acessórios da sua piscina.",
    shortDescription: "Alta vazão para filtração rápida e cascatas.",
    specs: [
      { label: "Potência", value: '1 CV' },
      { label: 'Voltagem', value: '127/220V' },
      { label: 'Fase', value: "Monofásica" },
      { label: "Pré-filtro", value: 'Incluso' }
    ],
    price: 1350,
    priceDiscount: null,
    installments: 6,
    badges: [],
    images: ['/images/products/bomba-centrifuga-1cv-1.jpg'],
    relatedIds: ['fb-003', 'fb-005', 'ac-001'],
    featured: true
  },
  {
    id: 'fb-005',
    slug: 'motor-bomba-1-5cv-trifasico',
    name: "Motor Bomba 1.5 CV Trifásico",
    category: 'filtros-bombas',
    description: "Equipamento de uso profissional para clubes e condomínios. Alta performance em uso contínuo com motor trifásico de alta eficiência energética.",
    shortDescription: "Bomba trifásica de alta capacidade para uso profissional.",
    specs: [
      { label: "Potência", value: '1.5 CV' },
      { label: 'Voltagem', value: "220V/380V Trifásico" },
      { label: 'Uso', value: "Profissional/Contínuo" },
      { label: 'Garantia', value: '2 anos' }
    ],
    price: 2100,
    priceDiscount: null,
    installments: 12,
    badges: ['PROFISSIONAL'],
    images: ['/images/products/motor-bomba-1-5cv-trifasico-1.jpg'],
    relatedIds: ['fb-002', 'fb-004'],
    featured: false
  },
  {
    id: 'qm-001',
    slug: 'cloro-granulado-10kg',
    name: 'Cloro Granulado 10kg',
    category: 'quimicos',
    description: "Cloro estabilizado de alta performance. Dissolve facilmente e não deixa resíduos, eliminando bactérias e evitando a proliferação de algas na água.",
    shortDescription: "Desinfecção eficaz e estabilizada para uso contínuo.",
    specs: [
      { label: 'Peso', value: '10kg' },
      { label: 'Tipo', value: 'Granulado Estabilizado' },
      { label: "Aplicação", value: "Manutenção Diária" },
      { label: 'Garantia', value: 'Validade 2 anos' }
    ],
    price: 189,
    priceDiscount: 169,
    installments: 3,
    badges: [],
    images: ['/images/products/cloro-granulado-10kg-1.jpg'],
    relatedIds: ['qm-002', 'qm-003'],
    featured: false
  },
  {
    id: 'qm-002',
    slug: 'algicida-choque-1l',
    name: 'Algicida Choque 1L',
    category: 'quimicos',
    description: "Tratamento de choque para eliminar algas verdes e recuperar águas turvas. Ação ultrarrápida que devolve a transparência à piscina em poucas horas.",
    shortDescription: "Eliminação imediata de algas para recuperação da água.",
    specs: [
      { label: 'Volume', value: '1 litro' },
      { label: 'Tipo', value: 'Algicida Choque' },
      { label: 'Uso', value: "Água Verde" },
      { label: "Ação", value: "Rápida" }
    ],
    price: 42,
    priceDiscount: null,
    installments: 1,
    badges: [],
    images: ['/images/products/algicida-choque-1l-1.jpg'],
    relatedIds: ['qm-001', 'qm-003'],
    featured: false
  },
  {
    id: 'qm-003',
    slug: 'kit-tratamento-completo',
    name: 'Kit Tratamento Completo',
    category: 'quimicos',
    description: "O pacote perfeito de manutenção química. Contém Cloro Granulado 10kg, Elevador de pH, Algicida Manutenção e Clarificante para manter sua água sempre pronta para o banho.",
    shortDescription: "Tudo o que você precisa para manter a água cristalina.",
    specs: [
      { label: "Composição", value: 'Cloro + Barrilha + Algicida + Clarificante' },
      { label: 'Rendimento', value: "Até 3 meses" },
      { label: "Indicação", value: "Manutenção Mensal" }
    ],
    price: 320,
    priceDiscount: 279,
    installments: 3,
    badges: ['KIT COMPLETO'],
    images: ['/images/products/kit-tratamento-completo-1.jpg'],
    relatedIds: ['qm-001', 'qm-002', 'qm-004'],
    featured: true
  },
  {
    id: 'qm-004',
    slug: 'barrilha-elevador-ph-2kg',
    name: 'Barrilha (Elevador de pH) 2kg',
    category: 'quimicos',
    description: "Carbonato de barrilha leve para aumentar o pH e a alcalinidade total da água, evitando irritações nos olhos e aumentando a eficácia do cloro.",
    shortDescription: "Equilibra o pH da água garantindo conforto ao banhista.",
    specs: [
      { label: 'Peso', value: '2kg' },
      { label: 'Tipo', value: 'Barrilha Leve' },
      { label: "Função", value: 'Elevar pH' }
    ],
    price: 35,
    priceDiscount: null,
    installments: 1,
    badges: [],
    images: ['/images/products/barrilha-elevador-ph-2kg-1.jpg'],
    relatedIds: ['qm-001', 'qm-005'],
    featured: false
  },
  {
    id: 'qm-005',
    slug: 'sulfato-de-aluminio-2kg',
    name: "Sulfato de Alumínio 2kg",
    category: 'quimicos',
    description: "Decantador tradicional de alta eficiência. Aglomera as impurezas suspensas na água, levando-as para o fundo para fácil aspiração, resultando numa água cristalina.",
    shortDescription: "Decantador em pó para clareamento da água.",
    specs: [
      { label: 'Peso', value: '2kg' },
      { label: 'Tipo', value: 'Decantador' },
      { label: "Função", value: "Decantação" }
    ],
    price: 28,
    priceDiscount: null,
    installments: 1,
    badges: [],
    images: ['/images/products/sulfato-de-aluminio-2kg-1.jpg'],
    relatedIds: ['qm-001', 'qm-004'],
    featured: false
  },
  {
    id: 'ra-001',
    slug: 'robo-aspirador-automatico-rb200',
    name: "Robô Aspirador Automático RB-200",
    category: 'robos-aspiradores',
    description: "Esqueça o trabalho manual! O RB-200 escova e aspira fundo e paredes da sua piscina de forma totalmente autônoma. Possui cesto de resíduos interno de fácil limpeza.",
    shortDescription: "Limpeza autônoma completa de fundo e paredes.",
    specs: [
      { label: 'Tipo', value: "Automático" },
      { label: 'Cobertura', value: 'Fundo e Paredes' },
      { label: 'Cabo', value: '12m' },
      { label: 'Ciclo', value: '2 horas' }
    ],
    price: 3500,
    priceDiscount: 3150,
    installments: 12,
    badges: ["LANÇAMENTO ✦"],
    images: ['/images/products/robo-aspirador-automatico-rb200-1.jpg'],
    relatedIds: ['ra-002', 'ra-003'],
    featured: true
  },
  {
    id: 'ra-002',
    slug: 'aspirador-manual-cabo-5m',
    name: 'Aspirador Manual com Cabo 5m',
    category: 'robos-aspiradores',
    description: "Rodo aspirador com escovas laterais acoplado a cabo telescópico de alumínio resistente. Ideal para limpezas pontuais e de manutenção.",
    shortDescription: "Aspirador clássico e prático com cabo telescópico.",
    specs: [
      { label: 'Cabo', value: "Telescópico de 5m (Alumínio)" },
      { label: 'Tipo', value: 'Manual' },
      { label: 'Garantia', value: '6 meses' }
    ],
    price: 189,
    priceDiscount: null,
    installments: 3,
    badges: [],
    images: ['/images/products/aspirador-manual-cabo-5m-1.jpg'],
    relatedIds: ['ra-001', 'ra-003'],
    featured: false
  },
  {
    id: 'ra-003',
    slug: 'kit-aspiracao-completo',
    name: "Kit Aspiração Completo",
    category: 'robos-aspiradores',
    description: "Conjunto completo contendo Aspirador, Mangueira flutuante de 7 metros, Cabo telescópico e adaptadores. Conecta diretamente no dispositivo de sucção da piscina.",
    shortDescription: "Tudo necessário para aspirar o fundo da sua piscina.",
    specs: [
      { label: 'Mangueira', value: '7m flutuante' },
      { label: 'Cabo', value: "Telescópico" },
      { label: 'Inclui', value: 'Adaptadores' }
    ],
    price: 420,
    priceDiscount: 379,
    installments: 3,
    badges: ['KIT'],
    images: ['/images/products/kit-aspiracao-completo-1.jpg'],
    relatedIds: ['ra-001', 'ra-002'],
    featured: false
  },
  {
    id: 'ac-001',
    slug: 'cascata-inox-60cm',
    name: 'Cascata Inox 60cm',
    category: 'acessorios',
    description: "Bico de cascata em Aço Inox 304, garantindo durabilidade contra intempéries e produtos químicos. Proporciona um visual sofisticado e som relaxante.",
    shortDescription: 'Cascata em inox 304 elegante e resistente.',
    specs: [
      { label: 'Material', value: "Aço Inox 304" },
      { label: 'Tamanho', value: '60cm' },
      { label: 'Garantia', value: '1 ano' },
      { label: "Vazão Recomendada", value: "7m³/h" }
    ],
    price: 890,
    priceDiscount: 799,
    installments: 6,
    badges: ['OFERTA ESPECIAL'],
    images: ['/images/products/cascata-inox-60cm-1.jpg'],
    relatedIds: ['fb-004', 'ac-002'],
    featured: false
  },
  {
    id: 'ac-002',
    slug: 'led-piscina-rgb',
    name: 'LED Piscina RGB Controle Remoto',
    category: 'acessorios',
    description: "Refletor LED RGB de 9W em policarbonato, de fácil instalação. Acompanha controle remoto para mudança de cores e efeitos, transformando as noites na sua piscina.",
    shortDescription: "Iluminação multicolorida com controle remoto.",
    specs: [
      { label: "Potência", value: '9W' },
      { label: 'Material', value: 'Policarbonato' },
      { label: 'Controle Remoto', value: 'Incluso' },
      { label: "Proteção", value: 'IP68' }
    ],
    price: 280,
    priceDiscount: null,
    installments: 3,
    badges: [],
    images: ['/images/products/led-piscina-rgb-1.jpg'],
    relatedIds: ['ac-001', 'ac-003'],
    featured: false
  },
  {
    id: 'ac-003',
    slug: 'capa-termica-sob-medida',
    name: "Capa Térmica Sob Medida (m²)",
    category: 'acessorios',
    description: "Capa térmica de bolhas para reter o calor da água e evitar evaporação e perda térmica durante a noite. Essencial para piscinas com aquecimento.",
    shortDescription: "Retenção de calor e redução de sujeiras. Vendida por metro quadrado.",
    specs: [
      { label: 'Material', value: 'Polietileno' },
      { label: 'Tipo', value: 'Bolhas' },
      { label: "Função", value: "Isolamento Térmico" },
      { label: 'Venda', value: "Por m²" }
    ],
    price: 65,
    priceDiscount: null,
    installments: 1,
    badges: ["POR M²"],
    images: ['/images/products/capa-termica-sob-medida-1.jpg'],
    relatedIds: ['aq-001', 'ac-004'],
    featured: false
  },
  {
    id: 'ac-004',
    slug: 'escada-inox-3-degraus',
    name: 'Escada Inox 3 Degraus',
    category: 'acessorios',
    description: "Escada anatômica com 3 degraus em ABS e corrimão em tubo de aço inox. Facilita e dá segurança na entrada e saída da piscina.",
    shortDescription: "Acesso prático e seguro para a sua piscina com design em inox.",
    specs: [
      { label: 'Material', value: "Aço Inox e ABS" },
      { label: 'Degraus', value: '3' },
      { label: "Aplicação", value: 'Todos os tipos de piscina' }
    ],
    price: 690,
    priceDiscount: null,
    installments: 6,
    badges: [],
    images: ['/images/products/escada-inox-3-degraus-1.jpg'],
    relatedIds: ['ac-001', 'ac-002'],
    featured: false
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatInstallments(price: number, installments: number): string {
  if (installments <= 1) return 'À vista';
  const value = price / installments;
  return `${installments}x de ${formatPrice(value)} sem juros`;
}

export function generateWhatsAppUrl(product: Product): string {
  const finalPrice = product.priceDiscount ?? product.price;
  const message = `Olá Piscinão! Estou no site piscinao.com e tenho interesse no produto ${product.name} (Código: ${product.id}) no valor de ${formatPrice(finalPrice)}. Poderiam me passar mais informações e orçamento?`;
  return `https://wa.me/5518991024742?text=${encodeURIComponent(message)}`;
}
