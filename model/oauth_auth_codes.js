/**
 * oauth_auth_codes.js
 * @description :: sequelize model of database table oauth_auth_codes
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Oauth_auth_codes = sequelize.define('oauth_auth_codes',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  client_id:{ type:DataTypes.BIGINT },
  scopes:{ type:DataTypes.TEXT },
  revoked:{ type:DataTypes.INTEGER },
  expires_at:{ type:DataTypes.DATE },
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
      async function (oauth_auth_codes,options){
        oauth_auth_codes.isActive = true;
        oauth_auth_codes.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (oauth_auth_codes,options){
        if (oauth_auth_codes !== undefined && oauth_auth_codes.length) { 
          for (let index = 0; index < oauth_auth_codes.length; index++) { 
        
            const element = oauth_auth_codes[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Oauth_auth_codes.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Oauth_auth_codes);
sequelizePaginate.paginate(Oauth_auth_codes);
module.exports = Oauth_auth_codes;
