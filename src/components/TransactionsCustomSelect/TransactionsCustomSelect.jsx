import { useDispatch, useSelector } from "react-redux";
import { selectTransactionType } from "../../redux/transactions/selectors";
import { useEffect, useRef, useState } from "react";
import {
  setTransactionRadioType,
  setTransactionType,
} from "../../redux/transactions/slice";
import { FaChevronDown } from "react-icons/fa";
import css from "./TransactionsCustomSelect.module.css";
import clsx from "clsx";

const TransactionsCustomSelect = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedTransactionType = useSelector(selectTransactionType);
  const containerRef = useRef(null);

  const togglePanel = () => setIsDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const typeNames = {
    all: "All categories",
    expenses: "Expenses",
    incomes: "Incomes",
  };

  const handleOptionClick = (value) => {
    dispatch(setTransactionType(value));
    dispatch(setTransactionRadioType(value));
    setIsDropdownOpen(false);
  };

  return (
    <div className={css.customSelect} ref={containerRef}>
      <button
        className={clsx(css.openButton, isDropdownOpen && css.open)}
        onClick={(e) => {
          e.stopPropagation();
          togglePanel();
        }}
      >
        <div className={css.title}>
          {typeNames[selectedTransactionType] || selectedTransactionType}
        </div>
        <span className={css.iconWrap}>
          <FaChevronDown className={css.icon} size={20} />
        </span>
      </button>

      {isDropdownOpen && (
        <div className={css.dropdown}>
          {Object.keys(typeNames).map((key) => (
            <div
              key={key}
              className={css.option}
              onClick={() => handleOptionClick(key)}
            >
              {typeNames[key]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsCustomSelect;
