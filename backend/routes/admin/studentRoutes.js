import express from 'express'
import {addStudent,studentList,deleteStudent, getStudent,updateStudent,studentCount} from '../../controllers/studentController.js'

const router =express.Router()

router.route('/addStudent').post(addStudent)
router.route('/studentlist').get(studentList)
router.route('/deletestudent/:id').delete(deleteStudent)
router.route('/studentprofile/:id').get(getStudent)
router.route('/updatestudent/:id').patch(updateStudent)
router.route('/studentcount').get(studentCount)


export default router
