/**
 * notificationsRoutes.js
 * @description :: CRUD API routes for notifications
 */

const express = require('express');
const router = express.Router();
const notificationsController = require('../../../controller/device/v1/notificationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/notifications/create').post(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.addNotifications);
router.route('/device/api/v1/notifications/list').post(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.findAllNotifications);
router.route('/device/api/v1/notifications/count').post(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.getNotificationsCount);
router.route('/device/api/v1/notifications/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.getNotifications);
router.route('/device/api/v1/notifications/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.updateNotifications);    
router.route('/device/api/v1/notifications/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.partialUpdateNotifications);
router.route('/device/api/v1/notifications/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.softDeleteNotifications);
router.route('/device/api/v1/notifications/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.softDeleteManyNotifications);
router.route('/device/api/v1/notifications/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.bulkInsertNotifications);
router.route('/device/api/v1/notifications/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.bulkUpdateNotifications);
router.route('/device/api/v1/notifications/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.deleteNotifications);
router.route('/device/api/v1/notifications/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,notificationsController.deleteManyNotifications);

module.exports = router;
