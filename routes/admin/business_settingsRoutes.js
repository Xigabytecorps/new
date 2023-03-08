/**
 * business_settingsRoutes.js
 * @description :: CRUD API routes for business_settings
 */

const express = require('express');
const router = express.Router();
const business_settingsController = require('../../controller/admin/business_settingsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/business_settings/create').post(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.addBusiness_settings);
router.route('/admin/business_settings/list').post(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.findAllBusiness_settings);
router.route('/admin/business_settings/count').post(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.getBusiness_settingsCount);
router.route('/admin/business_settings/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.getBusiness_settings);
router.route('/admin/business_settings/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.updateBusiness_settings);    
router.route('/admin/business_settings/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.partialUpdateBusiness_settings);
router.route('/admin/business_settings/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.softDeleteBusiness_settings);
router.route('/admin/business_settings/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.softDeleteManyBusiness_settings);
router.route('/admin/business_settings/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.bulkInsertBusiness_settings);
router.route('/admin/business_settings/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.bulkUpdateBusiness_settings);
router.route('/admin/business_settings/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.deleteBusiness_settings);
router.route('/admin/business_settings/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,business_settingsController.deleteManyBusiness_settings);

module.exports = router;
