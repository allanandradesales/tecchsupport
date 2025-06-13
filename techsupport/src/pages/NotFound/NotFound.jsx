import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaTicketAlt } from 'react-icons/fa';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Página Não Encontrada</h2>
        <p className={styles.message}>
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            <FaHome />
            <span>Ir para o Painel</span>
          </Link>
          
          <Link to="/tickets/new" className={styles.ticketButton}>
            <FaTicketAlt />
            <span>Criar Novo Chamado</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;