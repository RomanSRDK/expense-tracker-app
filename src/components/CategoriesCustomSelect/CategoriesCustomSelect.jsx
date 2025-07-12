import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";
import css from "./CategoriesCustomSelect.module.css";

const CategoriesCustomSelect = ({
  value,
  setFieldValue,
  name,
  errors,
  touched,
}) => {
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

  const hasError = touched?.[name] && errors?.[name];

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
        <div className={clsx(css.title, !value && css.placeholder)}>
          {value ? typeNames[value] : "Choose..."}
        </div>
        <span className={css.iconWrap}>
          <IoChevronDown className={css.icon} size={12} />
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
      {hasError && <div className={css.error}>{errors[name]}</div>}
    </div>
  );
};

export default CategoriesCustomSelect;
