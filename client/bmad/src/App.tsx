import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Bio from "./pages/Bio";
import Main from "./pages/Main";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");

  return (
    <main className="min-h-screen bg-background max-w-[2200px]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signUp" element={<RegisterUser />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/bio" element={token ? <Bio /> : <Login />} />
        <Route path="/main" element={token ? <Main /> : <Login />} />
      </Routes>
    </main>
  );
}

export default App;
