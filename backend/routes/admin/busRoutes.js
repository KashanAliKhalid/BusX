import express from "express";
import {addBus,busList,deleteBus,getBus} from '../../controllers/busController.js'

const router =express.Router()

router.route('/addbus').post(addBus)
router.route('/buslist').get(busList)
router.route('/deletebus/:id').delete(deleteBus)
router.route('/busprofile/:id').get(getBus)


export default router
