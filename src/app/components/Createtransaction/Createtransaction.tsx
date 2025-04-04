'use client';

import React, { useState, useEffect } from 'react'; 
import styles from './Createtransaction.module.css';
import { ApiClient, ApiError } from '@/app/api';
import { useAuth } from '@/app/context/AuthContext';
import { UiState, Account, Transaction } from '@/app/types'; 

interface CreatetransactionProps {
  onTransactionCreated: () => void;
}

type AccountOption = Pick<Account, 'id' | 'account_name'>;

export default function Createtransaction({ onTransactionCreated }: CreatetransactionProps) {
  const { user, token, logout } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [accountOptions, setAccountOptions] = useState<AccountOption[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [uiState, setUiState] = useState<UiState>('initial');


  useEffect(() => {
    const currentLogout = logout; 
    const fetchAccounts = async () => {
      if (!token) {
        setAccountsLoading(false);
        setErrorMessage('Notandi ekki innskráður til að sækja reikninga.'); 
        return;
      }
      setAccountsLoading(true);
      setErrorMessage(''); 
      const apiClient = new ApiClient();
      apiClient.setToken(token);
      try {
        const fetchedAccounts = await apiClient.getMyAccounts();
        setAccountOptions(fetchedAccounts ?? []);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        if (error instanceof ApiError && error.status === 401) {
          if (currentLogout) currentLogout();
          setErrorMessage('Þú hefur verið skráð/ur út.'); 
        } else if (error instanceof Error) {
          setErrorMessage(`Villa við að sækja reikninga: ${error.message}`); 
        } else {
          setErrorMessage('Óþekkt villa við að sækja reikninga.'); 
        }
      } finally {
        setAccountsLoading(false);
      }
    };
    fetchAccounts();
  }, [token]); 


  const clearForm = () => {
    setAccount(''); setPaymentMethod(''); setTransactionType(''); setCategory('');
    setAmount(''); setDescription(''); setErrorMessage(''); setSuccessMessage(''); 
    setErrorDetails(null); setUiState('initial'); setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); setSuccessMessage(''); 
    setErrorDetails(null);

    if (!token || !user) { setErrorMessage('Notandi ekki innskráður.'); return; }
    if (!account) { setErrorMessage('Vinsamlegast veldu reikning.'); return; }

    if ( !paymentMethod || !transactionType || !category || !amount || !description ) {
        setErrorMessage('Vinsamlegast fylltu út alla reiti.'); return;
    }
     if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setErrorMessage('Upphæð verður að vera jákvæð tala.'); return;
     }
     if (isNaN(parseInt(paymentMethod)) || ![1,2,3].includes(parseInt(paymentMethod))) {
          setErrorMessage('Ógilt greiðsluform valið.'); return;
     }
     if (isNaN(parseInt(account))) {
          setErrorMessage('Ógildur reikningur valinn.'); return;
     }


    setIsSubmitting(true); 
    setUiState('loading'); 

    const newTransactionData = {
      account_id: parseInt(account, 10),
      payment_method_id: parseInt(paymentMethod, 10),
      transaction_type: transactionType,
      category: category,
      amount: parseFloat(amount),
      description: description,
    };

    const apiClient = new ApiClient(); apiClient.setToken(token);

    try {
      await apiClient.createTransaction(newTransactionData);
      setSuccessMessage('Færsla stofnuð!'); 
      setUiState('data'); 
      onTransactionCreated();
      setTimeout(clearForm, 2500);
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      setUiState('error'); 
      if (error instanceof ApiError) {
        setErrorMessage(`Villa (${error.status}): ${error.message}`); 
        if (error.details?.details) {
            setErrorDetails(error.details.details); 
            setErrorMessage(`Villa (${error.status}): Ógild gögn. Sjá nánar.`);
         }
        if (error.status === 401) { logout(); }
      } else if (error instanceof Error) { setErrorMessage(`Villa: ${error.message}`); }
      else { setErrorMessage('Óþekkt villa við að stofna færslu.'); }
    } finally {
        setIsSubmitting(false); 
    }
  };


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Stofna nýja færslu</h2>

        {errorMessage && !errorDetails && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        {errorDetails && (
          <div >
            <p className={styles.errorMessage}>
              {errorMessage.includes('Sjá nánar') ? errorMessage : 'Gögn eru ógild:'}
            </p>
            <ul >
              {Object.entries(errorDetails.fieldErrors || {}).map(
                ([field, errors]) => ( <li key={field}><strong>{field}:</strong> {(errors as string[]).join(', ')}</li> )
              )}
              {(errorDetails.formErrors || []).map(
                (err: string, index: number) => ( <li key={`form-${index}`}>{err}</li> )
              )}
            </ul>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="account" className={styles.label}>Reikningur:</label>
          <select id="account" className={styles.input} value={account} onChange={(e) => setAccount(e.target.value)} required disabled={accountsLoading || accountOptions.length === 0} >
            <option value="" disabled> {accountsLoading ? 'Hleð...' : (accountOptions.length === 0 ? 'Engir reikningar' : 'Veldu reikning')} </option>
            {accountOptions.map((acc) => ( <option key={acc.id} value={String(acc.id)}> {acc.account_name} </option> ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod" className={styles.label}>Greiðslumáti:</label>
          <select id="paymentMethod" className={styles.input} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required >
            <option value="" disabled> Veldu form greiðslu </option>
            <option value="1">Reiðufé</option><option value="2">Kreditkort</option><option value="3">Bankamillifærsla</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="transactionType" className={styles.label}>Tegund færslu:</label>
          <select id="transactionType" className={styles.input} value={transactionType} onChange={(e) => setTransactionType(e.target.value)} required >
            <option value="" disabled> Veldu tegund </option>
            <option value="income">Tekjur</option><option value="expense">Gjöld</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Flokkur:</label>
          <select id="category" className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} required >
            <option value="" disabled> Veldu flokk </option>
            <option value="matur">Matur</option><option value="íbúð">Íbúð</option><option value="samgöngur">Samgöngur</option><option value="afþreying">Afþreying</option><option value="laun">Laun</option><option value="annað">Annað</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>Upphæð (kr.):</label>
          <input type="number" id="amount" className={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required step="0.01" min="0.01" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Lýsing:</label>
          <input type="text" id="description" className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Stutt skýring..." required />
        </div>

        {/* Takkar */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton} disabled={accountsLoading || isSubmitting} >
            {isSubmitting ? 'Sendi...' : 'Stofna færslu'}
          </button>
          <button type="button" onClick={clearForm} className={styles.clearButton} disabled={isSubmitting} >
            Hreinsa
          </button>
        </div>
      </form>
    </div>
  );
}