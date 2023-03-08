/**
 * foodRoutes.js
 * @description :: CRUD API routes for food
 */

const express = require('express');
const router = express.Router();
const foodController = require('../../controller/admin/foodController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/food/create').post(auth(PLATFORM.ADMIN),checkRolePermission,foodController.addFood);
router.route('/admin/food/list').post(auth(PLATFORM.ADMIN),checkRolePermission,foodController.findAllFood);
router.route('/admin/food/count').post(auth(PLATFORM.ADMIN),checkRolePermission,foodController.getFoodCount);
router.route('/admin/food/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,foodController.getFood);
router.route('/admin/food/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,foodController.updateFood);    
router.route('/admin/food/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,foodController.partialUpdateFood);
router.route('/admin/food/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,foodController.softDeleteFood);
router.route('/admin/food/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,foodController.softDeleteManyFood);
router.route('/admin/food/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,foodController.bulkInsertFood);
router.route('/admin/food/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,foodController.bulkUpdateFood);
router.route('/admin/food/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,foodController.deleteFood);
router.route('/admin/food/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,foodController.deleteManyFood);

module.exports = router;
