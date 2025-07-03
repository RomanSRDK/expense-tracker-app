import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./AuthForm.module.css";

const AuthForm = ({ mode, onSubmit, validationSchema, buttonLabel }) => {
  //JSX
  return (
    <div className={s.background}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          {mode === "register" && (
            <div className={s.field_wrap}>
              <label htmlFor="name">Name</label>
              <Field type="name" name="name" />
              <ErrorMessage name="name" component="span" />
            </div>
          )}

          <div className={s.field_wrap}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="span" />
          </div>

          <div className={s.field_wrap}>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
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
    </div>
  );
};

export default AuthForm;
