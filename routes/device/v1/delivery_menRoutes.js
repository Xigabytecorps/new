/**
 * delivery_menRoutes.js
 * @description :: CRUD API routes for delivery_men
 */

const express = require('express');
const router = express.Router();
const delivery_menController = require('../../../controller/device/v1/delivery_menController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/delivery_men/create').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.addDelivery_men);
router.route('/device/api/v1/delivery_men/list').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.findAllDelivery_men);
router.route('/device/api/v1/delivery_men/count').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.getDelivery_menCount);
router.route('/device/api/v1/delivery_men/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.getDelivery_men);
router.route('/device/api/v1/delivery_men/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.updateDelivery_men);    
router.route('/device/api/v1/delivery_men/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.partialUpdateDelivery_men);
router.route('/device/api/v1/delivery_men/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.softDeleteDelivery_men);
router.route('/device/api/v1/delivery_men/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.softDeleteManyDelivery_men);
router.route('/device/api/v1/delivery_men/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.bulkInsertDelivery_men);
router.route('/device/api/v1/delivery_men/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.bulkUpdateDelivery_men);
router.route('/device/api/v1/delivery_men/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.deleteDelivery_men);
router.route('/device/api/v1/delivery_men/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_menController.deleteManyDelivery_men);

module.exports = router;
