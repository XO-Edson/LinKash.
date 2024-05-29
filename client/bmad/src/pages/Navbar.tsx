import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const signUpPage = () => {
    navigate("/signUp");
  };
  return (
    <nav className="flex justify-between items-center p-2 md:p-4 font-bold shadow-sm">
      <div className="space-x-2 hidden md:flex md:items-center">
        <p>FAQ</p>
        <p>Resources</p>
      </div>
      <div>
        <h2>
          <Link to={"/"}> BMAD</Link>
        </h2>
      </div>
      <div className=" flex space-x-2">
        <button className="px-4 py-2 rounded-3xl hover:bg-slate-400">
          Log in
        </button>
        <button
          className="px-4 py-2 rounded-3xl bg-skyBlue scale"
          onClick={signUpPage}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
