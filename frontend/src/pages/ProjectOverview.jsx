import React from "react";

const ProjectOverview = () => {
  return (
    <div className=" bg-gray-50 p-1 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Heading + Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl sm:text-3xl font-bold">
            E-Commerce Platform Redesign
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button className="bg-indigo-100 text-indigo-600 font-semibold text-xs sm:text-base px-1 sm:px-4 py-1 sm:py-2 rounded-4xl hover:bg-indigo-200">
              In Progress
            </button>
            <button className="bg-indigo-600 text-white font-semibold text-xs sm:text-base px-5 sm:px-4 py-1 sm:py-2 rounded-xl hover:bg-indigo-700">
              Edit Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Project Overview */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl  font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">
              Complete redesign and modernization of our flagship e-commerce
              platform with focus on user experience and performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">2024-01-15</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">2024-06-30</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repository</p>
                <a
                  href="https://github.com/company/ecommerce-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  github.com/company/ecommerce-v2
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Environment</p>
                <a
                  href="https://staging.ecommerce.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  staging.ecommerce.com
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">COS Member</p>
                <p className="font-medium">Michael Chen</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Team Leader</p>
                <p className="font-medium">Sarah Anderson</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Total Team Size</p>
                <p className="font-medium">12 members</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Frontend Team</p>
                <p className="font-medium">7 members</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Backend Team</p>
                <p className="font-medium">5 members</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "PostgreSQL", "AWS", "Docker"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: Project Progress */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Project Progress</h2>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Overall Completion</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">68%</p>
            </div>

            <ul className="space-y-4">
              {[
                {
                  name: "Project Kickoff",
                  date: "2024-01-15",
                  status: "Completed",
                  color: "green",
                },
                {
                  name: "Design System",
                  date: "2024-02-15",
                  status: "Completed",
                  color: "green",
                },
                {
                  name: "Frontend MVP",
                  date: "2024-03-30",
                  status: "In progress",
                  color: "indigo",
                },
                {
                  name: "Backend Integration",
                  date: "2024-04-30",
                  status: "Pending",
                  color: "gray",
                },
                {
                  name: "User Testing",
                  date: "2024-05-15",
                  status: "Pending",
                  color: "gray",
                },
                {
                  name: "Production Deploy",
                  date: "2024-06-30",
                  status: "Pending",
                  color: "gray",
                },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        item.color === "green"
                          ? "bg-green-500"
                          : item.color === "indigo"
                          ? "bg-indigo-600"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.color === "green"
                        ? "text-green-600"
                        : item.color === "indigo"
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
