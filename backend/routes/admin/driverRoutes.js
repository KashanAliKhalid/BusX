import express from "express";
import {addDriver,driverList,deleteDriver,getDriver,updateDriver,driverCount} from '../../controllers/driverController.js'
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router =express.Router()

router.route('/data/adddriver').post(protectAdmin,addDriver)
router.route('/data/driverlist').get(protectAdmin,driverList)
router.route('/data/deletedriver/:id').delete(protectAdmin,deleteDriver)
router.route('/data/updatedriverprofile/:id').get(protectAdmin,getDriver)
router.route('/data/updatedriver/:id').patch(protectAdmin,updateDriver)
router.route('/data/drivercount').get(protectAdmin,driverCount)





export default router;
