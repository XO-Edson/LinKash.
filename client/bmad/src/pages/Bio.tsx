import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Bio() {
  const { handleBio, bio, setBio, isNewUser, token } = useAuthContext();
  const [addBio, setAddBio] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerPage = () => {
    handleBio(bio, () => setAddBio(true));
  };

  const checkUsername = async (username: string | undefined) => {
    if (!username) return;
    try {
      const response = await fetch(
        "https://lin-kash-server.vercel.app/addBio/check-username",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.status === 400) {
        setError(data.message || "Username already exists.");
        setSuccess("");
      } else if (response.status === 200) {
        setSuccess("Username available");
        setError("");
      } else {
        setError("Error checking username.");
        setSuccess("");
      }
    } catch (error) {
      console.log(error);
      setError("Error checking username.");
      setSuccess("");
    }
  };

  useEffect(() => {
    if (bio?.username) {
      checkUsername(bio.username);
    } else {
      setError("");
      setSuccess("");
    }
  }, [bio?.username]);

  if (addBio) {
    return <Navigate to="/account" />;
  }

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
            <h2 className="font-bold text-4xl mb-2">Create your account bio</h2>
            <p className="mb-5">
              Choose a username and description for your page.
            </p>

            <div className="input-container relative mb-2">
              <label className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">
                buymeadonut.com/
              </label>
              <input
                type="text"
                className="rounded-md p-3 pl-[18.5ch] border-none outline-none flex-1 placeholder:text-[#BBB] w-full"
                placeholder="username"
                value={bio?.username || ""}
                onChange={(e) => {
                  setBio({ ...bio, username: e.target.value });
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <textarea
              className="rounded-md p-2 border-none outline-none placeholder:text-[#BBB]"
              placeholder="Description"
              value={bio?.description || ""}
              onChange={(e) => setBio({ ...bio, description: e.target.value })}
            />
          </article>
          <footer className="absolute bottom-0 shadow-top w-full text-right">
            <button
              className="p-4 rounded-3xl bg-skyBlue font-bold text-slate-300 scale m-2"
              onClick={registerPage}
            >
              Sign up
            </button>
          </footer>
        </section>
      ) : (
        <Navigate to="/account" />
      )}
    </>
  );
}

export default Bio;
