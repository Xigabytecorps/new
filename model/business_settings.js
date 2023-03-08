/**
 * business_settings.js
 * @description :: sequelize model of database table business_settings
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Business_settings = sequelize.define('business_settings',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  key:{ type:DataTypes.STRING },
  value:{ type:DataTypes.TEXT },
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
      async function (business_settings,options){
        business_settings.isActive = true;
        business_settings.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (business_settings,options){
        if (business_settings !== undefined && business_settings.length) { 
          for (let index = 0; index < business_settings.length; index++) { 
        
            const element = business_settings[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Business_settings.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Business_settings);
sequelizePaginate.paginate(Business_settings);
module.exports = Business_settings;
