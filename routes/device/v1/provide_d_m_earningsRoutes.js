/**
 * provide_d_m_earningsRoutes.js
 * @description :: CRUD API routes for provide_d_m_earnings
 */

const express = require('express');
const router = express.Router();
const provide_d_m_earningsController = require('../../../controller/device/v1/provide_d_m_earningsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/provide_d_m_earnings/create').post(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.addProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/list').post(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.findAllProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/count').post(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.getProvide_d_m_earningsCount);
router.route('/device/api/v1/provide_d_m_earnings/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.getProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.updateProvide_d_m_earnings);    
router.route('/device/api/v1/provide_d_m_earnings/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.partialUpdateProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.softDeleteProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.softDeleteManyProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.bulkInsertProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.bulkUpdateProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.deleteProvide_d_m_earnings);
router.route('/device/api/v1/provide_d_m_earnings/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,provide_d_m_earningsController.deleteManyProvide_d_m_earnings);

module.exports = router;
