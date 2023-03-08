/**
 * withdraw_requestsRoutes.js
 * @description :: CRUD API routes for withdraw_requests
 */

const express = require('express');
const router = express.Router();
const withdraw_requestsController = require('../../../controller/device/v1/withdraw_requestsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/withdraw_requests/create').post(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.addWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/list').post(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.findAllWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/count').post(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.getWithdraw_requestsCount);
router.route('/device/api/v1/withdraw_requests/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.getWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.updateWithdraw_requests);    
router.route('/device/api/v1/withdraw_requests/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.partialUpdateWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.softDeleteWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.softDeleteManyWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.bulkInsertWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.bulkUpdateWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.deleteWithdraw_requests);
router.route('/device/api/v1/withdraw_requests/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,withdraw_requestsController.deleteManyWithdraw_requests);

module.exports = router;
