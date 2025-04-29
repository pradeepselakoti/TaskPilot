import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'odayuwEs3wTS/UI+y2hJOg==';

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password} = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });

    const user = new User({
      first_name,
      last_name,
      email,
      password_hash: password
    });

    const userSam = await user.save();
    const token = jwt.sign({id:userSam._id }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token);

    res.status(201).json({ success: true, data: userSam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid password' });

    const token = jwt.sign({id:user._id}, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token);

    res.json({ success: true, data: { user, token } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email} = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { first_name, last_name, email},
      { new: true }
    ).select('-password_hash');

    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};