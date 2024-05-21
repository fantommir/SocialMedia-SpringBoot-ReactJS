import React, { useEffect, useMemo } from "react";
import Header from "./Header";
import * as Yup from "Yup";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/loginSlice";
const loginFormData = {
  email: "",
  password: "",
};
const loginValidateSchema = Yup.object({
  email: Yup.string().required("email required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length atleast 8")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one Special Symbol"
    )
    .matches(/[0-9]/, "Password must contain atleast one digit")
    .matches(/[a-z]/, "Password must contain one lowercase")
    .matches(/[A-Z]/, "Password must contain atleast one uppercase"),
});
const Login = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginFormData,
      validationSchema: loginValidateSchema,
      onSubmit: async (values) => {
        // let formData = new FormData();
        // formData.append("email", values.email);
        // formData.append("password", values.password);
        await dispatch(loginUser(values));
        // if (dispatchedValue.payload.message == "Login Success") {
        navigate("/home");
        // }
      },
    });
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <Header />
        <div className="content">
          <p className="text-primary text-center mt-4 HeadingStyles">
            Login Form
          </p>
          <form
            id="register"
            className="d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.email && touched.email ? (
                <span className="small error">{errors.email}</span>
              ) : null}
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter your Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.password && touched.password ? (
                <span className="small error">{errors.password}</span>
              ) : null}
              <button
                type="submit"
                name="login"
                className="btn btn-primary mt-1 w-100"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default Login;
