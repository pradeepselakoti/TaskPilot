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
    const query = {};

    if(req.body.project_id){
      query.project_id = req.body.project_id;
    }
    const assignments = await ProjectAssignment.find(query);
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

    let assignment = await ProjectAssignment.findOne({
      project_id,
      member_id
    });

    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found or not assigned.' });
    }

    switch (status) {
      case 'assigned':
      // Add to ProjectTeam and update assignment status
      const newProjectTeam = new ProjectTeam({
        project_id,
        member_id
      });
      await newProjectTeam.save();
      assignment = await ProjectAssignment.updateOne(
        { _id: assignment._id },
        { status: 'assigned' },
        { new: true }
      );
      break;
      case 'rejected':
      // Update assignment status to rejected
      assignment = await ProjectAssignment.updateOne(
        { _id: assignment._id },
        { status: 'rejected' },
        { new: true }
      );
      break;
    }

    res.status(200).json({ success: true, data: { verified: true, assignment } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
