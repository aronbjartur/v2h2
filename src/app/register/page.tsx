import RegisterComponent from '../components/Register/Register'; 
import Header from '../components/Header/Header'; 
import Footer from '../components/Footer/Footer'; 
import styles from '../page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.page}>
        <Header />
        <main className={styles.main}> 
            <RegisterComponent />
        </main>
        <Footer />
    </div>
  );
}