import mongoose from 'mongoose';

const projectTimelineSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    unique: true,     
    index: true
  },
  overallProgress: {
    type: Number,
    default: 0       
  },
  task_updates: [
    {
      task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
        index: true     
      },
      status: {
        type: String,
        enum: ['not started', 'in progress', 'completed']
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

projectTimelineSchema.index(
  { 'task_updates.status': 1 },
  { sparse: true }
);

const ProjectTimeline = mongoose.model('ProjectTimeline', projectTimelineSchema);
export default ProjectTimeline;
