import { useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import s from "./RegisterPage.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("required"),
  email: Yup.string()
    .min(4, "Too short")
    .required("required")
    .max(30, "Too long")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    .required("required"),
});

function RegisterPage() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch(() => {
        console.log("login error");
      });

    actions.resetForm();
  };

  //JSX
  return (
    <div>
      <div className={s.content_box}>
        <h2>Sign Up</h2>
        <p>
          Step into a world of hassle-free expense management! Your journey
          towards financial mastery begins here.
        </p>
      </div>

      <AuthForm
        mode="register"
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
        buttonLabel="Sign Up"
      />
    </div>
  );
}

export default RegisterPage;
