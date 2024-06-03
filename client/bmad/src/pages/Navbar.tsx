import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const { menu, toggleMenu } = useAuthContext();
  const navigate = useNavigate();

  const signUpPage = () => {
    navigate("/signUp");
  };

  const loginPage = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-2 md:p-4 font-bold shadow-sm bg-[#031930]">
      <div className="space-x-2 hidden md:flex md:items-center">
        <p>FAQ</p>
        <p>Resources</p>
      </div>
      <div>
        <h2>
          <Link to={"/"}> BMAD</Link>
        </h2>
      </div>
      <div className="space-x-2 hidden md:flex">
        <button
          className="px-4 py-2 rounded-3xl hover:bg-slate-400"
          onClick={loginPage}
        >
          Log in
        </button>
        <button
          className="px-4 py-2 rounded-3xl bg-skyBlue scale"
          onClick={signUpPage}
        >
          Sign up
        </button>
      </div>

      <div className="relative md:hidden">
        <RiMenu3Fill className="text-3xl" onClick={toggleMenu} />

        {menu && (
          <div className="flex flex-col p-2 bg-darkBlue rounded-md absolute right-2 top-10 w-[250px] z-10 space-y-4 items-start">
            <button
              className="px-4 py-2 rounded-3xl hover:bg-slate-400"
              onClick={loginPage}
            >
              Log in
            </button>
            <button
              className="px-4 py-2 rounded-3xl bg-skyBlue scale"
              onClick={signUpPage}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
