import {addRoute} from "../../controllers/routeController.js";
import {protectAdmin} from "../../middleware/authMiddleware.js";
import express from "express";

const router= express.Router()

router.route('/route').post(protectAdmin,addRoute)

export default router;
