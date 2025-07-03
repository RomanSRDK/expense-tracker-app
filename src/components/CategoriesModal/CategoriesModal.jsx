import { createPortal } from "react-dom";
import { closeCategoriesModal } from "../../redux/transactions/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import css from "./CategoriesModal.module.css";
import CategoriesList from "../CategoriesList/CategoriesList";
import { getCategories } from "../../redux/categories/operations";

const CategoriesModal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeCategoriesModal());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={() => dispatch(closeCategoriesModal())}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => dispatch(closeCategoriesModal())}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <div className={css.container}>
          <h2 className={css.title}>Expenses</h2>
          <h3 className={css.subtitle}>All Category</h3>
        </div>
        <CategoriesList />
        <div className={css.container}></div>
      </div>
    </div>,
    document.body
  );
};

export default CategoriesModal;
