/**
 * email_verificationsRoutes.js
 * @description :: CRUD API routes for email_verifications
 */

const express = require('express');
const router = express.Router();
const email_verificationsController = require('../../controller/admin/email_verificationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/email_verifications/create').post(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.addEmail_verifications);
router.route('/admin/email_verifications/list').post(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.findAllEmail_verifications);
router.route('/admin/email_verifications/count').post(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.getEmail_verificationsCount);
router.route('/admin/email_verifications/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.getEmail_verifications);
router.route('/admin/email_verifications/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.updateEmail_verifications);    
router.route('/admin/email_verifications/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.partialUpdateEmail_verifications);
router.route('/admin/email_verifications/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.softDeleteEmail_verifications);
router.route('/admin/email_verifications/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.softDeleteManyEmail_verifications);
router.route('/admin/email_verifications/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.bulkInsertEmail_verifications);
router.route('/admin/email_verifications/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.bulkUpdateEmail_verifications);
router.route('/admin/email_verifications/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.deleteEmail_verifications);
router.route('/admin/email_verifications/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,email_verificationsController.deleteManyEmail_verifications);

module.exports = router;
