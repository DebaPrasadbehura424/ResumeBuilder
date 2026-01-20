import All_resume from "./pages/All_resume";
import ResumeBuilder from "./pages/ResumeBuilder";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import ViewResume from "./pages/ViewResume";
import SelectResume from "./pages/SelectResume";
import EditResume from "./pages/EditResume";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/all_resume" element={<All_resume />} />
      <Route path="/create-resume" element={<ResumeBuilder />} />
      <Route path="/resume/:resumeId" element={<ViewResume />} />
      <Route path="/selectResume" element={<SelectResume />} />
      <Route path="/editResume/:resumeId" element={<EditResume />} />
    </Routes>
  );
}

// bro i have a idea insted of get email using token do one work
// lets saltfy the email and store into the session it is a  good idea+

// bro for set up the profile pic or any other till now i use base64 that is not good then
// also i use public/uploads file also
// ************ last one i should try direct uplaod in cloudnary and take from that the image
// ************ last one i should try direct uplaod in cloudnary and take from that the image
export default App;
