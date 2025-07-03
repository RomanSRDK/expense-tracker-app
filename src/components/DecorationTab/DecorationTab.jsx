import { useEffect, useRef, useState } from "react";
import styles from "./DecorationTab.module.css";
import { GoArrowUpRight } from "react-icons/go";

const DecorationTab = () => {
  const tabRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ dx: 1, dy: 1 });

  useEffect(() => {
    const speed = 1;
    let animationFrameId;

    const move = () => {
      if (!tabRef.current) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }
      // Отримуємо розміри компонента і батьківського блоку
      const tabRect = tabRef.current.getBoundingClientRect();
      const parent = tabRef.current.parentElement;
      if (!parent) {
        animationFrameId = requestAnimationFrame(move);
        return;
      }
      const parentRect = parent.getBoundingClientRect();
      // Обчислюємо нову позицію
      let newX = position.x + direction.dx * speed;
      let newY = position.y + direction.dy * speed;

      // Обмеження руху в межах батька
      if (newX <= 0) {
        newX = 0;
        setDirection((d) => ({ ...d, dx: 1 }));
      } else if (newX + tabRect.width >= parentRect.width) {
        newX = parentRect.width - tabRect.width;
        setDirection((d) => ({ ...d, dx: -1 }));
      }

      if (newY <= 0) {
        newY = 0;
        setDirection((d) => ({ ...d, dy: 1 }));
      } else if (newY + tabRect.height >= parentRect.height) {
        newY = parentRect.height - tabRect.height;
        setDirection((d) => ({ ...d, dy: -1 }));
      }

      setPosition({ x: newX, y: newY });

      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, direction]);

  return (
    <div
      ref={tabRef}
      className={styles.decorationTab}
      style={{
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span className={styles.iconBox}>
        <GoArrowUpRight size={25} color="#11101c" />
      </span>
      <div>
        <p className={styles.label}>Your balance</p>
        <div className={styles.amountPercent}>
          <p className={styles.amount}>$632.000</p>
          <p className={styles.percent}>+1.29%</p>
        </div>
      </div>
    </div>
  );
};

export default DecorationTab;
