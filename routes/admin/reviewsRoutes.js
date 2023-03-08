/**
 * reviewsRoutes.js
 * @description :: CRUD API routes for reviews
 */

const express = require('express');
const router = express.Router();
const reviewsController = require('../../controller/admin/reviewsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/reviews/create').post(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.addReviews);
router.route('/admin/reviews/list').post(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.findAllReviews);
router.route('/admin/reviews/count').post(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.getReviewsCount);
router.route('/admin/reviews/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.getReviews);
router.route('/admin/reviews/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.updateReviews);    
router.route('/admin/reviews/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.partialUpdateReviews);
router.route('/admin/reviews/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.softDeleteReviews);
router.route('/admin/reviews/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.softDeleteManyReviews);
router.route('/admin/reviews/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.bulkInsertReviews);
router.route('/admin/reviews/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.bulkUpdateReviews);
router.route('/admin/reviews/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.deleteReviews);
router.route('/admin/reviews/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,reviewsController.deleteManyReviews);

module.exports = router;
