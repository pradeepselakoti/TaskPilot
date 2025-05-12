import React, { useState } from "react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Lead Designer",
  "Product Manager",
  "QA Engineer",
  "DevOps Engineer"
];

export default function AssignTaskButton({ onAssign }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    startMonth: "Jan",
    endMonth: "Jan",
    role: "Frontend Developer"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const assign = () => {
    const task = {
      title: form.title || "Untitled Task",
      startMonth: form.startMonth,
      endMonth: form.endMonth,
      role: form.role,
      name: "Auto User",
      color: "bg-indigo-600",
    };
    onAssign(task);
    setShowModal(false);
    setForm({
      title: "",
      startMonth: "Jan",
      endMonth: "Jan",
      role: "Frontend Developer"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
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
