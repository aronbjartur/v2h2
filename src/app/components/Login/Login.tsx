import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <form>
        <div className={styles.formGroup}>
          <label className={styles.stafir} htmlFor="username">
            Notendanafn:
          </label>
          <input
            className={styles.inntak}
            type="text"
            id="username"
            name="username"
            placeholder="Sláðu inn notendanafn"
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
            placeholder="Sláðu inn lykilorð"
          />
        </div>
        <button className={styles.takkinn} type="submit">
          Innskrá
        </button>
      </form>
    </div>
  );
}
