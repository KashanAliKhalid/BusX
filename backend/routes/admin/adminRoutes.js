import express from "express";

import {
    addAdmin,
    authAdmin,
    getAdminProfile,
    updateAdmin,
} from "../../controllers/adminController.js";
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router= express.Router()


router.route('/login').post(authAdmin)
router.route('/addadmin').post(addAdmin)
router.route('/profile/:id').get(protectAdmin,getAdminProfile)
router.route('/profile').get(protectAdmin,getAdminProfile)
router.route('/update/:id').patch(protectAdmin,updateAdmin)

export default router;
