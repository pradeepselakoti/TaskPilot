
// import React from "react";

// const MemberDetails = ({ member, onClose }) => {
//   return (
// <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
//       <div className="bg-white rounded-2xl p-8 w-[90%] max-w-xl relative shadow-lg animate-fadeIn">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl"
//         >
//           &times;
//         </button>

//         {/* Header */}
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">Member Details</h2>

//         {/* Content */}
//         <div className="flex items-start gap-6">
//           {/* Avatar Placeholder */}
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
//             48 × 48
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>

//             <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//               <div>
//                 <p className="font-medium text-gray-900">Email</p>
//                 <p className="text-[#4318D1]">{member.email}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">Phone</p>
//                 <p className="text-[#4318D1]">{member.phone}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">Project Role</p>
//                 <p>{member.role}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">GitHub Id</p>
//                 <p>{member.github}</p>
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">Total Projects</p>
//                 <p>{member.totalProjects}</p>
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="mt-6">
//               <p className="font-medium text-gray-900 mb-2">Skills</p>
//               <div className="flex flex-wrap gap-2">
//                 {member.skills?.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-800"
//           >
//             Close
//           </button>
//           <button className="px-5 py-2 bg-[#4318D1] hover:bg-[#3b10ba] text-white rounded-lg text-sm font-medium">
//             Edit Member
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDetails;


import React from "react";

const MemberDetails = ({ member, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 px-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-lg animate-fadeIn">
        {/* Close (Cancel) Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Member Details
        </h2>

        {/* Content */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
            48 × 48
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
              {member.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
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
            <div className="mt-4">
              <p className="font-medium text-gray-900 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {member.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;

