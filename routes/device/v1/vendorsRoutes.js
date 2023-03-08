/**
 * vendorsRoutes.js
 * @description :: CRUD API routes for vendors
 */

const express = require('express');
const router = express.Router();
const vendorsController = require('../../../controller/device/v1/vendorsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/vendors/create').post(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.addVendors);
router.route('/device/api/v1/vendors/list').post(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.findAllVendors);
router.route('/device/api/v1/vendors/count').post(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.getVendorsCount);
router.route('/device/api/v1/vendors/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.getVendors);
router.route('/device/api/v1/vendors/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.updateVendors);    
router.route('/device/api/v1/vendors/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.partialUpdateVendors);
router.route('/device/api/v1/vendors/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.softDeleteVendors);
router.route('/device/api/v1/vendors/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.softDeleteManyVendors);
router.route('/device/api/v1/vendors/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.bulkInsertVendors);
router.route('/device/api/v1/vendors/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.bulkUpdateVendors);
router.route('/device/api/v1/vendors/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.deleteVendors);
router.route('/device/api/v1/vendors/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,vendorsController.deleteManyVendors);

module.exports = router;
