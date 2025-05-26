import ProjectAssignment from '../models/ProjectAssignment.js';
import ProjectTeam from '../models/ProjectTeam.js';

// Controller to create a new project assignment request
export const ProjectAssignmentRequest = async (req, res) => {
  try {
    const { project_id } = req.body;
    const member_id = req.user.id;

    // Check if assignment already exists
    const existing = await ProjectAssignment.findOne({ project_id, member_id });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Assignment already exists.' });
    }

    const assignment = new ProjectAssignment({
      project_id,
      member_id,
    });

    const savedAssignment = await assignment.save();
    res.status(201).json({ success: true, data: savedAssignment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to list all project assignments
export const listAllProjectAssignment = async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('project_id')
      .populate('member_id');
    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to verify a project assignment (used as a verification point before adding to ProjectTeam)
export const verifyProjectAssignment = async (req, res) => {
  try {
    const { project_id, member_id, status } = req.body;

    // Validate input
    if (!project_id || !member_id) {
      return res.status(400).json({ success: false, error: 'Project ID and Member ID are required.' });
    }

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }
    const validStatuses = ['rejected', 'pending', 'assigned'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status provided.' });
    }

    const assignment = await ProjectAssignment.findOne({
      project_id,
      member_id,
      status
    });

    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found or not assigned.' });
    }

    const NewProjectTeam = new ProjectTeam({
      project_id,
      member_id,
    });

    if (assignment.status === 'assigned') {
      await NewProjectTeam.save();
    }

    res.status(200).json({ success: true, data: { verified: true, assignment } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
