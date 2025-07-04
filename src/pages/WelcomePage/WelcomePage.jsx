import React, { useRef } from "react";
import s from "./WelcomePage.module.css";
import AuthNav from "../../components/AuthNav/AuthNav";
import AllUsersTab from "../../components/AllUsersTab/AllUsersTab";
import BgImageWrapper from "../../components/BgImageWrapper/BgImageWrapper";

const WelcomePage = () => {
  const imageRef = useRef(null);

  return (
    <div className="container">
      <section className={s.main}>
        <div className={s.textSection}>
          <div className={s.listInfo}>
            <p className={s.subheading}>EXPENSE LOG</p>
            <h2 className={s.heading}>
              Manage{" "}
              <span className={s.noBreak}>
                Your
                <br /> <span className={s.spanHeading}>Finances</span>
              </span>{" "}
              Masterfully!
            </h2>
            <p className={s.description}>
              ExpenseTracker effortlessly empowers you to take control of your
              finances! With intuitive features, it simplifies the process of
              tracking and managing expenses, allowing for a stress-free mastery
              over your financial world.
            </p>
            <AuthNav />
          </div>
          <AllUsersTab />
        </div>

        <div className={s.imageSection}>
          <BgImageWrapper parentRef={imageRef} />
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
