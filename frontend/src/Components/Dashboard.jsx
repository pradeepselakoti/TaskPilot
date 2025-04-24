import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const projects = [
  {
    title: "Website Redesign",
    description: "Complete overhaul of company website with modern design system",
    date: "2024-02-15",
    members: 4,
    status: "In Progress",
  },
  {
    title: "Brand Guidelines",
    description: "Comprehensive brand identity and style guide documentation",
    date: "2024-01-30",
    members: 3,
    status: "Completed",
  },
  {
    title: "Customer Portal",
    description: "Self-service customer portal with account management",
    date: "2024-04-15",
    members: 7,
    status: "Planning",
  },
  {
    title: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    date: "2024-03-20",
    members: 6,
    status: "In Progress",
  },
  {
    title: "Marketing Campaign",
    description: "Q1 digital marketing campaign across multiple channels",
    date: "2024-02-28",
    members: 5,
    status: "In Progress",
  },
];

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
  Planning: "bg-yellow-100 text-yellow-600",
};

export default function ProjectsOverview() {
  return (
    <div className="min-h-screen bg-gray-50 p-5 sm:p-10 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-base sm:text-2xl font-bold">Projects Overview</h1>
        <button className="text-xs sm:text-base bg-indigo-600 text-white px-4 py-2 rounded-lg">New Project</button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-sm sm:text-lg font-semibold ">{project.title}</h2>
              <span
                className={`text-[10px] sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <MdAccessTime /> {project.date}
              </span>
              <span className="flex items-center gap-1">
                <FaUsers /> {project.members} members
              </span>
            </div>
            <div className="flex justify-between">
              <button className="text-xs sm:text-sm bg-indigo-600 text-white px-3 sm:px-4 py-2  rounded-lg">
                Send Request
              </button>
              <button className="text-indigo-600 text-xs sm:text-sm">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}