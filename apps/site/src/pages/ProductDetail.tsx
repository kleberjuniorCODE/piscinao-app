import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, products, formatPrice, generateWhatsAppUrl, categories } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { ProductCard } from '../components/ProductCard';
import { MessageCircle, Waves, Package } from 'lucide-react';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <SEOHead title="Produto não encontrado" description="Produto não encontrado." path={`/produto/${slug}`} />
        <h1>Produto não encontrado</h1>
        <p style={{ margin: '16px 0 32px' }}>O produto que você está procurando não existe ou foi removido.</p>
        <Link to="/produtos" className="btn-primary">Voltar para Produtos</Link>
      </main>
    );
  }

  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;
  const currentPrice = product.priceDiscount ?? product.price;
  const isPiscina = product.category === 'piscinas-fibra' || product.category === 'alvenaria-vinil';
  const IconComponent = isPiscina ? Waves : Package;

  return (
    <main className="product-detail">
      <SEOHead
        title={product.name}
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
          {/* Gallery */}
          <div className="product-gallery">
            <div className="product-main-image">
              <div className="product-badges-overlay">
                {product.badges.map(badge => (
                  <span key={badge} className="badge">{badge}</span>
                ))}
              </div>
              <div className="product-image-placeholder large">
                <IconComponent size={64} />
                <span>{product.name}</span>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((_img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
                  >
                    <IconComponent size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="product-info">
            <span className="product-category-tag">{categoryName}</span>
            <h1>{product.name}</h1>

            <div className="price-block">
              {product.priceDiscount ? (
                <>
                  <div className="price-row">
                    <span className="product-old-price">{formatPrice(product.price)}</span>
                    <span className="badge badge-gold">
                      -{Math.round(((product.price - product.priceDiscount) / product.price) * 100)}%
                    </span>
                  </div>
                  <div className="product-price-large">{formatPrice(product.priceDiscount)}</div>
                </>
              ) : (
                <div className="product-price-large">{formatPrice(product.price)}</div>
              )}

              {product.installments > 1 && (
                <p className="product-installments-detail">
                  ou {product.installments}x de {formatPrice(currentPrice / product.installments)} sem juros
                </p>
              )}
              <p className="pix-discount">10% de desconto à vista via PIX</p>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-actions">
              <a
                href={generateWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={22} />
                Comprar pelo WhatsApp
              </a>
              <Link to="/contato" className="btn-secondary">
                Solicitar Orçamento
              </Link>
            </div>

            {product.specs.length > 0 && (
              <div className="specs-section">
                <h3>Ficha Técnica</h3>
                <table className="specs-table">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr key={spec.label} className={idx % 2 === 0 ? 'even' : ''}>
                        <td className="spec-label">{spec.label}</td>
                        <td className="spec-value">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {product.relatedIds.length > 0 && (
          <section className="related-products">
            <h2>Produtos Relacionados</h2>
            <div className="catalog-grid">
              {product.relatedIds.map(id => {
                const related = products.find(p => p.id === id);
                return related ? <ProductCard key={related.id} product={related} /> : null;
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
