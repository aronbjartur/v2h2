import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.forsida}>
        <Link href="/">Forsíða</Link>
      </p>
      <section className={styles.buttonContainer}>
        <p>
          <Link href="/login">Innskráning</Link>
        </p>
      </section>
    </header>
  );
};

export default Header;
