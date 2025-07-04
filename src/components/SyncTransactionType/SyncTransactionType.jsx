import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionType } from "../../redux/transactions/slice";
import { clearCategory } from "../../redux/categories/slice";
import { selectTransactionType } from "../../redux/transactions/selectors";
import { selectCategory } from "../../redux/categories/selectors";

const SyncTransactionType = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  const selectedTransactionType = useSelector(selectTransactionType);
  const selectedCategory = useSelector(selectCategory);

  useEffect(() => {
    if (!selectedTransactionType && !selectedCategory?.type && values.type) {
      dispatch(setTransactionType(values.type));
    }

    if (
      values.type &&
      selectedCategory?.type &&
      values.type !== selectedCategory.type
    ) {
      dispatch(clearCategory());
    }

    if (values.type && values.type !== selectedTransactionType) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, selectedTransactionType, selectedCategory, dispatch]);

  return null;
};

export default SyncTransactionType;
