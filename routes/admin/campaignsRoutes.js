/**
 * campaignsRoutes.js
 * @description :: CRUD API routes for campaigns
 */

const express = require('express');
const router = express.Router();
const campaignsController = require('../../controller/admin/campaignsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/campaigns/create').post(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.addCampaigns);
router.route('/admin/campaigns/list').post(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.findAllCampaigns);
router.route('/admin/campaigns/count').post(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.getCampaignsCount);
router.route('/admin/campaigns/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.getCampaigns);
router.route('/admin/campaigns/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.updateCampaigns);    
router.route('/admin/campaigns/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.partialUpdateCampaigns);
router.route('/admin/campaigns/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.softDeleteCampaigns);
router.route('/admin/campaigns/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.softDeleteManyCampaigns);
router.route('/admin/campaigns/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.bulkInsertCampaigns);
router.route('/admin/campaigns/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.bulkUpdateCampaigns);
router.route('/admin/campaigns/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.deleteCampaigns);
router.route('/admin/campaigns/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,campaignsController.deleteManyCampaigns);

module.exports = router;
