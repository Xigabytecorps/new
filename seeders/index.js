/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Alvena54' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'JQtEu9w4Nuqshgc',
        'isDeleted':false,
        'username':'Alvena54',
        'email':'Krystal6@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'JQtEu9w4Nuqshgc',
        'isDeleted':false,
        'username':'Alvena54',
        'email':'Krystal6@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Alvena54' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Ari83' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'0eGRwv2bd1Q0yLF',
        'isDeleted':false,
        'username':'Ari83',
        'email':'Claire4@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'0eGRwv2bd1Q0yLF',
        'isDeleted':false,
        'username':'Ari83',
        'email':'Claire4@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Ari83' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/add_ons/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/add_ons/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/add_ons/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/add_ons/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/add_ons/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/add_ons/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/add_ons/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/add_ons/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/add_ons/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/add_ons/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/add_ons/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banners/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/banners/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banners/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banners/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/banners/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/banners/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/banners/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/banners/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banners/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banners/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banners/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banners/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banners/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banners/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banners/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banners/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banners/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banners/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banners/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banners/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banners/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banners/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banners/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banners/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/banners/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/banners/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banners/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/categories/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/categories/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/categories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/categories/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/categories/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/categories/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/categories/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/categories/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/categories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/categories/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/categories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/categories/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/categories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/categories/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/categories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/categories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/categories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/categories/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/categories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/categories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/categories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/categories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/categories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/categories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/categories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/categories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/categories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/coupons/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/coupons/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/coupons/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/coupons/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/coupons/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/coupons/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/coupons/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/coupons/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/coupons/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/coupons/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/coupons/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/food/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/food/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/food/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/food/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/food/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/food/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/food/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/food/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/food/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/food/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/food/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/food/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/food/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/food/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/food/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/food/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/food/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/food/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/food/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/food/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/food/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/food/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/food/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/food/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/food/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/food/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/food/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_details/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order_details/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_details/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/order_details/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/order_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/order_details/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/order_details/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_details/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_details/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_details/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_details/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/order_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order_details/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_details/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/account_transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/account_transactions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account_transactions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/account_transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account_transactions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/account_transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/admin_roles/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/admin_roles/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_roles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/admin_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/admin_roles/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/admin_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/admin_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/admin_wallets/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admin_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admin_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/admin_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/admin_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/admin_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/admins/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admins/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/admins/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admins/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/admins/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admins/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/admins/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/admins/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/admins/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admins/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/admins/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admins/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admins/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/admins/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admins/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admins/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admins/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admins/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admins/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/admins/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/admins/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/admins/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/admins/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/admins/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/attributes/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/attributes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/attributes/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/attributes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/attributes/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/attributes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/attributes/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/attributes/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/attributes/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/attributes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/attributes/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/attributes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/attributes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/attributes/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/attributes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/attributes/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/attributes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/business_settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/business_settings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/business_settings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/business_settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/business_settings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/business_settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/campaign_restaurant/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/campaign_restaurant/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaign_restaurant/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/campaign_restaurant/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/campaign_restaurant/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/campaign_restaurant/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaigns/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaigns/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaigns/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/campaigns/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/campaigns/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/campaigns/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/campaigns/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/campaigns/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/campaigns/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/campaigns/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/campaigns/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/campaigns/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/conversations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/conversations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/conversations/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/conversations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/conversations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/conversations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/conversations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/conversations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/conversations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/currencies/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/currencies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/currencies/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/currencies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/currencies/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/currencies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/currencies/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/currencies/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/currencies/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/currencies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/currencies/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/currencies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/currencies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/currencies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/currencies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/currencies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/currencies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/customer_addresses/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/customer_addresses/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer_addresses/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/customer_addresses/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/customer_addresses/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/customer_addresses/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/d_m_reviews/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/d_m_reviews/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/d_m_reviews/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/d_m_reviews/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/d_m_reviews/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/d_m_reviews/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/d_m_reviews/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/d_m_reviews/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/d_m_reviews/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/d_m_reviews/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/delivery_histories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/delivery_histories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_histories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_histories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_histories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_histories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/delivery_man_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/delivery_man_wallets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_man_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_man_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_man_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_man_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/delivery_men/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/delivery_men/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/delivery_men/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/delivery_men/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/delivery_men/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/delivery_men/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/delivery_men/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_men/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/delivery_men/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/delivery_men/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/discounts/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/discounts/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/discounts/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/discounts/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/discounts/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/discounts/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/discounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/discounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/discounts/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/discounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/discounts/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/discounts/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/email_verifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/email_verifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/email_verifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/email_verifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/email_verifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/email_verifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/employee_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/employee_roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/employee_roles/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/employee_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/employee_roles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/employee_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/employee_roles/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/employee_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/failed_jobs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/failed_jobs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/failed_jobs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/failed_jobs/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/failed_jobs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/failed_jobs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/failed_jobs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/failed_jobs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/failed_jobs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/failed_jobs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item_campaigns/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/item_campaigns/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/item_campaigns/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item_campaigns/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item_campaigns/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/item_campaigns/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/item_campaigns/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/item_campaigns/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/mail_configs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/mail_configs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/mail_configs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/mail_configs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/mail_configs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/mail_configs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/mail_configs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/mail_configs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/mail_configs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/mail_configs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/migrations/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/migrations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/migrations/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/migrations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/migrations/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/migrations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/migrations/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/migrations/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/migrations/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/migrations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/migrations/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/migrations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/migrations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/migrations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/migrations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/migrations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/migrations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/notifications/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/notifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/notifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/notifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/notifications/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/notifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/notifications/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/notifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/notifications/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/notifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/notifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/notifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/notifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/notifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/notifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/oauth_access_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/oauth_access_tokens/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_access_tokens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_access_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_access_tokens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_access_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/oauth_auth_codes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/oauth_auth_codes/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_auth_codes/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_auth_codes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_auth_codes/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_auth_codes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/oauth_clients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/oauth_clients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/oauth_clients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/oauth_clients/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/oauth_clients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_clients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_clients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_clients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_clients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/oauth_personal_access_clients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/oauth_personal_access_clients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_personal_access_clients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_personal_access_clients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_personal_access_clients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_personal_access_clients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/oauth_refresh_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/oauth_refresh_tokens/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/oauth_refresh_tokens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_refresh_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/oauth_refresh_tokens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/oauth_refresh_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/order_delivery_histories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/order_delivery_histories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_delivery_histories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/order_delivery_histories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order_delivery_histories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_delivery_histories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/order_transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/order_transactions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order_transactions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/order_transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order_transactions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/order_transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orders/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orders/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orders/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orders/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orders/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orders/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orders/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/orders/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/orders/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orders/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orders/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orders/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orders/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/orders/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orders/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orders/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orders/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orders/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orders/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orders/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orders/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/orders/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/orders/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orders/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/password_resets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/password_resets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/password_resets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/password_resets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/password_resets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/password_resets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/password_resets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/phone_verifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/phone_verifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/phone_verifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/phone_verifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/phone_verifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/phone_verifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/provide_d_m_earnings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/provide_d_m_earnings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/provide_d_m_earnings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/provide_d_m_earnings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/provide_d_m_earnings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/provide_d_m_earnings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/restaurant_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/restaurant_wallets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurant_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurant_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/restaurant_zone/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/restaurant_zone/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/restaurant_zone/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurant_zone/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurant_zone/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurant_zone/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurant_zone/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/restaurants/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/restaurants/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/restaurants/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/restaurants/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/restaurants/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/restaurants/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/restaurants/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurants/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/restaurants/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/restaurants/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/reviews/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/reviews/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/reviews/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/reviews/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/reviews/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/reviews/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/reviews/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/reviews/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/reviews/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/reviews/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/soft_credentials/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/soft_credentials/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/soft_credentials/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/soft_credentials/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/soft_credentials/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/soft_credentials/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/track_deliverymen/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/track_deliverymen/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/track_deliverymen/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/track_deliverymen/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/track_deliverymen/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/track_deliverymen/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/translations/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/translations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/translations/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/translations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/translations/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/translations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/translations/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/translations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/translations/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/translations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/translations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/translations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/translations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/translations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/translations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/translations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/translations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/translations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/translations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/translations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/translations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/translations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/translations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/translations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/user_notifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user_notifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_notifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/user_notifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user_notifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_notifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/users/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/users/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/users/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/vendor_employees/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/vendor_employees/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendor_employees/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/vendor_employees/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/vendor_employees/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/vendor_employees/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendors/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/vendors/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/vendors/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/vendors/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/vendors/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/vendors/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/vendors/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/vendors/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/vendors/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/vendors/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wishlists/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wishlists/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wishlists/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/wishlists/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wishlists/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wishlists/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wishlists/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wishlists/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wishlists/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/wishlists/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wishlists/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wishlists/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/withdraw_requests/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/withdraw_requests/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/withdraw_requests/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/withdraw_requests/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/withdraw_requests/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/withdraw_requests/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/add_ons/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/add_ons/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/add_ons/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/add_ons/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/add_ons/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/add_ons/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/add_ons/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/add_ons/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/add_ons/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/add_ons/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/banners/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/banners/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/banners/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/banners/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banners/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/banners/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banners/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banners/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banners/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banners/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/categories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/categories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/categories/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/categories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/categories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/categories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/categories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/coupons/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/coupons/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/coupons/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/coupons/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/coupons/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/coupons/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/coupons/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/coupons/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/coupons/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/coupons/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/food/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/food/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/food/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/food/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/food/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/food/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/food/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/food/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_details/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_details/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_details/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_details/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_details/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_details/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_details/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account_transactions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account_transactions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account_transactions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account_transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_roles/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_roles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_roles/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admin_wallets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admin_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admin_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admin_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/admins/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/admins/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/admins/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/admins/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/admins/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admins/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/admins/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/admins/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/attributes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/attributes/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/attributes/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/attributes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/attributes/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/attributes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/business_settings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/business_settings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/business_settings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/business_settings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/business_settings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/business_settings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/campaign_restaurant/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/campaign_restaurant/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaign_restaurant/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/campaign_restaurant/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/campaign_restaurant/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaign_restaurant/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/campaigns/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/campaigns/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/campaigns/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/campaigns/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/campaigns/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/campaigns/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/conversations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/conversations/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/conversations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/conversations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/conversations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/conversations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/currencies/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/currencies/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/currencies/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/currencies/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/currencies/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/currencies/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customer_addresses/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customer_addresses/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer_addresses/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customer_addresses/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customer_addresses/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer_addresses/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/d_m_reviews/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/d_m_reviews/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/d_m_reviews/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/d_m_reviews/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/d_m_reviews/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/d_m_reviews/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_histories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_histories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_histories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_histories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_histories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_histories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_man_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_men/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/delivery_men/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/delivery_men/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_men/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/delivery_men/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/delivery_men/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/discounts/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/discounts/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/discounts/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/discounts/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/discounts/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/discounts/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/email_verifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/email_verifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/email_verifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/email_verifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/email_verifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/email_verifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/employee_roles/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/employee_roles/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/employee_roles/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/employee_roles/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/employee_roles/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/employee_roles/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/failed_jobs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/failed_jobs/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/failed_jobs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/failed_jobs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/failed_jobs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/failed_jobs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/item_campaigns/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/item_campaigns/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item_campaigns/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item_campaigns/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item_campaigns/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item_campaigns/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/mail_configs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/mail_configs/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/mail_configs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/mail_configs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/mail_configs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/mail_configs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/migrations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/migrations/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/migrations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/migrations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/migrations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/migrations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/notifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/notifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/notifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/notifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/notifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/notifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_access_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_auth_codes/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_clients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_clients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_clients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_clients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_clients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_clients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_personal_access_clients/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/oauth_refresh_tokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_delivery_histories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_delivery_histories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_delivery_histories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_delivery_histories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_delivery_histories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_delivery_histories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order_transactions/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order_transactions/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order_transactions/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order_transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/orders/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/orders/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/orders/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/orders/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orders/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orders/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orders/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orders/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/password_resets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/password_resets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/password_resets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/password_resets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/password_resets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/password_resets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/phone_verifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/phone_verifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/phone_verifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/phone_verifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/phone_verifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/phone_verifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/provide_d_m_earnings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurant_wallets/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurant_wallets/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_wallets/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurant_wallets/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurant_wallets/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_wallets/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurant_zone/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurant_zone/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurant_zone/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurant_zone/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurant_zone/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurant_zone/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurants/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/restaurants/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/restaurants/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurants/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/restaurants/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/restaurants/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/reviews/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/reviews/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/reviews/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/reviews/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/reviews/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/reviews/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/reviews/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/soft_credentials/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/soft_credentials/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/soft_credentials/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/soft_credentials/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/soft_credentials/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/soft_credentials/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/track_deliverymen/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/track_deliverymen/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/track_deliverymen/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/track_deliverymen/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/track_deliverymen/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/track_deliverymen/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/translations/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/translations/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/translations/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/translations/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/translations/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/translations/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_notifications/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_notifications/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_notifications/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_notifications/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_notifications/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_notifications/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/users/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/users/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/users/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/users/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/vendor_employees/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/vendor_employees/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendor_employees/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/vendor_employees/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/vendor_employees/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendor_employees/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/vendors/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/vendors/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/vendors/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/vendors/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/vendors/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/vendors/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/vendors/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/wishlists/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wishlists/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wishlists/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wishlists/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wishlists/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wishlists/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/withdraw_requests/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/withdraw_requests/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/withdraw_requests/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/withdraw_requests/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/withdraw_requests/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/withdraw_requests/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Alvena54',
      'password':'JQtEu9w4Nuqshgc'
    },{
      'username':'Ari83',
      'password':'0eGRwv2bd1Q0yLF'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;