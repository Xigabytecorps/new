/**
 * migrationsRoutes.js
 * @description :: CRUD API routes for migrations
 */

const express = require('express');
const router = express.Router();
const migrationsController = require('../../controller/admin/migrationsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/migrations/create').post(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.addMigrations);
router.route('/admin/migrations/list').post(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.findAllMigrations);
router.route('/admin/migrations/count').post(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.getMigrationsCount);
router.route('/admin/migrations/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.getMigrations);
router.route('/admin/migrations/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.updateMigrations);    
router.route('/admin/migrations/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.partialUpdateMigrations);
router.route('/admin/migrations/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.softDeleteMigrations);
router.route('/admin/migrations/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.softDeleteManyMigrations);
router.route('/admin/migrations/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.bulkInsertMigrations);
router.route('/admin/migrations/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.bulkUpdateMigrations);
router.route('/admin/migrations/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.deleteMigrations);
router.route('/admin/migrations/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,migrationsController.deleteManyMigrations);

module.exports = router;
