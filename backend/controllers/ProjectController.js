import { Project } from "../models/Project.js";
import mongoose from "mongoose";
import { getProjectTeamSize } from "./ProjectTeamController.js";
import ProjectAssignment from '../models/ProjectAssignment.js';


// Create a new project
export const createProject = async (req, res) => {
  try {
    const created_by = req.user.id;
    const {
      name,
      overview,
      start_date,
      end_date,
      repo_link,
      environment_link,
      tech_stack,
      team_lead,
      members,
      status
    } = req.body;

    const project = new Project({
      name,
      overview,
      start_date,
      end_date,
      repo_link,
      environment_link,
      tech_stack,
      team_lead,
      members,
      status,
      created_by: new mongoose.Types.ObjectId(created_by)
    });

    await project.save();

    await ProjectAssignment.create({
      member_id: created_by,
      project_id: project._id,
      status: 'assigned'
    });

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
    const userRole = req.user.role;
    const userId = req.user.id;

    let projects = [];

    if (['admin', 'cos', 'tl'].includes(userRole)) {
      projects = await Project.find({ discarded: false }, {
        created_by: 1,
        name: 1,
        overview: 1,
        tech_stack: 1
      }).populate('created_by', 'first_name last_name').lean();
    } else {
      const assignments = await ProjectAssignment.find({
        member_id: userId,
        status: 'assigned'
      }).select('project_id');

      const assignedProjectIds = assignments.map(a => a.project_id);

      projects = await Project.find({
        _id: { $in: assignedProjectIds },
        discarded: false
      }, {
        created_by: 1,
        name: 1,
        overview: 1,
        tech_stack: 1
      }).populate('created_by', 'first_name last_name').lean();
    }

    for (const project of projects) {
      project.member_count = await getProjectTeamSize(project._id);
    }

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
      .populate('created_by', 'first_name last_name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // 👇 Fetch team size details
const teamSizeDetails = await getProjectTeamSize(project._id);

res.status(200).json({
  success: true,
  data: {
    ...project.toObject(),
    cosMember: teamSizeDetails.cos || null,  // name instead of count
    frontendTeamSize: teamSizeDetails.frontend || 0,
    backendTeamSize: teamSizeDetails.backend || 0,
    totalMembers: teamSizeDetails.total || 0
  }
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
  const {
    name,
    overview,
    start_date,
    end_date,
    repo_link,
    environment_link,
    tech_stack,
    team_lead,
    members,
    status
  } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        overview,
        start_date,
        end_date,
        repo_link,
        environment_link,
        tech_stack,
        team_lead,
        members,
        status
      },
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
    }).populate('created_by', 'first_name last_name email');

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

// Get projects by a specific userId
export const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await Project.find({
      created_by: new mongoose.Types.ObjectId(userId),
      discarded: false
    }).populate('created_by', 'first_name last_name email');

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user's projects",
      error: error.message
    });
  }
};

