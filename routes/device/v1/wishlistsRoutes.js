/**
 * wishlistsRoutes.js
 * @description :: CRUD API routes for wishlists
 */

const express = require('express');
const router = express.Router();
const wishlistsController = require('../../../controller/device/v1/wishlistsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/wishlists/create').post(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.addWishlists);
router.route('/device/api/v1/wishlists/list').post(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.findAllWishlists);
router.route('/device/api/v1/wishlists/count').post(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.getWishlistsCount);
router.route('/device/api/v1/wishlists/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.getWishlists);
router.route('/device/api/v1/wishlists/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.updateWishlists);    
router.route('/device/api/v1/wishlists/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.partialUpdateWishlists);
router.route('/device/api/v1/wishlists/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.softDeleteWishlists);
router.route('/device/api/v1/wishlists/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.softDeleteManyWishlists);
router.route('/device/api/v1/wishlists/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.bulkInsertWishlists);
router.route('/device/api/v1/wishlists/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.bulkUpdateWishlists);
router.route('/device/api/v1/wishlists/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.deleteWishlists);
router.route('/device/api/v1/wishlists/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,wishlistsController.deleteManyWishlists);

module.exports = router;
