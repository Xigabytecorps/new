/**
 * mail_configsRoutes.js
 * @description :: CRUD API routes for mail_configs
 */

const express = require('express');
const router = express.Router();
const mail_configsController = require('../../controller/admin/mail_configsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/mail_configs/create').post(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.addMail_configs);
router.route('/admin/mail_configs/list').post(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.findAllMail_configs);
router.route('/admin/mail_configs/count').post(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.getMail_configsCount);
router.route('/admin/mail_configs/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.getMail_configs);
router.route('/admin/mail_configs/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.updateMail_configs);    
router.route('/admin/mail_configs/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.partialUpdateMail_configs);
router.route('/admin/mail_configs/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.softDeleteMail_configs);
router.route('/admin/mail_configs/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.softDeleteManyMail_configs);
router.route('/admin/mail_configs/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.bulkInsertMail_configs);
router.route('/admin/mail_configs/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.bulkUpdateMail_configs);
router.route('/admin/mail_configs/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.deleteMail_configs);
router.route('/admin/mail_configs/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,mail_configsController.deleteManyMail_configs);

module.exports = router;
