/**
 * oauth_personal_access_clients.js
 * @description :: sequelize model of database table oauth_personal_access_clients
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Oauth_personal_access_clients = sequelize.define('oauth_personal_access_clients',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  client_id:{ type:DataTypes.BIGINT },
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
      async function (oauth_personal_access_clients,options){
        oauth_personal_access_clients.isActive = true;
        oauth_personal_access_clients.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (oauth_personal_access_clients,options){
        if (oauth_personal_access_clients !== undefined && oauth_personal_access_clients.length) { 
          for (let index = 0; index < oauth_personal_access_clients.length; index++) { 
        
            const element = oauth_personal_access_clients[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Oauth_personal_access_clients.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Oauth_personal_access_clients);
sequelizePaginate.paginate(Oauth_personal_access_clients);
module.exports = Oauth_personal_access_clients;
