import React from 'react';
import styles from './TransactionsChart.module.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
 
const needle = (value, data, cx, cy, iR, oR, color) => {
  const ang = 180.0;  
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-Math.PI / 180 * ang);
  const cos = Math.cos(-Math.PI / 180 * ang);
  const x0 = cx;
  const y0 = cy;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={5} fill={color} stroke="none" />,
    <path key="needle-path" d={`M${x0},${y0}L${xp},${yp}`} stroke={color} strokeWidth={3} />,
  ];
};

const TransactionsChart = ({ expenseData = [], totalExpense = 0, categoryColors }) => {
  if (!expenseData || expenseData.length === 0 || totalExpense === 0) {
    return (
      <div className={styles.chartWrapper}>
        <div className={styles.emptyState}>No data for this period.</div>
      </div>
    );
  }

 const chartData = expenseData.map(item => ({
  name: item.name,  
  value: item.total, 
}));

  return (
    <div className={styles.chartWrapper}>
      <h3>Expenses categories</h3>
      <div className={styles.contentContainer}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={chartData}
                cx="50%"
                cy="100%"
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                stroke="none"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors?.[entry.name] || '#C9CBCF'} />
                ))}
              </Pie>
              {needle(totalExpense, chartData, 100, 100, 50, 80, '#474747')}
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.totalAmountInChart}>
            ₴ {totalExpense.toLocaleString('uk-UA')}
          </div>
        </div>

       <ul className={styles.categoriesList}>
  {expenseData.map((item, index) => (
    <li key={index} className={styles.categoryItem}>
      <span
        className={styles.colorMarker}
        style={{ backgroundColor: categoryColors?.[item.name] || '#C9CBCF' }}  
      />
      <span className={styles.categoryName}>{item.name}</span>  
      <span className={styles.categoryPercentage}>
        
        {((item.total / totalExpense) * 100).toFixed(1)}%
      </span>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
};

export default TransactionsChart;