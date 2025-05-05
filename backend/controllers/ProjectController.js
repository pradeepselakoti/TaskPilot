import { Project } from "../models/Project.js";
import mongoose from "mongoose";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const created_by = req.user.id;
    const {name,overview,start_date,end_date,repo_link,environment_link,tech_stack } = req.body; // {name:"Project Name", overview: "Project Overview", start_date: "2023-01-01", end_date: "2023-12-31", repo_link: "", environment_link: "", tech_stack: ["React", "Node.js"]}
    
    const project = new Project({
      name,
      overview, 
      start_date,
      end_date,
      repo_link,
      environment_link,
      tech_stack,
      created_by: new mongoose.Types.ObjectId(created_by)
    });

    await project.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};

// Get all projects (with optional filtering)
export const getProjects = async (req, res) => {
  try {
    const { created_by, discarded, search } = req.query;
    const filter = {};

    if (created_by) {
      filter.created_by = new mongoose.Types.ObjectId(created_by);
    }
    
    if (discarded !== undefined) {
      filter.discarded = discarded === 'true';
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { overview: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(filter)
      .populate('created_by', 'username email') // Adjust fields as needed
      .sort({ created_At: -1 });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message
    });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('created_by', 'username email'); // Adjust fields as needed

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message
    });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const {name,overview,start_date,end_date,repo_link,environment_link,tech_stack } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {name,
      overview,
      start_date,
      end_date,
      repo_link,
      environment_link,
      tech_stack},
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
};

// Soft delete a project (mark as discarded)
export const discardProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { discarded: true },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project discarded successfully",
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to discard project",
      error: error.message
    });
  }
};

// Permanently delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted permanently"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
};

// Get projects by tech stack
export const getProjectsByTechStack = async (req, res) => {
  try {
    const { tech } = req.params;
    const projects = await Project.find({
      tech_stack: { $in: [tech] },
      discarded: false
    }).populate('created_by', 'username email');

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects by tech stack",
      error: error.message
    });
  }
};
