/**
 * add_onsRoutes.js
 * @description :: CRUD API routes for add_ons
 */

const express = require('express');
const router = express.Router();
const add_onsController = require('../../controller/admin/add_onsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/add_ons/create').post(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.addAdd_ons);
router.route('/admin/add_ons/list').post(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.findAllAdd_ons);
router.route('/admin/add_ons/count').post(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.getAdd_onsCount);
router.route('/admin/add_ons/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.getAdd_ons);
router.route('/admin/add_ons/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.updateAdd_ons);    
router.route('/admin/add_ons/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.partialUpdateAdd_ons);
router.route('/admin/add_ons/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.softDeleteAdd_ons);
router.route('/admin/add_ons/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.softDeleteManyAdd_ons);
router.route('/admin/add_ons/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.bulkInsertAdd_ons);
router.route('/admin/add_ons/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.bulkUpdateAdd_ons);
router.route('/admin/add_ons/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.deleteAdd_ons);
router.route('/admin/add_ons/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,add_onsController.deleteManyAdd_ons);

module.exports = router;
