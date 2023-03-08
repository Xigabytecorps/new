/**
 * user_notificationsRoutes.js
 * @description :: CRUD API routes for user_notifications
 */

const express = require('express');
const router = express.Router();
const user_notificationsController = require('../../../controller/device/v1/user_notificationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/user_notifications/create').post(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.addUser_notifications);
router.route('/device/api/v1/user_notifications/list').post(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.findAllUser_notifications);
router.route('/device/api/v1/user_notifications/count').post(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.getUser_notificationsCount);
router.route('/device/api/v1/user_notifications/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.getUser_notifications);
router.route('/device/api/v1/user_notifications/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.updateUser_notifications);    
router.route('/device/api/v1/user_notifications/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.partialUpdateUser_notifications);
router.route('/device/api/v1/user_notifications/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.softDeleteUser_notifications);
router.route('/device/api/v1/user_notifications/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.softDeleteManyUser_notifications);
router.route('/device/api/v1/user_notifications/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.bulkInsertUser_notifications);
router.route('/device/api/v1/user_notifications/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.bulkUpdateUser_notifications);
router.route('/device/api/v1/user_notifications/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.deleteUser_notifications);
router.route('/device/api/v1/user_notifications/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,user_notificationsController.deleteManyUser_notifications);

module.exports = router;
