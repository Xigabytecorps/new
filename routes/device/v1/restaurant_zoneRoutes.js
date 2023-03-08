/**
 * restaurant_zoneRoutes.js
 * @description :: CRUD API routes for restaurant_zone
 */

const express = require('express');
const router = express.Router();
const restaurant_zoneController = require('../../../controller/device/v1/restaurant_zoneController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/restaurant_zone/create').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.addRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/list').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.findAllRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/count').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.getRestaurant_zoneCount);
router.route('/device/api/v1/restaurant_zone/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.getRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.updateRestaurant_zone);    
router.route('/device/api/v1/restaurant_zone/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.partialUpdateRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.softDeleteRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.softDeleteManyRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.bulkInsertRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.bulkUpdateRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.deleteRestaurant_zone);
router.route('/device/api/v1/restaurant_zone/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurant_zoneController.deleteManyRestaurant_zone);

module.exports = router;
