/**
 * employee_rolesRoutes.js
 * @description :: CRUD API routes for employee_roles
 */

const express = require('express');
const router = express.Router();
const employee_rolesController = require('../../../controller/device/v1/employee_rolesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/employee_roles/create').post(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.addEmployee_roles);
router.route('/device/api/v1/employee_roles/list').post(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.findAllEmployee_roles);
router.route('/device/api/v1/employee_roles/count').post(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.getEmployee_rolesCount);
router.route('/device/api/v1/employee_roles/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.getEmployee_roles);
router.route('/device/api/v1/employee_roles/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.updateEmployee_roles);    
router.route('/device/api/v1/employee_roles/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.partialUpdateEmployee_roles);
router.route('/device/api/v1/employee_roles/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.softDeleteEmployee_roles);
router.route('/device/api/v1/employee_roles/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.softDeleteManyEmployee_roles);
router.route('/device/api/v1/employee_roles/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.bulkInsertEmployee_roles);
router.route('/device/api/v1/employee_roles/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.bulkUpdateEmployee_roles);
router.route('/device/api/v1/employee_roles/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.deleteEmployee_roles);
router.route('/device/api/v1/employee_roles/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,employee_rolesController.deleteManyEmployee_roles);

module.exports = router;
