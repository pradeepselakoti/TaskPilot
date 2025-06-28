import React, { useState, useEffect } from "react";
import MemberDetails from "./MemberDetails";
import { useParams } from "react-router-dom";
import api from "../api"; 
import { FaTrash } from "react-icons/fa";
const TeamMembers = () => {
  const { id: projectId } = useParams(); 
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [memberRole, setMemberRole] = useState("");

  // Fetch Project Team
  const fetchTeam = async () => {
    try {
      const res = await api.get(`/projects/team/${projectId}`);
      console.log('Fetching team for:', projectId);
      setTeamMembers(res.data.data);
    } catch (err) {
      console.error("Error fetching team:", err);
    }
  };

  // Fetch available users for dropdown
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/user`); // replace with your actual user endpoint
      setAvailableUsers(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchTeam();
    fetchUsers();
  }, [projectId]);

  // Add member
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
    try {
      const res = await api.post(`/projects/team/${projectId}`, {
        member_id: selectedUserId,
        member_role: memberRole, 
      });
      setTeamMembers([...teamMembers, res.data.data]);
      setSelectedUserId("");
      setMemberRole("");
      fetchTeam(); 
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding member:", err.response?.data || err.message);
    }

 
  };
     const handleDeleteMember = async (memberId) => {
  try {
    await api.delete(`/projects/team/${projectId}`, {
      data: { member_id: memberId }
    });
    setTeamMembers(teamMembers.filter(team => team.member_id._id !== memberId));
  } catch (err) {
    console.error("Error deleting member:", err.response?.data || err.message);
  }
};
  

  return (
    <div className="bg-[#f8fafc] p-3 sm:p-6 lg:p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Team Members</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4318D1] hover:bg-[#3b10ba] text-white px-5 py-2 rounded-md shadow"
        >
          Add Member
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {teamMembers.map((team) => {
          const member = team.member_id;
          return (
            <div
              key={member._id}
              className="bg-white rounded-xl shadow p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  48 × 48
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.first_name} {member.last_name}
                    </h3>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        team.member_role !== "pending"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                       <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            title="Remove from team"
                            onClick={() => handleDeleteMember(member._id)}
                          >
                            <FaTrash />
                          </button>
                  </div>
                  <p className="text-sm text-gray-500">{team.member_role}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <button className="bg-[#4318D1] text-white text-sm px-4 py-2 rounded-md">
                  Message
                </button>
                <button
                  onClick={() =>
                    setSelectedMember({
                      ...member,
                      member_role: team.member_role,
                    })
                  }
                  className="text-sm text-[#4318D1] hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMember && (
        <MemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
          <form
            onSubmit={handleAddMember}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Add New Member
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select User
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
                required
              >
                <option value="">-- Select User --</option>
                {availableUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.first_name} {user.last_name} ({user.role})
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium text-gray-600 mb-1 mt-4">
                Select Member Role
              </label>
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4318D1]"
                required
              >
                <option value="">-- Select Role --</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="cos">cos</option>
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
