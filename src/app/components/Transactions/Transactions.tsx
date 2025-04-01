import styles from './Transactions.module.css';
export default function Transactions() {
  const transactions: Array<string> = [
    'Aðalreikningur - admin - reiðufé - transaction_1 - expense - matur - 6000 - Smá matur',
    'Aðalreikningur - admin - kreditkort - transaction_2 - income - laun - 30000 - Laun',
    'Aðalreikningur - admin - bankamillifærsla - transaction_3 - income - annar - 50000 - Smá millifærsla',
  ];
  const columns: Array<string> = [
    'Account',
    'User',
    'Payment_method',
    'Transaction_ID',
    'Transaction_type',
    'Category',
    'Amount',
    'Description',
  ];
  return (
    <div className={styles.transactionsContainer}>
      <h1 className={styles.title}>Transactions</h1>
      <p className={styles.description}>
        Hér eiga að koma öll Transactions hjá notanda eftir Innskráningu, en
        gerum Innskráningu seinast.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.tableHeader}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const transactionParts = transaction.split(' - '); // Split transaction string by " - "
            return (
              <tr key={index} className={styles.tableRow}>
                {transactionParts.map((part, partIndex) => (
                  <td key={partIndex} className={styles.tableCell}>
                    {part}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
