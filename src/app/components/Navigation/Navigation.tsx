import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li className={styles.listItem}>
            <Link href="/transactions">Transactions</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
