import mongoose from 'mongoose';


const taskUpdateSchema = new mongoose.Schema({
  task_id: { type: mongoose.Types.ObjectId, ref: 'Task', required: true },
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  status: { type: String , enum: ['completed', 'in-progress', 'pending'], required: true},
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const TaskUpdate = mongoose.model('TaskUpdate', taskUpdateSchema);

export default TaskUpdate;