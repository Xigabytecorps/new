/**
 * delivery_historiesRoutes.js
 * @description :: CRUD API routes for delivery_histories
 */

const express = require('express');
const router = express.Router();
const delivery_historiesController = require('../../controller/admin/delivery_historiesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/delivery_histories/create').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.addDelivery_histories);
router.route('/admin/delivery_histories/list').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.findAllDelivery_histories);
router.route('/admin/delivery_histories/count').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.getDelivery_historiesCount);
router.route('/admin/delivery_histories/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.getDelivery_histories);
router.route('/admin/delivery_histories/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.updateDelivery_histories);    
router.route('/admin/delivery_histories/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.partialUpdateDelivery_histories);
router.route('/admin/delivery_histories/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.softDeleteDelivery_histories);
router.route('/admin/delivery_histories/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.softDeleteManyDelivery_histories);
router.route('/admin/delivery_histories/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.bulkInsertDelivery_histories);
router.route('/admin/delivery_histories/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.bulkUpdateDelivery_histories);
router.route('/admin/delivery_histories/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.deleteDelivery_histories);
router.route('/admin/delivery_histories/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_historiesController.deleteManyDelivery_histories);

module.exports = router;
