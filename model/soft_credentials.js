/**
 * soft_credentials.js
 * @description :: sequelize model of database table soft_credentials
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Soft_credentials = sequelize.define('soft_credentials',{
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
      async function (soft_credentials,options){
        soft_credentials.isActive = true;
        soft_credentials.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (soft_credentials,options){
        if (soft_credentials !== undefined && soft_credentials.length) { 
          for (let index = 0; index < soft_credentials.length; index++) { 
        
            const element = soft_credentials[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Soft_credentials.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Soft_credentials);
sequelizePaginate.paginate(Soft_credentials);
module.exports = Soft_credentials;
