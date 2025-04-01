'use client';

import Image from 'next/image';
// import Header from "./components/Header"; not þetta þegar header.tsx í components virkar
import Footer from './components/Footer';
import styles from './page.module.css';
import Header from './components/Header';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={styles.centeredText}>Heimasíða bankans</h2>
        </section>
        <section className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/bank.svg"
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </section>
        <section className={styles.content}>
          <h1 className={styles.centeredText}>Velkomin í bankann okkar</h1>
          <p className={styles.description}>
            Hér geturðu skoðað reikninga þína, flutt peninga og fleira.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
