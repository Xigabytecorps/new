/**
 * vendorsRoutes.js
 * @description :: CRUD API routes for vendors
 */

const express = require('express');
const router = express.Router();
const vendorsController = require('../../controller/admin/vendorsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/vendors/create').post(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.addVendors);
router.route('/admin/vendors/list').post(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.findAllVendors);
router.route('/admin/vendors/count').post(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.getVendorsCount);
router.route('/admin/vendors/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.getVendors);
router.route('/admin/vendors/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.updateVendors);    
router.route('/admin/vendors/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.partialUpdateVendors);
router.route('/admin/vendors/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.softDeleteVendors);
router.route('/admin/vendors/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.softDeleteManyVendors);
router.route('/admin/vendors/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.bulkInsertVendors);
router.route('/admin/vendors/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.bulkUpdateVendors);
router.route('/admin/vendors/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.deleteVendors);
router.route('/admin/vendors/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,vendorsController.deleteManyVendors);

module.exports = router;
