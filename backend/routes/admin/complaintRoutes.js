import express from "express";
import {protectAdmin} from "../../middleware/authMiddleware.js";
import {complaintList,allComplaints} from "../../controllers/complaintController.js";
const router =express.Router()

router.route('/complaints').get(protectAdmin,complaintList)
router.route('/allcomplaints').get(protectAdmin,allComplaints)

export default router
