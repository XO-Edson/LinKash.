import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RegistrationType, useAuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function RegisterUser() {
  const { register } = useAuthContext();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (values: RegistrationType) => {
    register(values, () => setIsRegistered(true));
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  const registrationValues = Yup.object({
    firstName: Yup.string().min(3).required("Firstname required"),
    lastName: Yup.string().min(3).required("Lastname required"),
    email: Yup.string().email("Enter valid email").required("email required"),
    password: Yup.string().min(8).required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matching")
      .required(),
  });

  return (
    <section>
      <nav className="fixed flex justify-between items-center p-2 md:p-4 shadow-sm w-full">
        <div>
          <h2 className=" font-bold">
            <Link to={"/"}> LIN-KSH</Link>
          </h2>
        </div>

        <div>
          Already have an account?{" "}
          <Link to={"/logIn"} className=" underline">
            Log in
          </Link>
        </div>
      </nav>

      {/* FORM */}
      <article className="grid place-content-center h-screen">
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValues}
          onSubmit={(values: RegistrationType, { resetForm }) => {
            handleRegister(values);
            resetForm();
            <Navigate to={"/login"} />;
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit, errors }) => (
            <Form
              onSubmit={handleSubmit}
              className=" flex flex-col space-y-4 md:w-[400px] p-4"
            >
              <Field
                type="text"
                name="firstName"
                placeholder="Firstname"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-2 rounded-md border-none active:border-black"
              />
              {errors.firstName && (
                <p className=" text-red-500">{errors.firstName}</p>
              )}
              <Field
                type="text"
                name="lastName"
                placeholder="Lastname"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-2 rounded-md border-none active:border-black"
              />
              {errors.lastName && (
                <p className=" text-red-500">{errors.lastName}</p>
              )}
              <Field
                type="text"
                name="email"
                placeholder="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-2 rounded-md border-none active:border-black"
              />
              {errors.email && <p className=" text-red-500">{errors.email}</p>}
              <Field
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-2 rounded-md border-none active:border-black"
              />
              {errors.password && (
                <p className=" text-red-500">{errors.password}</p>
              )}
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-2 rounded-md border-none active:border-black"
              />
              {errors.confirmPassword && (
                <p className=" text-red-500">{errors.confirmPassword}</p>
              )}

              <button
                className="p-3 rounded-3xl bg-skyBlue font-bold text-slate-300 scale m-2"
                type="submit"
              >
                REGISTER
              </button>
            </Form>
          )}
        </Formik>
      </article>
    </section>
  );
}

export default RegisterUser;
