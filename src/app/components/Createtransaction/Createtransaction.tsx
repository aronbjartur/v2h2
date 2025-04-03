/* import { TransactionToCreate } from '@/app/types'; */
'use client';
import { JSX, useState } from 'react';
import styles from './Createtransaction.module.css';
import { TransactionsApi } from '@/app/api'; // Import the TransactionsApi class
import { UiState } from '@/app/types';

export default function Createtransaction({
  user,
}: {
  user: string;
}): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState(''); // New state for account selection
  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setUiState('loading'); // Set UI state to loading

    const newTransaction = {
      account_id: parseInt(account), // Use the selected account value
      user_id:
        user === 'admin'
          ? 17
          : user === 'jonas'
          ? 18
          : user === 'katrin'
          ? 19
          : 0, // Assuming `user` is the user ID passed as a prop
      payment_method_id: parseInt(paymentMethod), // Convert payment method to an integer
      transaction_type: transactionType,
      category,
      amount: parseFloat(amount), // Convert amount to a number
      description,
    };

    const api = new TransactionsApi(); // Create an instance of TransactionsApi

    try {
      const createdTransaction = await api.createTransaction(
        newTransaction,
        user
      );
      if (createdTransaction) {
        setUiState('data'); // Set UI state to success
        setMessage('Transaction created successfully!');
        console.log('Transaction created:', createdTransaction);

        // Clear the form after successful submission
        setAccount('');
        setPaymentMethod('');
        setTransactionType('');
        setCategory('');
        setAmount('');
        setDescription('');
      } else {
        setUiState('error'); // Set UI state to error
        setMessage('Failed to create transaction.');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setUiState('error'); // Set UI state to error
      setMessage('An error occurred while creating the transaction.');
    }
  };

  switch (uiState) {
    case 'loading':
      return <p className={styles.loading}>Creating transaction...</p>;
    case 'error':
      return (
        <div>
          <p className={styles.error}>Error: {message}</p>
          <button
            onClick={() => setUiState('initial')}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      );
    case 'data':
      return (
        <div>
          <p className={styles.success}>{message}</p>
          <button
            onClick={() => setUiState('initial')}
            className={styles.retryButton}
          >
            Create Another Transaction
          </button>
        </div>
      );
    case 'initial':
    default:
      return (
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Create New Transaction</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="account" className={styles.label}>
                Account:
              </label>
              <select
                id="account"
                className={styles.input}
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              >
                <option value="" disabled>
                  Veldu reikning
                </option>
                <option value="16">Aðalreikningur</option>
                <option value="17">Jónas reikningur</option>
                <option value="18">Katríns reikningur</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod" className={styles.label}>
                Payment Method:
              </label>
              <select
                id="paymentMethod"
                className={styles.input}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="" disabled>
                  Veldu form greiðslu
                </option>
                <option value="10">Reiðufé</option>
                <option value="11">Kreditkort</option>
                <option value="12">Bankamillifærsla</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="transactionType" className={styles.label}>
                Transaction Type:
              </label>
              <select
                id="transactionType"
                className={styles.input}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                required
              >
                <option value="" disabled>
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
              <select
                id="category"
                className={styles.input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
}
