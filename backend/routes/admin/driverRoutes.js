import express from "express";
import {addDriver,driverList,deleteDriver,getDriver,updateDriver,driverCount} from '../../controllers/driverController.js'
const router =express.Router()

router.route('/adddriver').post(addDriver)
router.route('/driverlist').get(driverList)
router.route('/deletedriver/:id').delete(deleteDriver)
router.route('/driverprofile/:id').get(getDriver)
router.route('/updatedriver/:id').patch(updateDriver)
router.route('/drivercount').get(driverCount)





export default router;
