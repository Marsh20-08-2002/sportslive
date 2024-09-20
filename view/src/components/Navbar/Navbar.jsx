/* eslint-disable react/prop-types */
//import reactLogo from "../../assets/react.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "tailwindcss/tailwind.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className=" bg-[#e7f9e7]">
      {/* max-w-6xl */}
      <div className="px-4 mx-auto ">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div className="flex items-center py-5 px-3 text-gray-700 hover:text-gray-900">
              {/*    <img src="" className="w-6 h-6 mr-2" /> */}

              <span className="font-bold">SportifyHub</span>
            </div>
            {/* Left Nav */}
            <div className="hidden md:flex items-center  space-x-3"></div>
          </div>

          {/* Right Nav */}

          <div className="hidden md:flex items-center  space-x-3">
            {/* <input
              className="py-2 px-3 rounded"
              type="text"
              placeholder="Search fertlizers"
            /> */}
            <NavLink
              to="/"
              className="py-2 px-3 hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Home
            </NavLink>
            {/* <NavLink
              to="/booking"
              className="py-2 px-3 hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Bookings
            </NavLink> */}
            <NavLink
              to="/turf"
              className="py-2 px-3 hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Turf
            </NavLink>
            <NavLink
              to="/academy"
              className="py-2 px-3  hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Academy
            </NavLink>
            <NavLink
              to="/competition"
              className="py-2 px-3  hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Competition
            </NavLink>

            {/*  <NavLink
              to="/logout"
              className="py-2 px-3  hover:bg-[#228B22] text-black hover:text-gray-800 rounded"
            >
              Logout
            </NavLink> */}
            <NavLink
              to="/login"
              className="py-2 px-3 bg-[#a5d6a5] hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="py-2 px-3 hover:bg-[#228B22] text-black hover:text-gray-800 rounded" /*  bg-yellow-400 */
            >
              Signup
            </NavLink>

            <NavLink
              to="/admin"
              className="py-2 px-3  hover:bg-[#228B22] text-gray-700 hover:text-gray-950 rounded"
            >
              Admin
            </NavLink>
          </div>

          {/* Drop down button */}
          <div className="md:hidden flex items-center">
            <button onClick={handleMobileMenuToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div>
          <NavLink
            to="/"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/crops"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Turf
          </NavLink>

          <NavLink
            to="/contactus"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Academy
          </NavLink>
          <NavLink
            to="/createproduct"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Crops
          </NavLink>

          {/* <NavLink
            to="/logout"
            className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Logout
          </NavLink> */}

          <NavLink
            to="/login"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Signup
          </NavLink>

          {/* <NavLink
            to="/admin"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Admin
          </NavLink> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
