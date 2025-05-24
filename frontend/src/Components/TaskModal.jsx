import { useState } from "react";

export default function TaskModal({ onSubmit }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, date: new Date().toISOString() });
      setTitle("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-2">New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
          placeholder="Enter task title"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
