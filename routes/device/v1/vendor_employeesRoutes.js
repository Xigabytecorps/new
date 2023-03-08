/**
 * vendor_employeesRoutes.js
 * @description :: CRUD API routes for vendor_employees
 */

const express = require('express');
const router = express.Router();
const vendor_employeesController = require('../../../controller/device/v1/vendor_employeesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/vendor_employees/create').post(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.addVendor_employees);
router.route('/device/api/v1/vendor_employees/list').post(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.findAllVendor_employees);
router.route('/device/api/v1/vendor_employees/count').post(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.getVendor_employeesCount);
router.route('/device/api/v1/vendor_employees/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.getVendor_employees);
router.route('/device/api/v1/vendor_employees/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.updateVendor_employees);    
router.route('/device/api/v1/vendor_employees/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.partialUpdateVendor_employees);
router.route('/device/api/v1/vendor_employees/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.softDeleteVendor_employees);
router.route('/device/api/v1/vendor_employees/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.softDeleteManyVendor_employees);
router.route('/device/api/v1/vendor_employees/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.bulkInsertVendor_employees);
router.route('/device/api/v1/vendor_employees/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.bulkUpdateVendor_employees);
router.route('/device/api/v1/vendor_employees/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.deleteVendor_employees);
router.route('/device/api/v1/vendor_employees/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,vendor_employeesController.deleteManyVendor_employees);

module.exports = router;
