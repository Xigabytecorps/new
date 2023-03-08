/**
 * phone_verificationsRoutes.js
 * @description :: CRUD API routes for phone_verifications
 */

const express = require('express');
const router = express.Router();
const phone_verificationsController = require('../../../controller/device/v1/phone_verificationsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/phone_verifications/create').post(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.addPhone_verifications);
router.route('/device/api/v1/phone_verifications/list').post(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.findAllPhone_verifications);
router.route('/device/api/v1/phone_verifications/count').post(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.getPhone_verificationsCount);
router.route('/device/api/v1/phone_verifications/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.getPhone_verifications);
router.route('/device/api/v1/phone_verifications/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.updatePhone_verifications);    
router.route('/device/api/v1/phone_verifications/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.partialUpdatePhone_verifications);
router.route('/device/api/v1/phone_verifications/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.softDeletePhone_verifications);
router.route('/device/api/v1/phone_verifications/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.softDeleteManyPhone_verifications);
router.route('/device/api/v1/phone_verifications/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.bulkInsertPhone_verifications);
router.route('/device/api/v1/phone_verifications/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.bulkUpdatePhone_verifications);
router.route('/device/api/v1/phone_verifications/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.deletePhone_verifications);
router.route('/device/api/v1/phone_verifications/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,phone_verificationsController.deleteManyPhone_verifications);

module.exports = router;
