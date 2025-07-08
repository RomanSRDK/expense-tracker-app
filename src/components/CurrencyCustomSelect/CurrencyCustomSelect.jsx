import { useEffect, useRef, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import clsx from "clsx";
import css from "./CurrencyCustomSelect.module.css";

const CurrencyCustomSelect = ({ value, onChange }) => {
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

  const currency = {
    uah: "₴ UAH",
    usd: "$ USD",
    eur: "€ EUR",
  };

  const handleOptionClick = (currencyKey) => {
    onChange(currencyKey);
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
        <div className={css.title}>{currency[value] || value}</div>
        <span className={css.iconWrap}>
          <IoChevronUp className={css.icon} />
        </span>
      </button>

      {isDropdownOpen && (
        <div className={css.dropdown}>
          {Object.keys(currency).map((key) => (
            <div
              key={key}
              className={css.option}
              onClick={() => handleOptionClick(key)}
            >
              {currency[key]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyCustomSelect;
