import React, { useState, useContext } from "react";
import SubmitTaskModal from "./SubmitTaskModal";
import AssignTaskButton from "./AssignTaskButton";
import RoleContext from "../context/RoleContext";

const TaskList = () => {
  const { role } = useContext(RoleContext);
  console.log(role)
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [tasks, setTasks] = useState([
    { id: 1, name: "Homepage Redesign", assignee: "Sarah Anderson", due: "2024-02-15", status: "In Progress" },
    { id: 2, name: "API Documentation", assignee: "Michael Chen", due: "2024-02-20", status: "submit" },
    { id: 3, name: "Database Optimization", assignee: "Emily Rodriguez", due: "2024-02-25", status: "Completed" },
    { id: 4, name: "User Testing", assignee: "Lisa Wang", due: "2024-03-01", status: "In Progress" },
    { id: 5, name: "New Module", assignee: "John Doe", due: "2024-03-10", status: "In Progress" },
    { id: 6, name: "Bug Fixes", assignee: "Jane Smith", due: "2024-03-15", status: "submit" },
  ]);

  const itemsPerPage = 4;
  const filtered = tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()));
  const paginatedTasks = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleSubmit = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowModal(false);
  };

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

          {role === "admin" && <AssignTaskButton />}
        </div>
      </div>

      {/* Table view for desktop */}
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
          {paginatedTasks.map(task => (
            <tr key={task.id} className="border-b text-sm">
              <td className="py-3">{task.name}</td>
              <td>{task.assignee}</td>
              <td>{task.due}</td>
              <td className={
                task.status === "Completed"
                  ? "text-green-600 font-semibold"
                  : task.status === "submit"
                    ? "text-red-500 font-semibold"
                    : "text-blue-600 font-semibold"
              }>
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card view for mobile */}
      <div className="sm:hidden flex flex-col gap-4 mt-2">
        {paginatedTasks.map(task => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm">
            <div className="text-sm font-semibold mb-1">{task.name}</div>
            <div className="text-xs text-gray-600">Assignee: {task.assignee}</div>
            <div className="text-xs text-gray-600">Due: {task.due}</div>
            <div className={`text-xs mt-1 font-semibold ${
              task.status === "Completed"
                ? "text-green-600"
                : task.status === "submit"
                ? "text-red-500"
                : "text-blue-600"
            }`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm mt-4 gap-3">
        <span>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filtered.length)} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
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
        <SubmitTaskModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TaskList;
