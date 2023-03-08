/**
 * vendor_employeesRoutes.js
 * @description :: CRUD API routes for vendor_employees
 */

const express = require('express');
const router = express.Router();
const vendor_employeesController = require('../../controller/admin/vendor_employeesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/vendor_employees/create').post(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.addVendor_employees);
router.route('/admin/vendor_employees/list').post(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.findAllVendor_employees);
router.route('/admin/vendor_employees/count').post(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.getVendor_employeesCount);
router.route('/admin/vendor_employees/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.getVendor_employees);
router.route('/admin/vendor_employees/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.updateVendor_employees);    
router.route('/admin/vendor_employees/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.partialUpdateVendor_employees);
router.route('/admin/vendor_employees/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.softDeleteVendor_employees);
router.route('/admin/vendor_employees/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.softDeleteManyVendor_employees);
router.route('/admin/vendor_employees/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.bulkInsertVendor_employees);
router.route('/admin/vendor_employees/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.bulkUpdateVendor_employees);
router.route('/admin/vendor_employees/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.deleteVendor_employees);
router.route('/admin/vendor_employees/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,vendor_employeesController.deleteManyVendor_employees);

module.exports = router;
