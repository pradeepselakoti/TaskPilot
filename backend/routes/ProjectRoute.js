import express from 'express';
import checkRole from '../middlewares/role.js';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/ProjectController.js';
import { getTimeline } from '../controllers/ProjectTimelineController.js';
import {createTask,  listTasks } from '../controllers/taskController.js';


const router = express.Router();

router.route('/').post(checkRole('cos'),createProject).get(getProjects);
router.route('/:id').get(getProjectById).put(checkRole("cos"),updateProject).delete(checkRole('admin'),deleteProject);
router.route('/:id/timeline').get(getTimeline);
router.route('/:id/tasks').post(checkRole('tl'),createTask).get(listTasks);


export default router;