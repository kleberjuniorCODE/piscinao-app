import { Link } from 'react-router-dom';
import { Product, formatPrice, formatInstallments, categories } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryName = categories.find(c => c.id === product.category)?.name ?? product.category;
  const displayPrice = product.priceDiscount ?? product.price;
  const installmentText = product.installments > 1
    ? formatInstallments(displayPrice, product.installments)
    : null;

  return (
    <Link to={`/produto/${product.slug}`} className="product-card">
      <div className="product-image-container">
        {product.badges.map((badge, idx) => (
          <span key={idx} className="badge">{badge}</span>
        ))}
        <div className="product-image-placeholder">
          <span>{product.name}</span>
        </div>
      </div>
      <div className="product-content">
        <span className="product-category-tag">{categoryName}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price-section">
          {product.priceDiscount && (
            <span className="product-old-price">{formatPrice(product.price)}</span>
          )}
          <span className="product-price">{formatPrice(displayPrice)}</span>
          {installmentText && (
            <span className="product-installments">{installmentText}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
