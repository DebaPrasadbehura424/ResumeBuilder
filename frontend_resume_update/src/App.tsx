import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./section/Navbar";
import Footer from "./section/Footer";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ResumeCreate } from "./pages/ResumeCreate";
import { Profile } from "./pages/Profile";
import { ResumeOne } from "./pages/ResumeOne";

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
        <Route path="/resume_create/:id" element={<ResumeCreate />} />

        {/* profile */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/resumeone/:id" element={<ResumeOne />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
