import { statuses } from '../../data/mockData';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ status }) => {
  const statusInfo = statuses.find(s => s.id === status) || {
    name: 'Unknown',
    color: 'var(--color-neutral-500)'
  };
  
  return (
    <span 
      className={styles.badge}
      style={{ backgroundColor: statusInfo.color }}
    >
      {statusInfo.name}
    </span>
  );
};

export default StatusBadge;