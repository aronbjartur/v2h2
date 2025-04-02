'use client';
import { JSX, useEffect, useState } from 'react';
import styles from './Alltransactions.module.css';
import { Transaction, UiState } from '@/app/types';
import { TransactionsApi } from '@/app/api';
/* import { Transaction } from '@/app/types'; */
export default function Alltransactions(): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

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
      setUiState('loading');
      const api = new TransactionsApi(); // Create an instance of TransactionsApi
      const categoriesResponse = await api.getAllTransactions();

      /* if (!categoriesResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setTransactions(categoriesResponse);
      } */
      console.log('categoriesResponse', categoriesResponse);
      if (categoriesResponse) {
        setUiState('data');
        setTransactions(
          Array.isArray(categoriesResponse)
            ? categoriesResponse
            : [categoriesResponse]
        );
      }
    }
    fetchTransactions(); // Call the function to fetch transactions
  }, []);
  switch (uiState) {
    case 'loading':
      return <p className={styles.loading}>Sæki transactions...</p>;
    case 'error':
      return <p>Villa við að sækja transactions...</p>;
    case 'empty':
      return <p>Engar gögn fundust</p>;
    case 'data':
      return (
        <div className={styles.transactionsContainer}>
          <h1 className={styles.title}>All transactions</h1>
          <p className={styles.description}>
            Hér eiga að koma Transactions hjá öllum notendum.
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
              {transactions.map((transaction, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{transaction.account_id}</td>
                  <td className={styles.tableCell}>{transaction.user_id}</td>
                  <td className={styles.tableCell}>
                    {transaction.payment_method_id}
                  </td>
                  <td className={styles.tableCell}>{transaction.id}</td>
                  <td className={styles.tableCell}>
                    {transaction.transaction_type}
                  </td>
                  <td className={styles.tableCell}>{transaction.category}</td>
                  <td className={styles.tableCell}>{transaction.amount}</td>
                  <td className={styles.tableCell}>
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'initial':
    default:
      return <p>Engin transactions</p>;
  }
}
