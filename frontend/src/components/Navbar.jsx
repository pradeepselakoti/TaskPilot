/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import profilePic from "../assets/profilepic.png";
import Logo from "../assets/Logo.png";

const Navbar = ({ onMenuClick }) => {
  const [notificationCount, setNotificationCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const generalPages = ["/login", "/", "/profile", "/notification"];
  const isGeneralPage = generalPages.includes(location.pathname);

 

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldShowLogo = isGeneralPage || (!isGeneralPage && isMobile);
  const shouldShowHamburger = !isGeneralPage && isMobile;

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.post("/api/v1/auth/logout"); // ← backend API call
    navigate("/login"); // ← user ko login page pe bhej do
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const { user } = useAuth();



  return (
    
    <nav className="w-full h-16 bg-white shadow-md px-4 ml-1 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        {shouldShowHamburger && (
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <FaBars size={20} />
          </button>
        )}

        {shouldShowLogo && (
          <NavLink to={"/"} className="flex items-center gap-2 -ml-2">
            <img src={Logo} alt="Logo" className="w-9 h-auto md:w-15" />
            <span className="font-semibold text-lg text-gray-800 md:text-2xl">
              TaskPilot
            </span>
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <NavLink
            to="/notification"
            className="flex p-3 rounded-full  w-full h-full bg-gray-100  hover:bg-gray-200"
          >
            <FaBell size={18} />
          </NavLink>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 p-1 pr-2 rounded-full border bg-white shadow-sm cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
            src={user?.profileImage || profilePic}  
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
            <div className="hidden sm:block text-left">
             <p className="text-sm font-semibold text-gray-800">
              {user ? `${user.first_name} ${user.last_name}` : "Guest User"}
            </p>
            <p className="text-xs text-gray-500">
              {user ? user.role : "No Role"}
            </p>
            </div>
            <FaChevronDown size={14} className="text-gray-600" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 p-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 transition-all duration-300 ease-in-out">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  className="flex items-center gap-2 px-4 py-2 mb-2 rounded-4xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2 w-full h-full"
                  >
                    <FaUser className="text-gray-700" />
                    Profile
                  </NavLink>
                </li>

                <li
                  className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-red-100 hover:bg-red-200 text-red-500 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 w-full h-full"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
