import { RiMenu3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function NavbarAlt() {
  const { logout, toggleMenu, menu, setMenu } = useAuthContext();

  const navigate = useNavigate();

  const logoutBtn = () => {
    navigate("/");
    setMenu(false);
    logout();
  };

  const profile = () => {
    navigate("/profile");
    setMenu(false);
  };

  const dashboard = () => {
    navigate("/main");
    setMenu(false);
  };

  return (
    <nav className="sticky flex justify-between items-center p-2 md:p-4 shadow-sm w-full bg-darkBlue text-white">
      <div>
        <h2 className="font-bold">
          <Link to={"/main"}> LIN-KSH</Link>
        </h2>
      </div>

      <div className="relative md:hidden font-bold">
        <RiMenu3Fill className="text-3xl" onClick={toggleMenu} />

        {menu && (
          <div className="flex flex-col p-2 bg-darkBlue text-white rounded-md absolute right-2 top-10 w-[200px] md:w-[250px] z-10 space-y-4 items-start">
            <p onClick={dashboard}>Dashboard</p>
            <p onClick={profile}>Profile</p>
            <p onClick={logoutBtn}>Logout</p>
          </div>
        )}
      </div>

      <div className="space-x-3 font-bold px-2 hidden md:flex">
        <p className=" hover:text-gray-600 cursor-pointer" onClick={dashboard}>
          Dashboard
        </p>
        <p className=" hover:text-gray-600 cursor-pointer" onClick={profile}>
          Profile
        </p>
        <p className=" hover:text-gray-600 cursor-pointer" onClick={logoutBtn}>
          Logout
        </p>
      </div>
    </nav>
  );
}

export default NavbarAlt;
