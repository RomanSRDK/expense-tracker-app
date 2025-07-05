import { subMonths, format, parseISO, getDay } from "date-fns";

// Функция для графика "Доходы vs. Расходы"
export const calculateIncomeVsExpense = (transactions, months = 6) => {
  const data = {};
  const endDate = new Date();
  const startDate = subMonths(endDate, months);

  for (let i = 0; i < months; i++) {
    const monthKey = format(subMonths(endDate, i), "yyyy-MM");
    data[monthKey] = {
      month: format(subMonths(endDate, i), "MMM"),
      income: 0,
      expense: 0,
    };
  }

  transactions.forEach((t) => {
    const transactionDate = parseISO(t.transactionDate);
    if (transactionDate >= startDate && transactionDate <= endDate) {
      const monthKey = format(transactionDate, "yyyy-MM");
      if (data[monthKey]) {
        const type = t.type.toLowerCase();
        if (type === "incomes") {
          data[monthKey].income += t.sum;
        } else if (type === "expenses") {
          data[monthKey].expense += t.sum;
        }
      }
    }
  });

  return Object.values(data).reverse();
};

// ✅ Исправленная функция для графика "Траты по категориям"
export const calculateCategorySpending = (transactions, categories, type) => {
  if (!Array.isArray(categories) || !Array.isArray(transactions)) return [];

  const categoryMap = categories.reduce((acc, cat) => {
    if (cat._id) {
      acc[cat._id] = {
        name: cat.name || cat.categoryName, // поддержка обоих форматов
        total: 0,
      };
    }
    return acc;
  }, {});

  transactions.forEach((t) => {
    const categoryIdInTransaction = t.category?._id;

    // console.log('Категория транзакции:', t.category);
    // console.log('Есть ли такая категория в map:', !!categoryMap[categoryIdInTransaction]);

    if (
      t.type &&
      t.type.toLowerCase() === type.toLowerCase() &&
      categoryIdInTransaction &&
      categoryMap[categoryIdInTransaction]
    ) {
      categoryMap[categoryIdInTransaction].total += t.sum;
    }
  });

  return Object.values(categoryMap).filter((cat) => cat.total > 0);
};

// Функция для Heatmap календаря
export const calculateHeatmapData = (transactions, year) => {
  const values = transactions
    .filter(
      (t) =>
        t.type.toLowerCase() === "expenses" &&
        format(parseISO(t.transactionDate), "yyyy") === year.toString()
    )
    .reduce((acc, t) => {
      const date = format(parseISO(t.transactionDate), "yyyy-MM-dd");
      acc[date] = (acc[date] || 0) + t.sum;
      return acc;
    }, {});

  return Object.keys(values).map((date) => ({ date, count: values[date] }));
};

// Функция для графика "Расходы по дням недели"
export const calculateSpendingByDayOfWeek = (transactions) => {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day) => ({
    day,
    expense: 0,
  }));

  transactions.forEach((t) => {
    if (t.type.toLowerCase() === "expenses") {
      const dayIndex = getDay(parseISO(t.transactionDate));
      days[dayIndex].expense += t.sum;
    }
  });

  return days;
};
