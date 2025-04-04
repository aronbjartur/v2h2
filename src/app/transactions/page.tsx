'use client'; 

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TransactionTable from '../components/TransactionTable/TransactionTable'; 
import Createtransaction from '../components/Createtransaction/Createtransaction'; 
import { ApiClient } from '../api';
import { Transaction, UiState } from '../types';
import styles from '../page.module.css'; 

export default function TransactionsPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');

   const fetchTransactions = async () => {
    if (!user || !token) return; 

    setUiState('loading');
    const apiClient = new ApiClient();
    apiClient.setToken(token);

    try {
      let fetchedTransactions: Transaction[] | null = null;
      if (user.admin) {
        console.log('Fetching all transactions as admin...');
        fetchedTransactions = await apiClient.getAllTransactions();
      } else {
         console.log(`Fetching transactions for user: ${user.username}...`);
         fetchedTransactions = await apiClient.getMyTransactions(user.username);
      }

      if (fetchedTransactions) {
          setTransactions(fetchedTransactions);
          setUiState(fetchedTransactions.length > 0 ? 'data' : 'empty');
      } else {
          setTransactions([]);
          setUiState('empty'); 
      }
     } catch (error: any) {
       console.error('Failed to fetch transactions:', error);
       if (error?.status === 403) {
            setUiState('error'); 
       } else {
           setUiState('error');
       }
     }
   };


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/transactions'); 
    } else if (user && token) {
         fetchTransactions(); 
    }
  }, [user, token, authLoading, router]); 

  if (authLoading || (!user && !authLoading)) {
    return (
       <div className={styles.page}>
         <Header />
         <main className={styles.main}><p>Hleður...</p></main>
         <Footer />
       </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>{user?.admin ? 'Allar færslur (Stjórnandi)' : 'Þínar færslur'}</h1>

        <Createtransaction onTransactionCreated={fetchTransactions} /> 

        {uiState === 'loading' && <p>Sæki færslur...</p>}
        {uiState === 'error' && <p>Villa við að sækja færslur. Reyndu aftur síðar.</p>}
        {uiState === 'empty' && <p>Engar færslur fundust.</p>}
        {uiState === 'data' && <TransactionTable transactions={transactions} />}
      </main>
      <Footer />
    </div>
  );
}