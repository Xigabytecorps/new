/**
 * restaurantsRoutes.js
 * @description :: CRUD API routes for restaurants
 */

const express = require('express');
const router = express.Router();
const restaurantsController = require('../../../controller/device/v1/restaurantsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/restaurants/create').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.addRestaurants);
router.route('/device/api/v1/restaurants/list').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.findAllRestaurants);
router.route('/device/api/v1/restaurants/count').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.getRestaurantsCount);
router.route('/device/api/v1/restaurants/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.getRestaurants);
router.route('/device/api/v1/restaurants/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.updateRestaurants);    
router.route('/device/api/v1/restaurants/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.partialUpdateRestaurants);
router.route('/device/api/v1/restaurants/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.softDeleteRestaurants);
router.route('/device/api/v1/restaurants/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.softDeleteManyRestaurants);
router.route('/device/api/v1/restaurants/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.bulkInsertRestaurants);
router.route('/device/api/v1/restaurants/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.bulkUpdateRestaurants);
router.route('/device/api/v1/restaurants/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.deleteRestaurants);
router.route('/device/api/v1/restaurants/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,restaurantsController.deleteManyRestaurants);

module.exports = router;
