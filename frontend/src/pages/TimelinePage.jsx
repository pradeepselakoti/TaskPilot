import { useContext  ,useState} from "react";
import RoleContext from "../context/RoleContext";
import TimelineGraph from "../components/TimelineGraph";
import TaskList from "../components/TaskList";

export default function TimelinePage() {
  const { role, loading } = useContext(RoleContext);
  const [showTimeline, setShowTimeline] = useState(true);
  const [tasks, setTasks] = useState([]);

  if (loading) return <div className="p-4">Loading...</div>;
  // console.log("Role in TimelinePage:", role);

  return (
    <div className="space-y-4 px-2 sm:px-4 lg:px-8">
      {role === "admin" ? (
        <>
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
            <h2 className="text-base sm:text-3xl font-bold text-gray-800 whitespace-nowrap">
              Task Timeline
            </h2>
            <button
              className="text-sm sm:text-base bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-blue-600 whitespace-nowrap"
              onClick={() => setShowTimeline(!showTimeline)}
            >
              {showTimeline ? "Show History" : "Show Timeline"}
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="w-full max-w-full">
              {showTimeline ? (
                <TimelineGraph />
              ) : (
                <TaskList tasks={tasks} setTasks={setTasks} role={role} />
              )}
            </div>
          </div>
        </>
      ) : (
        <TaskList tasks={tasks} setTasks={setTasks} role={role} />
      )}
    </div>
  );
}
