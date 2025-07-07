import { useState } from "react";
import MainTransactionsHeader from "../../components/MainTransactionsHeader/MainTransactionsHeader";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "../../components/TransactionsSearchTools/TransactionsSearchTools";
// Используем 's' как и раньше, но применим новые классы
import Container from "../../components/Container/Container";
import s from "./TransactionsHistoryPage.module.css";
import Section from "../../components/Section/Section";

function TransactionsHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Container>
      <Section>
        {/* 1. Добавляем обертку, как на главной странице */}
        <div className={s.pageWrapper}>
          {/* 2. Добавляем контейнер для контента */}
          <main className={s.mainContent}>
            {/* 3. Вся логика страницы теперь внутри этого контейнера */}
            <section className={s.infoSection}>
              <h1 className={s.infoHeader}>Expense Log</h1>
              <p className={s.infoText}>
                Capture and organize every penny spent with ease! A clear view
                of your financial habits at your fingertips.
              </p>
              <TransactionsTotalAmount
                totalIncome={summaryData.incomeSummary}
                totalExpense={summaryData.expenseSummary}
              />
              <TransactionsChart
                expenseData={summaryData.categoriesSummary}
                totalExpense={summaryData.expenseSummary}
                categoryColors={categoryColors}
              />
            </section>
            <div className={s.transactionsWrapper}>
              <TransactionsSearchTools
                earchQuery={searchQuery}
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
