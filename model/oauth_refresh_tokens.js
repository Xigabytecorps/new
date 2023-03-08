/**
 * oauth_refresh_tokens.js
 * @description :: sequelize model of database table oauth_refresh_tokens
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Oauth_refresh_tokens = sequelize.define('oauth_refresh_tokens',{
  id:{
    type:DataTypes.STRING,
    primaryKey:true,
    autoIncrement:true
  },
  access_token_id:{ type:DataTypes.STRING },
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
      async function (oauth_refresh_tokens,options){
        oauth_refresh_tokens.isActive = true;
        oauth_refresh_tokens.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (oauth_refresh_tokens,options){
        if (oauth_refresh_tokens !== undefined && oauth_refresh_tokens.length) { 
          for (let index = 0; index < oauth_refresh_tokens.length; index++) { 
        
            const element = oauth_refresh_tokens[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Oauth_refresh_tokens.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Oauth_refresh_tokens);
sequelizePaginate.paginate(Oauth_refresh_tokens);
module.exports = Oauth_refresh_tokens;
