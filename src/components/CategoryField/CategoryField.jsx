import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCategoriesModal } from "../../redux/transactions/slice";
import { selectCategory } from "../../redux/categories/selectors";
import css from "../TransactionForm/TransactionForm.module.css";

const CategoryField = ({ setFieldValue, id }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {
    if (category?.id) {
      setFieldValue("category", category.id);
    }
  }, [category, setFieldValue]);

  return (
    <div className={css.inputWrapper}>
      <label className={css.label} htmlFor={id}>
        Category
      </label>
      <input
        className={`${css.input} ${css.category}`}
        type="text"
        id={id}
        name="category"
        placeholder="Select category"
        value={category?.name || ""}
        readOnly
        onClick={() => dispatch(openCategoriesModal())}
      />
    </div>
  );
};

export default CategoryField;
