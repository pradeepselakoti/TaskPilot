import express from 'express';
import checkRole from '../middlewares/role.js';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/ProjectController.js';
import { createProjectAssignment, deleteProjectAssignment, getProjectAssignmentById, getAllProjectAssignments, updateProjectAssignmentById } from '../controllers/ProjectAssignmentController.js';
import { getTimeline } from '../controllers/ProjectTimelineController.js';
import {createTask,  listTasks } from '../controllers/taskController.js';
import { createProjectTeam, deleteProjectTeam, getAllProjectTeams, getProjectTeamById, updateProjectTeam } from '../controllers/ProjectTeamController.js';


const router = express.Router();

<<<<<<< HEAD
router.route('/').post(checkRole('cos'),createProject).get(getProjects);
router.route('/:id').get(getProjectById).put(checkRole("cos"),updateProject).delete(checkRole('admin'),deleteProject);

router.route('/create-assignment').post(checkRole('cos'),createProjectAssignment).get(getAllProjectAssignments);
router.route('/assignment/:id').get(checkRole("cos"),getProjectAssignmentById).put(updateProjectAssignmentById).delete(checkRole('admin'),deleteProjectAssignment);

router.route('/:id/timeline').get(getTimeline);
router.route('/:id/tasks').post(checkRole('tl'),createTask).get(listTasks);
=======
router.route('/').post(checkRole(['cos','admin']),createProject).get(checkRole(['intern','tl','cos','admin']),getProjects);
router.route('/:id').get(checkRole(['intern','tl','cos','admin']),getProjectById).put(checkRole(['cos','admin']),updateProject).delete(checkRole('admin'),deleteProject);
router.route('/:id/timeline').get(checkRole(['intern','tl','cos','admin']),getTimeline);
router.route('/:id/tasks').post(checkRole('tl'),createTask).get(checkRole(['intern','tl','cos','admin']),listTasks);
router.route('/:project_id/team').post(checkRole('tl'),createProjectTeam)
router.route("/team/:id").get(checkRole(['intern','tl','cos','admin']),getProjectTeamById).put(checkRole(['tl','admin']),updateProjectTeam).delete(checkRole('admin'),deleteProjectTeam);
router.get('/teams', checkRole('admin'), getAllProjectTeams);
>>>>>>> 93950c7afccf1798819813a953f7c3be1f387830

export default router;