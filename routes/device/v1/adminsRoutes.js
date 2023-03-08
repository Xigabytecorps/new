/**
 * adminsRoutes.js
 * @description :: CRUD API routes for admins
 */

const express = require('express');
const router = express.Router();
const adminsController = require('../../../controller/device/v1/adminsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/admins/create').post(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.addAdmins);
router.route('/device/api/v1/admins/list').post(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.findAllAdmins);
router.route('/device/api/v1/admins/count').post(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.getAdminsCount);
router.route('/device/api/v1/admins/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.getAdmins);
router.route('/device/api/v1/admins/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.updateAdmins);    
router.route('/device/api/v1/admins/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.partialUpdateAdmins);
router.route('/device/api/v1/admins/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.softDeleteAdmins);
router.route('/device/api/v1/admins/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.softDeleteManyAdmins);
router.route('/device/api/v1/admins/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.bulkInsertAdmins);
router.route('/device/api/v1/admins/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.bulkUpdateAdmins);
router.route('/device/api/v1/admins/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.deleteAdmins);
router.route('/device/api/v1/admins/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,adminsController.deleteManyAdmins);

module.exports = router;
