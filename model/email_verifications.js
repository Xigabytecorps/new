/**
 * email_verifications.js
 * @description :: sequelize model of database table email_verifications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Email_verifications = sequelize.define('email_verifications',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  email:{ type:DataTypes.STRING },
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
      async function (email_verifications,options){
        email_verifications.isActive = true;
        email_verifications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (email_verifications,options){
        if (email_verifications !== undefined && email_verifications.length) { 
          for (let index = 0; index < email_verifications.length; index++) { 
        
            const element = email_verifications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Email_verifications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Email_verifications);
sequelizePaginate.paginate(Email_verifications);
module.exports = Email_verifications;
