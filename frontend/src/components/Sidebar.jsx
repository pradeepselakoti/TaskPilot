import React, { useState } from "react";
import { FaThLarge, FaUsers, FaClock, FaComments } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { NavLink , useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const [active, setActive] = useState("overview");
  const { id: projectId } = useParams();  // /project/:id from route


  const menuItems = [
    { id: "overview", label: "Project Overview", path: `/project/${projectId}/overview`, icon: <FaThLarge /> },
    { id: "members", label: "Team Members", path: `/project/${projectId}/team`, icon: <FaUsers /> },
    { id: "timeline", label: "Timeline", path: `/project/${projectId}/timeline`, icon: <FaClock /> },
    { id: "chat", label: "Group Chat", path: `/project/${projectId}/chat`, icon: <FaComments /> },
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
       
       <div className="flex items-center justify-between mb-6 -mt-2">
  <NavLink to={"/"} className="flex items-center gap-3">
    <img src={Logo} alt="Logo" className="w-15 h-auto" />
    <span className="text-xl font-bold text-gray-800">Task Pilot</span>
  </NavLink>
  <button onClick={onClose} className="md:hidden">
    <IoMdClose size={24} />
  </button>
</div>


        
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
