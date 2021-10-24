import express from "express";
import {addDriver,driverList,deleteDriver,getDriver,updateDriver,driverCount,allDrivers} from '../../controllers/driverController.js'
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router =express.Router()

router.route('/data/driver').post(protectAdmin,addDriver)
router.route('/data/driverlist').get(protectAdmin,driverList)
router.route('/data/driver/:id').delete(protectAdmin,deleteDriver).get(protectAdmin,getDriver).patch(protectAdmin,updateDriver)
router.route('/data/drivercount').get(protectAdmin,driverCount)
router.route('/data/alldrivers').get(protectAdmin,allDrivers)





export default router;
