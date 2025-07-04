import { createPortal } from "react-dom";
import css from "./UserSetsModal.module.css";

function UserSetsModal() {
  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h2 style={{ color: "red" }}>Profile settings</h2>
      </div>
    </div>,
    document.body
  );
}

export default UserSetsModal;
