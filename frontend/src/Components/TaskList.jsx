import React, { useState, useEffect } from "react";
import SubmitTaskModal from "./SubmitTaskModal";
import AssignTaskButton from "./AssignTaskButton";
import api from "../api";
import { useParams } from "react-router-dom";

const TaskList = ({ role }) => {
  const { id: projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState([]);
  const itemsPerPage = 4;

  const formatStatus = (status) => {
    if (status === "completed") return "Completed";
    if (status === "in-progress") return "In Progress";
    if (status === "submit") return "Submitted";
    return "Unknown";
  };

  // Step 1: Task fetch karne wala function
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/projects/${projectId}/tasks`);
      const data = res.data.data;

      const transformed = data.map((task) => ({
        id: task._id,
        name: task.title,
        assignee: task.assigned_to
          ? `${task.assigned_to.first_name} ${task.assigned_to.last_name}`
          : "Unassigned",
        due: task.end_date ? new Date(task.end_date).toLocaleDateString() : "N/A",
        status: formatStatus(task.status),
      }));

      setTasks(transformed);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  // Step 2: Update callback for modal
  const handleTaskUpdateSubmit = () => {
    fetchTasks(); // refresh tasks
    setShowModal(false); // close modal
  };

  const handleAssignTask = async (newTaskData) => {
    try {
      const res = await api.post(`/projects/${projectId}/tasks`, newTaskData);
      const savedTask = res.data.data;

      const transformed = {
        id: savedTask._id,
        name: savedTask.title,
        assignee: savedTask.assigned_to
          ? `${savedTask.assigned_to.first_name} ${savedTask.assigned_to.last_name}`
          : "Unassigned",
        due: savedTask.end_date
          ? new Date(savedTask.end_date).toLocaleDateString()
          : "N/A",
        status: formatStatus(savedTask.status),
      };

      setTasks((prev) => [...prev, transformed]);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const filtered = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedTasks = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Task List</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-100 border px-4 py-2 rounded-2xl w-full sm:w-64"
          />

          {role === "intern" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-[rgba(67,24,209,1)] cursor-pointer text-white px-4 py-2 rounded-md"
            >
              Submit Task
            </button>
          )}

          {["admin", "tl"].includes(role) && (
            <AssignTaskButton onAssign={handleAssignTask} />
          )}
        </div>
      </div>

      {/* Table View */}
      <table className="hidden sm:table w-full text-left mt-2">
        <thead>
          <tr className="border-b">
            <th className="py-2 font-semibold">Task</th>
            <th className="py-2 font-semibold">Assignee</th>
            <th className="py-2 font-semibold">Due Date</th>
            <th className="py-2 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id} className="border-b text-sm">
              <td className="py-3">{task.name}</td>
              <td>{task.assignee}</td>
              <td>{task.due}</td>
              <td
                className={`font-semibold ${
                  task.status === "Completed"
                    ? "text-green-600"
                    : task.status === "Submitted"
                    ? "text-red-500"
                    : "text-blue-600"
                }`}
              >
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-4 mt-2">
        {paginatedTasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm">
            <div className="text-sm font-semibold mb-1">{task.name}</div>
            <div className="text-xs text-gray-600">Assignee: {task.assignee}</div>
            <div className="text-xs text-gray-600">Due: {task.due}</div>
            <div
              className={`text-xs mt-1 font-semibold ${
                task.status === "Completed"
                  ? "text-green-600"
                  : task.status === "Submitted"
                  ? "text-red-500"
                  : "text-blue-600"
              }`}
            >
              {task.status}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm mt-4 gap-3">
        <span>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filtered.length)} to{" "}
          {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
        </span>
        <div className="flex gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? "bg-[rgba(67,24,209,1)] text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <SubmitTaskModal onClose={() => setShowModal(false)} onSubmit={handleTaskUpdateSubmit} />
      )}
    </div>
  );
};

export default TaskList;
