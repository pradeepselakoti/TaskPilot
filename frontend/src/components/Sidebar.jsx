import React, { useState } from "react";
import { FaThLarge, FaUsers, FaClock, FaComments } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const [active, setActive] = useState("overview");

  const menuItems = [
    {
      id: "overview",
      label: "Project Overview",
      path: "/project-overview",
      icon: <FaThLarge />,
    },
    { id: "members", label: "Team Members", path: "/team", icon: <FaUsers /> },
    { id: "timeline", label: "Timeline", path: "/timeline", icon: <FaClock /> },
    { id: "chat", label: "Group Chat", path: "/chat", icon: <FaComments /> },
  ];

  const handleMenuClick = (itemId) => {
    setActive(itemId);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-opacity-30 z-30 md:hidden transition-opacity ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-white shadow-xl p-4 transition-transform transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:flex md:flex-col`}
      >
        <NavLink to={"/"} className="flex items-center gap-3 mb-6 -mt-2 ">
          <img src={Logo} alt="Logo" className="w-15 h-auto  " />
          <span className="text-3xl font-bold text-gray-800">Task Pilot</span>

          <div className="flex justify-end p-1 md:hidden">
            <button onClick={onClose}>
              <IoMdClose size={24} />
            </button>
          </div>
        </NavLink>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => handleMenuClick(item.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition ${
                active === item.id
                  ? " bg-[rgba(67,24,209,1)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
