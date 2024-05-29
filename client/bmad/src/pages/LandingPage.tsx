import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();

  const signUpPage = () => {
    navigate("/signUp");
  };
  return (
    <section>
      <Navbar />
      <div className="h-[80vh] p-2 grid place-items-center text-center">
        <div>
          <div className=" w-1/2 mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Fund your creative work: <br /> Embrace support, accelerate your
              growth.
            </h1>
          </div>
          <p> Launch a membership. Set up a shop!</p>

          <button
            className="p-4 rounded-3xl bg-skyBlue font-bold my-6 text-slate-300 scale"
            onClick={signUpPage}
          >
            Start my page
          </button>
        </div>
      </div>
      <About />
      <Footer />
    </section>
  );
}

export default LandingPage;
