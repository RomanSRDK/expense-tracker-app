import TransactionsList from '../../components/TransactionsList/TransactionsList';
import TransactionsSearchTools from '../../components/TransactionsSearchTools/TransactionsSearchTools';
import s from './TransactionsHistoryPage.module.css';

function TransactionsHistoryPage() {
  return (
    <div className={s.wrapper}>
      TransactionsHistoryPage
      <div className={s.transactionsWrapper}>
        <TransactionsSearchTools />
        <TransactionsList />
      </div>
    </div>
  );
}

export default TransactionsHistoryPage;
