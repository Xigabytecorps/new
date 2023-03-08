/**
 * restaurantsRoutes.js
 * @description :: CRUD API routes for restaurants
 */

const express = require('express');
const router = express.Router();
const restaurantsController = require('../../controller/admin/restaurantsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/restaurants/create').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.addRestaurants);
router.route('/admin/restaurants/list').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.findAllRestaurants);
router.route('/admin/restaurants/count').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.getRestaurantsCount);
router.route('/admin/restaurants/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.getRestaurants);
router.route('/admin/restaurants/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.updateRestaurants);    
router.route('/admin/restaurants/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.partialUpdateRestaurants);
router.route('/admin/restaurants/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.softDeleteRestaurants);
router.route('/admin/restaurants/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.softDeleteManyRestaurants);
router.route('/admin/restaurants/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.bulkInsertRestaurants);
router.route('/admin/restaurants/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.bulkUpdateRestaurants);
router.route('/admin/restaurants/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.deleteRestaurants);
router.route('/admin/restaurants/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,restaurantsController.deleteManyRestaurants);

module.exports = router;
