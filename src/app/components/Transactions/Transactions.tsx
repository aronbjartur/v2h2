'use client';

import React, { useEffect, useState } from 'react'; 
import styles from './Transactions.module.css';
import { Transaction, UiState } from '@/app/types';
import { ApiClient, ApiError } from '@/app/api';
import { useAuth } from '@/app/context/AuthContext';


export default function Transactions(): JSX.Element | null { 
  const [uiState, setUiState] = useState<UiState>('initial');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user, token, logout, isLoading: authLoading } = useAuth();

  const columns: string[] = [
    'Account ID', 'User ID', 'Payment ID', 'Tx ID',
    'Type', 'Category', 'Amount', 'Description',
  ];

  useEffect(() => {
    if (authLoading) {
        setUiState('initial'); 
        return;
    }
    if (!user || !token) {
      setUiState('error'); 
      console.log("Transactions component: User not logged in.");
      setTransactions([]); 
      return;
    }

    const fetchUserTransactions = async () => {
      setUiState('loading');
      const apiClient = new ApiClient();
      apiClient.setToken(token); 
      try {
        const response = await apiClient.getMyTransactions(user.username);
        setTransactions(response); 
        setUiState(response.length > 0 ? 'data' : 'empty');
      } catch (error) {
          console.error("Error fetching user transactions:", error);
          if (error instanceof ApiError) {
               if (error.status === 401) logout(); 
               setUiState('error'); 
          } else {
               setUiState('error'); 
          }
          setTransactions([]);
      }
    };

    fetchUserTransactions();
  }, [user, token, authLoading, logout]);

  if (authLoading || !user) {
      return null;
  }

  switch (uiState) {
    case 'loading':
      return <p className={styles.loading}>Sæki færslur...</p>;
    case 'error':
      return <p className={styles.error}>Villa kom upp við að sækja færslur.</p>;
    case 'empty':
      return <p className={styles.empty}>Engar færslur fundust fyrir {user.username}.</p>;
    case 'data':
      return (
        <div className={styles.transactionsContainer}>
          <h2 className={styles.title}>Færslur fyrir: {user.username}</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr> {columns.map((col) => (<th key={col} className={styles.tableHeader}>{col}</th>))} </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{tx.account_id}</td>
                    <td className={styles.tableCell}>{tx.user_id}</td>
                    <td className={styles.tableCell}>{tx.payment_method_id}</td>
                    <td className={styles.tableCell}>{tx.id}</td>
                    <td className={styles.tableCell}>{tx.transaction_type}</td>
                    <td className={styles.tableCell}>{tx.category}</td>
                    <td className={styles.tableCell}>{tx.amount} kr</td>
                    <td className={styles.tableCell}>{tx.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'initial':
    default:
      return <p className={styles.loading}>Augnablik...</p>;
  }
}