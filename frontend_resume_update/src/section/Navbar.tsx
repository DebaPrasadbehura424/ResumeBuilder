import { useState } from "react";
import { FiMenu, FiX, FiLogIn, FiMail } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <div className="flex items-center">
            <div className="text-2xl md:text-3xl font-bold text-indigo-600">
              Resume<span className="text-gray-900">Pro</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/contact"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              <FiMail className="w-5 h-5" />
              Contact Us
            </NavLink>
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              <FiLogIn className="w-5 h-5" />
              Login
            </NavLink>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle menu"
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

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-5">
            <NavLink
              to="/contact"
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium text-lg"
              onClick={() => setIsOpen(false)}
            >
              <FiMail className="w-6 h-6" />
              Contact Us
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all text-lg"
            >
              <FiLogIn className="w-6 h-6" />
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
