/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import StatusBadge from '../common/StatusBadge';
import PriorityTag from '../common/PriorityTag';
import CategoryBadge from '../common/CategoryBadge';
import styles from './TicketCard.module.css';

const TicketCard = ({ ticket }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={`/tickets/${ticket.id}`} className={styles.cardLink}>
        <div className={styles.header}>
          <StatusBadge status={ticket.status} />
          <span className={styles.id}>#{ticket.id}</span>
        </div>
        
        <h3 className={styles.title}>{ticket.title}</h3>
        
        <p className={styles.description}>{ticket.description.substring(0, 120)}...</p>
        
        <div className={styles.meta}>
          <div className={styles.tags}>
            <CategoryBadge category={ticket.category} />
            <PriorityTag priority={ticket.priority} />
          </div>
          
          <div className={styles.dates}>
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>Created:</span>
              <time>{format(new Date(ticket.createdAt), 'dd MMM yyyy')}</time>
            </div>
            
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>Updated:</span>
              <time>{format(new Date(ticket.updatedAt), 'dd MMM yyyy')}</time>
            </div>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.user}>
            <div className={styles.userAvatar}>
              {ticket.createdBy.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <span>{ticket.createdBy}</span>
          </div>
          
          {ticket.assignedTo && (
            <div className={styles.user}>
              <span className={styles.assignedLabel}>Assigned to:</span>
              <div className={styles.userAvatar}>
                {ticket.assignedTo.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <span>{ticket.assignedTo}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default TicketCard;