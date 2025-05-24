import ProjectAssignment from '../models/ProjectAssignment.js';

// CREATE a new project assignment
export const createProjectAssignment = async (req, res) => {
  try {
    const user_id = req.user.id;  // logged-in COS id

    const newAssignment = new ProjectAssignment({
      ...req.body,
      cos_id: [user_id]  // force cos_id to be the logged-in user
    });    const savedAssignment = await newAssignment.save();
    res.status(201).json({success:true,data:savedAssignment});
  } catch (error) {
    res.status(400).json({ success:false ,error: error.message });
  }
};

// GET all project assignments
export const getAllProjectAssignments = async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('project_id')
      .populate('cos_id')
      .populate('tl_ids')
      .populate('intern_id');
    res.status(200).json({success:true,data:assignments});
  } catch (error) {
    res.status(500).json({ success:false,error: error.message });
  }
};

// GET a single project assignment by ID
export const getProjectAssignmentById = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findById(req.params.id)
      .populate('project_id')
      .populate('cos_id')
      .populate('tl_ids')
      .populate('intern_id');

    if (!assignment) {
      return res.status(404).json({success:false, error: 'Project Assignment not found' });
    }

    res.status(200).json({success:true,data:assignment});
  } catch (error) {
    res.status(500).json({ success:false,error: error.message });
  }
};

// UPDATE a project assignment
export const updateProjectAssignmentById = async (req, res) => {
  try {
    const updatedAssignment = await ProjectAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ success:false,error: 'Project Assignment not found' });
    }

    res.status(200).json({success:true,data:updatedAssignment});
  } catch (error) {
    res.status(400).json({success:false, error: error.message });
  }
};

// DELETE a project assignment
export const deleteProjectAssignment = async (req, res) => {
  try {
    const deletedAssignment = await ProjectAssignment.findByIdAndDelete(req.params.id);

    if (!deletedAssignment) {
      return res.status(404).json({ success:false,error: 'Project Assignment not found' });
    }

    res.status(200).json({success:true, message: 'Project Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};