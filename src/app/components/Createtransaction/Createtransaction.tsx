/* import { TransactionToCreate } from '@/app/types'; */
import styles from './Createtransaction.module.css';

export default function Createtransaction(/* {
  account,
  user,
  payment_method,
  transaction_id,
  transaction_type,
  category,
  amount,
  description,
}: TransactionToCreate */) {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create New Transaction</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>
            Payment Method:
          </label>
          <select id="paymentMethod" className={styles.input} required>
            <option value="" disabled selected>
              Veldu form greiðslu
            </option>
            <option value="reiðufé">Reiðufé</option>
            <option value="kreditkort">Kreditkort</option>
            <option value="kreditkort">Bankamillifærsla</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="transactionType" className={styles.label}>
            Transaction Type:
          </label>
          <select id="transactionType" className={styles.input} required>
            <option value="" disabled selected>
              Veldu tegund færslu
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category:
          </label>
          <select id="category" className={styles.input} required>
            <option value="" disabled selected>
              Veldu tegund flokks
            </option>
            <option value="matur">Matur</option>
            <option value="íbúð">Íbúð</option>
            <option value="samgöngur">Samgöngur</option>
            <option value="afþreying">Afþreying</option>
            <option value="laun">Laun</option>
            <option value="annar">Annað</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Amount:
          </label>
          <input
            type="number"
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
