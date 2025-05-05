import { useState } from "react";
import ProfileCard from "../Components/ProfileCard";
import ProfileInfoCard from "../Components/ProfileInfoCard";
import RecentActivityCard from "../Components/RecentActivityCard";
import NotificationSettingsCard from "../Components/NotificationSettingsCard";
import EditProfileForm from "../Components/EditProfileForm";

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Thakur Sanjeet Singh",
    email: "sanjeeet@example.com",
    contact: "+91 9876543210",
    role: "Frontend Developer",
    location: "India",
    projects: 12,
    teams: 4,
    tasks: 28,
    skills: ["React", "Tailwind", "JavaScript"],
    profileImage: "/sanjupod.jpg", // Add this if you have images
  });

  return (
    <div className="min-h-screen  ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard
            firstName={profileData.firstName}
            lastName={profileData.lastName}
            projects={profileData.projects}
            teams={profileData.teams}
            tasks={profileData.tasks}
            profileImage={profileData.profileImage}
          />
          <ProfileInfoCard
            email={profileData.email}
            contact={profileData.contact}
            role={profileData.role}
            location={profileData.location}
            skills={profileData.skills}
          />
          <RecentActivityCard />
          <NotificationSettingsCard />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <EditProfileForm
            onClose={() => setIsModalOpen(false)}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
