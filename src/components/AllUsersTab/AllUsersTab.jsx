import React from "react";
import s from "./AllUsersTab.module.css";

const AllUsersTab = () => {
  return (
    <div className={s.alUsersTab}>
      <div className={s.userAvatar}>
        <img src="/imgWelcomePage/images.png" alt="User1" loading="lazy" />
      </div>
      <div className={s.countText}>
        <p className={s.usersCount}>1000 users +</p>
        <p className={s.usersNote}>
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  );
};

export default AllUsersTab;
