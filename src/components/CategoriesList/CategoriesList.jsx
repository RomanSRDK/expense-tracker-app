import { useDispatch, useSelector } from "react-redux";
import { selectFilteredCategories } from "../../redux/categories/selectors";
import { FaCheck } from "react-icons/fa6";
import { LuPen } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteCategory } from "../../redux/categories/operations";
import toast from "react-hot-toast";
import css from "./CategoriesList.module.css";
import { selectError } from "../../redux/transactions/selectors";
import { setCategory } from "../../redux/categories/slice";
import { closeCategoriesModal } from "../../redux/transactions/slice";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const filteredCategories = useSelector(selectFilteredCategories);
  const error = useSelector(selectError);

  const handleDelete = async ({ id, type }) => {
    try {
      await dispatch(deleteCategory({ id, type })).unwrap();
      toast.success(`Category sucsesfully deleted`);
    } catch {
      toast.error(error);
    }
  };

  const handleSubmit = ({ id, name }) => {
    dispatch(setCategory({ id, name }));
    dispatch(closeCategoriesModal());
  };

  return (
    <div>
      <ul className={css.list}>
        {filteredCategories.map((category) => (
          <li className={css.item} key={category._id}>
            <div className={css.wrapper}>
              <div className={css.textWrapper}>
                <div className={css.category}>{category.categoryName}</div>
                <div className={css.type}>({category.type})</div>
              </div>
              <div className={css.buttons}>
                <button
                  className={css.button}
                  onClick={() =>
                    handleSubmit({
                      id: category._id,
                      name: category.categoryName,
                    })
                  }
                >
                  <FaCheck className={css.icon} />
                </button>
                <button className={css.button}>
                  <LuPen className={css.icon} />
                </button>
                <button
                  className={css.button}
                  onClick={() =>
                    handleDelete({ id: category._id, type: category.type })
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
  );
};

export default CategoriesList;
