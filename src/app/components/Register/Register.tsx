'use client';

import { useState, FormEvent } from 'react'; 
import { ApiClient, ApiError } from '@/app/api'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Register.module.css';

export default function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Lykilorð stemma ekki.');
      return;
    }
    if (password.length < 8) {
      setError('Lykilorð verður að vera að minnsta kosti 8 stafir.');
      return;
    }

    setLoading(true);
    const apiClient = new ApiClient();

    try {
      await apiClient.register({ username, email, password });
      setSuccess('Nýskráning tókst! Sendi þig á innskráningarsíðu...');
      setTimeout(() => {
        router.push('/login');
      }, 2500); 
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err instanceof ApiError) {
          setError(err.message || 'Nýskráning mistókst.');
      } else if (err instanceof Error) {
          setError(err.message);
      } else {
        setError('Nýskráning mistókst. Vinsamlegast reyndu aftur síðar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Nýskráning</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="username">Notendanafn:</label>
          <input
            className={styles.inntak}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading || !!success} 
            autoComplete="username"
          />
        </div>
         <div className={styles.formGroup}>
           <label className={styles.stafir} htmlFor="email">Tölvupóstfang:</label>
           <input
             className={styles.inntak}
             type="email"
             id="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             disabled={loading || !!success}
             autoComplete="email"
           />
         </div>
        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="password">Lykilorð:</label>
          <input
            className={styles.inntak}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading || !!success}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="confirmPassword">Staðfesta lykilorð:</label>
          <input
             className={styles.inntak}
             type="password"
             id="confirmPassword"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
             disabled={loading || !!success}
             autoComplete="new-password"
           />
        </div>

        <button className={styles.takkinn} type="submit" disabled={loading || !!success}>
          {loading ? 'Skrái...' : 'Nýskrá'}
        </button>
      </form>
       <p className={styles.loginLink}>
         Ertu nú þegar með aðgang? <Link href="/login">Innskráning</Link>
       </p>
    </div>
  );
}