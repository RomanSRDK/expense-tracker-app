import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTransactionType } from "../../redux/transactions/selectors";

const SyncToCategoriesForm = () => {
  const { setFieldValue } = useFormikContext();
  const selectedTransactionType = useSelector(selectTransactionType);

  useEffect(() => {
    if (selectedTransactionType && selectedTransactionType !== "all") {
      setFieldValue("category", selectedTransactionType);
    }
  }, [selectedTransactionType, setFieldValue]);

  return null;
};

export default SyncToCategoriesForm;
