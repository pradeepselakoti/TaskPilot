import React from "react";

const MemberDetails = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Member Details</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {member.name}</p>
          <p><strong>Role:</strong> {member.role}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>GitHub:</strong> {member.github}</p>
          <p><strong>Total Projects:</strong> {member.totalProjects}</p>
          <div>
            <strong>Skills:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {member.skills?.map((skill, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
            Edit Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
