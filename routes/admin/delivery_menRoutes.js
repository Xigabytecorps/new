/**
 * delivery_menRoutes.js
 * @description :: CRUD API routes for delivery_men
 */

const express = require('express');
const router = express.Router();
const delivery_menController = require('../../controller/admin/delivery_menController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/delivery_men/create').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.addDelivery_men);
router.route('/admin/delivery_men/list').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.findAllDelivery_men);
router.route('/admin/delivery_men/count').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.getDelivery_menCount);
router.route('/admin/delivery_men/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.getDelivery_men);
router.route('/admin/delivery_men/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.updateDelivery_men);    
router.route('/admin/delivery_men/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.partialUpdateDelivery_men);
router.route('/admin/delivery_men/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.softDeleteDelivery_men);
router.route('/admin/delivery_men/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.softDeleteManyDelivery_men);
router.route('/admin/delivery_men/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.bulkInsertDelivery_men);
router.route('/admin/delivery_men/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.bulkUpdateDelivery_men);
router.route('/admin/delivery_men/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.deleteDelivery_men);
router.route('/admin/delivery_men/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,delivery_menController.deleteManyDelivery_men);

module.exports = router;
