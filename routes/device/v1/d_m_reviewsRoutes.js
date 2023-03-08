/**
 * d_m_reviewsRoutes.js
 * @description :: CRUD API routes for d_m_reviews
 */

const express = require('express');
const router = express.Router();
const d_m_reviewsController = require('../../../controller/device/v1/d_m_reviewsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/d_m_reviews/create').post(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.addD_m_reviews);
router.route('/device/api/v1/d_m_reviews/list').post(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.findAllD_m_reviews);
router.route('/device/api/v1/d_m_reviews/count').post(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.getD_m_reviewsCount);
router.route('/device/api/v1/d_m_reviews/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.getD_m_reviews);
router.route('/device/api/v1/d_m_reviews/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.updateD_m_reviews);    
router.route('/device/api/v1/d_m_reviews/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.partialUpdateD_m_reviews);
router.route('/device/api/v1/d_m_reviews/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.softDeleteD_m_reviews);
router.route('/device/api/v1/d_m_reviews/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.softDeleteManyD_m_reviews);
router.route('/device/api/v1/d_m_reviews/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.bulkInsertD_m_reviews);
router.route('/device/api/v1/d_m_reviews/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.bulkUpdateD_m_reviews);
router.route('/device/api/v1/d_m_reviews/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.deleteD_m_reviews);
router.route('/device/api/v1/d_m_reviews/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,d_m_reviewsController.deleteManyD_m_reviews);

module.exports = router;
