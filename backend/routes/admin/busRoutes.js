import express from "express";
import {addBus,busList,deleteBus,getBus,updateBus,busCount} from '../../controllers/busController.js'
import {protectAdmin} from "../../middleware/authMiddleware.js";


const router =express.Router()

router.route('/data/addbus').post(protectAdmin,addBus)
router.route('/data/buslist').get(protectAdmin,busList)
router.route('/data/deletebus/:id').delete(protectAdmin,deleteBus)
router.route('/data/updatebusprofile/:id').get(protectAdmin,getBus)
router.route('/data/updatebus/:id').patch(protectAdmin,updateBus)
router.route('/data/buscount').get(protectAdmin,busCount)
router.route('/assets').get(protectAdmin,busList)
router.route('/busdetails/:id').get(protectAdmin,getBus)


export default router
