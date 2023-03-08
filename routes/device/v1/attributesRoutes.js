/**
 * attributesRoutes.js
 * @description :: CRUD API routes for attributes
 */

const express = require('express');
const router = express.Router();
const attributesController = require('../../../controller/device/v1/attributesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/attributes/create').post(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.addAttributes);
router.route('/device/api/v1/attributes/list').post(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.findAllAttributes);
router.route('/device/api/v1/attributes/count').post(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.getAttributesCount);
router.route('/device/api/v1/attributes/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.getAttributes);
router.route('/device/api/v1/attributes/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.updateAttributes);    
router.route('/device/api/v1/attributes/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.partialUpdateAttributes);
router.route('/device/api/v1/attributes/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.softDeleteAttributes);
router.route('/device/api/v1/attributes/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.softDeleteManyAttributes);
router.route('/device/api/v1/attributes/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.bulkInsertAttributes);
router.route('/device/api/v1/attributes/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.bulkUpdateAttributes);
router.route('/device/api/v1/attributes/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.deleteAttributes);
router.route('/device/api/v1/attributes/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,attributesController.deleteManyAttributes);

module.exports = router;
