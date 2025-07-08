import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import style from "./UserPanel.module.css";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";
import UserSetsModal from "../UserSetsModal/UserSetsModal";

const UserPanel = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  //handlers
  const handleOpenLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  //JSX
  return (
    <>
      <ul className={style.userPanel}>
        <li>
          <button
            className={style.userPanelBtn}
            onClick={handleOpenProfileModal}
            type="button"
            aria-label="Open profile settings"
          >
            <span>
              <GoPerson className={style.userPanelIcon} size={16} />
            </span>
            Profile settings
          </button>
        </li>
        <li>
          <button
            className={style.userPanelBtn}
            onClick={handleOpenLogoutModal}
            type="button"
            aria-label="Open logout modal"
          >
            <span>
              <FiLogOut className={style.userPanelIcon} size={16} />
            </span>
            Log out
          </button>
        </li>
      </ul>

      {isProfileModalOpen && (
        <UserSetsModal onClose={onClose} closeModal={handleCloseProfileModal} />
      )}
      {isModalOpen && (
        <LogoutModal onClose={onClose} onCancel={handleCloseLogoutModal} />
      )}
    </>
  );
};

export default UserPanel;
