/**
 * soft_credentialsRoutes.js
 * @description :: CRUD API routes for soft_credentials
 */

const express = require('express');
const router = express.Router();
const soft_credentialsController = require('../../controller/admin/soft_credentialsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/soft_credentials/create').post(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.addSoft_credentials);
router.route('/admin/soft_credentials/list').post(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.findAllSoft_credentials);
router.route('/admin/soft_credentials/count').post(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.getSoft_credentialsCount);
router.route('/admin/soft_credentials/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.getSoft_credentials);
router.route('/admin/soft_credentials/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.updateSoft_credentials);    
router.route('/admin/soft_credentials/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.partialUpdateSoft_credentials);
router.route('/admin/soft_credentials/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.softDeleteSoft_credentials);
router.route('/admin/soft_credentials/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.softDeleteManySoft_credentials);
router.route('/admin/soft_credentials/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.bulkInsertSoft_credentials);
router.route('/admin/soft_credentials/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.bulkUpdateSoft_credentials);
router.route('/admin/soft_credentials/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.deleteSoft_credentials);
router.route('/admin/soft_credentials/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,soft_credentialsController.deleteManySoft_credentials);

module.exports = router;
