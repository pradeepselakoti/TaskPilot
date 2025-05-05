import React from "react";

const ProfileCard = ({ firstName, lastName, projects, teams, tasks, profileImage }) => {
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "User Name";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-500 transition-all duration-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Picture */}
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-300">
          <img
            src={profileImage || "/default-profile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Full Name */}
        <div className="text-center group">
          <h2 className="text-xl font-semibold relative inline-block">
            {fullName}
            <span className="block h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full absolute left-0 -bottom-1"></span>
          </h2>
        </div>

        <hr className="w-full border-gray-200" />

        {/* Stats */}
        <div className="flex justify-around w-full text-center">
          {[
            { label: "Projects", value: projects || 0 },
            { label: "Teams", value: teams || 0 },
            { label: "Tasks", value: tasks || 0 },
          ].map((item, index) => (
            <div
              key={index}
              className="p-2 rounded-md border border-transparent hover:border-blue-500 transition-all duration-300"
            >
              <p className="text-lg font-semibold">{item.value}</p>
              <p className="text-[15px] text-gray-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
