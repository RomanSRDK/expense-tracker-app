import { useEffect, useMemo, useState } from "react"; // <-- 1. Импортируем useState
import { useDispatch, useSelector } from "react-redux";
import MainTransactionsHeader from "../../components/MainTransactionsHeader/MainTransactionsHeader";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "../../components/TransactionsSearchTools/TransactionsSearchTools";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import { getAllTransactions } from "../../redux/transactions/operations";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import s from "./TransactionsHistoryPage.module.css";

function TransactionsHistoryPage() {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectAllTransactions);

  // <-- 2. Добавляем состояние для фильтров -->
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const summaryData = useMemo(() => {
    if (!allTransactions || allTransactions.length === 0) {
      return { expenseSummary: 0, incomeSummary: 0 };
    }

    const expenseSummary = allTransactions
      .filter((t) => t.type && t.type.toLowerCase() === "expenses")
      .reduce((sum, t) => sum + t.sum, 0);

    const incomeSummary = allTransactions
      .filter((t) => t.type && t.type.toLowerCase() === "incomes")
      .reduce((sum, t) => sum + t.sum, 0);

    return { expenseSummary, incomeSummary };
  }, [allTransactions]);

  return (
    <Container>
      <Section>
        <div className={s.pageWrapper}>
          <main className={s.mainContent}>
            <header className={s.pageHeader}>
              <div className={s.headerInfo}>
                <h1 className={s.infoHeader}>Expense Log</h1>
                <p className={s.infoText}>
                  Capture and organize every penny spent with ease! A clear view
                  of your financial habits at your fingertips.
                </p>
              </div>
              <div className={s.headerTotals}>
                <TransactionsTotalAmount
                  totalIncome={summaryData.incomeSummary}
                  totalExpense={summaryData.expenseSummary}
                />
              </div>
            </header>
            <div className={s.transactionsWrapper}>
              {/* 3. Теперь передаем существующие переменные и функции в дочерние компоненты */}
              <TransactionsSearchTools
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <TransactionsList
                searchQuery={searchQuery}
                selectedDate={selectedDate}
              />
            </div>
          </main>
        </div>
      </Section>
    </Container>
  );
}

export default TransactionsHistoryPage;
