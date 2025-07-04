const PREDEFINED_COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#FFCD56', '#C45850', '#8E5EA2', '#3CBA9F'
];

/**
 * Генерує карту кольорів для категорій
 * @param {Array} categories - Масив об'єктів категорій з бекенду
 * @returns {Object} - Об'єкт, де ключ - назва категорії, а значення - колір
 */
export const generateCategoryColors = (categories) => {
  const colorMap = {};
  categories.forEach((category, index) => {
    // Використовуємо колір з палітри по колу
    colorMap[category.name] = PREDEFINED_COLORS[index % PREDEFINED_COLORS.length];
  });
  return colorMap;
};