/**
 * mail_configsRoutes.js
 * @description :: CRUD API routes for mail_configs
 */

const express = require('express');
const router = express.Router();
const mail_configsController = require('../../../controller/device/v1/mail_configsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/mail_configs/create').post(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.addMail_configs);
router.route('/device/api/v1/mail_configs/list').post(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.findAllMail_configs);
router.route('/device/api/v1/mail_configs/count').post(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.getMail_configsCount);
router.route('/device/api/v1/mail_configs/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.getMail_configs);
router.route('/device/api/v1/mail_configs/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.updateMail_configs);    
router.route('/device/api/v1/mail_configs/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.partialUpdateMail_configs);
router.route('/device/api/v1/mail_configs/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.softDeleteMail_configs);
router.route('/device/api/v1/mail_configs/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.softDeleteManyMail_configs);
router.route('/device/api/v1/mail_configs/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.bulkInsertMail_configs);
router.route('/device/api/v1/mail_configs/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.bulkUpdateMail_configs);
router.route('/device/api/v1/mail_configs/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.deleteMail_configs);
router.route('/device/api/v1/mail_configs/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,mail_configsController.deleteManyMail_configs);

module.exports = router;
