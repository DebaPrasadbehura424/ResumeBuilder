import { NavLink } from "react-router-dom";

function HeroSection() {
  return (
    <section
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4 text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart Resume Builder
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Create professional resumes in minutes — no design skills needed.
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="bg-white border-2 border-white  px-6 py-3 rounded-md font-semibold hover:bg-white text-blue-600 transition"
          >
            Login
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
