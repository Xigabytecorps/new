/**
 * foodRoutes.js
 * @description :: CRUD API routes for food
 */

const express = require('express');
const router = express.Router();
const foodController = require('../../../controller/device/v1/foodController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/food/create').post(auth(PLATFORM.DEVICE),checkRolePermission,foodController.addFood);
router.route('/device/api/v1/food/list').post(auth(PLATFORM.DEVICE),checkRolePermission,foodController.findAllFood);
router.route('/device/api/v1/food/count').post(auth(PLATFORM.DEVICE),checkRolePermission,foodController.getFoodCount);
router.route('/device/api/v1/food/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,foodController.getFood);
router.route('/device/api/v1/food/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,foodController.updateFood);    
router.route('/device/api/v1/food/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,foodController.partialUpdateFood);
router.route('/device/api/v1/food/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,foodController.softDeleteFood);
router.route('/device/api/v1/food/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,foodController.softDeleteManyFood);
router.route('/device/api/v1/food/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,foodController.bulkInsertFood);
router.route('/device/api/v1/food/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,foodController.bulkUpdateFood);
router.route('/device/api/v1/food/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,foodController.deleteFood);
router.route('/device/api/v1/food/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,foodController.deleteManyFood);

module.exports = router;
