/**
 * customer_addressesRoutes.js
 * @description :: CRUD API routes for customer_addresses
 */

const express = require('express');
const router = express.Router();
const customer_addressesController = require('../../../controller/device/v1/customer_addressesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/customer_addresses/create').post(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.addCustomer_addresses);
router.route('/device/api/v1/customer_addresses/list').post(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.findAllCustomer_addresses);
router.route('/device/api/v1/customer_addresses/count').post(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.getCustomer_addressesCount);
router.route('/device/api/v1/customer_addresses/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.getCustomer_addresses);
router.route('/device/api/v1/customer_addresses/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.updateCustomer_addresses);    
router.route('/device/api/v1/customer_addresses/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.partialUpdateCustomer_addresses);
router.route('/device/api/v1/customer_addresses/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.softDeleteCustomer_addresses);
router.route('/device/api/v1/customer_addresses/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.softDeleteManyCustomer_addresses);
router.route('/device/api/v1/customer_addresses/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.bulkInsertCustomer_addresses);
router.route('/device/api/v1/customer_addresses/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.bulkUpdateCustomer_addresses);
router.route('/device/api/v1/customer_addresses/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.deleteCustomer_addresses);
router.route('/device/api/v1/customer_addresses/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,customer_addressesController.deleteManyCustomer_addresses);

module.exports = router;
