/**
 * couponsRoutes.js
 * @description :: CRUD API routes for coupons
 */

const express = require('express');
const router = express.Router();
const couponsController = require('../../../controller/device/v1/couponsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/coupons/create').post(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.addCoupons);
router.route('/device/api/v1/coupons/list').post(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.findAllCoupons);
router.route('/device/api/v1/coupons/count').post(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.getCouponsCount);
router.route('/device/api/v1/coupons/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.getCoupons);
router.route('/device/api/v1/coupons/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.updateCoupons);    
router.route('/device/api/v1/coupons/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.partialUpdateCoupons);
router.route('/device/api/v1/coupons/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.softDeleteCoupons);
router.route('/device/api/v1/coupons/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.softDeleteManyCoupons);
router.route('/device/api/v1/coupons/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.bulkInsertCoupons);
router.route('/device/api/v1/coupons/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.bulkUpdateCoupons);
router.route('/device/api/v1/coupons/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.deleteCoupons);
router.route('/device/api/v1/coupons/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,couponsController.deleteManyCoupons);

module.exports = router;
