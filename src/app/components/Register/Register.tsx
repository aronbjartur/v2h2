'use client';

import React, { useState } from 'react';
import styles from './Register.module.css';
import Link from 'next/link';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Vinsamlegast fylltu út alla reiti.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Lykilorð stemma ekki.');
      return;
    }

    // Simulate successful registration
    setErrorMessage('');
    setSuccessMessage('Skráning tókst! Þú getur nú skráð þig inn.');
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Nýskráning</h2>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Notandanafn
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Sláðu inn notandanafn"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Netfang
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Sláðu inn netfang"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Lykilorð
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sláðu inn lykilorð"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Staðfesta lykilorð
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Sláðu inn lykilorð aftur"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Skrá mig
        </button>

        <Link href="/login" className={styles.link}>
          Hefur þú nú þegar aðgang? Skráðu þig inn
        </Link>
      </form>
    </div>
  );
};

export default Register;
