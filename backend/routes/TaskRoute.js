import express from 'express';
import checkRole from '../middlewares/role.js';
import { deleteTask,  getTaskById, updateTask } from '../controllers/taskController.js';
import {assignToIntern, verifyCompletion} from '../controllers/taskAssignmentController.js';
import { createUpdate, listUpdates } from '../controllers/taskUpdateController.js';


const router = express.Router();

router.route('/:id').get(getTaskById).put(checkRole(["tl","admin"]),updateTask).delete(checkRole(['admin',"tl"]),deleteTask);

<<<<<<< HEAD
router.post('/assign',checkRole("tl"),assignToIntern)
router.patch('/:id/assign/:assignment_id/verify',checkRole("tl"),verifyCompletion)
=======
router.post('/:id/assign',checkRole(["tl","admin"]),assignToIntern)
router.patch('/:id/assign/:assignment_id/verify',checkRole(["tl","admin"]),verifyCompletion)
>>>>>>> 93950c7afccf1798819813a953f7c3be1f387830
router.route('/:id/update').post(checkRole("intern"),createUpdate).get(listUpdates)



export default router;