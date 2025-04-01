import React from 'react';
import styles from '../page.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.forsida}>Forsíða</p>
      <section className={styles.buttonContainer}>
        <button>Innskráning</button>
      </section>
    </header>
  );
};

export default Header;
