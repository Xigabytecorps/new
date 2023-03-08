/**
 * item_campaignsRoutes.js
 * @description :: CRUD API routes for item_campaigns
 */

const express = require('express');
const router = express.Router();
const item_campaignsController = require('../../controller/admin/item_campaignsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/item_campaigns/create').post(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.addItem_campaigns);
router.route('/admin/item_campaigns/list').post(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.findAllItem_campaigns);
router.route('/admin/item_campaigns/count').post(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.getItem_campaignsCount);
router.route('/admin/item_campaigns/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.getItem_campaigns);
router.route('/admin/item_campaigns/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.updateItem_campaigns);    
router.route('/admin/item_campaigns/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.partialUpdateItem_campaigns);
router.route('/admin/item_campaigns/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.softDeleteItem_campaigns);
router.route('/admin/item_campaigns/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.softDeleteManyItem_campaigns);
router.route('/admin/item_campaigns/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.bulkInsertItem_campaigns);
router.route('/admin/item_campaigns/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.bulkUpdateItem_campaigns);
router.route('/admin/item_campaigns/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.deleteItem_campaigns);
router.route('/admin/item_campaigns/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,item_campaignsController.deleteManyItem_campaigns);

module.exports = router;
