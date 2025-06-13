import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { 
  FaPlusCircle,
  FaComment,
  FaExchangeAlt,
  FaEdit,
  FaClock
} from 'react-icons/fa';
import styles from './TicketHistoryTimeline.module.css';

const getIcon = (action) => {
  switch (action) {
    case 'created': return <FaPlusCircle />;
    case 'comment': return <FaComment />;
    case 'status-change': return <FaExchangeAlt />;
    case 'updated': return <FaEdit />;
    default: return <FaClock />;
  }
};

const TicketHistoryTimeline = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className={styles.timeline}>
        <h3 className={styles.title}>Histórico do Chamado</h3>
        <p className={styles.noHistory}>Nenhum histórico disponível</p>
      </div>
    );
  }

  return (
    <div className={styles.timeline}>
      <h3 className={styles.title}>Histórico do Chamado</h3>
      
      <div className={styles.events}>
        {history.map((event, index) => (
          <motion.div 
            key={index}
            className={styles.event}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                {getIcon(event.action)}
              </div>
              {index < history.length - 1 && <div className={styles.line} />}
            </div>
            
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.user}>{event.user}</span>
                <time className={styles.time}>
                  {format(new Date(event.timestamp), 'dd/MM/yyyy HH:mm')}
                </time>
              </div>
              
              <p className={styles.comment}>{event.comment}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TicketHistoryTimeline;