import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderBackdrop}>
      <CircleLoader
        loading
        size={60}
        speedMultiplier={2}
        color={"var(--color-primary)"}
      />
    </div>
  );
};

export default Loader;
