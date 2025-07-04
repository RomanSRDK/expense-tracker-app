import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionType } from "../../redux/transactions/slice";
import { selectCategory } from "../../redux/categories/selectors";
import { selectTransactionType } from "../../redux/transactions/selectors";

const SyncSelectedCategoryType = () => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const selectedCategoryType = useSelector(selectTransactionType);
  const selectedCategory = useSelector(selectCategory);

  useEffect(() => {
    if (selectedCategoryType && values.type !== selectedCategoryType) {
      setFieldValue("type", selectedCategoryType);
    }
    if (!selectedCategoryType && values.type !== "all") {
      setFieldValue("type", "all");
    }
  }, [selectedCategoryType, setFieldValue, values.type]);

  useEffect(() => {
    if (
      values.type !== "" &&
      selectedCategory &&
      Object.keys(selectedCategory).length > 0
    ) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, selectedCategory, dispatch]);

  return null;
};

export default SyncSelectedCategoryType;
