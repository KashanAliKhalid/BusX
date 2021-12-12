import express from "express";
import {protectAdmin} from "../../middleware/authMiddleware.js";
import {getFuel} from "../../controllers/fuelController.js";
const router =express.Router()

router.route('/fuel').post(getFuel)

export default router
