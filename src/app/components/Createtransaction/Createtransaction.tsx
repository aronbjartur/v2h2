import styles from './Createtransaction.module.css';

export default function Createtransaction() {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create New Transaction</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>
            Payment Method:
          </label>
          <input
            type="text"
            id="paymentMethod"
            className={styles.input}
            placeholder='"reiðufé", "kreditkort", "bankamillifærsla"'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="transactionType" className={styles.label}>
            Transaction Type:
          </label>
          <input
            type="text"
            id="transactionType"
            className={styles.input}
            placeholder='"income" or "expense"'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category:
          </label>
          <input
            type="text"
            id="category"
            className={styles.input}
            placeholder='"matur", "íbúð", "samgöngur", "afþreying", "laun", "annar"'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            className={styles.input}
            placeholder="Hvert er magnið?"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description:
          </label>
          <input
            type="text"
            id="description"
            className={styles.input}
            placeholder="Hver er ástæðan fyrir þessari færslu?"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
