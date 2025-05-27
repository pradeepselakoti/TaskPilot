import express from 'express';
import checkRole from '../middlewares/role.js';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/ProjectController.js';
import { getTimeline } from '../controllers/ProjectTimelineController.js';
import { createTask, listTasks } from '../controllers/taskController.js';
import { createProjectTeam, deleteProjectTeam, getAllProjectTeams, getProjectTeamById, updateProjectTeam } from '../controllers/ProjectTeamController.js';
import { listAllProjectAssignment, ProjectAssignmentRequest, verifyProjectAssignment } from '../controllers/ProjectAssignmentController.js';

const router = express.Router();

router.route('/')
  .post(checkRole(['cos','admin']), createProject)
  .get(checkRole(['intern','tl','cos','admin']), getProjects);

router.route('/:id')
  .get(checkRole(['intern','tl','cos','admin']), getProjectById)
  .put(checkRole(['cos','admin']), updateProject)
  .delete(checkRole('admin'), deleteProject);

router.route('/:id/timeline')
  .get(checkRole(['intern','tl','cos','admin']), getTimeline);

router.route('/:id/tasks')
  .post(checkRole('tl'), createTask)
  .get(checkRole(['intern','tl','cos','admin']), listTasks);


router.get('/team/all', checkRole('admin'), getAllProjectTeams);  

router.route("/team/:id")
  .post(checkRole(['tl','cos', 'admin']), createProjectTeam)
  .get(checkRole(['intern','tl','cos','admin']), getProjectTeamById)
  .put(checkRole(['tl','admin']), updateProjectTeam)
  .delete(checkRole('admin'), deleteProjectTeam);


router.post('/assign/request', checkRole(['intern','tl','cos',"admin"]), ProjectAssignmentRequest);
router.get('/assign/all', checkRole(['intern','tl','cos','admin']), listAllProjectAssignment);
router.put('/assign/verify', checkRole(['tl','cos','admin']), verifyProjectAssignment);
  
export default router;