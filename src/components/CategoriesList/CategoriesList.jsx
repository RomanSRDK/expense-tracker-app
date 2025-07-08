import { useDispatch, useSelector } from "react-redux";
import { selectFilteredCategories } from "../../redux/categories/selectors";
import { FaCheck } from "react-icons/fa6";
import { LuPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteCategory } from "../../redux/categories/operations";
import toast from "react-hot-toast";
import { setCategory, setEditCategory } from "../../redux/categories/slice";
import {
  closeCategoriesModal,
  setTransactionRadioType,
} from "../../redux/transactions/slice";
import css from "./CategoriesList.module.css";
import { selectTransactionType } from "../../redux/transactions/selectors";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const filteredCategories = useSelector(selectFilteredCategories);
  const selectedTransactionType = useSelector(selectTransactionType);
  const showTitles = selectedTransactionType === "all";

  const handleSubmit = ({ id, name, type }) => {
    dispatch(setCategory({ id, name, type }));
    dispatch(setTransactionRadioType(type));
    dispatch(closeCategoriesModal());
  };

  const handleDelete = async ({ id, type, name }) => {
    try {
      await dispatch(deleteCategory({ id, type })).unwrap();
      toast.success(`Category "${name}" sucsesfully deleted`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className={css.list}>
      {filteredCategories.map((group) => (
        <div key={group.type}>
          {showTitles && (
            <div className={css.title}>
              {group.type === "incomes" && "Incomes"}
              {group.type === "expenses" && "Expenses"}
              {group.type !== "incomes" &&
                group.type !== "expenses" &&
                group.type}
            </div>
          )}
          <ul className={css.categoriesList}>
            {group.items.map((category) => (
              <li className={css.item} key={category._id}>
                <div className={css.wrapper}>
                  <div className={css.textWrapper}>
                    <div className={css.category}>{category.categoryName}</div>
                  </div>
                  <div className={css.buttons}>
                    <button
                      className={css.button}
                      onClick={() =>
                        handleSubmit({
                          id: category._id,
                          name: category.categoryName,
                          type: category.type,
                        })
                      }
                    >
                      <FaCheck className={css.icon} />
                    </button>
                    <button
                      className={css.button}
                      onClick={() =>
                        dispatch(
                          setEditCategory({
                            id: category._id,
                            type: category.type,
                            name: category.categoryName,
                          })
                        )
                      }
                    >
                      <LuPen className={css.icon} />
                    </button>
                    <button
                      className={css.button}
                      onClick={() =>
                        handleDelete({
                          id: category._id,
                          type: category.type,
                          name: category.categoryName,
                        })
                      }
                    >
                      <RiDeleteBinLine className={css.icon} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
