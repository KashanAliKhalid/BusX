import express from "express";

import {
    authSuperAdmin,addSuperAdmin
} from "../../controllers/superadmin/superAdminController.js";

import {protectSuperAdmin} from "../../middleware/authMiddleware.js";

const router= express.Router()

router.route('/addsuperadmin').post(addSuperAdmin)
router.route('/login').post(authSuperAdmin)

export default router
