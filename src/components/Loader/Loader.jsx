import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <CircleLoader
      loading
      size={60}
      speedMultiplier={2}
      color={"var(--color-accent)"}
    />
  );
};

export default Loader;
