import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function AccountInfo() {
  const [account, setAccount] = useState(false);
  const { shortcode, setShortcode, handleAccount, isNewUser, token } =
    useAuthContext();
  const navigate = useNavigate();

  const submitAccount = () => {
    handleAccount(shortcode, () => setAccount(true));
  };

  if (account) {
    return <Navigate to="/main" />;
  }

  const skip = () => {
    navigate("/main");
  };

  return (
    <>
      {isNewUser && token ? (
        <section>
          <nav className="fixed flex justify-between items-center p-2 md:p-4 shadow-sm w-full">
            <div>
              <h2 className="font-bold">
                <Link to={"/"}> BMAD</Link>
              </h2>
            </div>

            <div>
              Already have an account?{" "}
              <Link to={"/logIn"} className="underline">
                Log in
              </Link>
            </div>
          </nav>

          <article className="grid place-content-center h-screen">
            <h1 className="font-bold text-4xl mb-2">Set up account info.</h1>
            <p className="mb-4">Enter store Till no.</p>
            <input
              type="number"
              placeholder="Till number"
              className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB]"
              value={shortcode || ""}
              onChange={(e) => setShortcode(e.target.value)}
            />
            <div className=" text-right">
              <button
                className="px-6 py-2 rounded-3xl bg-skyBlue font-bold text-slate-300 scale m-2"
                onClick={submitAccount}
              >
                Done!
              </button>
            </div>
          </article>

          <footer className="absolute bottom-0 shadow-top w-full text-right">
            <button
              onClick={skip}
              className="py-2 px-6 rounded-3xl bg-customGray font-bold text-black scale m-2"
            >
              Skip
            </button>
          </footer>
        </section>
      ) : (
        <Navigate to="/main" />
      )}
    </>
  );
}

export default AccountInfo;
