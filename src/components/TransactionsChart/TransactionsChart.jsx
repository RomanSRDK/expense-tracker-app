import React from "react";
import { useSelector } from "react-redux"; // 1. Импортируем useSelector
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { selectCurrency } from "../../redux/user/selectors"; // 2. Импортируем селектор валюты
import { getCurrencySymbol } from "../../utils/currencyUtils"; // 3. Импортируем утилиту
import styles from "./TransactionsChart.module.css";

const TransactionsChart = ({ expenseData, totalExpense, categoryColors }) => {
  const currencyCode = useSelector(selectCurrency);
  const currencySymbol = getCurrencySymbol(currencyCode);

  if (!expenseData || expenseData.length === 0 || !totalExpense) {
    return (
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Expense Statistics</h3>
        <div className={styles.emptyState}>No data for this period.</div>
      </div>
    );
  }

  const chartData = expenseData.map((item) => ({
    ...item,
    percentage: totalExpense > 0 ? (item.total / totalExpense) * 100 : 0,
  }));

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Expense Statistics</h3>
      <div className={styles.contentContainer}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                startAngle={180}
                endAngle={0}
                innerRadius="130%"
                outerRadius="200%"
                paddingAngle={2}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="100%"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={categoryColors[entry.name]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.totalAmountInChart}>
            {currencySymbol}
            {totalExpense.toFixed(2)}
          </div>
        </div>

        {/* Легенда */}
        <ul className={styles.categoriesList}>
          {chartData.map((item) => (
            <li key={item.name} className={styles.categoryItem}>
              <span
                className={styles.colorMarker}
                style={{ backgroundColor: categoryColors[item.name] }}
              ></span>
              <span className={styles.categoryName}>{item.name}</span>
              <span className={styles.categoryPercentage}>
                {item.percentage.toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionsChart;
