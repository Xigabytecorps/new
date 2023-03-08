/**
 * password_resetsRoutes.js
 * @description :: CRUD API routes for password_resets
 */

const express = require('express');
const router = express.Router();
const password_resetsController = require('../../controller/admin/password_resetsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/password_resets/create').post(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.addPassword_resets);
router.route('/admin/password_resets/list').post(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.findAllPassword_resets);
router.route('/admin/password_resets/count').post(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.getPassword_resetsCount);
router.route('/admin/password_resets/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.getPassword_resets);
router.route('/admin/password_resets/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.updatePassword_resets);    
router.route('/admin/password_resets/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.partialUpdatePassword_resets);
router.route('/admin/password_resets/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.softDeletePassword_resets);
router.route('/admin/password_resets/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.softDeleteManyPassword_resets);
router.route('/admin/password_resets/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.bulkInsertPassword_resets);
router.route('/admin/password_resets/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.bulkUpdatePassword_resets);
router.route('/admin/password_resets/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.deletePassword_resets);
router.route('/admin/password_resets/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,password_resetsController.deleteManyPassword_resets);

module.exports = router;
