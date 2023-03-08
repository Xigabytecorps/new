/**
 * ordersRoutes.js
 * @description :: CRUD API routes for orders
 */

const express = require('express');
const router = express.Router();
const ordersController = require('../../controller/admin/ordersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/orders/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.addOrders);
router.route('/admin/orders/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.findAllOrders);
router.route('/admin/orders/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.getOrdersCount);
router.route('/admin/orders/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.getOrders);
router.route('/admin/orders/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.updateOrders);    
router.route('/admin/orders/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.partialUpdateOrders);
router.route('/admin/orders/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.softDeleteOrders);
router.route('/admin/orders/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.softDeleteManyOrders);
router.route('/admin/orders/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.bulkInsertOrders);
router.route('/admin/orders/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.bulkUpdateOrders);
router.route('/admin/orders/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.deleteOrders);
router.route('/admin/orders/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ordersController.deleteManyOrders);

module.exports = router;
