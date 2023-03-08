/**
 * campaign_restaurantRoutes.js
 * @description :: CRUD API routes for campaign_restaurant
 */

const express = require('express');
const router = express.Router();
const campaign_restaurantController = require('../../../controller/device/v1/campaign_restaurantController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/campaign_restaurant/create').post(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.addCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/list').post(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.findAllCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/count').post(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.getCampaign_restaurantCount);
router.route('/device/api/v1/campaign_restaurant/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.getCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.updateCampaign_restaurant);    
router.route('/device/api/v1/campaign_restaurant/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.partialUpdateCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.softDeleteCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.softDeleteManyCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.bulkInsertCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.bulkUpdateCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.deleteCampaign_restaurant);
router.route('/device/api/v1/campaign_restaurant/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,campaign_restaurantController.deleteManyCampaign_restaurant);

module.exports = router;
