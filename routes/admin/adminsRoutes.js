/**
 * adminsRoutes.js
 * @description :: CRUD API routes for admins
 */

const express = require('express');
const router = express.Router();
const adminsController = require('../../controller/admin/adminsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/admins/create').post(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.addAdmins);
router.route('/admin/admins/list').post(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.findAllAdmins);
router.route('/admin/admins/count').post(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.getAdminsCount);
router.route('/admin/admins/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.getAdmins);
router.route('/admin/admins/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.updateAdmins);    
router.route('/admin/admins/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.partialUpdateAdmins);
router.route('/admin/admins/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.softDeleteAdmins);
router.route('/admin/admins/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.softDeleteManyAdmins);
router.route('/admin/admins/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.bulkInsertAdmins);
router.route('/admin/admins/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.bulkUpdateAdmins);
router.route('/admin/admins/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.deleteAdmins);
router.route('/admin/admins/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,adminsController.deleteManyAdmins);

module.exports = router;
