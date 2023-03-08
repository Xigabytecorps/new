/**
 * item_campaignsRoutes.js
 * @description :: CRUD API routes for item_campaigns
 */

const express = require('express');
const router = express.Router();
const item_campaignsController = require('../../../controller/device/v1/item_campaignsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/item_campaigns/create').post(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.addItem_campaigns);
router.route('/device/api/v1/item_campaigns/list').post(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.findAllItem_campaigns);
router.route('/device/api/v1/item_campaigns/count').post(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.getItem_campaignsCount);
router.route('/device/api/v1/item_campaigns/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.getItem_campaigns);
router.route('/device/api/v1/item_campaigns/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.updateItem_campaigns);    
router.route('/device/api/v1/item_campaigns/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.partialUpdateItem_campaigns);
router.route('/device/api/v1/item_campaigns/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.softDeleteItem_campaigns);
router.route('/device/api/v1/item_campaigns/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.softDeleteManyItem_campaigns);
router.route('/device/api/v1/item_campaigns/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.bulkInsertItem_campaigns);
router.route('/device/api/v1/item_campaigns/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.bulkUpdateItem_campaigns);
router.route('/device/api/v1/item_campaigns/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.deleteItem_campaigns);
router.route('/device/api/v1/item_campaigns/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,item_campaignsController.deleteManyItem_campaigns);

module.exports = router;
