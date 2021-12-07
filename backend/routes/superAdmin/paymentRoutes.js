import express from "express";
import {
    addPayment,
    deletePayment,
    paymentList,
    getPayment,
    updatePayment
} from '../../controllers/superadmin/paymentController.js'

import {protectSuperAdmin} from "../../middleware/authMiddleware.js";

const router= express.Router()

router.route('/payment').post(protectSuperAdmin,addPayment)
router.route('/payments').get(protectSuperAdmin,paymentList)
router.route('/payment/:id').get(protectSuperAdmin,getPayment).delete(protectSuperAdmin,deletePayment).patch(protectSuperAdmin,updatePayment)

export default router
