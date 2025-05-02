import mongoose from 'mongoose';


const taskAssignmentSchema = new mongoose.Schema({
  task_id: { type: mongoose.Types.ObjectId, ref: 'Task', required: true },
  intern_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  assigned_by: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  assigned_at: { type: Date, default: Date.now },
  verified_by: { type: mongoose.Types.ObjectId, ref: 'User' },
  verified_at: { type: Date }
}, { timestamps: true });

const TaskAssignment = mongoose.model('TaskAssignment', taskAssignmentSchema);

export default TaskAssignment; 