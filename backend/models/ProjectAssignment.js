import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
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
  tl_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true 
    }
  ],
  intern_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  accepted: {
    type: Boolean,
    default: false
  },
  assigned_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);
export default ProjectAssignment;
