import Header from '../components/Header/Header';
import Transactions from '../components/Transactions/Transactions';
// https://localhost:8000
export default function Home() {
  return (
    <div>
      <Header />
      <Transactions />
    </div>
  );
}
