import React, { useMemo } from "react";
import Header from "./Header";
import * as Yup from "Yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/registerSlice";
const formData = {
  name: "",
  phoneNumber: "",
  email: "",
  gender: "",
  password: "",
  cnfPassword: "",
  profile: "",
};
const validateSchema = Yup.object({
  name: Yup.string().required("Name is Required "),
  email: Yup.string().required("Email is Required ").email("Invalid Email"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password length atleast 8 ")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one Special Symbol"
    )
    .matches(/[0-9]/, "Password must contain atleast one digit")
    .matches(/[a-z]/, "Password must contain one lowercase")
    .matches(/[A-Z]/, "Password must contain atleast one uppercase"),
  cnfPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null]),
  gender: Yup.string().required("Gender Must be Required "),
  profile: Yup.mixed()
    .required("file is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // if no file is provided, let other validations handle it
      return value && ["image/jpeg", "image/png"].includes(value.type);
    })
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // if no file is provided, let other validations handle it
      return value.size <= 10485760; // 10 MB in bytes
    }),
});
const Register = React.memo(() => {
  const dispatch = useDispatch();
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: formData,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      let formValues = new FormData();
      formValues.append("name", values.name);
      formValues.append("phoneNumber", values.phoneNumber);
      formValues.append("email", values.email);
      formValues.append("gender", values.gender);
      formValues.append("password", values.password);
      formValues.append("profile", values.profile);
      dispatch(registerUser(formValues));
    },
  });
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="">
        <div className="content">
          <p className="text-primary text-center mt-4 HeadingStyles">
            Registration Form
          </p>
          <form
            id="register"
            className="d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your FullName"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.name && touched.name ? (
                <span className="small error">{errors.name}</span>
              ) : null}

              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter phone number"
                id="phone"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.phoneNumber && touched.phoneNumber ? (
                <span className="small error">{errors.phoneNumber}</span>
              ) : null}
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={values.email}
                id=""
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.email && touched.email ? (
                <span className="small error">{errors.email}</span>
              ) : null}
              <select
                className="form-select mt-1"
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
              >
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors && errors.gender && touched.gender ? (
                <span className="small error">{errors.gender}</span>
              ) : null}
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.password && touched.password ? (
                <span className="small error">{errors.password}</span>
              ) : null}
              <input
                type="password"
                className="form-control mt-1"
                placeholder="confirm Password"
                id="cnfpassword"
                name="cnfPassword"
                value={values.cnfPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors && errors.cnfPassword && touched.cnfPassword ? (
                <span className="small error">{errors.cnfPassword}</span>
              ) : null}
              <input
                type="file"
                className="form-control mt-1"
                name="profile"
                onChange={(event) => {
                  setFieldValue("profile", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
              {errors && errors.profile && touched.profile ? (
                <span className="small error">{errors.profile}</span>
              ) : null}
              <button
                // to={"/login"}
                type="submit"
                name="register"
                className="btn btn-primary mt-1 w-100"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default Register;
