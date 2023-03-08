/**
 * soft_credentialsRoutes.js
 * @description :: CRUD API routes for soft_credentials
 */

const express = require('express');
const router = express.Router();
const soft_credentialsController = require('../../../controller/device/v1/soft_credentialsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/soft_credentials/create').post(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.addSoft_credentials);
router.route('/device/api/v1/soft_credentials/list').post(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.findAllSoft_credentials);
router.route('/device/api/v1/soft_credentials/count').post(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.getSoft_credentialsCount);
router.route('/device/api/v1/soft_credentials/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.getSoft_credentials);
router.route('/device/api/v1/soft_credentials/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.updateSoft_credentials);    
router.route('/device/api/v1/soft_credentials/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.partialUpdateSoft_credentials);
router.route('/device/api/v1/soft_credentials/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.softDeleteSoft_credentials);
router.route('/device/api/v1/soft_credentials/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.softDeleteManySoft_credentials);
router.route('/device/api/v1/soft_credentials/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.bulkInsertSoft_credentials);
router.route('/device/api/v1/soft_credentials/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.bulkUpdateSoft_credentials);
router.route('/device/api/v1/soft_credentials/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.deleteSoft_credentials);
router.route('/device/api/v1/soft_credentials/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,soft_credentialsController.deleteManySoft_credentials);

module.exports = router;
