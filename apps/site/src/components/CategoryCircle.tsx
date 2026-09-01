import { Link } from 'react-router-dom';
import { CategoryInfo } from '../data/products';
import { 
  Waves, 
  BrickWall, 
  ThermometerSun, 
  Settings, 
  FlaskConical, 
  Bot, 
  Sparkles,
  LucideIcon
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

const iconMap: Record<string, LucideIcon> = {
  'waves': Waves,
  'brick-wall': BrickWall,
  'thermometer-sun': ThermometerSun,
  'settings': Settings,
  'flask-conical': FlaskConical,
  'bot': Bot,
  'sparkles': Sparkles,
};

export function CategoryCircle({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || Waves;

  return (
    <Link 
      to={`/produtos?categoria=${category.id}`} 
      className="category-card"
      title={`Ver produtos da categoria ${category.name}`}
    >
      <div className="category-icon-wrapper">
        <IconComponent size={28} />
      </div>
      <span className="category-name">{category.name}</span>
    </Link>
  );
}
