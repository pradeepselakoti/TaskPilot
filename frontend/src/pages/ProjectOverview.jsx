import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // axios instance

const ProjectOverview = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectAndTeam = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch project data
        const projectRes = await api.get(`/projects/${id}`);
        setProject(projectRes.data.data);

        // 2. Fetch project team members
        const teamRes = await api.get(`/projects/team/${id}`);
        setTeamMembers(teamRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading project details...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-600">No project found.</div>
    );
  }

  // Calculate frontend and backend team sizes from teamMembers array
  const frontendTeamSize = teamMembers.filter(
    (member) =>
      member.member_role &&
      member.member_role.toLowerCase().includes("frontend")
  ).length;

  const backendTeamSize = teamMembers.filter(
    (member) =>
      member.member_role &&
      member.member_role.toLowerCase().includes("backend")
  ).length;

  // Other destructured project fields
  const {
    name = "Unnamed Project",
    overview = "",
    start_date = "N/A",
    end_date = "N/A",
    repo_link = "#",
    environment_link = "#",
    cosMember = "N/A",
    team_lead = "N/A",
    members = teamMembers.length, // total members count from teamMembers
    tech_stack = [],
    progressPercent = 0,
    milestones = [],
  } = project;

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "N/A") return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 p-1 sm:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl sm:text-3xl font-bold">{name}</h1>
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
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">{overview}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{formatDate(start_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">{formatDate(end_date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Repository</p>
                <a
                  href={repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {repo_link.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Environment</p>
                <a
                  href={environment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {environment_link.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">COS Member</p>
                <p className="font-medium">{cosMember}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Team Leader</p>
                <p className="font-medium">{team_lead}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Total Team Size</p>
                <p className="font-medium">{members} members</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Frontend Team</p>
                <p className="font-medium">{frontendTeamSize} members</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Backend Team</p>
                <p className="font-medium">{backendTeamSize} members</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
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
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">
                {progressPercent}%
              </p>
            </div>

            <ul className="space-y-4">
              {milestones.length > 0 ? (
                milestones.map((item) => (
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
                      />
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
                ))
              ) : (
                <li className="text-gray-500">No milestones available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
