import express from 'express'
import {addStudent,studentList} from '../../controllers/studentController.js'

const router =express.Router()

router.route('/addStudent').post(addStudent)
router.route('/studentlist').get(studentList)

export default router
