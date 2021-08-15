import express from "express";
import {addDriver,driverList,deleteDriver,getDriver,updateDriver,driverCount} from '../../controllers/driverController.js'
const router =express.Router()

router.route('/data/adddriver').post(addDriver)
router.route('/data/driverlist').get(driverList)
router.route('/data/deletedriver/:id').delete(deleteDriver)
router.route('/data/updatedriverprofile/:id').get(getDriver)
router.route('/data/updatedriver/:id').patch(updateDriver)
router.route('/data/drivercount').get(driverCount)





export default router;
