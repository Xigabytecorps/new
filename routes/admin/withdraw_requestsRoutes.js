/**
 * withdraw_requestsRoutes.js
 * @description :: CRUD API routes for withdraw_requests
 */

const express = require('express');
const router = express.Router();
const withdraw_requestsController = require('../../controller/admin/withdraw_requestsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/withdraw_requests/create').post(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.addWithdraw_requests);
router.route('/admin/withdraw_requests/list').post(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.findAllWithdraw_requests);
router.route('/admin/withdraw_requests/count').post(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.getWithdraw_requestsCount);
router.route('/admin/withdraw_requests/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.getWithdraw_requests);
router.route('/admin/withdraw_requests/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.updateWithdraw_requests);    
router.route('/admin/withdraw_requests/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.partialUpdateWithdraw_requests);
router.route('/admin/withdraw_requests/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.softDeleteWithdraw_requests);
router.route('/admin/withdraw_requests/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.softDeleteManyWithdraw_requests);
router.route('/admin/withdraw_requests/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.bulkInsertWithdraw_requests);
router.route('/admin/withdraw_requests/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.bulkUpdateWithdraw_requests);
router.route('/admin/withdraw_requests/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.deleteWithdraw_requests);
router.route('/admin/withdraw_requests/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,withdraw_requestsController.deleteManyWithdraw_requests);

module.exports = router;
