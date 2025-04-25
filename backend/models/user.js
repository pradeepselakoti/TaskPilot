import mongoose  from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  profile_pic: { type: String },
  timezone: { type: String },
  github_id: { type: String },
  department: { type: String },
  location: { type: String },
  tech_stack: [{ type: String }],
  destination: { type: String },
  temp_role: { type: String },
  role: {
    type: String,
    enum: ['pending', 'intern', 'tl', 'cos', 'admin'],
    required: true,
    default: 'pending'
  },
  profile_completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  role_assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role_assigned_at: { type: Date }
});

// 🔐 Auto-hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password_hash')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Optional: Password compare method for login
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password_hash);
};

userSchema.index({ role: 1 });

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema); // ✅ ESM default export