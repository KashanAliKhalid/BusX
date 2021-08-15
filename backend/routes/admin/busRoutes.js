import express from "express";
import {addBus,busList,deleteBus,getBus,updateBus,busCount} from '../../controllers/busController.js'

const router =express.Router()

router.route('/data/addbus').post(addBus)
router.route('/data/buslist').get(busList)
router.route('/data/deletebus/:id').delete(deleteBus)
router.route('/data/updatebusprofile/:id').get(getBus)
router.route('/data/updatebus/:id').patch(updateBus)
router.route('/data/buscount').get(busCount)
router.route('/assets').get(busList)
router.route('/busdetails/:id').get(getBus)


export default router
