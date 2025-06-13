import { categories, statuses, priorities } from '../../data/mockData';
import { motion } from 'framer-motion';
import styles from './TicketFilters.module.css';

const TicketFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSearch = (e) => {
    onChange({ search: e.target.value });
  };

  return (
    <motion.div 
      className={styles.filters}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pesquisar chamados..."
          value={filters.search}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all">Todos os Status</option>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all">Todas as Categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="priority">Prioridade</label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="all">Todas as Prioridades</option>
            {priorities.map(priority => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketFilters;