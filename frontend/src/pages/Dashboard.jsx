import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const statusOptions = ["Planning", "In Progress", "Completed"];

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
  Planning: "bg-yellow-100 text-yellow-600",
};

export default function ProjectsOverview() {
  const [projects, setProjects] = useState([
    {
      title: "Website Redesign",
      description:
        "Complete overhaul of company website with modern design system",
      startDate: "2024-01-01",
      endDate: "2024-02-15",
      teamLead: "Alice",
      gitRepo: "https://github.com/example/redesign",
      members: 4,
      status: "In Progress",
    },
    {
      title: "Brand Guidelines",
      description: "Comprehensive brand identity and style guide documentation",
      startDate: "2023-12-01",
      endDate: "2024-01-30",
      teamLead: "Bob",
      gitRepo: "https://github.com/example/brand",
      members: 3,
      status: "Completed",
    },
    {
      title: "Customer Portal",
      description: "Self-service customer portal with account management",
      startDate: "2024-04-01",
      endDate: "2024-04-15",
      teamLead: "Charlie",
      gitRepo: "https://github.com/example/customer-portal",
      members: 7,
      status: "Planning",
    },
    {
      title: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      startDate: "2024-03-01",
      endDate: "2024-03-20",
      teamLead: "David",
      gitRepo: "https://github.com/example/mobile-app",
      members: 6,
      status: "In Progress",
    },
    {
      title: "Marketing Campaign",
      description: "Q1 digital marketing campaign across multiple channels",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      teamLead: "Emma",
      gitRepo: "https://github.com/example/marketing-campaign",
      members: 5,
      status: "In Progress",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    members: 1,
    teamLead: "",
    gitRepo: "",
    status: "Planning",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.members || formData.members <= 0)
      newErrors.members = "Members should be at least 1";
    if (!formData.teamLead) newErrors.teamLead = "Team Lead Name is required";
    if (!formData.gitRepo) newErrors.gitRepo = "Git Repository is required";
    if (!formData.status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setProjects([...projects, formData]);
    setShowModal(false);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      members: 1,
      teamLead: "",
      gitRepo: "",
      status: "Planning",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 px-1 sm:px-10 pt-3 pb-10 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Projects Overview</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs sm:text-base bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          New Project
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl relative shadow-xl max-h-screen overflow-y-auto">
            
            <h2 className="text-md sm:text-lg font-semibold mb-6 text-center">
              Add New Project
            </h2>

            {/* FLEX CONTAINER */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* LEFT SIDE */}
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-sm font-medium">Project Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                  placeholder="Enter Title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title}</p>
                )}

                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded break-words"
                  placeholder="Enter Description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}

                <label className="text-sm font-medium">Team Lead Name</label>
                <input
                  name="teamLead"
                  value={formData.teamLead}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                  placeholder="Enter Team Lead Name"
                />
                {errors.teamLead && (
                  <p className="text-red-500 text-xs">{errors.teamLead}</p>
                )}

                <label className="text-sm font-medium">Git Repository</label>
                <input
                  name="gitRepo"
                  value={formData.gitRepo}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                  placeholder="Enter Git Repo URL"
                />
                {errors.gitRepo && (
                  <p className="text-red-500 text-xs">{errors.gitRepo}</p>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs">{errors.startDate}</p>
                )}

                <label className="text-sm font-medium">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs">{errors.endDate}</p>
                )}

                <label className="text-sm font-medium">Team Members</label>
                <input
                  name="members"
                  type="number"
                  min="1"
                  value={formData.members}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded overflow-hidden truncate"
                  placeholder="Enter Team Members"
                />
                {errors.members && (
                  <p className="text-red-500 text-xs">{errors.members}</p>
                )}

                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  {statusOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              
            >
              Close
            </button>
              <button
                onClick={handleSubmit}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="!text-sm sm:!text-lg font-semibold ">
                {project.title}
              </h2>
              <span
                className={`text-[10px] sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                  statusStyles[project.status]
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              {project.description}
            </p>
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1 mt-2">
                Team Lead: {project.teamLead}
              </span>
              <span className="flex items-center gap-1 mt-2">
                <FaUsers /> {project.members} members
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button className="text-xs sm:text-sm bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg">
                Send Request
              </button>
                <button
                  className="text-indigo-600 text-xs sm:text-sm"
                  onClick={() => navigate("/project-overview")}
                >
                  View Details
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
