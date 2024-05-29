import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <main className="min-h-screen bg-background max-w-[2200px]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
