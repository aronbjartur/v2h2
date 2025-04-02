'use client';
import { useEffect } from 'react';
import styles from './Transactions.module.css';
/* import { Transaction } from '@/app/types'; */
export default function Transactions() {
  const transactions: Array<string> = [
    'Aðalreikningur - admin - reiðufé - transaction_1 - expense - matur - 6000 - Smá matur',
    'Aðalreikningur - admin - kreditkort - transaction_2 - income - laun - 30000 - Laun',
    'Aðalreikningur - admin - bankamillifærsla - transaction_3 - income - annar - 50000 - Smá millifærsla',
  ];
  /* type Transaction = {
    id: int;
    account_id: int;
    user_id: int;
    payment_method_id: int;
    transaction_type: string;
    category: string;
    amount: integer;
    description: string;
    slug: string;
  }; */

  const URL = 'http://localhost:8000'; // Replace with your API endpoint
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
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(URL); // Fetch transactions from the API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
    fetchTransactions(); // Call the function to fetch transactions
  }, []);
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
