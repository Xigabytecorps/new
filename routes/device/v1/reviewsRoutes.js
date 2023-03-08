/**
 * reviewsRoutes.js
 * @description :: CRUD API routes for reviews
 */

const express = require('express');
const router = express.Router();
const reviewsController = require('../../../controller/device/v1/reviewsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/reviews/create').post(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.addReviews);
router.route('/device/api/v1/reviews/list').post(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.findAllReviews);
router.route('/device/api/v1/reviews/count').post(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.getReviewsCount);
router.route('/device/api/v1/reviews/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.getReviews);
router.route('/device/api/v1/reviews/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.updateReviews);    
router.route('/device/api/v1/reviews/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.partialUpdateReviews);
router.route('/device/api/v1/reviews/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.softDeleteReviews);
router.route('/device/api/v1/reviews/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.softDeleteManyReviews);
router.route('/device/api/v1/reviews/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.bulkInsertReviews);
router.route('/device/api/v1/reviews/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.bulkUpdateReviews);
router.route('/device/api/v1/reviews/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.deleteReviews);
router.route('/device/api/v1/reviews/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,reviewsController.deleteManyReviews);

module.exports = router;
