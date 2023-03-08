/**
 * campaignsRoutes.js
 * @description :: CRUD API routes for campaigns
 */

const express = require('express');
const router = express.Router();
const campaignsController = require('../../../controller/device/v1/campaignsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/campaigns/create').post(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.addCampaigns);
router.route('/device/api/v1/campaigns/list').post(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.findAllCampaigns);
router.route('/device/api/v1/campaigns/count').post(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.getCampaignsCount);
router.route('/device/api/v1/campaigns/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.getCampaigns);
router.route('/device/api/v1/campaigns/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.updateCampaigns);    
router.route('/device/api/v1/campaigns/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.partialUpdateCampaigns);
router.route('/device/api/v1/campaigns/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.softDeleteCampaigns);
router.route('/device/api/v1/campaigns/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.softDeleteManyCampaigns);
router.route('/device/api/v1/campaigns/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.bulkInsertCampaigns);
router.route('/device/api/v1/campaigns/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.bulkUpdateCampaigns);
router.route('/device/api/v1/campaigns/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.deleteCampaigns);
router.route('/device/api/v1/campaigns/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,campaignsController.deleteManyCampaigns);

module.exports = router;
