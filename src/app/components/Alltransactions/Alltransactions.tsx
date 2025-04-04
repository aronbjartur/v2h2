'use client';

import React, { useEffect, useState } from 'react';
import styles from './Alltransactions.module.css';
import { Transaction, UiState } from '@/app/types';
import { TransactionsApi } from '@/app/api';

export default function Alltransactions() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const columns: string[] = [
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
    const fetchAllTransactions = async () => {
      setUiState('loading');
      const api = new TransactionsApi(); 
      try {
        const response = await api.getAllTransactions(); 

        if (response && Array.isArray(response)) {
          setTransactions(response);
          setUiState(response.length > 0 ? 'data' : 'empty');
        } else if (response && !Array.isArray(response)) {
            setTransactions([response] as Transaction[]); 
            setUiState('data');
        } else {
          setTransactions([]);
          setUiState('empty'); 
        }
      } catch (error) {
        console.error("Error fetching all transactions:", error);
        setUiState('error');
        setTransactions([]);
      }
    };

    fetchAllTransactions();
  }, []); 

  switch (uiState) {
    case 'loading':
      return <p className={styles.loading}>Sæki færslur...</p>;
    case 'error':
      return <p className={styles.error}>Villa við að sækja færslur.</p>;
    case 'empty':
      return <p className={styles.empty}>Engar færslur fundust.</p>;
    case 'data':
      return (
        <div className={styles.transactionsContainer}>
          <h2 className={styles.title}>Allar Færslur</h2>
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
      return <p>Hleður gögnum...</p>;
  }
}