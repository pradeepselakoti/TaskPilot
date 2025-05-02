// import React, { useState } from "react";
// import MemberDetails from "./MemberDetails";

// const initialTeamMembers = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     email: "sarah.johnson@example.com",
//     phone: "123-456-7890",
//     role: "Project Manager",
//     github: "sarahjohnson",
//     totalProjects: 8,
//     skills: ["Leadership", "Agile", "Communication"],
//     status: "online",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     email: "mike.chen@example.com",
//     phone: "987-654-3210",
//     role: "Lead Developer",
//     github: "mikechen",
//     totalProjects: 12,
//     skills: ["React", "Node.js", "MongoDB"],
//     status: "offline",
//   },
//   {
//     id: 3,
//     name: "Emma Davis",
//     email: "emma.davis@example.com",
//     phone: "555-789-1234",
//     role: "UI/UX Designer",
//     github: "emmadavis",
//     totalProjects: 5,
//     skills: ["Figma", "Adobe XD", "HTML/CSS"],
//     status: "online",
//   },
// ];


// const TeamMembers = () => {
//   const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     email: "",
//     role: "Frontend",
//     status: "online", // "online" = Active, "offline" = Not Active
//   });

//   const handleChange = (e) => {
//     setNewMember({ ...newMember, [e.target.name]: e.target.value });
//   };

//   const handleAddMember = (e) => {
//     e.preventDefault();
//     const newId = teamMembers.length + 1;
//     const memberToAdd = { id: newId, ...newMember };
//     setTeamMembers([...teamMembers, memberToAdd]);
//     setShowAddModal(false);
//     setNewMember({
//       name: "",
//       email: "",
//       role: "Frontend",
//       status: "online",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] p-10">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-[#4318D1] hover:bg-[#3b10ba] text-white px-5 py-2 rounded-md shadow"
//         >
//           Add Member
//         </button>
//       </div>

//       <div className="space-y-4">
//         {teamMembers.map((member) => (
//           <div
//             key={member.id}
//             className="bg-white rounded-xl shadow flex items-center justify-between p-6"
//           >
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
//                 48 × 48
//               </div>
//               <div>
//                 <div className="flex items-center space-x-2">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {member.name}
//                   </h3>
//                   <span
//                     className={`w-3 h-3 rounded-full ${
//                       member.status === "online"
//                         ? "bg-green-500"
//                         : "bg-gray-400"
//                     }`}
//                   ></span>
//                 </div>
//                 <p className="text-sm text-gray-500">{member.role}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="bg-[#4318D1] hover:bg-[#3b10ba] text-white text-sm px-4 py-2 rounded-md">
//                 Message
//               </button>
//               <button
//                 onClick={() => setSelectedMember(member)}
//                 className="text-sm text-[#4318D1] hover:underline"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedMember && (
//         <MemberDetails
//           member={selectedMember}
//           onClose={() => setSelectedMember(null)}
//         />
//       )}

//       {/* Add Member Modal */}
//       {showAddModal && (
//         <div
//         className="fixed inset-0 z-50 flex items-center justify-center"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
//       >
//           <form
//             onSubmit={handleAddMember}
//             className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
//           >
//             <h3 className="text-xl font-semibold mb-6 text-gray-800">
//               Add New Member
//             </h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newMember.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={newMember.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Role
//               </label>
//               <select
//                 name="role"
//                 value={newMember.role}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
//               >
//                 <option value="Frontend">Frontend</option>
//                 <option value="Backend">Backend</option>
//               </select>
//             </div>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-600 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={newMember.status}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
//               >
//                 <option value="online">Active</option>
//                 <option value="offline">Not Active</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={() => setShowAddModal(false)}
//                 className="text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#4318D1] text-white px-4 py-2 rounded-md text-sm hover:bg-[#3b10ba]"
//               >
//                 Add Member
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamMembers;

import React, { useState } from "react";
import MemberDetails from "./MemberDetails";

const initialTeamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "123-456-7890",
    role: "Project Manager",
    github: "sarahjohnson",
    totalProjects: 8,
    skills: ["Leadership", "Agile", "Communication"],
    status: "online",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "987-654-3210",
    role: "Lead Developer",
    github: "mikechen",
    totalProjects: 12,
    skills: ["React", "Node.js", "MongoDB"],
    status: "offline",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "555-789-1234",
    role: "UI/UX Designer",
    github: "emmadavis",
    totalProjects: 5,
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    status: "online",
  },
];

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Frontend",
    status: "online",
  });

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const newId = teamMembers.length + 1;
    const memberToAdd = { id: newId, ...newMember };
    setTeamMembers([...teamMembers, memberToAdd]);
    setShowAddModal(false);
    setNewMember({
      name: "",
      email: "",
      role: "Frontend",
      status: "online",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4318D1] hover:bg-[#3b10ba] text-white px-5 py-2 rounded-md shadow"
        >
          Add Member
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                48 × 48
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      member.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button className="bg-[#4318D1] hover:bg-[#3b10ba] text-white text-sm px-4 py-2 rounded-md">
                Message
              </button>
              <button
                onClick={() => setSelectedMember(member)}
                className="text-sm text-[#4318D1] hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <form
            onSubmit={handleAddMember}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Add New Member
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newMember.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role
              </label>
              <select
                name="role"
                value={newMember.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                name="status"
                value={newMember.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
              >
                <option value="online">Active</option>
                <option value="offline">Not Active</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#4318D1] text-white px-4 py-2 rounded-md text-sm hover:bg-[#3b10ba]"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
