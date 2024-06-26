import NavbarAlt from "../components/NavbarAlt";
import { useAuthContext } from "../context/AuthContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useProfileContext } from "../context/ProfileContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const initialValues = {
  password: "",
  confirmPassword: "",
};

function Profile() {
  const [accountDelete, setAccountDelete] = useState(false);
  const { loading } = useAuthContext();
  const {
    setNewName,
    newName,
    email,
    handleBioChanges,
    deleteAccount,
    setEmail,
    handlePasswordChange,
  } = useProfileContext();

  const handleAccountDelete = () => {
    deleteAccount(() => setAccountDelete(true));
  };

  const handleInputChange = (e: any) => {
    const fullName = e.target.value;
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");
    setNewName({ firstName, lastName });
  };

  const registrationValues = Yup.object({
    password: Yup.string().min(8).required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matching")
      .required(),
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (accountDelete) {
    <Navigate to="/login" />;
  }

  return (
    <section>
      <NavbarAlt />
      {/* PERSONAL INFO CHANGES */}
      <article className="flex flex-col justify-center w-[90%] md:w-[50%] mx-auto rounded-md p-4">
        <h2 className=" text-2xl">Personal Info</h2>
        <h3 className="font-bold">Name</h3>
        <input
          type="text"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2"
          value={`${newName.firstName} ${newName.lastName}`}
          onChange={handleInputChange}
          required
        />
        <h3 className="font-bold">Email</h3>
        <input
          type="text"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="p-3 rounded-3xl bg-skyBlue font-bold mt-4 text-slate-300 scale"
          onClick={handleBioChanges}
        >
          Save changes
        </button>
      </article>
      -{/* PASSWORD CHANGES */}
      <article className="flex flex-col justify-center w-[90%] md:w-[50%] mx-auto rounded-md p-4 mt-4">
        <h2 className="text-2xl">Change password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValues}
          onSubmit={(values, { resetForm }) => {
            handlePasswordChange(values);
            resetForm();
          }}
        >
          {({ values, handleBlur, handleChange, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                className="p-3 rounded-md border-none active:border-black"
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
                className="p-3 rounded-md border-none active:border-black"
              />
              {errors.confirmPassword && (
                <p className=" text-red-500">{errors.confirmPassword}</p>
              )}

              <button
                className="p-3 rounded-3xl bg-skyBlue font-bold text-slate-300 scale m-2"
                type="submit"
              >
                Save changes
              </button>
            </Form>
          )}
        </Formik>
      </article>
      <article className="flex flex-col md:flex-row md:justify-between w-[90%] md:w-[50%] mx-auto rounded-md p-4 bg-white mt-4 absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className=" md:w-1/2">
          <h2 className=" text-2xl text-red-400">Delete account</h2>
          <p>
            Your account, along with all associated data, and payout
            information, will be permanently deleted and cannot be restored.
          </p>
        </div>
        <div>
          <button
            className="p-3 rounded-3xl bg-red-500 font-bold mt-4 text-slate-200 scale"
            onClick={handleAccountDelete}
          >
            Delete my account
          </button>
        </div>
      </article>
    </section>
  );
}

export default Profile;
