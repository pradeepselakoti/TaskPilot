import React, { useEffect, useRef, useState } from 'react';
import api from "../api"; 

import { useParams } from 'react-router-dom';

export default function TimelineGraph() {
  const { id: projectId } = useParams(); // assuming your route is something like /project/:id/timeline
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [view, setView] = useState("Month");
  const [tasks, setTasks] = useState([]);

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const labels = view === "Month" ? monthLabels : weekLabels;
  const colWidth = view === "Month" ? 6 : 5;
  const boxWidthClass = view === "Month" ? "w-32 sm:w-24" : "w-24 sm:w-20";

  const handleScroll = () => {
    headerRef.current.scrollLeft = scrollRef.current.scrollLeft;
  };

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/timeline`);
        if (response.data.success) {
          const mappedTasks = response.data.data.map(task => {
  const startDate = new Date(task.start_date);
  const endDate = new Date(task.end_date);

  let start, duration;

  if (view === "Month") {
    start = startDate.getMonth(); // 0 to 11
    duration = Math.max(1, (endDate.getMonth() - startDate.getMonth()) + 1);
  } else {
    // Week calculation capped between 0 to 4 (Week 1 to Week 5)
    start = Math.min(4, Math.floor((startDate.getDate() - 1) / 7)); // 0-based index
    const endWeek = Math.min(4, Math.floor((endDate.getDate() - 1) / 7));
    duration = Math.max(1, endWeek - start + 1);
  }

  return {
    name: task.member_name,
    role: task.member_role,
    task: task.status,
    color: task.status === "completed" ? "bg-green-600" : "bg-blue-600",
    start,
    duration
  };
});

          setTasks(mappedTasks);
        }
      } catch (err) {
        console.error("Failed to fetch timeline:", err);
      }
    };

    fetchTimeline();
  }, [projectId, view]);

  return (
    <div className="px-0 sm:px-4 py-2">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex space-x-2">
          {["Week", "Month"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-sm sm:text-base cursor-pointer rounded-full border ${
                view === v ? "bg-[rgba(67,24,209,1)] text-white" : "bg-white text-gray-800"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[200px_1fr] border border-gray-300 shadow-md rounded-md overflow-hidden text-sm sm:text-base">
        {/* Left: Team Members */}
        <div className="bg-white min-w-[150px] sm:min-w-[200px]">
          <div className="h-12 border-b text-center border-gray-300 px-2 py-3 font-semibold text-xs sm:text-base">
            Team Member
          </div>
          {tasks.map((task, i) => (
            <div key={i} className="h-16 border-b text-center border-gray-300 px-2 py-2">
              <div className="font-medium truncate text-[11px] sm:text-base">{task.name}</div>
              <div className="text-[9px] sm:text-xs text-gray-500">{task.role}</div>
            </div>
          ))}
        </div>

        {/* Right: Timeline Grid */}
        <div
          className="overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div
            className={`flex border-b border-gray-300 bg-white sticky top-0 z-10 min-w-fit ${
              view === "Month" ? "w-max" : "w-full"
            }`}
            ref={headerRef}
          >
            {labels.map((label, i) => (
              <div
                key={i}
                className={`h-12 flex items-center justify-center border-l border-gray-300 font-semibold text-xs sm:text-sm ${
                  view === "Month" ? boxWidthClass : "min-w-[80px] sm:flex-1"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Task Rows */}
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`flex h-16 items-center relative border-b border-gray-300 min-w-fit ${
                view === "Month" ? "w-max" : "w-full"
              }`}
            >
              {labels.map((_, index) => (
                <div
                  key={index}
                  className={`h-full border-l border-gray-200 ${
                    view === "Month" ? boxWidthClass : "min-w-[80px] sm:flex-1"
                  }`}
                ></div>
              ))}

              <div
                className={`absolute top-1/2 transform -translate-y-1/2 text-white px-2 py-1 text-[9px] sm:text-sm rounded ${task.color}`}
                style={{
                  left: `${task.start * colWidth}rem`,
                  width: `${task.duration * colWidth}rem`,
                }}
              >
                {task.task}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
