import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaBell, FaSearch, FaUser } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerLeft}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/" className={styles.logo}>
          Suporte<span>Tech</span>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Pesquisar chamados..." 
          className={styles.searchInput} 
        />
      </div>

      <div className={styles.headerRight}>
        <button className={styles.iconButton}>
          <FaBell />
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.userContainer}>
          <button 
            className={styles.userButton} 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className={styles.userAvatar}>
              <FaUser />
            </div>
            <span className={styles.userName}>Admin</span>
          </button>
          
          {showDropdown && (
            <div className={styles.userDropdown}>
              <ul>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/settings">Configurações</Link></li>
                <li><button>Sair</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;