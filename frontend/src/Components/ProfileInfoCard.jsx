import React from "react";

const ProfileInfoCard = ({ firstName, lastName, email, contact, role, location, skills }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-500 transition-all duration-300 space-y-6 max-w-xl">
      {/* Name Section Removed */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-700">Profile Information</p> {/* Increased size and bold */}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
        {[
          { label: "First Name", value: firstName || "Not set" },
          { label: "Last Name", value: lastName || "Not set" },
          { label: "Email", value: email || "Not set" },
          { label: "Contact", value: contact || "Not set" },
          { label: "Role", value: role || "Not set" },
          { label: "Location", value: location || "Not set" },
        ].map((item, index) => (
          <div key={index}>
            <div className="text-gray-500 font-medium">{item.label}</div>
            <div className="text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Skills Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-1">
          {(skills || []).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
