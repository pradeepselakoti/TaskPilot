// components/SubmitTaskModal.jsx
import React, { useState } from "react";

const SubmitTaskModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "submit",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    const { name, description, startDate, endDate } = form;
    if (!name || !description || !startDate || !endDate) {
      setError("All fields are required!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit New Task</h2>
        <input
          name="name"
          placeholder="Task Name"
          className="w-full border p-2 mb-3 rounded-md"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Task Description"
          className="w-full border p-2 mb-3 rounded-md h-20"
          value={form.description}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <input
            type="date"
            name="startDate"
            className="w-1/2 border p-2 mb-3 rounded-md"
            value={form.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            className="w-1/2 border p-2 mb-3 rounded-md"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-purple-700 text-white rounded-md text-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitTaskModal;
