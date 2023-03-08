/**
 * oauth_access_tokens.js
 * @description :: sequelize model of database table oauth_access_tokens
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Oauth_access_tokens = sequelize.define('oauth_access_tokens',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  client_id:{ type:DataTypes.BIGINT },
  name:{ type:DataTypes.STRING },
  scopes:{ type:DataTypes.TEXT },
  revoked:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
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
      async function (oauth_access_tokens,options){
        oauth_access_tokens.isActive = true;
        oauth_access_tokens.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (oauth_access_tokens,options){
        if (oauth_access_tokens !== undefined && oauth_access_tokens.length) { 
          for (let index = 0; index < oauth_access_tokens.length; index++) { 
        
            const element = oauth_access_tokens[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Oauth_access_tokens.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Oauth_access_tokens);
sequelizePaginate.paginate(Oauth_access_tokens);
module.exports = Oauth_access_tokens;
