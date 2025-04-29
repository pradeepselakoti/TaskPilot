import mongoose from 'mongoose';

const projectTeamSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true
  },
  cos_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  tl_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  intern_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    }
  ],
  temp_roles: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: String
    }
  ],
  added_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ProjectTeam = mongoose.model('ProjectTeam', projectTeamSchema);
export default ProjectTeam;
