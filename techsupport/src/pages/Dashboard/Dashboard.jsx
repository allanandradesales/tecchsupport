import { Link } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { FaTicketAlt, FaPlus, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import TicketList from '../../components/tickets/TicketList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { isLoading, getTicketStats } = useTickets();
  
  if (isLoading) {
    return <div className={styles.loading}>Carregando dados do painel...</div>;
  }
  
  const stats = getTicketStats();
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Painel</h1>
          <p className={styles.subheading}>Visão geral dos chamados técnicos</p>
        </div>
        
        <Link to="/tickets/new" className={`button ${styles.createButton}`}>
          <FaPlus />
          <span>Criar Novo Chamado</span>
        </Link>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <div className={styles.statsIcon}>
            <FaTicketAlt />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsTitle}>Total de Chamados</h3>
            <p className={styles.statsValue}>{stats.totalTickets}</p>
            <div className={styles.statsDetail}>
              <span>Ativos: {stats.totalTickets - (stats.statusCounts.closed || 0)}</span>
              <span>Fechados: {stats.statusCounts.closed || 0}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statsCard}>
          <div className={styles.statsIcon} style={{ backgroundColor: 'rgba(255, 149, 0, 0.1)', color: 'var(--color-accent)' }}>
            <FaClock />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsTitle}>Pendentes</h3>
            <p className={styles.statsValue}>{stats.statusCounts.pending || 0}</p>
            <div className={styles.statsDetail}>
              <span>Aguardando ação</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statsCard}>
          <div className={styles.statsIcon} style={{ backgroundColor: 'rgba(48, 209, 88, 0.1)', color: 'var(--color-success)' }}>
            <FaCheckCircle />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsTitle}>Resolvidos</h3>
            <p className={styles.statsValue}>{stats.statusCounts.resolved || 0}</p>
            <div className={styles.statsDetail}>
              <span>Solucionados com sucesso</span>
            </div>
          </div>
        </div>
        
        <div className={styles.statsCard}>
          <div className={styles.statsIcon} style={{ backgroundColor: 'rgba(255, 69, 58, 0.1)', color: 'var(--color-error)' }}>
            <FaExclamationCircle />
          </div>
          <div className={styles.statsContent}>
            <h3 className={styles.statsTitle}>Alta Prioridade</h3>
            <p className={styles.statsValue}>{stats.priorityCounts.high || 0}</p>
            <div className={styles.statsDetail}>
              <span>Requerem atenção imediata</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <TicketList />
      </div>
    </div>
  );
};

export default Dashboard;