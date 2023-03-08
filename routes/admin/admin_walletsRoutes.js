/**
 * admin_walletsRoutes.js
 * @description :: CRUD API routes for admin_wallets
 */

const express = require('express');
const router = express.Router();
const admin_walletsController = require('../../controller/admin/admin_walletsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/admin_wallets/create').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.addAdmin_wallets);
router.route('/admin/admin_wallets/list').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.findAllAdmin_wallets);
router.route('/admin/admin_wallets/count').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.getAdmin_walletsCount);
router.route('/admin/admin_wallets/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.getAdmin_wallets);
router.route('/admin/admin_wallets/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.updateAdmin_wallets);    
router.route('/admin/admin_wallets/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.partialUpdateAdmin_wallets);
router.route('/admin/admin_wallets/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.softDeleteAdmin_wallets);
router.route('/admin/admin_wallets/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.softDeleteManyAdmin_wallets);
router.route('/admin/admin_wallets/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.bulkInsertAdmin_wallets);
router.route('/admin/admin_wallets/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.bulkUpdateAdmin_wallets);
router.route('/admin/admin_wallets/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.deleteAdmin_wallets);
router.route('/admin/admin_wallets/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,admin_walletsController.deleteManyAdmin_wallets);

module.exports = router;
