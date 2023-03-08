/**
 * employee_roles.js
 * @description :: sequelize model of database table employee_roles
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Employee_roles = sequelize.define('employee_roles',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  modules:{ type:DataTypes.TEXT },
  status:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (employee_roles,options){
        employee_roles.isActive = true;
        employee_roles.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (employee_roles,options){
        if (employee_roles !== undefined && employee_roles.length) { 
          for (let index = 0; index < employee_roles.length; index++) { 
        
            const element = employee_roles[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Employee_roles.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Employee_roles);
sequelizePaginate.paginate(Employee_roles);
module.exports = Employee_roles;
