import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { RiMenu3Fill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import pImg from "../assets/Lemon1.jpg";

function Main() {
  const { user, logout, menu, toggleMenu } = useAuthContext();
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
          <nav className="sticky flex justify-between items-center p-2 md:p-4 shadow-sm w-full bg-darkBlue text-white">
            <div>
              <h2 className="font-bold">
                <Link to={"/"}> BMAD</Link>
              </h2>
            </div>

            <div className="relative md:hidden font-bold">
              <RiMenu3Fill className="text-3xl" onClick={toggleMenu} />

              {menu && (
                <div className="flex flex-col p-2 bg-darkBlue text-white rounded-md absolute right-2 top-10 w-[200px] md:w-[250px] z-10 space-y-4 items-start">
                  <p>Dashboard</p>
                  <p>Profile</p>
                  <p onClick={logoutBtn}>Logout</p>
                </div>
              )}
            </div>

            <div className="space-x-3 font-bold px-2 hidden md:flex">
              <p className=" hover:text-gray-600 cursor-pointer">Dashboard</p>
              <p className=" hover:text-gray-600 cursor-pointer">Profile</p>
              <p
                className=" hover:text-gray-600 cursor-pointer"
                onClick={logoutBtn}
              >
                Logout
              </p>
            </div>
          </nav>

          <article className="flex flex-col justify-center w-[90%] md:w-[50%] mx-auto bg-white rounded-md p-3 my-[20px]">
            <div className="flex justify-between shadow-sm my-4">
              <div className="flex">
                <img
                  src={pImg}
                  className="mr-3 rounded-full w-[65px] h-[65px] hidden md:block"
                />
                <div>
                  <h1 className="font-bold">
                    Hi, {`${user?.first_name} ${user?.last_name}`}
                  </h1>
                  <p>domain.com/username </p>
                </div>
              </div>

              <button className="p-3 md:py-2 md:px-6 rounded-3xl bg-skyBlue font-bold text-white m-2 active:bg-sky-700">
                Share
              </button>
            </div>

            <div>
              <h1 className=" font-bold">Earnings</h1>
              <div>
                <h1 className=" font-bold text-4xl md:text-5xl">KSH 0</h1>
              </div>
            </div>
          </article>

          <article className="flex flex-col justify-center  items-center w-[90%] md:w-[50%] mx-auto bg-white rounded-md p-4 h-[250px]">
            <div className="p-3 bg-customGray/30 rounded-full">
              <CiHeart className=" text-2xl" />
            </div>
            <h3 className=" font-bold"> You dont have any transactions yet.</h3>
            <p>Share your link with others to get started.</p>
          </article>
        </section>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}

export default Main;
