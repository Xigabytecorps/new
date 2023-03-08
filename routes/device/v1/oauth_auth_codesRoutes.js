/**
 * oauth_auth_codesRoutes.js
 * @description :: CRUD API routes for oauth_auth_codes
 */

const express = require('express');
const router = express.Router();
const oauth_auth_codesController = require('../../../controller/device/v1/oauth_auth_codesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/oauth_auth_codes/create').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.addOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/list').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.findAllOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/count').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.getOauth_auth_codesCount);
router.route('/device/api/v1/oauth_auth_codes/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.getOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.updateOauth_auth_codes);    
router.route('/device/api/v1/oauth_auth_codes/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.partialUpdateOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.softDeleteOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.softDeleteManyOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.bulkInsertOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.bulkUpdateOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.deleteOauth_auth_codes);
router.route('/device/api/v1/oauth_auth_codes/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_auth_codesController.deleteManyOauth_auth_codes);

module.exports = router;
