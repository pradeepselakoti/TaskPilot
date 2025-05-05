import RoleRequest from '../models/RoleRequests.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const createRequest = async (req, res) => {
  try {
    const { requested_role } = req.body;
    const user_id = req.user.id;
    
    const user = await User.findById(user_id);
    if (!user || user.role === requested_role) {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }
    
    const existingRequest = await RoleRequest.findOne({ user_id, status: 'pending' });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'Pending request exists' });
    }
    
    const roleRequest = new RoleRequest({
      user_id, requested_role, status: 'pending', requested_at: new Date()
    });
    
    const savedRequest = await roleRequest.save();
    return res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const listRequests = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status, requested_role, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (user_id && mongoose.Types.ObjectId.isValid(user_id)) query.user_id = user_id;
    if (status && ['pending', 'approved', 'rejected'].includes(status)) query.status = status;
    if (requested_role) query.requested_role = requested_role;
    
    const requests = await RoleRequest.find(query)
      .populate('user_id', 'first_name last_name email')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ requested_at: -1 });
    
    const totalRequests = await RoleRequest.countDocuments(query);
    
    return res.status(200).json({
      success: true,
      count: requests.length,
      total: totalRequests,
      page,
      pages: Math.ceil(totalRequests / limit),
      data: requests
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { action } = req.body;
    
    const roleRequest = await RoleRequest.findById(request_id);
    if (!roleRequest || roleRequest.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }
    
    roleRequest.status = action === 'approve' ? 'approved' : 'rejected';
    roleRequest.reviewed_at = new Date();
    const updatedRequest = await roleRequest.save();
    
    if (action === 'approve') {
      await User.findByIdAndUpdate(roleRequest.user_id, { role: roleRequest.requested_role });
    }
    
    return res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const user_id = req.user?.id;
    
    const requests = await RoleRequest.find({ user_id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ requested_at: -1 });
    
    const totalRequests = await RoleRequest.countDocuments({ user_id });
    
    return res.status(200).json({
      success: true,
      count: requests.length,
      total: totalRequests,
      page,
      pages: Math.ceil(totalRequests / limit),
      data: requests
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getPendingRequestsCount = async (req, res) => {
  try {
    const pendingCount = await RoleRequest.countDocuments({ status: 'pending' });
    return res.status(200).json({ success: true, pending_requests: pendingCount });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
