import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import CategoriesList from "../CategoriesList/CategoriesList";
import { getCategories } from "../../redux/categories/operations";
import CategoriesForm from "../CategoriesForm/CategoriesForm";
import { selectTransactionType } from "../../redux/transactions/selectors";
import {
  selectEditCategory,
  selectIsLoading,
} from "../../redux/categories/selectors";
import Loader from "../Loader/Loader";
import { closeCategoriesModal } from "../../redux/transactions/slice";
import EditCategoriesForm from "../EditCategoriesForm/EditCategoriesForm";
import TransactionsCustomSelect from "../TransactionsCustomSelect/TransactionsCustomSelect";
import css from "./CategoriesModal.module.css";

const CategoriesModal = ({ isDisabled, isNavigate }) => {
  const dispatch = useDispatch();
  const selectedTransactionType = useSelector(selectTransactionType);
  const isLoading = useSelector(selectIsLoading);
  const categoryToEdit = useSelector(selectEditCategory);

  const typeNames = {
    all: "All categories",
    expenses: "Expenses",
    incomes: "Incomes",
  };

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
      {isLoading && <Loader />}
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => dispatch(closeCategoriesModal())}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <div className={css.modalContainer}>
          {isDisabled ? (
            <h2 className={`${css.title} ${css.onlyTitle}`}>
              {typeNames[selectedTransactionType] || selectedTransactionType}
            </h2>
          ) : (
            <TransactionsCustomSelect />
          )}
        </div>
        <CategoriesList isNavigate={isNavigate} />
        <div className={`${css.modalContainer} ${css.form}`}>
          {categoryToEdit ? (
            <EditCategoriesForm />
          ) : (
            <CategoriesForm isDisabled={isDisabled} />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoriesModal;
