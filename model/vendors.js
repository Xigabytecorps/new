/**
 * vendors.js
 * @description :: sequelize model of database table vendors
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Vendors = sequelize.define('vendors',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  f_name:{ type:DataTypes.STRING },
  l_name:{ type:DataTypes.STRING },
  phone:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  email_verified_at:{ type:DataTypes.DATE },
  password:{ type:DataTypes.STRING },
  remember_token:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  bank_name:{ type:DataTypes.STRING },
  branch:{ type:DataTypes.STRING },
  holder_name:{ type:DataTypes.STRING },
  account_no:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  firebase_token:{ type:DataTypes.STRING },
  auth_token:{ type:DataTypes.STRING },
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
      async function (vendors,options){
        vendors.isActive = true;
        vendors.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (vendors,options){
        if (vendors !== undefined && vendors.length) { 
          for (let index = 0; index < vendors.length; index++) { 
        
            const element = vendors[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Vendors.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Vendors);
sequelizePaginate.paginate(Vendors);
module.exports = Vendors;
