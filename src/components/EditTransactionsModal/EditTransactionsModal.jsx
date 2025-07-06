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
import toast from "react-hot-toast";
import { clearCategory } from "../../redux/categories/slice";
import { updateTransaction } from "../../redux/transactions/operations";
import { selectTransactionToEdit } from "../../redux/transactions/selectors";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./EditTransactionsModal.module.css";
import TransactionForm from "../TransactionForm/TransactionForm";

const EditTransactionsModal = () => {
  const dispatch = useDispatch();
  const TransactionToEdit = useSelector(selectTransactionToEdit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetValueForm = () => {
    dispatch(clearCategory());
    dispatch(clearTransactionType());
    dispatch(clearTransactionRadioType());
    dispatch(clearTransactionToEdit());
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeTransactionsEditModal());
        resetValueForm();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, resetValueForm]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(updateTransaction(values)).unwrap();
      toast.success("Transaction edited");
      resetValueForm();
//       dispatch(clearCategory());
//       dispatch(clearTransactionType());
//       dispatch(clearTransactionRadioType());
//       dispatch(clearTransactionToEdit());
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
        resetValueForm();
//         dispatch(clearTransactionToEdit());

      }}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => {
            dispatch(closeTransactionsEditModal());
            resetValueForm();
//             dispatch(clearTransactionToEdit());
          }}
        >
          <CgClose className={css.closeIcon} />
        </button>

        <TransactionForm
          onSubmit={handleSubmit}
          initialValues={TransactionToEdit}
          buttonText={buttonText}
          isDisabled={true}
        />
      </div>
    </div>,
    document.body
  );
};

export default EditTransactionsModal;
