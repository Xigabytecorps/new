/**
 * attributesRoutes.js
 * @description :: CRUD API routes for attributes
 */

const express = require('express');
const router = express.Router();
const attributesController = require('../../controller/admin/attributesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/attributes/create').post(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.addAttributes);
router.route('/admin/attributes/list').post(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.findAllAttributes);
router.route('/admin/attributes/count').post(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.getAttributesCount);
router.route('/admin/attributes/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.getAttributes);
router.route('/admin/attributes/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.updateAttributes);    
router.route('/admin/attributes/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.partialUpdateAttributes);
router.route('/admin/attributes/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.softDeleteAttributes);
router.route('/admin/attributes/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.softDeleteManyAttributes);
router.route('/admin/attributes/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.bulkInsertAttributes);
router.route('/admin/attributes/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.bulkUpdateAttributes);
router.route('/admin/attributes/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.deleteAttributes);
router.route('/admin/attributes/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,attributesController.deleteManyAttributes);

module.exports = router;
