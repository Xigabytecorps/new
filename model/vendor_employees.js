/**
 * vendor_employees.js
 * @description :: sequelize model of database table vendor_employees
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Vendor_employees = sequelize.define('vendor_employees',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  f_name:{ type:DataTypes.STRING },
  l_name:{ type:DataTypes.STRING },
  phone:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  employee_role_id:{ type:DataTypes.BIGINT },
  vendor_id:{ type:DataTypes.BIGINT },
  store_id:{ type:DataTypes.BIGINT },
  password:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  remember_token:{ type:DataTypes.STRING },
  firebase_token:{ type:DataTypes.STRING },
  auth_token:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (vendor_employees,options){
        vendor_employees.isActive = true;
        vendor_employees.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (vendor_employees,options){
        if (vendor_employees !== undefined && vendor_employees.length) { 
          for (let index = 0; index < vendor_employees.length; index++) { 
        
            const element = vendor_employees[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Vendor_employees.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Vendor_employees);
sequelizePaginate.paginate(Vendor_employees);
module.exports = Vendor_employees;
