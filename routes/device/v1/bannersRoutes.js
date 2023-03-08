/**
 * bannersRoutes.js
 * @description :: CRUD API routes for banners
 */

const express = require('express');
const router = express.Router();
const bannersController = require('../../../controller/device/v1/bannersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/banners/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.addBanners);
router.route('/device/api/v1/banners/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.findAllBanners);
router.route('/device/api/v1/banners/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.getBannersCount);
router.route('/device/api/v1/banners/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.getBanners);
router.route('/device/api/v1/banners/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.updateBanners);    
router.route('/device/api/v1/banners/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.partialUpdateBanners);
router.route('/device/api/v1/banners/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.softDeleteBanners);
router.route('/device/api/v1/banners/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.softDeleteManyBanners);
router.route('/device/api/v1/banners/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.bulkInsertBanners);
router.route('/device/api/v1/banners/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.bulkUpdateBanners);
router.route('/device/api/v1/banners/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.deleteBanners);
router.route('/device/api/v1/banners/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bannersController.deleteManyBanners);

module.exports = router;
