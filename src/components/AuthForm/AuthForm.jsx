import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./AuthForm.module.css";
import { useId, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import clsx from "clsx";

const AuthForm = ({ mode, onSubmit, validationSchema, buttonLabel }) => {
  const [showPassword, setShowPassword] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const passId = useId();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResetInput = (setFieldValue) => {
    setFieldValue("email", "");
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, touched, values }) => (
        <Form className={s.form} autoComplete="off">
          <div className={s.input_wrapper}>
            {mode === "register" && (
              <div className={s.field_wrap}>
                <label htmlFor={nameId}></label>
                <Field
                  type="name"
                  name="name"
                  placeholder="Name"
                  id={nameId}
                  className={clsx(
                    s.input,
                    touched.password && errors.password && s.input_invalid,
                    touched.password && !errors.password && s.input_valid
                  )}
                />
                <ErrorMessage name="name" component="span" />
              </div>
            )}
            <div className={s.field_wrap}>
              <label htmlFor={emailId}></label>
              <Field
                id={emailId}
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                className={clsx(
                  s.input,
                  touched.password && errors.password && s.input_invalid,
                  touched.password && !errors.password && s.input_valid
                )}
              />
              {/* Show if incorrect */}
              {touched.email && errors.email && values.email && (
                <button
                  aria-lable="button to reset field"
                  type="button"
                  className={s.incorrect_entry}
                  onClick={() => handleResetInput(setFieldValue)}
                >
                  <AiFillCloseCircle className={s.incorrect_icon} />
                </button>
              )}
              <ErrorMessage name="email" component="span" />
            </div>

            <div className={s.field_wrap}>
              <label htmlFor={passId}></label>
              <Field
                id={passId}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                className={clsx(
                  s.input,
                  touched.password && errors.password && s.input_invalid,
                  touched.password && !errors.password && s.input_valid
                )}
              />
              <button
                aria-lable="button to show password"
                className={s.toggle_password}
                type="button"
                onClick={togglePassword}
              >
                {touched.password && !errors.password ? (
                  <IoIosCheckmarkCircle className={s.success_icon} />
                ) : showPassword ? (
                  <FiEye className={s.eye_icon} />
                ) : (
                  <FiEyeOff className={s.eye_icon} />
                )}
              </button>
              <ErrorMessage name="password" component="span" />
              {touched.password && !errors.password && (
                <span className={s.success}>Password is secure</span>
              )}
            </div>
          </div>

          <div className={s.sign_box}>
            <button
              aria-lable="button to submit"
              className={s.btn_sign_up}
              type="submit"
            >
              {buttonLabel}
            </button>
            {mode === "register" && (
              <p>
                Already have account?{" "}
                <a href="/login" aria-lable="link to login page">
                  Sign In
                </a>
              </p>
            )}
            {mode === "login" && (
              <p>
                Don't have an account?{" "}
                <a href="/register" aria-lable="link to register page">
                  Sign Up
                </a>
              </p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
