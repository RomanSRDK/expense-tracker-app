import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearTransactionRadioType,
  clearTransactionToEdit,
  clearTransactionType,
  closeTransactionsEditModal,
} from "../../redux/transactions/slice";
import { CgClose } from "react-icons/cg";
import TransactionForm from "../TransactionForm/TransactionForm";
import toast from "react-hot-toast";
import { clearCategory } from "../../redux/categories/slice";
import { updateTransaction } from "../../redux/transactions/operations";
import css from "./EditTransactionsModal.module.css";
import { selectTransactionToEdit } from "../../redux/transactions/selectors";

const EditTransactionsModal = () => {
  const dispatch = useDispatch();
  const TransactionToEdit = useSelector(selectTransactionToEdit);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeTransactionsEditModal());
        dispatch(clearTransactionToEdit());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(updateTransaction(values)).unwrap();
      toast.success("Transaction edited");
      dispatch(clearCategory());
      dispatch(clearTransactionType());
      dispatch(clearTransactionRadioType());
      dispatch(clearTransactionToEdit());
      resetForm();
      dispatch(closeTransactionsEditModal());
    } catch {
      toast.error("Something went wrong, please try different data.");
    }
  };

  const buttonText = "Save";

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={() => {
        dispatch(closeTransactionsEditModal());
        dispatch(clearTransactionToEdit());
      }}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => {
            dispatch(closeTransactionsEditModal());
            dispatch(clearTransactionToEdit());
          }}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <TransactionForm
          onSubmit={handleSubmit}
          initialValues={TransactionToEdit}
          buttonText={buttonText}
        />
        <h2 className={css.test}>Edit Transaction Modal</h2>
      </div>
    </div>,
    document.body
  );
};

export default EditTransactionsModal;
