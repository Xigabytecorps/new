/**
 * discountsRoutes.js
 * @description :: CRUD API routes for discounts
 */

const express = require('express');
const router = express.Router();
const discountsController = require('../../../controller/device/v1/discountsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/discounts/create').post(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.addDiscounts);
router.route('/device/api/v1/discounts/list').post(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.findAllDiscounts);
router.route('/device/api/v1/discounts/count').post(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.getDiscountsCount);
router.route('/device/api/v1/discounts/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.getDiscounts);
router.route('/device/api/v1/discounts/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.updateDiscounts);    
router.route('/device/api/v1/discounts/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.partialUpdateDiscounts);
router.route('/device/api/v1/discounts/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.softDeleteDiscounts);
router.route('/device/api/v1/discounts/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.softDeleteManyDiscounts);
router.route('/device/api/v1/discounts/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.bulkInsertDiscounts);
router.route('/device/api/v1/discounts/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.bulkUpdateDiscounts);
router.route('/device/api/v1/discounts/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.deleteDiscounts);
router.route('/device/api/v1/discounts/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,discountsController.deleteManyDiscounts);

module.exports = router;
