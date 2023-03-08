/**
 * employee_rolesRoutes.js
 * @description :: CRUD API routes for employee_roles
 */

const express = require('express');
const router = express.Router();
const employee_rolesController = require('../../controller/admin/employee_rolesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/employee_roles/create').post(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.addEmployee_roles);
router.route('/admin/employee_roles/list').post(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.findAllEmployee_roles);
router.route('/admin/employee_roles/count').post(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.getEmployee_rolesCount);
router.route('/admin/employee_roles/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.getEmployee_roles);
router.route('/admin/employee_roles/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.updateEmployee_roles);    
router.route('/admin/employee_roles/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.partialUpdateEmployee_roles);
router.route('/admin/employee_roles/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.softDeleteEmployee_roles);
router.route('/admin/employee_roles/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.softDeleteManyEmployee_roles);
router.route('/admin/employee_roles/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.bulkInsertEmployee_roles);
router.route('/admin/employee_roles/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.bulkUpdateEmployee_roles);
router.route('/admin/employee_roles/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.deleteEmployee_roles);
router.route('/admin/employee_roles/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,employee_rolesController.deleteManyEmployee_roles);

module.exports = router;
