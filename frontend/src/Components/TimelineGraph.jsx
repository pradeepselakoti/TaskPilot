import React, { useRef, useState } from 'react';

const tasks = [
  { name: "Sarah Anderson", role: "Lead Designer", task: "UI Design System", color: "bg-green-600", start: 0, duration: 2 },
  { name: "Michael Chen", role: "Frontend Developer", task: "Homepage Development", color: "bg-green-600", start: 1, duration: 3 },
  { name: "Emily Rodriguez", role: "Backend Developer", task: "API Integration", color: "bg-blue-600", start: 2, duration: 2 },
  { name: "David Kim", role: "Product Manager", task: "Sprint Planning", color: "bg-blue-600", start: 0, duration: 2 },
  { name: "Lisa Wang", role: "QA Engineer", task: "Testing Phase 1", color: "bg-green-600", start: 3, duration: 1 },
  { name: "John Doe", role: "DevOps Engineer", task: "CI/CD Setup", color: "bg-blue-600", start: 2, duration: 2 },
];

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

export default function TimelineGraph() {
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [view, setView] = useState("Month");

  const handleScroll = () => {
    headerRef.current.scrollLeft = scrollRef.current.scrollLeft;
  };

  const labels = view === "Month" ? monthLabels : weekLabels;
  const colWidth = view === "Month" ? 8 : 5; // in rem for both views
  const boxWidthClass = view === "Month" ? "w-32 sm:w-24" : "w-24 sm:w-20";

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
          {/* Header */}
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
