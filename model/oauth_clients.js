/**
 * oauth_clients.js
 * @description :: sequelize model of database table oauth_clients
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Oauth_clients = sequelize.define('oauth_clients',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  name:{ type:DataTypes.STRING },
  secret:{ type:DataTypes.STRING },
  provider:{ type:DataTypes.STRING },
  redirect:{ type:DataTypes.TEXT },
  personal_access_client:{ type:DataTypes.INTEGER },
  password_client:{ type:DataTypes.INTEGER },
  revoked:{ type:DataTypes.INTEGER },
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
      async function (oauth_clients,options){
        oauth_clients.isActive = true;
        oauth_clients.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (oauth_clients,options){
        if (oauth_clients !== undefined && oauth_clients.length) { 
          for (let index = 0; index < oauth_clients.length; index++) { 
        
            const element = oauth_clients[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Oauth_clients.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Oauth_clients);
sequelizePaginate.paginate(Oauth_clients);
module.exports = Oauth_clients;
