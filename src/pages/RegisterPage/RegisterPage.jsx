import { useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import s from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short")
    .max(20, "Too long")
    .required("required"),
  email: Yup.string()
    .min(4, "Too short")
    .required("required")
    .max(30, "Too long")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid Password"),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "At least one letter and one number"
    )
    .required("required"),
});

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handlers
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
        navigate("/transactions/expenses");
      })
      .catch((error) => {
        console.log(error);

        // console.log("login error");
      });

    actions.resetForm();
  };

  //clear incorect email
  const handleResetInput = (e) => {
    console.log(e.target);

    console.log(45);
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
        handleResetInput={handleResetInput}
      />
    </div>
  );
}

export default RegisterPage;
