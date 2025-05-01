import mongoose from "mongoose";

const roleRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to 'users' collection
    required: true
  },
  requested_role: {
    type: String,
    enum: ['pending', 'intern', 'tl', 'cos', 'admin'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // optional: status options
    default: 'pending'
  },
  requested_at: {
    type: Date,
    default: Date.now
  },
  reviewed_at: {
    type: Date
  }
});

const RoleRequest = mongoose.model('RoleRequest', roleRequestSchema);

export default RoleRequest;