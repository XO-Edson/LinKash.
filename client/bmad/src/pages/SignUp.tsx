import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section>
      <nav className="fixed flex justify-between items-center p-2 md:p-4 shadow-sm w-full">
        <div>
          <h2 className=" font-bold">
            <Link to={"/"}> BMAD</Link>
          </h2>
        </div>

        <div>
          Already have an account?{" "}
          <Link to={"/logIn"} className=" underline">
            Log in
          </Link>
        </div>
      </nav>

      <article className="grid place-content-center h-screen">
        <h2 className="font-bold text-4xl mb-2">Create your account</h2>
        <p className=" mb-5">Choose a username for your page.</p>

        <div className="input-container relative">
          <label className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">
            buymeadonut.com/
          </label>
          <input
            type="text"
            className="rounded-md p-3 pl-[18.5ch] border-none outline-none flex-1 placeholder:text-[#BBB]"
            placeholder="username"
          />
        </div>
      </article>
      <footer className="absolute bottom-0 shadow-top w-full text-right">
        <button className="p-4 rounded-3xl bg-skyBlue font-bold text-slate-300 scale m-2">
          Sign up
        </button>
      </footer>
    </section>
  );
}

export default SignUp;
