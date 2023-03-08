/**
 * bannersRoutes.js
 * @description :: CRUD API routes for banners
 */

const express = require('express');
const router = express.Router();
const bannersController = require('../../controller/admin/bannersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/banners/create').post(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.addBanners);
router.route('/admin/banners/list').post(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.findAllBanners);
router.route('/admin/banners/count').post(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.getBannersCount);
router.route('/admin/banners/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.getBanners);
router.route('/admin/banners/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.updateBanners);    
router.route('/admin/banners/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.partialUpdateBanners);
router.route('/admin/banners/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.softDeleteBanners);
router.route('/admin/banners/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.softDeleteManyBanners);
router.route('/admin/banners/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.bulkInsertBanners);
router.route('/admin/banners/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.bulkUpdateBanners);
router.route('/admin/banners/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.deleteBanners);
router.route('/admin/banners/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,bannersController.deleteManyBanners);

module.exports = router;
