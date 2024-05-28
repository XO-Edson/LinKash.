import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const signUpPage = () => {
    navigate("/signUp");
  };
  return (
    <nav className="flex justify-between items-center p-2 font-bold shadow-sm">
      <div className="space-x-2 hidden md:flex md:items-center">
        <p>FAQ</p>
        <p>Resources</p>
      </div>
      <div>
        <h2>BMAD</h2>
      </div>
      <div className=" flex space-x-2">
        <button className="px-4 py-2 rounded-3xl hover:bg-slate-400">
          Log in
        </button>
        <button
          className="px-4 py-2 rounded-3xl bg-skyBlue"
          onClick={signUpPage}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
