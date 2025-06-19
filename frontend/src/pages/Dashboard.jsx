/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api"; // axios instance
import { useAuth } from "../context/AuthContext";

const statusOptions = ["Planning", "In Progress", "Completed"];
const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
  Planning: "bg-yellow-100 text-yellow-600",
};

const availableTechStack = ["React", "Node.js", "MongoDB", "Express", "Tailwind", "TypeScript", "Firebase"];

export default function ProjectsOverview() {
  const [projects, setProjects] = useState([]);
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
    techStack: [],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  const canCreateProject = ["cos", "admin"].includes(user?.role?.toLowerCase());

 const fetchProjects = async () => {
  try {
    if (!user?._id) return;
   
    const res = await api.get(`/projects/assigned/${user._id}`);
   
    setProjects(res.data.data || []);
  } catch (error) {
    console.error("Failed to fetch assigned projects:", error);
  }
};

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (tech) => {
    const updatedTechStack = formData.techStack.includes(tech)
      ? formData.techStack.filter((item) => item !== tech)
      : [...formData.techStack, tech];
    setFormData({ ...formData, techStack: updatedTechStack });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.members || formData.members <= 0) newErrors.members = "At least 1 member";
    if (!formData.teamLead) newErrors.teamLead = "Team lead is required";
    if (!formData.gitRepo) newErrors.gitRepo = "Git repo is required";
    if (!formData.status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        name: formData.title,
        overview: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        members: formData.members,
        team_lead: formData.teamLead,
        repo_link: formData.gitRepo,
        status: formData.status,
        tech_stack: formData.techStack,
      };

      const res = await api.post("/projects", payload);
      fetchProjects();
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
        techStack: [],
      });
      setErrors({});
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  return (
    <div className="bg-gray-50 px-1 sm:px-10 pt-3 pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Projects Overview</h1>
        {canCreateProject && (
          <button
            onClick={() => setShowModal(true)}
            className="text-xs sm:text-base bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            New Project
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl relative shadow-xl max-h-screen overflow-y-auto">
            <h2 className="text-md sm:text-lg font-semibold mb-6 text-center">Add New Project</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left form */}
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-sm font-medium">Project Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded" />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                <label className="text-sm font-medium">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded" />
                {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                <label className="text-sm font-medium">Team Lead Name</label>
                <input name="teamLead" value={formData.teamLead} onChange={handleChange} className="border p-2 rounded" />
                {errors.teamLead && <p className="text-red-500 text-xs">{errors.teamLead}</p>}
                <label className="text-sm font-medium">Git Repository</label>
                <input name="gitRepo" value={formData.gitRepo} onChange={handleChange} className="border p-2 rounded" />
                {errors.gitRepo && <p className="text-red-500 text-xs">{errors.gitRepo}</p>}
              </div>

              {/* Right form */}
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-sm font-medium">Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="border p-2 rounded" />
                {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
                <label className="text-sm font-medium">End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="border p-2 rounded" />
                {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate}</p>}
                <label className="text-sm font-medium">Team Members</label>
                <input type="number" name="members" min="1" value={formData.members} onChange={handleChange} className="border p-2 rounded" />
                {errors.members && <p className="text-red-500 text-xs">{errors.members}</p>}
                <label className="text-sm font-medium">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}

                <label className="text-sm font-medium">Tech Stack</label>
                <div className="flex flex-wrap gap-3">
                  {availableTechStack.map((tech) => (
                    <label key={tech} className="text-sm">
                      <input
                        type="checkbox"
                        checked={formData.techStack.includes(tech)}
                        onChange={() => handleCheckboxChange(tech)}
                        className="mr-1"
                      />
                      {tech}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowModal(false)} className="mt-6 bg-red-500 text-white px-6 py-2 rounded">Close</button>
              <button onClick={handleSubmit} className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Project Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          if (!project) return null;
          const status = project.status ?? "Planning";
          const teamLead = project.team_lead ?? "N/A";
          const memberCount = project.members ?? 0;

          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-sm sm:text-lg font-semibold">{project.name ?? "Untitled Project"}</h2>
                <span className={`text-[10px] sm:text-sm px-2 py-1 rounded-full ${statusStyles[status]}`}>
                  {status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{project.overview ?? ""}</p>
              <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1 mt-2">Team Lead: {teamLead}</span>
                <span className="flex items-center gap-1 mt-2"><FaUsers /> {memberCount} members</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <button onClick={() => navigate(`/project/${project._id}`)} className="text-indigo-600 text-xs sm:text-sm">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
