import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer style={{ color: '#f0f0f0', padding: '1rem', textAlign: 'center' }}>
      <p className={styles.fotur}>© 2025 - Allur réttur áskilinn</p>
    </footer>
  );
};

export default Footer;
