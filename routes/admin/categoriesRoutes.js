/**
 * categoriesRoutes.js
 * @description :: CRUD API routes for categories
 */

const express = require('express');
const router = express.Router();
const categoriesController = require('../../controller/admin/categoriesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/categories/create').post(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.addCategories);
router.route('/admin/categories/list').post(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.findAllCategories);
router.route('/admin/categories/count').post(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.getCategoriesCount);
router.route('/admin/categories/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.getCategories);
router.route('/admin/categories/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.updateCategories);    
router.route('/admin/categories/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.partialUpdateCategories);
router.route('/admin/categories/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.softDeleteCategories);
router.route('/admin/categories/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.softDeleteManyCategories);
router.route('/admin/categories/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.bulkInsertCategories);
router.route('/admin/categories/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.bulkUpdateCategories);
router.route('/admin/categories/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.deleteCategories);
router.route('/admin/categories/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,categoriesController.deleteManyCategories);

module.exports = router;
