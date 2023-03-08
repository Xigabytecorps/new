/**
 * delivery_man_walletsRoutes.js
 * @description :: CRUD API routes for delivery_man_wallets
 */

const express = require('express');
const router = express.Router();
const delivery_man_walletsController = require('../../../controller/device/v1/delivery_man_walletsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/delivery_man_wallets/create').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.addDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/list').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.findAllDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/count').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.getDelivery_man_walletsCount);
router.route('/device/api/v1/delivery_man_wallets/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.getDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.updateDelivery_man_wallets);    
router.route('/device/api/v1/delivery_man_wallets/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.partialUpdateDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.softDeleteDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.softDeleteManyDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.bulkInsertDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.bulkUpdateDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.deleteDelivery_man_wallets);
router.route('/device/api/v1/delivery_man_wallets/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,delivery_man_walletsController.deleteManyDelivery_man_wallets);

module.exports = router;
