'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { ApiClient, ApiError } from '@/app/api'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiClient = new ApiClient();

    try {
      const result = await apiClient.login({ username, password });
      await login(result.token, result.user);
      router.push('/transactions'); 
    } catch (err: any) {
      console.error('Login error:', err);
      if (err instanceof ApiError) {
          setError(err.message || 'Innskráning mistókst.');
      } else if (err instanceof Error) {
          setError(err.message);
      }
      else {
        setError('Innskráning mistókst. Athugaðu notendanafn og lykilorð.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Innskráning</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="username">
            Notendanafn:
          </label>
          <input
            className={styles.inntak}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Sláðu inn notendanafn"
            required
            disabled={loading}
            autoComplete="username"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="password">
            Lykilorð:
          </label>
          <input
            className={styles.inntak}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sláðu inn lykilorð"
            required
            disabled={loading}
            autoComplete="current-password"
          />
        </div>
        <button className={styles.takkinn} type="submit" disabled={loading}>
          {loading ? 'Skrái inn...' : 'Innskrá'}
        </button>
      </form>
      <p className={styles.registerLink}>
        Ertu ekki með aðgang? <Link href="/register">Nýskráning</Link>
      </p>
    </div>
  );
}