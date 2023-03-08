/**
 * currenciesRoutes.js
 * @description :: CRUD API routes for currencies
 */

const express = require('express');
const router = express.Router();
const currenciesController = require('../../controller/admin/currenciesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/currencies/create').post(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.addCurrencies);
router.route('/admin/currencies/list').post(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.findAllCurrencies);
router.route('/admin/currencies/count').post(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.getCurrenciesCount);
router.route('/admin/currencies/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.getCurrencies);
router.route('/admin/currencies/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.updateCurrencies);    
router.route('/admin/currencies/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.partialUpdateCurrencies);
router.route('/admin/currencies/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.softDeleteCurrencies);
router.route('/admin/currencies/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.softDeleteManyCurrencies);
router.route('/admin/currencies/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.bulkInsertCurrencies);
router.route('/admin/currencies/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.bulkUpdateCurrencies);
router.route('/admin/currencies/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.deleteCurrencies);
router.route('/admin/currencies/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,currenciesController.deleteManyCurrencies);

module.exports = router;
