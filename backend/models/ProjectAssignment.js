import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
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
  status:{
    type: String,
    enum: ['rejected', 'pending', 'assigned'],
    default: 'pending'
  },
  assigned_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);
export default ProjectAssignment;
