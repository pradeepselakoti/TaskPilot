/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

const SubmitTaskModal = ({ onClose, onSubmit }) => {
  const { user, loading } = useAuth();
  const { id: projectId } = useParams();

  const [taskId, setTaskId] = useState("");
  const [status, setStatus] = useState("in-progress");
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Fetch only tasks assigned to the logged-in user
  const fetchMyTasks = async () => {
    if (!user) return; // Wait till user data is available

    setLoadingTasks(true);
    try {
      const res = await api.get(`/projects/${projectId}/tasks?limit=1000`);
      const assignedTasks = res.data.data.filter(
        (task) => task.assigned_to && task.assigned_to._id === user._id
      );
      setTasks(assignedTasks);
    } catch (error) {
      console.error("Error fetching your tasks", error.message);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, [user, projectId]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!taskId || !status) return;

  try {
    await api.post(`/tasks/${taskId}/update`, {
  task_id: taskId,
  status,
  message,
    });
    await fetchMyTasks(); 
    onSubmit(); // callback to refresh tasks
    onClose();
  } catch (error) {
    console.error("Error submitting update:", error.message);
  }
};

  if (loading) {
    // Auth is loading, show nothing or loader
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Submit Task Update</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Selector */}
          <div>
            <label className="block font-medium mb-1">Select Task</label>
            <select
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
              disabled={loadingTasks || tasks.length === 0}
            >
              <option value="">
                {loadingTasks
                  ? "Loading tasks..."
                  : tasks.length === 0
                  ? "No assigned tasks"
                  : "-- Select Your Task --"}
              </option>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Add any comments or progress notes..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[rgba(67,24,209,1)] text-white px-4 py-2 rounded-md w-full"
          >
            Submit Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTaskModal;
