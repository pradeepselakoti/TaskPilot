import { Project } from '../models/Project.js';
import ProjectTeam from '../models/ProjectTeam.js';
import user from '../models/user.js';
import ProjectAssignment from '../models/ProjectAssignment.js';

// Create a new project team
export const createProjectTeam = async (req, res) => {
  try {
    const { member_id, member_role } = req.body;

    if (!member_id || !member_role) {
      return res.status(400).json({ success: false, message: 'Member ID and Role are required' });
    }

    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const existingMember = await ProjectTeam.findOne({ project_id: req.params.id, member_id });
    if (existingMember) {
      return res.status(400).json({ success: false, message: 'Member already exists in the project team' });
    }

    const newTeam = new ProjectTeam({
      project_id: req.params.id,
      member_id,
      member_role
    });

    const savedTeam = await newTeam.save();
if (!savedTeam) throw new Error('Failed to create project team');
// After saving newTeam
const assignmentExists = await ProjectAssignment.findOne({
  project_id: req.params.id,
  member_id,
});
if (!assignmentExists) {
  await ProjectAssignment.create({
    project_id: req.params.id,
    member_id,
    status: 'assigned',
    assigned_at: new Date(),
  });
}

    await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { team: savedTeam._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: savedTeam });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Get all project teams
export const getAllProjectTeams = async (req, res) => {
  try {
    const teams = await ProjectTeam.find()
      .populate('project_id', 'name overview')
      .populate('member_id', 'first_name last_name role');
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a project team by ID
export const getProjectTeamById = async (req, res) => {
  try {
    const team = await ProjectTeam.find({project_id:req.params.id})
      .populate('project_id', 'name overview')
      .populate('member_id', 'first_name last_name  email contact github_id skills destination profile_pic')
      
      
    if (!team) {
      return res.status(404).json({ success: false, error: 'Project Team not found' });
    }
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a project team
export const updateProjectTeam = async (req, res) => {
  try {
    const { member_id } = req.body;

    const member_role =await user.findById(member_id).then(user => {
      if (!user) {
        throw new Error('User not found');
      }

      if (user.role === 'pending') {
        throw new Error('User cannot be added to the project team');
      }
      return user.role; // Assuming role is a field in the User model
    })

    const updatedTeam = await ProjectTeam.findOneAndUpdate(
      { project_id: req.params.id , member_id},
      { member_role },
      { new: true, runValidators: true }
    )
      .populate('project_id', 'name overview')
      .populate('member_id', 'first_name last_name role');
    if (!updatedTeam) {
      return res.status(404).json({ success: false, message: 'Project team not found' });
    }
    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project team member', error: error.message });
  }
};

// Delete a project team
export const deleteProjectTeam = async (req, res) => {
  try {
    const { member_id } = req.body;

    const deletedTeam = await ProjectTeam.findOneAndDelete({ project_id: req.params.id, member_id });
    if (!deletedTeam) {
      return res.status(404).json({ success: false, message: 'Project team not found' });
    }
    res.status(200).json({ success: true, message: 'Project team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project team member', error: error.message });
  }
};

//get project team size

export const getProjectTeamSize = async (project_id) => {
  try {
    const members = await ProjectTeam.find({ project_id }).populate('member_id', 'first_name last_name role');

    let teamStats = {
      cos: null, // Will hold full name
      frontend: 0,
      backend: 0,
      tl: 0,
      intern: 0,
      total: members.length
    };

    members.forEach((member) => {
      const role = member.member_role || member.member_id?.role;
      const fullName = `${member.member_id?.first_name || ''} ${member.member_id?.last_name || ''}`.trim();

      if (role === 'cos' && !teamStats.cos) teamStats.cos = fullName;
      else if (role === 'frontend') teamStats.frontend += 1;
      else if (role === 'backend') teamStats.backend += 1;
      else if (role === 'tl') teamStats.tl += 1;
      else if (role === 'intern') teamStats.intern += 1;
    });

    return teamStats;
  } catch (error) {
    return {
      cos: null,
      frontend: 0,
      backend: 0,
      tl: 0,
      intern: 0,
      total: 0
    };
  }
};

