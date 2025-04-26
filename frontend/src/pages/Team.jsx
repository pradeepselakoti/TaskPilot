// pages/Team.jsx
import TeamMember from '../components/TeamMember';
import MemberDetails from '../components/MemberDetails';

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
