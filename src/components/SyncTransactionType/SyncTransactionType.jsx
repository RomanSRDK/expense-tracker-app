import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { clearCategory } from "../../redux/categories/slice";
import { selectCategory } from "../../redux/categories/selectors";
import {
  setTransactionType,
  clearTransactionType,
} from "../../redux/transactions/slice";
import {
  selectSelectedRadioType,
  selectTransactionType,
} from "../../redux/transactions/selectors";

const SyncTransactionType = () => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const prevType = useRef(values.type);
  const selectedTransactionType = useSelector(selectTransactionType);
  const selectedRadioType = useSelector(selectSelectedRadioType);
  const selectedCategory = useSelector(selectCategory);

  useEffect(() => {
    if (values.type && values.type !== selectedTransactionType) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, selectedTransactionType, dispatch]);

  useEffect(() => {
    if (selectedRadioType && selectedRadioType !== values.type) {
      setFieldValue("type", selectedRadioType);
    }
  }, [selectedRadioType, values.type, setFieldValue]);

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
