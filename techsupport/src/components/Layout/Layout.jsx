import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';
import styles from './Layout.module.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <div className={styles.container}>
        <Sidebar isOpen={sidebarOpen} />
        <main className={`${styles.main} ${sidebarOpen ? '' : styles.expanded}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;