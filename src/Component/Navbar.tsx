/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { getCurrentUser, logout } from "../services/AuthService";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

        {/* Left Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          EventScheduler
        </Link>

        {/* Center Menu Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 font-medium hover:text-teal-700">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 font-medium hover:text-teal-700">
            All Events
          </Link>
        </div>

        {/* Right Side Auth Buttons / Avatar (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <img
                src="https://i.pinimg.com/736x/77/13/4d/77134de9f47dcd431865c0c2d8d68ad0.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
              />
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                <button
                  onClick={handleLogOut}
                  className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2">
          <Link to="/" className="block text-gray-700 font-medium hover:text-teal-700" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/events" className="block text-gray-700 font-medium hover:text-teal-700" onClick={() => setIsMobileMenuOpen(false)}>
            All Events
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogOut();
                setIsMobileMenuOpen(false);
              }}
              className="block text-red-500 font-medium w-full text-left"
            >
              <LogOut className="inline w-4 h-4 mr-2 cursor-pointer" /> Logout
            </button>
          ) : (
            <>
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer mt-2">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
