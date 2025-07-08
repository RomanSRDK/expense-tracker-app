import defaultAvatar from "../../pictures/avatar.png";
import { useEffect, useRef, useState } from "react";
import UserPanel from "../UserPanel/UserPanel";
import { IoChevronUp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import css from "./UserBarBtn.module.css";

import { selectUserAvatar, selectUserName } from "../../redux/user/selectors";
import { fetchUserInfo } from "../../redux/user/operations";

const UserBarBtn = ({ onOpenModal, onOpenLogoutModal }) => {
  const dispatch = useDispatch();
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const containerRef = useRef(null);

  const avatarUrlState = useSelector(selectUserAvatar);
  const userNameState = useSelector(selectUserName);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

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

  const displayAvatar = avatarUrlState || defaultAvatar;

  return (
    <div className={css.userBarBtnContainer} ref={containerRef}>
      <button
        className={clsx(css.userBarBtn, isUserPanelOpen && css.open)}
        onClick={toggleUserPanel}
        type="button"
        aria-label="Open user settings"
      >
        <img
          className={css.userBarBtnAvatar}
          src={displayAvatar}
          alt="user avatar"
        />
        <span className={css.userBarBtnName}>{userNameState}</span>
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
