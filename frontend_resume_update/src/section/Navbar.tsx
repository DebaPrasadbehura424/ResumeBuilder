import { useState } from "react";
import { FiMenu, FiX, FiLogIn, FiMail, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleProfileClick = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="text-2xl md:text-3xl font-bold text-indigo-600">
            Resume<span className="text-gray-900">Pro</span>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium"
            >
              <FiMail className="w-5 h-5" />
              Contact Us
            </NavLink>

            {!token ? (
              <NavLink
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
              >
                <FiLogIn className="w-5 h-5" />
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200"
              >
                <FiUser className="w-5 h-5" />
                Profile
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-5">
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-gray-700 font-medium text-lg"
            >
              <FiMail className="w-6 h-6" />
              Contact Us
            </NavLink>

            {!token ? (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg"
              >
                <FiLogIn className="w-6 h-6" />
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg"
              >
                <FiUser className="w-6 h-6" />
                Profile
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
