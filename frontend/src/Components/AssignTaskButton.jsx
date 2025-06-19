import React, { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";


const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const monthMap = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
};

export default function AssignTaskButton({ onAssign }) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    startMonth: "Jan",
    endMonth: "Jan",
    assignedUser: ""
  });

  const { user } = useAuth();
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user"); // Backend should return all users
        setUsers(res.data.data);
        if (res.data.data.length > 0) {
          setForm((prev) => ({ ...prev, assignedUser: res.data.data[0]._id }));
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const assign = () => {
    const start = `2025-${monthMap[form.startMonth]}-01`;
    const end = `2025-${monthMap[form.endMonth]}-28`;

    const task = {
      title: form.title || "Untitled Task",
      status: "in-progress",
      start_date: new Date(start),
      end_date: new Date(end),
      assigned_to: form.assignedUser,
      verified_by: user?._id || null,
    };

    onAssign(task);
    setShowModal(false);
    setForm({
      title: "",
      startMonth: "Jan",
      endMonth: "Jan",
      assignedUser: users.length > 0 ? users[0]._id : "",
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[rgba(22,163,74,1)] text-white px-4 py-2 cursor-pointer rounded hover:bg-[rgba(22,163,74,1)]"
      >
        Assign Task
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Assign New Task</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter task name"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Month</label>
                  <select
                    name="startMonth"
                    value={form.startMonth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Month</label>
                  <select
                    name="endMonth"
                    value={form.endMonth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to User</label>
                <select
                  name="assignedUser"
                  value={form.assignedUser}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.first_name} {u.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={assign}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
