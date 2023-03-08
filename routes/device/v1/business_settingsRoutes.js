/**
 * business_settingsRoutes.js
 * @description :: CRUD API routes for business_settings
 */

const express = require('express');
const router = express.Router();
const business_settingsController = require('../../../controller/device/v1/business_settingsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/business_settings/create').post(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.addBusiness_settings);
router.route('/device/api/v1/business_settings/list').post(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.findAllBusiness_settings);
router.route('/device/api/v1/business_settings/count').post(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.getBusiness_settingsCount);
router.route('/device/api/v1/business_settings/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.getBusiness_settings);
router.route('/device/api/v1/business_settings/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.updateBusiness_settings);    
router.route('/device/api/v1/business_settings/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.partialUpdateBusiness_settings);
router.route('/device/api/v1/business_settings/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.softDeleteBusiness_settings);
router.route('/device/api/v1/business_settings/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.softDeleteManyBusiness_settings);
router.route('/device/api/v1/business_settings/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.bulkInsertBusiness_settings);
router.route('/device/api/v1/business_settings/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.bulkUpdateBusiness_settings);
router.route('/device/api/v1/business_settings/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.deleteBusiness_settings);
router.route('/device/api/v1/business_settings/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,business_settingsController.deleteManyBusiness_settings);

module.exports = router;
