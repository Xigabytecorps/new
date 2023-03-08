/**
 * couponsRoutes.js
 * @description :: CRUD API routes for coupons
 */

const express = require('express');
const router = express.Router();
const couponsController = require('../../controller/admin/couponsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/coupons/create').post(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.addCoupons);
router.route('/admin/coupons/list').post(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.findAllCoupons);
router.route('/admin/coupons/count').post(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.getCouponsCount);
router.route('/admin/coupons/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.getCoupons);
router.route('/admin/coupons/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.updateCoupons);    
router.route('/admin/coupons/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.partialUpdateCoupons);
router.route('/admin/coupons/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.softDeleteCoupons);
router.route('/admin/coupons/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.softDeleteManyCoupons);
router.route('/admin/coupons/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.bulkInsertCoupons);
router.route('/admin/coupons/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.bulkUpdateCoupons);
router.route('/admin/coupons/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.deleteCoupons);
router.route('/admin/coupons/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,couponsController.deleteManyCoupons);

module.exports = router;
