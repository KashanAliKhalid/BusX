import {addRoute,deleteRoute,routeList,updateRoute,getRoute,routeCount,allRoutes} from "../../controllers/routeController.js";
import {protectAdmin} from "../../middleware/authMiddleware.js";
import express from "express";

const router= express.Router()

router.route('/route').post(protectAdmin,addRoute).get(protectAdmin,routeCount)
router.route('/routes').get(protectAdmin,routeList)
router.route('/route/:id').delete(protectAdmin,deleteRoute).get(protectAdmin,getRoute).patch(protectAdmin,updateRoute)
router.route('/allroutes').get(protectAdmin,allRoutes)





export default router;
