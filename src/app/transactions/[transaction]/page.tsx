import Createtransaction from '../../components/Createtransaction/Createtransaction';
import Header from '../../components/Header/Header';
import Transactions from '../../components/Transactions/Transactions';
// https://localhost:8000
export default async function TransactionsByUser({
  params,
}: {
  params: Promise<{ transaction: string }>;
}) {
  const { transaction } = await params;
  return (
    <div>
      <Header />
      <Createtransaction user={transaction} />
      <Transactions user={transaction} />
    </div>
  );
}
