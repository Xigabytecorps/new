/**
 * order_detailsRoutes.js
 * @description :: CRUD API routes for order_details
 */

const express = require('express');
const router = express.Router();
const order_detailsController = require('../../controller/admin/order_detailsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/order_details/create').post(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.addOrder_details);
router.route('/admin/order_details/list').post(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.findAllOrder_details);
router.route('/admin/order_details/count').post(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.getOrder_detailsCount);
router.route('/admin/order_details/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.getOrder_details);
router.route('/admin/order_details/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.updateOrder_details);    
router.route('/admin/order_details/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.partialUpdateOrder_details);
router.route('/admin/order_details/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.softDeleteOrder_details);
router.route('/admin/order_details/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.softDeleteManyOrder_details);
router.route('/admin/order_details/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.bulkInsertOrder_details);
router.route('/admin/order_details/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.bulkUpdateOrder_details);
router.route('/admin/order_details/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.deleteOrder_details);
router.route('/admin/order_details/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,order_detailsController.deleteManyOrder_details);

module.exports = router;
