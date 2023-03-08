/**
 * translationsRoutes.js
 * @description :: CRUD API routes for translations
 */

const express = require('express');
const router = express.Router();
const translationsController = require('../../../controller/device/v1/translationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/translations/create').post(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.addTranslations);
router.route('/device/api/v1/translations/list').post(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.findAllTranslations);
router.route('/device/api/v1/translations/count').post(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.getTranslationsCount);
router.route('/device/api/v1/translations/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.getTranslations);
router.route('/device/api/v1/translations/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.updateTranslations);    
router.route('/device/api/v1/translations/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.partialUpdateTranslations);
router.route('/device/api/v1/translations/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.softDeleteTranslations);
router.route('/device/api/v1/translations/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.softDeleteManyTranslations);
router.route('/device/api/v1/translations/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.bulkInsertTranslations);
router.route('/device/api/v1/translations/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.bulkUpdateTranslations);
router.route('/device/api/v1/translations/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.deleteTranslations);
router.route('/device/api/v1/translations/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,translationsController.deleteManyTranslations);

module.exports = router;
