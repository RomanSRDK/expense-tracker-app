import { useEffect, useRef, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import clsx from "clsx";
import css from "./CategoriesCustomSelect.module.css";

const CategoriesCustomSelect = ({ value, setFieldValue, name }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    expenses: "Expenses",
    incomes: "Incomes",
  };

  const handleOptionClick = (value) => {
    setFieldValue(name, value);
    setIsDropdownOpen(false);
  };

  const displayValue = value === "all" ? "incomes" : value;

  return (
    <div className={css.customSelect} ref={containerRef}>
      <button
        type="button"
        className={clsx(css.openButton, isDropdownOpen && css.open)}
        onClick={(e) => {
          e.stopPropagation();
          togglePanel();
        }}
      >
        <div className={css.title}>
          {typeNames[displayValue] || displayValue}
        </div>
        <span className={css.iconWrap}>
          <IoChevronUp className={css.icon} size={20} />
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

export default CategoriesCustomSelect;
