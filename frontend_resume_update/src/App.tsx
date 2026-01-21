import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./section/Navbar";
import Footer from "./section/Footer";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ResumeCreate } from "./pages/ResumeCreate";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/*  */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* dash */}
        <Route path="/dash_board" element={<Dashboard />} />
        <Route path="/resume_create" element={<ResumeCreate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
