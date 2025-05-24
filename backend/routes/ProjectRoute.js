import express from 'express';
import checkRole from '../middlewares/role.js';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/ProjectController.js';
import { createProjectAssignment, deleteProjectAssignment, getProjectAssignmentById, getAllProjectAssignments, updateProjectAssignmentById } from '../controllers/ProjectAssignmentController.js';
import { getTimeline } from '../controllers/ProjectTimelineController.js';
import {createTask,  listTasks } from '../controllers/taskController.js';


const router = express.Router();

router.route('/').post(checkRole('cos'),createProject).get(getProjects);
router.route('/:id').get(getProjectById).put(checkRole("cos"),updateProject).delete(checkRole('admin'),deleteProject);

router.route('/create-assignment').post(checkRole('cos'),createProjectAssignment).get(getAllProjectAssignments);
router.route('/assignment/:id').get(checkRole("cos"),getProjectAssignmentById).put(updateProjectAssignmentById).delete(checkRole('admin'),deleteProjectAssignment);

router.route('/:id/timeline').get(getTimeline);
router.route('/:id/tasks').post(checkRole('tl'),createTask).get(listTasks);

export default router;