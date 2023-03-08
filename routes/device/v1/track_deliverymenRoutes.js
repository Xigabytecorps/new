/**
 * track_deliverymenRoutes.js
 * @description :: CRUD API routes for track_deliverymen
 */

const express = require('express');
const router = express.Router();
const track_deliverymenController = require('../../../controller/device/v1/track_deliverymenController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/track_deliverymen/create').post(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.addTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/list').post(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.findAllTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/count').post(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.getTrack_deliverymenCount);
router.route('/device/api/v1/track_deliverymen/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.getTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.updateTrack_deliverymen);    
router.route('/device/api/v1/track_deliverymen/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.partialUpdateTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.softDeleteTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.softDeleteManyTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.bulkInsertTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.bulkUpdateTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.deleteTrack_deliverymen);
router.route('/device/api/v1/track_deliverymen/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,track_deliverymenController.deleteManyTrack_deliverymen);

module.exports = router;
