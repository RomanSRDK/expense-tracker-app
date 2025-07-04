import { useEffect, useRef, useState } from "react";
import UserPanel from "../UserPanel/UserPanel";
import { IoChevronUp } from "react-icons/io5";
import { useSelector } from "react-redux";
import clsx from "clsx";
import css from "./UserBarBtn.module.css";
import { selectAvatarUrl, selectUser } from "../../redux/auth/selectors";

const UserBarBtn = ({ onOpenModal, onOpenLogoutModal }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const containerRef = useRef(null);

  const avatarUrl = useSelector(selectAvatarUrl);
  const userSelectInfo = useSelector(selectUser);

  const toggleUserPanel = () => setIsUserPanelOpen((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsUserPanelOpen(false);
      }
    };

    if (isUserPanelOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserPanelOpen]);

  return (
    <div className={css.userBarBtnContainer} ref={containerRef}>
      <button
        className={clsx(css.userBarBtn, isUserPanelOpen && css.open)}
        onClick={toggleUserPanel}
      >
        {avatarUrl ? (
          <img
            className={css.userBarBtnAvatar}
            src={avatarUrl}
            alt="user avatar"
          />
        ) : (
          <span className={css.userBarDefAvatar}>{userSelectInfo.name}</span>
        )}
        <span className={css.userBarBtnName}>{userSelectInfo.name}</span>
        <span className={css.userBarBtnIconWrap}>
          <IoChevronUp className={css.userBarBtnIcon} size={20} />
        </span>
      </button>

      {isUserPanelOpen && (
        <UserPanel
          onOpenModal={onOpenModal}
          onOpenLogoutModal={onOpenLogoutModal}
        />
      )}
    </div>
  );
};

export default UserBarBtn;
