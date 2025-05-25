import  ProjectTeam  from '../models/ProjectTeam.js';
export const createProjectTeam = async (req, res) => {
  try {
    const newTeam = new ProjectTeam({ project_id: req.params.id });
    const savedTeam = await newTeam.save();

    res.status(201).json({ success: true, data: savedTeam });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllProjectTeams = async (req, res) => {
  try {
    const teams = await ProjectTeam.find()
      .populate('project_id', 'name description') 
      .populate('cos_id', 'name email temp_role')            
      .populate('tl_id', 'name email temp_role')              
      .populate('intern_ids', 'name email temp_role')         
      .populate('temp_roles.user_id', 'name email temp_role'); 

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProjectTeamById = async (req, res) => {
  try {
    const team = await ProjectTeam.findById(req.params.id)
      .populate('cos_id', 'name email temp_role')
      .populate('tl_id', 'name email temp_role')
      .populate('intern_ids', 'name email temp_role')
      .populate('temp_roles.user_id', 'name email temp_role');

    if (!team) {
      return res.status(404).json({ success: false, error: 'Project Team not found' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProjectTeam = async (req, res) => {
  try {
    const { project_id, cos_id, tl_id, intern_ids, temp_roles } = req.body;
    
    const updatedTeam = await ProjectTeam.findByIdAndUpdate(
      req.params.id,
      { project_id, cos_id, tl_id, intern_ids, temp_roles },
      { new: true, runValidators: true }
    )
      .populate('project_id', 'name description')
      .populate('cos_id', 'name email temp_role')
      .populate('tl_id', 'name email temp_role')
      .populate('intern_ids', 'name email temp_role')
      .populate('temp_roles.user_id', 'name email temp_role');

    if (!updatedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Project team not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedTeam
    });
  } catch (error) {
    console.error('Error updating project team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project team',
      error: error.message
    });
  }
};

export const deleteProjectTeam = async (req, res) => {
  try {
    const deletedTeam = await ProjectTeam.findByIdAndDelete(req.params.id);
    
    if (!deletedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Project team not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project team deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project team',
      error: error.message
    });
  }
};