/**
 * discountsRoutes.js
 * @description :: CRUD API routes for discounts
 */

const express = require('express');
const router = express.Router();
const discountsController = require('../../controller/admin/discountsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/discounts/create').post(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.addDiscounts);
router.route('/admin/discounts/list').post(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.findAllDiscounts);
router.route('/admin/discounts/count').post(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.getDiscountsCount);
router.route('/admin/discounts/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.getDiscounts);
router.route('/admin/discounts/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.updateDiscounts);    
router.route('/admin/discounts/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.partialUpdateDiscounts);
router.route('/admin/discounts/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.softDeleteDiscounts);
router.route('/admin/discounts/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.softDeleteManyDiscounts);
router.route('/admin/discounts/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.bulkInsertDiscounts);
router.route('/admin/discounts/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.bulkUpdateDiscounts);
router.route('/admin/discounts/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.deleteDiscounts);
router.route('/admin/discounts/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,discountsController.deleteManyDiscounts);

module.exports = router;
