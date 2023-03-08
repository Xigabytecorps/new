/**
 * oauth_clientsRoutes.js
 * @description :: CRUD API routes for oauth_clients
 */

const express = require('express');
const router = express.Router();
const oauth_clientsController = require('../../controller/admin/oauth_clientsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/oauth_clients/create').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.addOauth_clients);
router.route('/admin/oauth_clients/list').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.findAllOauth_clients);
router.route('/admin/oauth_clients/count').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.getOauth_clientsCount);
router.route('/admin/oauth_clients/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.getOauth_clients);
router.route('/admin/oauth_clients/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.updateOauth_clients);    
router.route('/admin/oauth_clients/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.partialUpdateOauth_clients);
router.route('/admin/oauth_clients/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.softDeleteOauth_clients);
router.route('/admin/oauth_clients/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.softDeleteManyOauth_clients);
router.route('/admin/oauth_clients/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.bulkInsertOauth_clients);
router.route('/admin/oauth_clients/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.bulkUpdateOauth_clients);
router.route('/admin/oauth_clients/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.deleteOauth_clients);
router.route('/admin/oauth_clients/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_clientsController.deleteManyOauth_clients);

module.exports = router;
