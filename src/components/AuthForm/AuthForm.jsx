import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./AuthForm.module.css";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

const AuthForm = ({ mode, onSubmit, validationSchema, buttonLabel }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  //JSX
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form} autoComplete="off">
          {mode === "register" && (
            <div className={s.field_wrap}>
              <label htmlFor="name"></label>
              <Field type="name" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="span" />
            </div>
          )}

          <div className={s.field_wrap}>
            <label htmlFor="email"></label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="span" />
          </div>

          <div className={s.field_wrap}>
            <label htmlFor="password"></label>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
            />

            <button
              className={s.toggle_password}
              type="button"
              onClick={togglePassword}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>

            <ErrorMessage name="password" component="span" />
          </div>

          <div>
            <button className={s.btn_sign_up} type="submit">
              {buttonLabel}
            </button>
            {mode === "register" && (
              <p>
                Already have account? <a href="/login">Sign In</a>
              </p>
            )}
            {mode === "login" && (
              <p>
                Already have account? <a href="/register">Sign Up</a>
              </p>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AuthForm;
