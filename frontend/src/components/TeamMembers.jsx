import React, { useState } from "react";
import MemberDetails from "./MemberDetails";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    status: "online",
    email: "sarah.j@taskpilot.com",
    phone: "+1 (555) 123-4567",
    github: "sdadasd.github.com",
    totalProjects: 10,
    skills: ["Project Management", "Team Leadership", "Agile Methodology"],
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Lead Developer",
    status: "offline",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "UI/UX Designer",
    status: "online",
  },
];

const TeamMembers = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="mt-2">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${member.status === "online" ? "bg-green-500" : "bg-gray-400"}`}></span>
                {member.status}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Message
              </button>
              <button
                onClick={() => setSelectedMember(member)}
                className="text-purple-600 underline hover:text-purple-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <MemberDetails member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
};

export default TeamMembers;
