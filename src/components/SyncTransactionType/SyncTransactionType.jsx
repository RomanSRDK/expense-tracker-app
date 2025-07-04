import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTransactionType,
  clearTransactionType,
} from "../../redux/transactions/slice";
import { clearCategory } from "../../redux/categories/slice";
import { selectTransactionType } from "../../redux/transactions/selectors";
import { selectCategory } from "../../redux/categories/selectors";

const SyncTransactionType = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  const prevType = useRef(values.type);
  const selectedTransactionType = useSelector(selectTransactionType);
  const selectedCategory = useSelector(selectCategory);

  useEffect(() => {
    if (values.type && values.type !== selectedTransactionType) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, selectedTransactionType, dispatch]);

  useEffect(() => {
    const typeChanged = prevType.current && prevType.current !== values.type;

    const categorySelected =
      selectedCategory && Object.keys(selectedCategory).length > 0;

    if (typeChanged && categorySelected) {
      dispatch(clearCategory());

      if (selectedTransactionType !== "all") {
        dispatch(clearTransactionType());
      }
    }

    prevType.current = values.type;
  }, [values.type, dispatch, selectedTransactionType, selectedCategory]);

  return null;
};

export default SyncTransactionType;
