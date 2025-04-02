import Alltransactions from '../components/Alltransactions/Alltransactions';
import Header from '../components/Header/Header';
// https://localhost:8000
export default async function Home() {
  return (
    <div>
      <Header />
      <Alltransactions />
    </div>
  );
}
