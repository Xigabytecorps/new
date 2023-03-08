/**
 * translationsRoutes.js
 * @description :: CRUD API routes for translations
 */

const express = require('express');
const router = express.Router();
const translationsController = require('../../controller/admin/translationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/translations/create').post(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.addTranslations);
router.route('/admin/translations/list').post(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.findAllTranslations);
router.route('/admin/translations/count').post(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.getTranslationsCount);
router.route('/admin/translations/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.getTranslations);
router.route('/admin/translations/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.updateTranslations);    
router.route('/admin/translations/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.partialUpdateTranslations);
router.route('/admin/translations/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.softDeleteTranslations);
router.route('/admin/translations/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.softDeleteManyTranslations);
router.route('/admin/translations/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.bulkInsertTranslations);
router.route('/admin/translations/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.bulkUpdateTranslations);
router.route('/admin/translations/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.deleteTranslations);
router.route('/admin/translations/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,translationsController.deleteManyTranslations);

module.exports = router;
