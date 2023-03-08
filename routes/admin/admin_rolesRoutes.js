/**
 * admin_rolesRoutes.js
 * @description :: CRUD API routes for admin_roles
 */

const express = require('express');
const router = express.Router();
const admin_rolesController = require('../../controller/admin/admin_rolesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/admin_roles/create').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.addAdmin_roles);
router.route('/admin/admin_roles/list').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.findAllAdmin_roles);
router.route('/admin/admin_roles/count').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.getAdmin_rolesCount);
router.route('/admin/admin_roles/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.getAdmin_roles);
router.route('/admin/admin_roles/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.updateAdmin_roles);    
router.route('/admin/admin_roles/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.partialUpdateAdmin_roles);
router.route('/admin/admin_roles/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.softDeleteAdmin_roles);
router.route('/admin/admin_roles/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.softDeleteManyAdmin_roles);
router.route('/admin/admin_roles/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.bulkInsertAdmin_roles);
router.route('/admin/admin_roles/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.bulkUpdateAdmin_roles);
router.route('/admin/admin_roles/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.deleteAdmin_roles);
router.route('/admin/admin_roles/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_rolesController.deleteManyAdmin_roles);

module.exports = router;
