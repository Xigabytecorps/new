/**
 * oauth_refresh_tokensRoutes.js
 * @description :: CRUD API routes for oauth_refresh_tokens
 */

const express = require('express');
const router = express.Router();
const oauth_refresh_tokensController = require('../../controller/admin/oauth_refresh_tokensController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/oauth_refresh_tokens/create').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.addOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/list').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.findAllOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/count').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.getOauth_refresh_tokensCount);
router.route('/admin/oauth_refresh_tokens/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.getOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.updateOauth_refresh_tokens);    
router.route('/admin/oauth_refresh_tokens/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.partialUpdateOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.softDeleteOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.softDeleteManyOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.bulkInsertOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.bulkUpdateOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.deleteOauth_refresh_tokens);
router.route('/admin/oauth_refresh_tokens/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_refresh_tokensController.deleteManyOauth_refresh_tokens);

module.exports = router;
