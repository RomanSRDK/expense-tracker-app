import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAvatar } from "../../redux/user/selectors";
import { removeUsersAvatar, updatesAvatar } from "../../redux/user/operations";
import { useEffect, useRef, useState } from "react";
import defaultAvatar from "../../pictures/avatar.png";
import { IoCloseOutline } from "react-icons/io5";
import css from "./UserSetsModal.module.css";

function UserSetsModal({ toggleUserModal }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // const userName = useSelector(selectUserName);
  const avatarUrl = useSelector(selectUserAvatar);
  // const currency = useSelector(selectCurrency);

  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  // }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleUserModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleUserModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleUserModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updatesAvatar(formData));
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemovePhoto = () => {
    dispatch(removeUsersAvatar());
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => toggleUserModal(false)}
        >
          <IoCloseOutline size={24} />
        </button>
        <h2 className={css.title}>Profile settings</h2>
        <div className={css.avatarContainer}>
          <img
            src={avatarUrl || defaultAvatar}
            alt="User avatar"
            className={css.avatarImage}
          />

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleFileChange}
          />
          <div className={css.buttonsGroup}>
            <button onClick={handleButtonClick} className={css.uploadPhoto}>
              Upload new photo
            </button>
            <button onClick={handleRemovePhoto} className={css.removePhoto}>
              Remove
            </button>
          </div>
        </div>
        <div className={css.identityAndCurrency}>
          <select name="currency">
            <option value="UAH">₴ UAH</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
          <input type="text" name="username" className={css.userName} />
        </div>
        <button className={css.saveButton}>Save</button>
      </div>
    </div>,
    document.body
  );
}

export default UserSetsModal;
