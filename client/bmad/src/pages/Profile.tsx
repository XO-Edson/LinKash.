import { useState } from "react";
import NavbarAlt from "../components/NavbarAlt";
import { useAuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useAuthContext();
  const [newName, setNewName] = useState(
    `${user?.first_name} ${user?.last_name}`
  );
  return (
    <section>
      <NavbarAlt />

      <article className="flex flex-col justify-center w-[90%] md:w-[50%] mx-auto rounded-md p-4">
        <h2 className=" text-2xl">Personal Info</h2>
        <h3 className="font-bold">Name</h3>
        <input
          type="text"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <h3 className="font-bold">Email</h3>
        <input
          type="text"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2 "
          value={user?.email}
        />

        <button className="p-3 rounded-3xl bg-skyBlue font-bold mt-4 text-slate-300 scale">
          Save changes
        </button>
      </article>
      <article className="flex flex-col justify-center w-[90%] md:w-[50%] mx-auto rounded-md p-4 mt-4">
        <h2 className=" text-2xl">Change password</h2>
        <h3 className="font-bold">New Password</h3>
        <input
          type="password"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2"
        />
        <h3 className="font-bold">Confirm password</h3>
        <input
          type="password"
          className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2"
        />

        <button className="p-3 rounded-3xl bg-skyBlue font-bold mt-4 text-slate-300 scale">
          Save changes
        </button>
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
          <button className="p-3 rounded-3xl bg-red-500 font-bold mt-4 text-slate-200 scale">
            Delete my account
          </button>
        </div>
      </article>
    </section>
  );
}

export default Profile;
