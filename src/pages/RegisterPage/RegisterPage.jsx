import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";
import toast from "react-hot-toast";
import s from "./RegisterPage.module.css";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("Name is required"),
  email: Yup.string()
    .min(4, "Too short")
    .required("Email is required")
    .max(30, "Too long")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid Email"),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "At least one letter and one number"
    )
    .required("Password is required"),
});

function RegisterPage() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      toast.success(`Welcome ${values.name}`);
    } catch {
      toast.error("Login Error");
    }

    actions.resetForm();
  };

  //JSX
  return (
    <div className={s.sharedWrapper}>
      <div className={s.content_box}>
        <h2 tabIndex={0}>Sign Up</h2>
        <p tabIndex={0}>
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
