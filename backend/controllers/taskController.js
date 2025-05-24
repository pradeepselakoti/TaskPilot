import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const createTask = async (req, res) => {
  try {

    const  project_id  = req.params.id; 
    const assigned_by = req.user.id;
    const { 
      assigned_to,
      title,
      description,
      status,
      start_date,
      end_date,
      verified_by
    } = req.body; //{project_id:"63f8b0e4c1a2d3b4f8c1a2d3", assigned_by:"63f8b0e4c1a2d3b4f8c1a2d3", assigned_to:"63f8b0e4c1a2d3b4f8c1a2d3", title:"Task 1", description:"Task 1 description", status:"in-progress", start_date: new Date(), end_date: new Date(), verified_by:"63f8b0e4c1a2d3b4f8c1a2d3"}

    if (!project_id || !title || !status) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newTask = new Task({
      project_id,
      assigned_by,
      assigned_to,
      title,
      description,
      status,
      start_date,
      end_date,
      verified_by
    });

    const savedTask = await newTask.save();
    return res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const listTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const skip = (page - 1) * limit;
    
    // Add project_id filter from route parameters
    const projectId = req.params.id;
    
    // Combine project_id with any other filters
    const taskFilters = { ...filters, project_id: projectId };

    const tasks = await Task.find(taskFilters)
      .populate('project_id', 'name')
      .populate('assigned_by assigned_to verified_by', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const totalTasks = await Task.countDocuments(taskFilters);
    
    return res.status(200).json({
      success: true,
      count: tasks.length,
      total: totalTasks,
      page,
      pages: Math.ceil(totalTasks / limit),
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project_id', 'name')
      .populate('assigned_by assigned_to verified_by', 'name email');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { assigned_to, title, description, status, start_date, end_date } = req.body;

  const query = {};
  if (assigned_to) query.assigned_to = assigned_to;
  if (title) query.title = title;
  if (description) query.description = description;
  if (status) query.status = status;
  if (start_date) query.start_date = start_date;
  if (end_date) query.end_date = end_date;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      query,
      { new: true, runValidators: true }
    ).populate('project_id', 'name')
     .populate('assigned_by assigned_to verified_by', 'name email');

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
