import React from 'react';
import { Transaction } from '@/app/types';
import styles from './TransactionTable.module.css';

interface TransactionTableProps {
  transactions: Transaction[];
}

const columns: Array<{ key: keyof Transaction; label: string }> = [
  { key: 'id', label: 'Færslu ID' },
  { key: 'account_id', label: 'Reikningur ID' },
  { key: 'user_id', label: 'Notandi ID' },
  { key: 'payment_method_id', label: 'Greiðslumáti ID' },
  { key: 'transaction_type', label: 'Tegund' },
  { key: 'category', label: 'Flokkur' },
  { key: 'amount', label: 'Upphæð' },
  { key: 'description', label: 'Lýsing' },
];

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  if (!transactions || transactions.length === 0) {
    return <p>Engar færslur til að sýna.</p>;
  }

  // Sort transactions by id in descending order
  const sortedTransactions = [...transactions].sort((a, b) => b.id - a.id);

  const formatCell = (
    transaction: Transaction,
    columnKey: keyof Transaction
  ): string => {
    const value = transaction[columnKey];

    if (columnKey === 'amount') {
      const amountValue =
        typeof value === 'number' ? value : parseFloat(String(value ?? 0));
      return `${amountValue.toFixed(2)} kr.`;
    }

    return String(value ?? '-');
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.tableHeader}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id} className={styles.tableRow}>
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  {formatCell(transaction, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
