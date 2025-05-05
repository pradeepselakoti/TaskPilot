import React from "react";

const RecentActivityCard = () => {
  const activities = [
    { time: "10 mins ago", action: "Updated task ‘Wireframe Homepage’" },
    { time: "1 hour ago", action: "Commented on ‘Design Review’" },
    { time: "Yesterday", action: "Joined the team ‘UX Designers’" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-500 transition-all duration-300">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
            <div className="text-sm text-gray-700">
              <p className="font-medium group-hover:text-blue-600 transition">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;