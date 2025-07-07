import { useDispatch, useSelector } from "react-redux";
import { selectFilteredCategories } from "../../redux/categories/selectors";
import { FaCheck } from "react-icons/fa6";
import { LuPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteCategory } from "../../redux/categories/operations";
import toast from "react-hot-toast";
import { setCategory, setEditCategory } from "../../redux/categories/slice";
import { closeCategoriesModal } from "../../redux/transactions/slice";
import { selctsetTransactionType } from "../../redux/transactions/selectors";
import css from "./CategoriesList.module.css";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const filteredCategories = useSelector(selectFilteredCategories);
  const selectedTransactionType = useSelector(selctsetTransactionType);

  // console.log(filteredCategories);

  const handleSubmit = ({ id, name, type }) => {
    dispatch(setCategory({ id, name, type }));
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
    <div>
      {filteredCategories.map((group) => (
        <div key={group.type}>
          <div className={css.groupTitle}>
            {group.type === "incomes" && "Incomes"}
            {group.type === "expenses" && "Expenses"}
            {group.type !== "incomes" &&
              group.type !== "expenses" &&
              group.type}
          </div>
          <ul className={css.list}>
            {filteredCategories.map((category) => (
              <li className={css.item} key={category._id}>
                <div className={css.wrapper}>
                  <div className={css.textWrapper}>
                    <div className={css.category}>{category.categoryName}</div>
                    {selectedTransactionType === "all" && (
                      <div className={css.type}>
                        {category.type.trim().charAt(0).toUpperCase() +
                          category.type.trim().slice(1)}
                      </div>
                    )}
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
