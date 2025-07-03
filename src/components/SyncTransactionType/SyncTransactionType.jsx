import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTransactionType } from "../../redux/transactions/slice";

const SyncTransactionType = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.type) {
      dispatch(setTransactionType(values.type));
    }
  }, [values.type, dispatch]);
  return null;
};

export default SyncTransactionType;
