import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <Link href="/transactions">
            <li className={styles.listItem}>Transactions</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
