import express from "express";
import {addMaintenance,deleteMaintenance,getMaintenance,maintenanceList} from "../../controllers/maintenanceController.js";
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router =express.Router()

router.route('/maintenance/:id').post(protectAdmin,addMaintenance)
router.route('/maintenance/:id').get(protectAdmin,getMaintenance).delete(protectAdmin,deleteMaintenance)
router.route('/maintenancelist/:id').get(protectAdmin,maintenanceList)

export default router;
