/**
 * restaurant_walletsRoutes.js
 * @description :: CRUD API routes for restaurant_wallets
 */

const express = require('express');
const router = express.Router();
const restaurant_walletsController = require('../../controller/admin/restaurant_walletsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/restaurant_wallets/create').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.addRestaurant_wallets);
router.route('/admin/restaurant_wallets/list').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.findAllRestaurant_wallets);
router.route('/admin/restaurant_wallets/count').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.getRestaurant_walletsCount);
router.route('/admin/restaurant_wallets/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.getRestaurant_wallets);
router.route('/admin/restaurant_wallets/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.updateRestaurant_wallets);    
router.route('/admin/restaurant_wallets/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.partialUpdateRestaurant_wallets);
router.route('/admin/restaurant_wallets/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.softDeleteRestaurant_wallets);
router.route('/admin/restaurant_wallets/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.softDeleteManyRestaurant_wallets);
router.route('/admin/restaurant_wallets/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.bulkInsertRestaurant_wallets);
router.route('/admin/restaurant_wallets/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.bulkUpdateRestaurant_wallets);
router.route('/admin/restaurant_wallets/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.deleteRestaurant_wallets);
router.route('/admin/restaurant_wallets/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurant_walletsController.deleteManyRestaurant_wallets);

module.exports = router;
