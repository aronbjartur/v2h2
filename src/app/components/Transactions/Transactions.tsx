'use client';

import { JSX, useEffect, useState } from 'react';
import styles from './Transactions.module.css';
import { Transaction, UiState } from '@/app/types';
import { TransactionsApi } from '@/app/api';


interface TransactionsProps {
  user: string; 
}

export default function Transactions({ user }: TransactionsProps): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [transactions, setTransactions] = useState<Transaction[]>([]); 


  const columns: string[] = [
    'Account ID', 
    'User ID',
    'Payment Method ID',
    'Transaction ID',
    'Type',
    'Category',
    'Amount',
    'Description',
  ];

  useEffect(() => {
    async function fetchTransactions() {
      if (!user) return; 

      setUiState('loading');
      const api = new TransactionsApi(); 
      try {
        const response = await api.getTransactions(user); 

        if (response && Array.isArray(response)) {
            setTransactions(response);
            setUiState(response.length > 0 ? 'data' : 'empty');
        } else if (response && !Array.isArray(response)) {
             setTransactions([response]);
             setUiState('data');
        }
        else {
           setTransactions([]);
           setUiState('empty');
        }
      } catch (error) {
          console.error("Error fetching transactions:", error);
          setUiState('error');
          setTransactions([]); 
      }
    }

    fetchTransactions();
  }, [user]); 

  switch (uiState) {
    case 'loading':
      return <p className={styles.loading}>Sæki færslur...</p>;
    case 'error':
      return <p className={styles.error}>Villa kom upp við að sækja færslur.</p>; 
    case 'empty':
      return <p className={styles.empty}>Engar færslur fundust fyrir notanda {user}.</p>;
    case 'data':
      return (
        <div className={styles.transactionsContainer}>
          <h2 className={styles.title}>Færslur fyrir notanda: {user}</h2>
          <div className={styles.tableWrapper}> 
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} className={styles.tableHeader}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{transaction.account_id}</td>
                    <td className={styles.tableCell}>{transaction.user_id}</td>
                    <td className={styles.tableCell}>{transaction.payment_method_id}</td>
                    <td className={styles.tableCell}>{transaction.id}</td>
                    <td className={styles.tableCell}>{transaction.transaction_type}</td>
                    <td className={styles.tableCell}>{transaction.category}</td>
                    <td className={styles.tableCell}>{transaction.amount} kr</td>
                    <td className={styles.tableCell}>{transaction.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'initial':
    default:
      return <p>Augnablik...</p>;
  }
}