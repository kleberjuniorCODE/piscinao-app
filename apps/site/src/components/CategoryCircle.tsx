import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Waves, Sparkles, Filter, Thermometer } from 'lucide-react';
import { CategoryInfo } from '../data/products';

interface CategoryCircleProps {
  category: CategoryInfo;
  onClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'waves': <Waves size={32} />,
  'droplet': <Droplet size={32} />,
  'sparkles': <Sparkles size={32} />,
  'filter': <Filter size={32} />,
  'thermometer': <Thermometer size={32} />
};

export const CategoryCircle: React.FC<CategoryCircleProps> = ({ category, onClick }) => {
  const content = (
    <>
      <div className="category-circle-icon">
        {iconMap[category.icon] || <Droplet size={32} />}
      </div>
      <span className="category-label">{category.name}</span>
    </>
  );

  if (onClick) {
    return (
      <button className="category-circle" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link to={`/produtos?categoria=${category.id}`} className="category-circle">
      {content}
    </Link>
  );
};
