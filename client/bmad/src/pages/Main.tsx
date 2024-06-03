import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

function Main() {
  const { user, logout } = useAuthContext();
  const token = Cookies.get("token");

  console.log(token);

  const navigate = useNavigate();

  const logoutBtn = () => {
    navigate("/");
    logout();
  };

  return (
    <>
      {token ? (
        <section>
          <nav className="sticky flex justify-between items-center p-2 md:p-4 shadow-sm w-full">
            <div>
              <h2 className="font-bold">
                <Link to={"/"}> BMAD</Link>
              </h2>
            </div>

            <div>
              <button onClick={logoutBtn}>Logout</button>
            </div>
          </nav>

          <article className="flex flex-col justify-center w-[75%] mx-auto bg-white rounded-md p-3 my-[20px]">
            <div className="flex justify-between shadow-sm my-4">
              <div className="flex">
                <div className="mr-5">IMG</div>
                <div>
                  <h1 className=" font-bold">
                    Hi, {`${user?.first_name} ${user?.last_name}`}
                  </h1>
                  <p>domain.com/username </p>
                </div>
              </div>

              <button className="p-2 rounded-3xl bg-skyBlue font-bold text-white scale m-2">
                Share link
              </button>
            </div>

            <div>
              <h1 className=" font-bold">Earnings</h1>
              <div>
                <h1 className=" font-bold text-5xl">$0</h1>
              </div>
            </div>
          </article>

          <article className="flex flex-col justify-center w-[75%] mx-auto bg-white rounded-md p-4 "></article>
        </section>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default Main;
