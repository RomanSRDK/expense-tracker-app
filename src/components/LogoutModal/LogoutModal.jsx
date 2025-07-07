import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import s from "./LogoutModal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const LogoutModal = ({ onCancel, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 1440) {
      return;
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  //handlers
  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();

      toast(
        <div className={s.toast_wrap}>
          <strong>Logout success</strong>
        </div>,
        {
          duration: 5000,
          position: "top-center",
        }
      );

      navigate("/");
    } catch {
      toast.error("Logout failed. Try again.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel(false);
    }
  };

  //JSX
  return createPortal(
    <div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={handleOverlayClick}
    >
      <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to log out?!</p>
        <div className={s.button_wrap}>
          <button className={s.logout_btn} type="button" onClick={handleLogout}>
            Log Out
          </button>

          <button
            className={s.cancel_btn}
            type="button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
