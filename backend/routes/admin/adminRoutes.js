import express from "express";

import {
    addAdmin,
    authAdmin,
    getAdminProfile
} from "../../controllers/adminController.js";
import {protectAdmin} from "../../middleware/authMiddleware.js";

const router= express.Router()


router.route('/login').post(authAdmin)
router.route('/addadmin').post(addAdmin)
router.route('/profile').get(protectAdmin,getAdminProfile)

export default router;
