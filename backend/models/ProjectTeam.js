import mongoose from 'mongoose';

const projectTeamSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  member_role: {
    type: String,
    enum: ['intern', 'tl','cos'],
    default: 'intern'
  },
  added_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ProjectTeam = mongoose.model('ProjectTeam', projectTeamSchema);
export default ProjectTeam;
