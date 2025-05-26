import { Project } from '../models/Project.js';
import ProjectTeam from '../models/ProjectTeam.js';
import user from '../models/user.js';

// Create a new project team
export const createProjectTeam = async (req, res) => {
  try {
    const { member_id } = req.body;

    if (!member_id) {
      return res.status(400).json({ success: false, message: 'Member ID is required' });
    }

    // Check if the project exists
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if the member already exists in the project team
    const existingMember = await ProjectTeam.findOne({ project_id: req.params.id, member_id });
    if (existingMember) {
      return res.status(400).json({ success: false, message: 'Member already exists in the project team' });
    }

    const member_role =await user.findById(member_id).then(user => {
      if (!user) {
        throw new Error('User not found');
      }

      if (user.role === 'pending' ) {
        throw new Error('User cannot be added to the project team');
      }
      return user.role; 
    })

    const newTeam = new ProjectTeam({ project_id: req.params.id, member_id, member_role });
    const savedTeam = await newTeam.save();
    if (!savedTeam) {
      throw new Error('Failed to create project team');
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
      .populate('member_id', 'first_name last_name role');
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
    const teamSize = await ProjectTeam.countDocuments({ project_id });
    return teamSize ? teamSize  : 0;
  } catch (error) {
    return { success: false, error: error.message };
  }
}
