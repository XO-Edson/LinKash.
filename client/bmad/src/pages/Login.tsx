import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Login() {
  const { email, setEmail, password, setPassword, login, isNewUser } =
    useAuthContext();

  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    login(email, password, () => setIsLogin(true));
  };

  useEffect(() => {
    console.log(isLogin);
    console.log(isNewUser);

    if (isLogin) {
      if (!isNewUser) {
        return navigate("/main");
      } else {
        return navigate("/bio");
      }
    }
  }, [isLogin]);

  return (
    <section>
      <nav className="fixed flex justify-between items-center p-2 md:p-4 shadow-sm w-full">
        <div>
          <h2 className=" font-bold">
            <Link to={"/"}> LIN-KSH</Link>
          </h2>
        </div>

        <div>
          Don't have an account?
          <Link to={"/signUp"} className=" underline">
            Sign up
          </Link>
        </div>
      </nav>

      <article className="grid place-content-center h-screen">
        <div className="grid place-content-center mx-auto ">
          <h1 className="font-bold text-4xl mb-5">Welcome back</h1>

          <input
            type="text"
            className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB] mb-2  md:w-[400px]"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="rounded-md p-3 active:border-black  border-none placeholder:text-[#BBB]"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="p-3 rounded-3xl bg-skyBlue font-bold my-6 text-slate-300 scale"
            onClick={handleLogin}
          >
            LOGIN
          </button>
        </div>
      </article>
    </section>
  );
}

export default Login;
