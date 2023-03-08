/**
 * wishlistsRoutes.js
 * @description :: CRUD API routes for wishlists
 */

const express = require('express');
const router = express.Router();
const wishlistsController = require('../../controller/admin/wishlistsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/wishlists/create').post(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.addWishlists);
router.route('/admin/wishlists/list').post(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.findAllWishlists);
router.route('/admin/wishlists/count').post(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.getWishlistsCount);
router.route('/admin/wishlists/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.getWishlists);
router.route('/admin/wishlists/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.updateWishlists);    
router.route('/admin/wishlists/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.partialUpdateWishlists);
router.route('/admin/wishlists/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.softDeleteWishlists);
router.route('/admin/wishlists/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.softDeleteManyWishlists);
router.route('/admin/wishlists/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.bulkInsertWishlists);
router.route('/admin/wishlists/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.bulkUpdateWishlists);
router.route('/admin/wishlists/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.deleteWishlists);
router.route('/admin/wishlists/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,wishlistsController.deleteManyWishlists);

module.exports = router;
