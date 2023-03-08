/**
 * mail_configs.js
 * @description :: sequelize model of database table mail_configs
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Mail_configs = sequelize.define('mail_configs',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  host:{ type:DataTypes.STRING },
  driver:{ type:DataTypes.STRING },
  port:{ type:DataTypes.STRING },
  username:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  encryption:{ type:DataTypes.STRING },
  password:{ type:DataTypes.STRING },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (mail_configs,options){
        mail_configs.isActive = true;
        mail_configs.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (mail_configs,options){
        if (mail_configs !== undefined && mail_configs.length) { 
          for (let index = 0; index < mail_configs.length; index++) { 
        
            const element = mail_configs[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Mail_configs.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Mail_configs);
sequelizePaginate.paginate(Mail_configs);
module.exports = Mail_configs;
