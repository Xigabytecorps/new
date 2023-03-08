/**
 * order_delivery_historiesRoutes.js
 * @description :: CRUD API routes for order_delivery_histories
 */

const express = require('express');
const router = express.Router();
const order_delivery_historiesController = require('../../controller/admin/order_delivery_historiesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/order_delivery_histories/create').post(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.addOrder_delivery_histories);
router.route('/admin/order_delivery_histories/list').post(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.findAllOrder_delivery_histories);
router.route('/admin/order_delivery_histories/count').post(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.getOrder_delivery_historiesCount);
router.route('/admin/order_delivery_histories/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.getOrder_delivery_histories);
router.route('/admin/order_delivery_histories/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.updateOrder_delivery_histories);    
router.route('/admin/order_delivery_histories/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.partialUpdateOrder_delivery_histories);
router.route('/admin/order_delivery_histories/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.softDeleteOrder_delivery_histories);
router.route('/admin/order_delivery_histories/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.softDeleteManyOrder_delivery_histories);
router.route('/admin/order_delivery_histories/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.bulkInsertOrder_delivery_histories);
router.route('/admin/order_delivery_histories/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.bulkUpdateOrder_delivery_histories);
router.route('/admin/order_delivery_histories/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.deleteOrder_delivery_histories);
router.route('/admin/order_delivery_histories/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,order_delivery_historiesController.deleteManyOrder_delivery_histories);

module.exports = router;
