import styles from './Transactions.module.css';
export default function Transactions() {
  return (
    <div className={styles.transactionsContainer}>
      <h1 className={styles.title}>Transactions</h1>
      <p className={styles.description}>
        Hér eiga að koma öll Transactions hjá notanda eftir Innskráningu, en
        gerum Innskráningu seinast.
      </p>
    </div>
  );
}
