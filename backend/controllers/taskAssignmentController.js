import TaskAssignment from '../models/TaskAssignment.js';
import Task from '../models/Task.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const assignToIntern = async (req, res) => {
  try {
    
    const { task_id, intern_id } = req.body;
    const assigned_by = req.user?.id;

    if (!task_id || !intern_id || !mongoose.Types.ObjectId.isValid(task_id) || !mongoose.Types.ObjectId.isValid(intern_id)) {
      return res.status(400).json({ success: false, message: 'Invalid task or intern ID' });
    }

    const [task, intern, existingAssignment] = await Promise.all([
      Task.findById(task_id),
      User.findById(intern_id),
      TaskAssignment.findOne({ task_id, intern_id, verified_by: { $exists: false } })
    ]);

    if (!task || !intern || intern.role !== 'intern' || existingAssignment) {
      return res.status(400).json({ success: false, message: 'Invalid assignment request' });
    }

    const taskAssignment = new TaskAssignment({
      task_id, intern_id, assigned_by, assigned_at: new Date()
    });

    const [savedAssignment] = await Promise.all([
      taskAssignment.save(),
      Task.findByIdAndUpdate(task_id, { assigned_to: intern_id, status: 'in-progress' })
    ]);

    return res.status(201).json({ success: true, data: savedAssignment });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyCompletion = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const verified_by = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(assignment_id)) {
      return res.status(400).json({ success: false, message: 'Invalid assignment ID' });
    }

    const taskAssignment = await TaskAssignment.findById(assignment_id);
    if (!taskAssignment || taskAssignment.verified_by) {
      return res.status(400).json({ success: false, message: 'Invalid or already verified assignment' });
    }

    taskAssignment.verified_by = verified_by;
    taskAssignment.verified_at = new Date();

    const [updatedAssignment] = await Promise.all([
      taskAssignment.save(),
      Task.findByIdAndUpdate(taskAssignment.task_id, { verified_by, status: 'completed' })
    ]);

    return res.status(200).json({ success: true, data: updatedAssignment });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getInternAssignments = async (req, res) => {
  try {
    const { intern_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!mongoose.Types.ObjectId.isValid(intern_id)) {
      return res.status(400).json({ success: false, message: 'Invalid intern ID' });
    }

    const [assignments, totalAssignments] = await Promise.all([
      TaskAssignment.find({ intern_id })
        .populate('task_id', 'title description status start_date end_date')
        .populate('assigned_by', 'first_name last_name email')
        .populate('verified_by', 'first_name last_name email')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ assigned_at: -1 }),
      TaskAssignment.countDocuments({ intern_id })
    ]);

    return res.status(200).json({
      success: true,
      count: assignments.length,
      total: totalAssignments,
      page,
      pages: Math.ceil(totalAssignments / limit),
      data: assignments
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const listTaskAssignments = async (req, res) => {
  try {
    const { task_id, intern_id, assigned_by, verified_by, verified } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const query = {};
    
    if (task_id && mongoose.Types.ObjectId.isValid(task_id)) query.task_id = task_id;
    if (intern_id && mongoose.Types.ObjectId.isValid(intern_id)) query.intern_id = intern_id;
    if (assigned_by && mongoose.Types.ObjectId.isValid(assigned_by)) query.assigned_by = assigned_by;
    if (verified_by && mongoose.Types.ObjectId.isValid(verified_by)) query.verified_by = verified_by;
    if (verified === 'true') query.verified_by = { $exists: true, $ne: null };
    if (verified === 'false') query.verified_by = { $exists: false };

    const [assignments, totalAssignments] = await Promise.all([
      TaskAssignment.find(query)
        .populate('task_id', 'title description status start_date end_date')
        .populate('intern_id', 'first_name last_name email')
        .populate('assigned_by', 'first_name last_name email')
        .populate('verified_by', 'first_name last_name email')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ assigned_at: -1 }),
      TaskAssignment.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      count: assignments.length,
      total: totalAssignments,
      page,
      pages: Math.ceil(totalAssignments / limit),
      data: assignments
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
