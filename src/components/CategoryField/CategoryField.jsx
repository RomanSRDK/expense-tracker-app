import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "formik";
import { useEffect } from "react";
import { openCategoriesModal } from "../../redux/transactions/slice";
import { selectCategory } from "../../redux/categories/selectors";
import css from "../TransactionForm/TransactionForm.module.css";

const CategoryField = ({ setFieldValue, id }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {
    if (category?.id) {
      setFieldValue("category", category.id);
    } else setFieldValue("category", "");
  }, [category, setFieldValue]);

  return (
    <div className={`${css.inputWrapper} ${css.category}`}>
      <label className={`${css.label} ${css.category}`} htmlFor={id}>
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
      <ErrorMessage className={css.error} name="category" component="div" />
    </div>
  );
};

export default CategoryField;
