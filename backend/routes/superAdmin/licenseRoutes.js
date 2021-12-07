import express from "express";

import {
    addLicense,
    deleteLicense,
    allLicenses,
    updateLicense,
    getLicense,
    licenseCount,
    licenseList
} from "../../controllers/superadmin/licenseController.js";

import {protectSuperAdmin} from "../../middleware/authMiddleware.js";

const router= express.Router()

router.route('/license').post(protectSuperAdmin,addLicense).get(protectSuperAdmin,licenseCount)
router.route('/licenses').get(protectSuperAdmin,licenseList)
router.route('/license/:id').get(protectSuperAdmin,getLicense).delete(protectSuperAdmin,deleteLicense).patch(protectSuperAdmin,updateLicense)
router.route('/alllicenses').get(protectSuperAdmin,allLicenses)

export default router
