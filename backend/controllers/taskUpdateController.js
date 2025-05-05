import TaskUpdate from '../models/TaskUpdate.js';
import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const createUpdate = async (req, res) => {
  try {
    const { task_id, status, message } = req.body;
    const user_id = req.user?.id;
    
    if (!task_id || !status || !['completed', 'in-progress', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }
    
    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    const taskUpdate = await TaskUpdate.create({
      task_id, user_id, status, message, updated_at: new Date()
    });
    
    await Task.findByIdAndUpdate(task_id, { status });
    
    return res.status(201).json({ success: true, data: taskUpdate });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const listUpdates = async (req, res) => {
  try {
    const { task_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const [updates, totalUpdates] = await Promise.all([
      TaskUpdate.find({ task_id })
        .populate('user_id', 'first_name last_name email')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ updated_at: -1 }),
      TaskUpdate.countDocuments({ task_id })
    ]);
    
    return res.status(200).json({
      success: true,
      count: updates.length,
      total: totalUpdates,
      page,
      pages: Math.ceil(totalUpdates / limit),
      data: updates
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserUpdates = async (req, res) => {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const [updates, totalUpdates] = await Promise.all([
      TaskUpdate.find({ user_id })
        .populate({
          path: 'task_id',
          select: 'title description project_id',
          populate: { path: 'project_id', select: 'name' }
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ updated_at: -1 }),
      TaskUpdate.countDocuments({ user_id })
    ]);
    
    return res.status(200).json({
      success: true,
      count: updates.length,
      total: totalUpdates,
      page,
      pages: Math.ceil(totalUpdates / limit),
      data: updates
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllUpdates = async (req, res) => {
  try {
    const { task_id, user_id, status, from_date, to_date } = req.query;
    const query = {};
    
    if (task_id) query.task_id = task_id;
    if (user_id) query.user_id = user_id;
    if (status) query.status = status;
    if (from_date || to_date) {
      query.updated_at = {};
      if (from_date) query.updated_at.$gte = new Date(from_date);
      if (to_date) query.updated_at.$lte = new Date(to_date);
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const [updates, totalUpdates] = await Promise.all([
      TaskUpdate.find(query)
        .populate({
          path: 'task_id',
          select: 'title description project_id',
          populate: { path: 'project_id', select: 'name' }
        })
        .populate('user_id', 'first_name last_name email')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ updated_at: -1 }),
      TaskUpdate.countDocuments(query)
    ]);
    
    return res.status(200).json({
      success: true,
      count: updates.length,
      total: totalUpdates,
      page,
      pages: Math.ceil(totalUpdates / limit),
      data: updates
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
