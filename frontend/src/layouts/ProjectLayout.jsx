import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProjectLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed width, non-shrinking) */}
      <div className="w-64 shrink-0 bg-white border-r">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content with scroll */}
        <main className="flex-1 bg-gray-50 p-4 overflow-x-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
