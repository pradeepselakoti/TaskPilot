

import React from "react";

const MemberDetails = ({ member, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 px-4 sm:px-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-lg animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl font-semibold"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Member Details</h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 shrink-0">
            48 × 48
          </div>

          {/* Details */}
          <div className="flex-1 w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center sm:text-left">
              {member.name}
            </h3>

            {/* Grid info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-[#4318D1] break-words">{member.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-[#4318D1]">{member.phone}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Project Role</p>
                <p>{member.role}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">GitHub ID</p>
                <p>{member.github}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Total Projects</p>
                <p>{member.totalProjects}</p>
              </div>
            </div>

            {/* Skills */}
            {member.skills?.length > 0 && (
              <div className="mt-6">
                <p className="font-medium text-gray-900 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
