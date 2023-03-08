/**
 * oauth_access_tokensRoutes.js
 * @description :: CRUD API routes for oauth_access_tokens
 */

const express = require('express');
const router = express.Router();
const oauth_access_tokensController = require('../../controller/admin/oauth_access_tokensController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/oauth_access_tokens/create').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.addOauth_access_tokens);
router.route('/admin/oauth_access_tokens/list').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.findAllOauth_access_tokens);
router.route('/admin/oauth_access_tokens/count').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.getOauth_access_tokensCount);
router.route('/admin/oauth_access_tokens/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.getOauth_access_tokens);
router.route('/admin/oauth_access_tokens/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.updateOauth_access_tokens);    
router.route('/admin/oauth_access_tokens/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.partialUpdateOauth_access_tokens);
router.route('/admin/oauth_access_tokens/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.softDeleteOauth_access_tokens);
router.route('/admin/oauth_access_tokens/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.softDeleteManyOauth_access_tokens);
router.route('/admin/oauth_access_tokens/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.bulkInsertOauth_access_tokens);
router.route('/admin/oauth_access_tokens/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.bulkUpdateOauth_access_tokens);
router.route('/admin/oauth_access_tokens/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.deleteOauth_access_tokens);
router.route('/admin/oauth_access_tokens/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,oauth_access_tokensController.deleteManyOauth_access_tokens);

module.exports = router;
