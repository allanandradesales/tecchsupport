import { priorities } from '../../data/mockData';
import styles from './PriorityTag.module.css';

const PriorityTag = ({ priority }) => {
  const priorityInfo = priorities.find(p => p.id === priority) || {
    name: 'Unknown',
    color: 'var(--color-neutral-500)'
  };
  
  return (
    <span 
      className={styles.tag}
      style={{ borderColor: priorityInfo.color, color: priorityInfo.color }}
    >
      {priorityInfo.name}
    </span>
  );
};

export default PriorityTag;