/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaBars, FaBell, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import profilePic from "../assets/profilepic.png";
import Logo from "../assets/Logo.png";


const Navbar = ({ onMenuClick }) => {
  const [notificationCount, setNotificationCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  const location = useLocation();
  const generalPages = ["/login", "/", "/profile"];
  const isGeneralPage = generalPages.includes(location.pathname);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowLogo = isGeneralPage || (!isGeneralPage && isMobile);
  const shouldShowHamburger = !isGeneralPage && isMobile;

  return (
    <nav className="w-full h-16 bg-white shadow-md px-4 ml-1 flex items-center justify-between relative">
     
      <div className="flex items-center gap-4">
        {/* Hamburger - only on project pages on mobile */}
        {shouldShowHamburger && (
          <button className="p-2 rounded hover:bg-gray-100" onClick={onMenuClick}>
            <FaBars size={20} />
          </button>
        )}

        {/* Logo + Brand */}
        {shouldShowLogo && (
        <NavLink to={"/"} className="flex items-center gap-2 -ml-2">
  <img
    src={Logo}
    alt="Logo"
    className="w-9 h-auto md:w-15"  // Mobile: thoda bada (was w-8), Desktop: as is
  />
  <span className="font-semibold text-lg text-gray-800 md:text-2xl">
    TaskPilot
  </span>
</NavLink>

       
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
        
        <div className="relative">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <FaBell size={18} />
          </button>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {notificationCount}
            </span>
          )}
        </div>

       
        <div className="relative">
          <div
            className="flex items-center gap-2 p-1 pr-2 rounded-full border bg-white shadow-sm cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800">Robert Allen</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
            <FaChevronDown size={14} className="text-gray-600" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 p-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 transition-all duration-300 ease-in-out">
            <ul className="py-2 text-sm text-gray-700">
              <NavLink to="/profile">
                <li className="flex items-center gap-2 px-4 py-2  rounded-4xl mb-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                  <FaUser className="text-gray-700" />
                  Profile
                </li>
              </NavLink>
              <NavLink to="/login">
                <li className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-red-100 hover:bg-red-200 text-red-500 transition-colors duration-200 cursor-pointer">
                  <FaSignOutAlt className="text-red-500" />
                  Logout
                </li>
              </NavLink>
            </ul>
          </div>
          
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
