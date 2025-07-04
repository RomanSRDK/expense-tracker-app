import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionType } from "../../redux/transactions/slice";
import {
  selectCategory,
  // selectSelectedCategoryType,
} from "../../redux/categories/selectors";

const SyncSelectedCategoryType = () => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const selectedCategory = useSelector(selectCategory);
  const selectedCategoryType = useSelector(selectSelectedCategoryType);

  // Синхронизация типа категории в форму
  useEffect(() => {
    if (selectedCategoryType) {
      setFieldValue("type", selectedCategoryType);
    } else {
      setFieldValue("type", "");
    }
  }, [selectedCategoryType, setFieldValue]);

  // Диспатч в redux, если выбран type
  useEffect(() => {
    if (values.type) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, dispatch]);

  return null;
};

export default SyncSelectedCategoryType;
