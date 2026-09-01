import { Link } from 'react-router-dom';
import { Product, formatPrice, formatInstallments, categories } from '../data/products';
import { Waves, Package, MessageCircle, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryName = categories.find(c => c.id === product.category)?.name ?? product.category;
  const displayPrice = product.priceDiscount ?? product.price;
  const installmentText = product.installments > 1
    ? formatInstallments(displayPrice, product.installments)
    : null;

  const isPiscina = product.category === 'piscinas-fibra' || product.category === 'alvenaria-vinil';
  const IconComponent = isPiscina ? Waves : Package;

  return (
    <div className="product-card">
      <Link to={`/produto/${product.slug}`} className="product-image-box">
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
        
        <div className="product-icon-art">
          <IconComponent size={56} strokeWidth={1.5} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '8px', opacity: 0.8 }}>
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="product-details">
        <span className="product-category-label">{categoryName}</span>
        <h3 className="product-title">
          <Link to={`/produto/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-short-desc">{product.shortDescription}</p>

        <div className="product-pricing-box">
          {product.priceDiscount && (
            <div className="price-old">{formatPrice(product.price)}</div>
          )}
          <div className="price-main">{formatPrice(displayPrice)}</div>
          {installmentText && (
            <div className="price-installments">{installmentText}</div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: '16px' }}>
          <Link to={`/produto/${product.slug}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <span>Detalhes</span>
            <ArrowRight size={14} />
          </Link>
          <a
            href={`https://wa.me/5518991024742?text=${encodeURIComponent(`Olá Piscinão! Gostaria de comprar o produto ${product.name} no valor de ${formatPrice(displayPrice)}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp btn-sm"
            title="Comprar no WhatsApp"
            style={{ padding: '8px 12px' }}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
