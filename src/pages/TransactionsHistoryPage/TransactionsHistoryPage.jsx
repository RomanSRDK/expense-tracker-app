import { useState } from "react";
import MainTransactionsHeader from "../../components/MainTransactionsHeader/MainTransactionsHeader";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionsSearchTools from "../../components/TransactionsSearchTools/TransactionsSearchTools";
// Используем 's' как и раньше, но применим новые классы
import s from "./TransactionsHistoryPage.module.css";
import Container from "../../components/Container/Container";

function TransactionsHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Container>
      {/* 1. Добавляем обертку, как на главной странице */}
      <div className={s.pageWrapper}>
        {/* 2. Добавляем контейнер для контента */}
        <main className={s.mainContent}>
          {/* 3. Вся логика страницы теперь внутри этого контейнера */}
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
    </Container>
  );
}

export default TransactionsHistoryPage;
