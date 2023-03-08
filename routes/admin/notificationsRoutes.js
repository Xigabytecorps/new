/**
 * notificationsRoutes.js
 * @description :: CRUD API routes for notifications
 */

const express = require('express');
const router = express.Router();
const notificationsController = require('../../controller/admin/notificationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/notifications/create').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.addNotifications);
router.route('/admin/notifications/list').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.findAllNotifications);
router.route('/admin/notifications/count').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.getNotificationsCount);
router.route('/admin/notifications/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.getNotifications);
router.route('/admin/notifications/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.updateNotifications);    
router.route('/admin/notifications/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.partialUpdateNotifications);
router.route('/admin/notifications/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.softDeleteNotifications);
router.route('/admin/notifications/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.softDeleteManyNotifications);
router.route('/admin/notifications/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.bulkInsertNotifications);
router.route('/admin/notifications/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.bulkUpdateNotifications);
router.route('/admin/notifications/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.deleteNotifications);
router.route('/admin/notifications/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationsController.deleteManyNotifications);

module.exports = router;
