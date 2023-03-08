/**
 * order_transactionsRoutes.js
 * @description :: CRUD API routes for order_transactions
 */

const express = require('express');
const router = express.Router();
const order_transactionsController = require('../../controller/admin/order_transactionsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/order_transactions/create').post(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.addOrder_transactions);
router.route('/admin/order_transactions/list').post(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.findAllOrder_transactions);
router.route('/admin/order_transactions/count').post(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.getOrder_transactionsCount);
router.route('/admin/order_transactions/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.getOrder_transactions);
router.route('/admin/order_transactions/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.updateOrder_transactions);    
router.route('/admin/order_transactions/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.partialUpdateOrder_transactions);
router.route('/admin/order_transactions/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.softDeleteOrder_transactions);
router.route('/admin/order_transactions/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.softDeleteManyOrder_transactions);
router.route('/admin/order_transactions/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.bulkInsertOrder_transactions);
router.route('/admin/order_transactions/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.bulkUpdateOrder_transactions);
router.route('/admin/order_transactions/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.deleteOrder_transactions);
router.route('/admin/order_transactions/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,order_transactionsController.deleteManyOrder_transactions);

module.exports = router;
