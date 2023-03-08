/**
 * order_transactionsRoutes.js
 * @description :: CRUD API routes for order_transactions
 */

const express = require('express');
const router = express.Router();
const order_transactionsController = require('../../../controller/device/v1/order_transactionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/order_transactions/create').post(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.addOrder_transactions);
router.route('/device/api/v1/order_transactions/list').post(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.findAllOrder_transactions);
router.route('/device/api/v1/order_transactions/count').post(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.getOrder_transactionsCount);
router.route('/device/api/v1/order_transactions/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.getOrder_transactions);
router.route('/device/api/v1/order_transactions/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.updateOrder_transactions);    
router.route('/device/api/v1/order_transactions/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.partialUpdateOrder_transactions);
router.route('/device/api/v1/order_transactions/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.softDeleteOrder_transactions);
router.route('/device/api/v1/order_transactions/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.softDeleteManyOrder_transactions);
router.route('/device/api/v1/order_transactions/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.bulkInsertOrder_transactions);
router.route('/device/api/v1/order_transactions/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.bulkUpdateOrder_transactions);
router.route('/device/api/v1/order_transactions/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.deleteOrder_transactions);
router.route('/device/api/v1/order_transactions/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,order_transactionsController.deleteManyOrder_transactions);

module.exports = router;
