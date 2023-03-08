/**
 * account_transactionsRoutes.js
 * @description :: CRUD API routes for account_transactions
 */

const express = require('express');
const router = express.Router();
const account_transactionsController = require('../../../controller/device/v1/account_transactionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/account_transactions/create').post(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.addAccount_transactions);
router.route('/device/api/v1/account_transactions/list').post(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.findAllAccount_transactions);
router.route('/device/api/v1/account_transactions/count').post(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.getAccount_transactionsCount);
router.route('/device/api/v1/account_transactions/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.getAccount_transactions);
router.route('/device/api/v1/account_transactions/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.updateAccount_transactions);    
router.route('/device/api/v1/account_transactions/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.partialUpdateAccount_transactions);
router.route('/device/api/v1/account_transactions/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.softDeleteAccount_transactions);
router.route('/device/api/v1/account_transactions/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.softDeleteManyAccount_transactions);
router.route('/device/api/v1/account_transactions/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.bulkInsertAccount_transactions);
router.route('/device/api/v1/account_transactions/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.bulkUpdateAccount_transactions);
router.route('/device/api/v1/account_transactions/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.deleteAccount_transactions);
router.route('/device/api/v1/account_transactions/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,account_transactionsController.deleteManyAccount_transactions);

module.exports = router;
