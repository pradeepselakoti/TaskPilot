import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// JWT Secret Key (for demo, use .env in real apps)
const JWT_SECRET = 'your_jwt_secret_key_here';

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const user = new User({
      first_name,
      last_name,
      email,
      password_hash: password,
      role
    });

    await user.save();

    res.status(201).json({ msg: 'User registered', user_id: user._id });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ msg: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export  const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password_hash');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

