import express from 'express';
import checkRole from '../middlewares/role.js';
import mongoose from 'mongoose';
import{ Project} from '../models/Project.js';

import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/ProjectController.js';
import { getTimeline } from '../controllers/ProjectTimelineController.js';
import { createTask, listTasks } from '../controllers/taskController.js';
import { createProjectTeam, deleteProjectTeam, getAllProjectTeams, getProjectTeamById, updateProjectTeam } from '../controllers/ProjectTeamController.js';
import { listAllProjectAssignment, ProjectAssignmentRequest, verifyProjectAssignment } from '../controllers/ProjectAssignmentController.js';
import { getProjectsByUser  } from '../controllers/ProjectController.js';
import ProjectAssignment from '../models/ProjectAssignment.js';

import user from '../models/user.js';

const router = express.Router();

router.route('/')
  .post(checkRole(['cos','admin' ,]), createProject)
  .get( getProjects);

router.route('/:id')
  .get(checkRole(['intern','tl','cos','admin']), getProjectById)
  .put(checkRole(['cos','admin']), updateProject)
  .delete(checkRole('admin'), deleteProject);

router.route('/:id/timeline')
  .get(checkRole(['intern','tl','cos','admin']), getTimeline);

router.route('/:id/tasks')
  .post(checkRole(['tl', 'admin' , 'intern']), createTask)
  .get(checkRole(['intern','tl','cos','admin']), listTasks);


router.get('/team/all', checkRole('admin'), getAllProjectTeams);  

router.route("/team/:id")
  .post(checkRole(['tl','cos', 'admin']), createProjectTeam)
  .get(checkRole(['intern','tl','cos','admin']), getProjectTeamById)
  .put(checkRole(['tl','admin']), updateProjectTeam)
  .delete(checkRole('admin'), deleteProjectTeam);


router.post('/assign/request', checkRole(['intern','tl','cos',"admin"]), ProjectAssignmentRequest);
router.get('/assign/all', checkRole(['intern','tl','cos','admin']), listAllProjectAssignment);
router.get('/users', async (req, res) => {
  try {
    const users = await user.find(
      { role: { $ne: 'pending' } }, // Exclude 'pending' users
      'first_name last_name role'   // Return only these fields
    );
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

router.put('/assign/verify', checkRole(['tl','cos','admin']), verifyProjectAssignment);

router.get('/user/:userId', getProjectsByUser); 

router.get('/assigned/:userId', async (req, res) => {
  
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const assignments = await ProjectAssignment.find({
      member_id: userId,
      status: "assigned"
    });

    const projectIds = assignments
      .map(a => a.project_id)
      .filter(id => id != null);

    const projects = await Project.find({
      _id: { $in: projectIds },
      discarded: false,
    });

    

    res.status(200).json({ data: projects });
  } catch (error) {
    console.error("Error fetching assigned projects:", error);
    res.status(500).json({ message: 'Failed to fetch assigned projects' });
  }
});




  
export default router;