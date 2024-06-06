import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import { CiHeart } from "react-icons/ci";
import pImg from "../assets/Lemon1.jpg";
import NavbarAlt from "../components/NavbarAlt";

function Main() {
  const { user } = useAuthContext();
  const token = Cookies.get("token");

  console.log(token);

  return (
    <>
      {token ? (
        <section>
          <NavbarAlt />

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
