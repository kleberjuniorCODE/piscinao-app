import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.path ? `https://piscinao.com${item.path}` : undefined
    }))
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      <div className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={index} className="breadcrumb-item">
              {isLast || !item.path ? (
                <span className="breadcrumb-current" aria-current="page">{item.label}</span>
              ) : (
                <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
              )}
              {!isLast && <ChevronRight size={14} className="breadcrumb-separator" />}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
