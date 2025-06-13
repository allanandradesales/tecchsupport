import { NavLink } from 'react-router-dom';
import { FaTicketAlt, FaPlus, FaChartPie, FaCog, FaQuestion, FaUsers } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside 
          className={styles.sidebar}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.sidebarContainer}>
            <nav className={styles.nav}>
              <div className={styles.navGroup}>
                <h3 className={styles.navTitle}>Principal</h3>
                <ul className={styles.navList}>
                  <li>
                    <NavLink 
                      to="/" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                      end
                    >
                      <MdDashboard />
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/tickets" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaTicketAlt />
                      <span>Todos os Chamados</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/tickets/new" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaPlus />
                      <span>Novo Chamado</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              
              <div className={styles.navGroup}>
                <h3 className={styles.navTitle}>Gestão</h3>
                <ul className={styles.navList}>
                  <li>
                    <NavLink 
                      to="/reports" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaChartPie />
                      <span>Relatórios</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/users" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaUsers />
                      <span>Usuários</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              
              <div className={styles.navGroup}>
                <h3 className={styles.navTitle}>Configurações</h3>
                <ul className={styles.navList}>
                  <li>
                    <NavLink 
                      to="/settings" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaCog />
                      <span>Preferências</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/help" 
                      className={({ isActive }) => 
                        isActive ? styles.navLinkActive : styles.navLink
                      }
                    >
                      <FaQuestion />
                      <span>Ajuda & Suporte</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            
            <div className={styles.sidebarFooter}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>A</div>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>Admin</p>
                  <p className={styles.userRole}>Gerente de Suporte</p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;