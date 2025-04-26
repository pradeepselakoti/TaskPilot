// pages/Team.jsx
import TeamMember from '../Components/TeamMembers';
import MemberDetails from '../Components/MemberDetails';

function Team() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Team</h1>
      <TeamMember />
      <MemberDetails />
    </div>
  );
}

export default Team;



