import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  project_id: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
  assigned_by: { type: mongoose.Types.ObjectId, ref: 'User' },
  assigned_to: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String , enum: ['completed', 'in-progress', 'pending'], required: true},
  start_date: { type: Date },
  end_date: { type: Date },
  verified_by: { type: mongoose.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;