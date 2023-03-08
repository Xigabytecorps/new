/**
 * oauth_personal_access_clientsRoutes.js
 * @description :: CRUD API routes for oauth_personal_access_clients
 */

const express = require('express');
const router = express.Router();
const oauth_personal_access_clientsController = require('../../../controller/device/v1/oauth_personal_access_clientsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/oauth_personal_access_clients/create').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.addOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/list').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.findAllOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/count').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.getOauth_personal_access_clientsCount);
router.route('/device/api/v1/oauth_personal_access_clients/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.getOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.updateOauth_personal_access_clients);    
router.route('/device/api/v1/oauth_personal_access_clients/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.partialUpdateOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.softDeleteOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.softDeleteManyOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.bulkInsertOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.bulkUpdateOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.deleteOauth_personal_access_clients);
router.route('/device/api/v1/oauth_personal_access_clients/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,oauth_personal_access_clientsController.deleteManyOauth_personal_access_clients);

module.exports = router;
