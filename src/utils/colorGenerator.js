const PREDEFINED_COLORS = [
   '#0EBB69', '#0EF387', '#FAFAFA', '#444446',
  '#13D08F', '#10A875', '#D6D6D6', '#2C2C2E'
];

export const generateCategoryColors = (categories) => {
  const colorMap = {};
  categories.forEach((category, index) => {
    const key = category.name || category.categoryName;
    colorMap[key] = PREDEFINED_COLORS[index % PREDEFINED_COLORS.length];
  });
  return colorMap;
};
