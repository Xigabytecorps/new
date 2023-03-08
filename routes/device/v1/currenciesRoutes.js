/**
 * currenciesRoutes.js
 * @description :: CRUD API routes for currencies
 */

const express = require('express');
const router = express.Router();
const currenciesController = require('../../../controller/device/v1/currenciesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/currencies/create').post(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.addCurrencies);
router.route('/device/api/v1/currencies/list').post(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.findAllCurrencies);
router.route('/device/api/v1/currencies/count').post(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.getCurrenciesCount);
router.route('/device/api/v1/currencies/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.getCurrencies);
router.route('/device/api/v1/currencies/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.updateCurrencies);    
router.route('/device/api/v1/currencies/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.partialUpdateCurrencies);
router.route('/device/api/v1/currencies/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.softDeleteCurrencies);
router.route('/device/api/v1/currencies/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.softDeleteManyCurrencies);
router.route('/device/api/v1/currencies/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.bulkInsertCurrencies);
router.route('/device/api/v1/currencies/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.bulkUpdateCurrencies);
router.route('/device/api/v1/currencies/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.deleteCurrencies);
router.route('/device/api/v1/currencies/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,currenciesController.deleteManyCurrencies);

module.exports = router;
