import { useEffect, useState } from "react";
import axios from "axios";

import ProfileCard from "../Components/ProfileCard";
import ProfileInfoCard from "../Components/ProfileInfoCard";
// import RecentActivityCard from "../Components/RecentActivityCard";
// import NotificationSettingsCard from "../Components/NotificationSettingsCard";
import EditProfileForm from "../Components/EditProfileForm";

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/v1/auth/profile", {
          withCredentials: true,
        });
        setProfileData(res.data.data);
      } catch (error) {
        console.error("Profile fetch failed:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading profile...</p>;
  if (!profileData)
    return <p className="p-4 text-center text-red-500">No profile data found.</p>;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
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
            firstName={profileData.first_name}
            lastName={profileData.last_name}
            projects={profileData.projects || 0}
            teams={profileData.teams || 0}
            tasks={profileData.tasks || 0}
            profileImage={profileData.profileImage || "/defaultProfilePic.png"}
          />
          <ProfileInfoCard
            firstName={profileData.first_name}
            lastName={profileData.last_name}
            email={profileData.email}
            contact={profileData.contact || "N/A"}
            role={profileData.role}
            location={profileData.location || "N/A"}
            skills={profileData.skills || []}
          />
          {/* <RecentActivityCard /> */}
          {/* <NotificationSettingsCard /> */}
        </div>

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
