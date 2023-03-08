/**
 * conversations.js
 * @description :: sequelize model of database table conversations
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Conversations = sequelize.define('conversations',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  message:{ type:DataTypes.STRING },
  reply:{ type:DataTypes.STRING },
  checked:{ type:DataTypes.INTEGER },
  image:{ type:DataTypes.STRING },
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
      async function (conversations,options){
        conversations.isActive = true;
        conversations.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (conversations,options){
        if (conversations !== undefined && conversations.length) { 
          for (let index = 0; index < conversations.length; index++) { 
        
            const element = conversations[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Conversations.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Conversations);
sequelizePaginate.paginate(Conversations);
module.exports = Conversations;
