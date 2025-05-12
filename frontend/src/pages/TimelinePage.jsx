import { useContext, useState } from "react";
import RoleContext from "../context/RoleContext";
import TimelineGraph from "../components/TimelineGraph";
import TaskList from "../components/TaskList";

export default function TimelinePage() {
  const { role } = useContext(RoleContext);
  const [showTimeline, setShowTimeline] = useState(true);
  const [tasks, setTasks] = useState([]);

  return (
    <div className="space-y-4">

      {role === "admin" && (
        <>
          {/* Toggle button for admin */}
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowTimeline(!showTimeline)}
            >
              {showTimeline ? "Show History" : "Show Timeline"}
            </button>
          </div>

          {/* Toggle view for admin */}
          {showTimeline ? (
            <TimelineGraph />
          ) : (
            <TaskList tasks={tasks} setTasks={setTasks} role={role} />
          )}
        </>
      )}

      {role !== "admin" && (
        // Interns and others see only TaskList directly
        <TaskList tasks={tasks} setTasks={setTasks} role={role} />
      )}
    </div>
  );
}
