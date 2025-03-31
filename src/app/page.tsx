"use client"; 

import Image from "next/image";
// import Header from "./components/Header"; not þetta þegar header.tsx í components virkar
import Footer from "./components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      { /*<Header />  <--- nota þetta þegar header.tsx í components virkar*/}
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>HEimasíða</h2>
        </section>
      </main>
      <Footer />
    </div>
  );
}