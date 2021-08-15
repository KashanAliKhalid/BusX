import express from 'express'
import {addStudent,studentList,deleteStudent, getStudent,updateStudent,studentCount} from '../../controllers/studentController.js'

const router =express.Router()

router.route('/data/addStudent').post(addStudent)
router.route('/data/studentlist').get(studentList)
router.route('/data/deletestudent/:id').delete(deleteStudent)
router.route('/data/updatestudentprofile/:id').get(getStudent)
router.route('/data/updatestudent/:id').patch(updateStudent)
router.route('/data/studentcount').get(studentCount)


export default router
