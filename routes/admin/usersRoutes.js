/**
 * usersRoutes.js
 * @description :: CRUD API routes for users
 */

const express = require('express');
const router = express.Router();
const usersController = require('../../controller/admin/usersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/users/create').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.addUsers);
router.route('/admin/users/list').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.findAllUsers);
router.route('/admin/users/count').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.getUsersCount);
router.route('/admin/users/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,usersController.getUsers);
router.route('/admin/users/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.updateUsers);    
router.route('/admin/users/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.partialUpdateUsers);
router.route('/admin/users/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.softDeleteUsers);
router.route('/admin/users/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.softDeleteManyUsers);
router.route('/admin/users/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.bulkInsertUsers);
router.route('/admin/users/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.bulkUpdateUsers);
router.route('/admin/users/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,usersController.deleteUsers);
router.route('/admin/users/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.deleteManyUsers);

module.exports = router;
