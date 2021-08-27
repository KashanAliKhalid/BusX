import express from 'express'
import {addStudent,studentList,deleteStudent, getStudent,updateStudent,studentCount} from '../../controllers/studentController.js'
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router =express.Router()

router.route('/data/addStudent').post(protectAdmin,addStudent)
router.route('/data/studentlist').get(protectAdmin,studentList)
router.route('/data/deletestudent/:id').delete(protectAdmin,deleteStudent)
router.route('/data/updatestudentprofile/:id').get(protectAdmin,getStudent)
router.route('/data/updatestudent/:id').patch(protectAdmin,updateStudent)
router.route('/data/studentcount').get(protectAdmin,studentCount)


export default router
