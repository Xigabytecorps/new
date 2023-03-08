/**
 * ordersRoutes.js
 * @description :: CRUD API routes for orders
 */

const express = require('express');
const router = express.Router();
const ordersController = require('../../../controller/device/v1/ordersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/orders/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.addOrders);
router.route('/device/api/v1/orders/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.findAllOrders);
router.route('/device/api/v1/orders/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.getOrdersCount);
router.route('/device/api/v1/orders/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.getOrders);
router.route('/device/api/v1/orders/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.updateOrders);    
router.route('/device/api/v1/orders/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.partialUpdateOrders);
router.route('/device/api/v1/orders/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.softDeleteOrders);
router.route('/device/api/v1/orders/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.softDeleteManyOrders);
router.route('/device/api/v1/orders/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.bulkInsertOrders);
router.route('/device/api/v1/orders/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.bulkUpdateOrders);
router.route('/device/api/v1/orders/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.deleteOrders);
router.route('/device/api/v1/orders/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ordersController.deleteManyOrders);

module.exports = router;
