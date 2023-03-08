/**
 * user_notifications.js
 * @description :: sequelize model of database table user_notifications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let User_notifications = sequelize.define('user_notifications',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  data:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  user_id:{ type:DataTypes.BIGINT },
  vendor_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
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
      async function (user_notifications,options){
        user_notifications.isActive = true;
        user_notifications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (user_notifications,options){
        if (user_notifications !== undefined && user_notifications.length) { 
          for (let index = 0; index < user_notifications.length; index++) { 
        
            const element = user_notifications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
User_notifications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(User_notifications);
sequelizePaginate.paginate(User_notifications);
module.exports = User_notifications;
