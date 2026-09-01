import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, products, formatPrice, generateWhatsAppUrl, categories } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { ProductCard } from '../components/ProductCard';
import { MessageCircle, Waves, Package, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <main className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <SEOHead title="Produto não encontrado" description="Produto não encontrado." path={`/produto/${slug}`} />
        <h1 style={{ color: 'var(--chocolate)', marginBottom: '12px' }}>Produto não encontrado</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          O item solicitado não existe em nosso catálogo ou foi descontinuado.
        </p>
        <Link to="/produtos" className="btn btn-primary">
          Ver Catálogo Completo
        </Link>
      </main>
    );
  }

  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;
  const currentPrice = product.priceDiscount ?? product.price;
  const isPiscina = product.category === 'piscinas-fibra' || product.category === 'alvenaria-vinil';
  const IconComponent = isPiscina ? Waves : Package;

  return (
    <main className="product-detail-section">
      <SEOHead
        title={`${product.name} — Piscinas & Equipamentos`}
        description={product.shortDescription}
        path={`/produto/${product.slug}`}
      />

      <div className="container">
        <Breadcrumb items={[
          { label: 'Início', path: '/' },
          { label: 'Produtos', path: '/produtos' },
          { label: categoryName, path: `/produtos?categoria=${product.category}` },
          { label: product.name }
        ]} />

        <div className="product-detail-grid">
          
          {/* Left Column: Gallery */}
          <div className="product-gallery-box">
            <div className="product-gallery-main">
              {product.badges && product.badges.length > 0 && (
                <div className="product-badges">
                  {product.badges.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className={`badge ${badge.includes('LANÇAMENTO') ? 'badge-gold' : badge.includes('OFERTA') || badge.includes('OFF') ? 'badge-offer' : ''}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--chocolate)', opacity: 0.9 }}>
                <IconComponent size={96} strokeWidth={1.2} />
                <span style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: '16px' }}>
                  {product.name}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {categoryName} • Piscinão Araçatuba
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div className="category-card" style={{ padding: '16px 12px', alignItems: 'center', textAlign: 'center' }}>
                <ShieldCheck size={24} color="var(--terracotta)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--chocolate)' }}>Garantia Oficial</span>
              </div>
              <div className="category-card" style={{ padding: '16px 12px', alignItems: 'center', textAlign: 'center' }}>
                <Truck size={24} color="var(--terracotta)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--chocolate)' }}>Entrega em Araçatuba</span>
              </div>
              <div className="category-card" style={{ padding: '16px 12px', alignItems: 'center', textAlign: 'center' }}>
                <CheckCircle2 size={24} color="var(--terracotta)" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--chocolate)' }}>Suporte Técnico</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & WhatsApp Conversion */}
          <div className="product-info-panel">
            <span className="section-tag" style={{ marginBottom: '8px' }}>{categoryName}</span>
            <h1>{product.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Pricing Highlight Card */}
            <div className="product-price-highlight">
              {product.priceDiscount ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                      {formatPrice(product.price)}
                    </span>
                    <span className="badge badge-offer">
                      Economia de {formatPrice(product.price - product.priceDiscount)}
                    </span>
                  </div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--chocolate)', lineHeight: 1.1 }}>
                    {formatPrice(product.priceDiscount)}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--chocolate)', lineHeight: 1.1 }}>
                  {formatPrice(product.price)}
                </div>
              )}

              {product.installments > 1 && (
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '8px' }}>
                  ou em até <strong>{product.installments}x de {formatPrice(currentPrice / product.installments)}</strong> sem juros
                </p>
              )}
              
              <div style={{ marginTop: '12px', padding: '8px 14px', background: 'rgba(37, 211, 102, 0.12)', borderRadius: 'var(--radius-xs)', color: 'var(--whatsapp-dark)', fontWeight: 700, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>✦ 10% de desconto adicional para pagamento à vista via PIX</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '28px 0' }}>
              <a
                href={generateWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={24} />
                <span>Comprar / Tirar Dúvidas pelo WhatsApp</span>
              </a>

              <Link 
                to="/contato" 
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Solicitar Orçamento Formal
              </Link>
            </div>

            {/* Technical Specifications */}
            {product.specs.length > 0 && (
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--chocolate)', marginBottom: '12px', borderBottom: '2px solid var(--cream-dark)', paddingBottom: '8px' }}>
                  Ficha Técnica & Especificações
                </h3>
                <table className="specs-table">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr key={idx}>
                        <td className="spec-name">{spec.label}</td>
                        <td style={{ color: 'var(--text-main)', fontWeight: 600 }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Carousel / Grid */}
        {product.relatedIds.length > 0 && (
          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--cream-dark)' }}>
            <div className="section-header" style={{ marginBottom: '32px', textAlign: 'left' }}>
              <span className="section-tag">Combina com este item</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Produtos Relacionados</h2>
            </div>
            
            <div className="grid-3">
              {product.relatedIds.map(id => {
                const related = products.find(p => p.id === id);
                return related ? <ProductCard key={related.id} product={related} /> : null;
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
