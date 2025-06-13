import { categories } from '../../data/mockData';
import { 
  FaEnvelope, 
  FaDesktop, 
  FaCode, 
  FaWifi, 
  FaGlobe, 
  FaLock, 
  FaQuestion 
} from 'react-icons/fa';
import styles from './CategoryBadge.module.css';

const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'mail': return <FaEnvelope />;
    case 'computer': return <FaDesktop />;
    case 'app': return <FaCode />;
    case 'wifi': return <FaWifi />;
    case 'globe': return <FaGlobe />;
    case 'lock': return <FaLock />;
    default: return <FaQuestion />;
  }
};

const CategoryBadge = ({ category }) => {
  const categoryInfo = categories.find(c => c.id === category) || {
    name: 'Other',
    icon: 'help'
  };
  
  return (
    <span className={styles.badge}>
      <span className={styles.icon}>
        {getCategoryIcon(categoryInfo.icon)}
      </span>
      {categoryInfo.name}
    </span>
  );
};

export default CategoryBadge;