import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'odayuwEs3wTS/UI+y2hJOg==';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password_hash');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {id:user.id,role:user.role}; // Attach user to request object
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default authMiddleware;