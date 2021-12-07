import express from "express"
import {protectSuperAdmin} from "../../middleware/authMiddleware.js";
import{
    addAdmin,
    updateAdmin,
    deleteAdmin,
    adminList,
    getAdmin,
    adminCount

} from "../../controllers/superadmin/adminController.js";
const router= express.Router()

router.route('/admin').post(protectSuperAdmin,addAdmin).get(protectSuperAdmin,adminCount)
router.route('/admins').get(protectSuperAdmin,adminList)
router.route('/admin/:id').get(protectSuperAdmin,getAdmin).delete(protectSuperAdmin,deleteAdmin).patch(protectSuperAdmin,updateAdmin)

export default router
