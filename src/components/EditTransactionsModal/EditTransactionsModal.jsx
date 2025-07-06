import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { closeTransactionsEditModal } from "../../redux/transactions/slice";
import { CgClose } from "react-icons/cg";
import css from "./EditTransactionsModal.module.css";

const EditTransactionsModal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeTransactionsEditModal());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={() => dispatch(closeTransactionsEditModal())}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => dispatch(closeTransactionsEditModal())}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <h2 className={css.test}>Edit Transaction Modal</h2>
      </div>
    </div>,
    document.body
  );
};

export default EditTransactionsModal;
