/**
 * phone_verifications.js
 * @description :: sequelize model of database table phone_verifications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Phone_verifications = sequelize.define('phone_verifications',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  phone:{ type:DataTypes.STRING },
  token:{ type:DataTypes.STRING },
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
      async function (phone_verifications,options){
        phone_verifications.isActive = true;
        phone_verifications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (phone_verifications,options){
        if (phone_verifications !== undefined && phone_verifications.length) { 
          for (let index = 0; index < phone_verifications.length; index++) { 
        
            const element = phone_verifications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Phone_verifications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Phone_verifications);
sequelizePaginate.paginate(Phone_verifications);
module.exports = Phone_verifications;
