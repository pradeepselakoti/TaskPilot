import express from 'express';
import checkRole from '../middlewares/role.js';
import { deleteTask,  getTaskById, updateTask } from '../controllers/taskController.js';
import {assignToIntern, verifyCompletion} from '../controllers/taskAssignmentController.js';
import { createUpdate, listUpdates } from '../controllers/taskUpdateController.js';


const router = express.Router();

router.route('/:id').get(getTaskById).put(checkRole(["tl","admin"]),updateTask).delete(checkRole(['admin',"tl"]),deleteTask);

router.post('/assign',checkRole("tl", "admin"),assignToIntern)
router.patch('/:id/assign/:assignment_id/verify',checkRole("tl"),verifyCompletion)
router.post('/:id/assign',checkRole(["tl","admin"]),assignToIntern)
router.patch('/:id/assign/:assignment_id/verify',checkRole(["tl","admin"]),verifyCompletion)
router.route('/:id/update').post(checkRole("intern"),createUpdate).get(listUpdates)



export default router;