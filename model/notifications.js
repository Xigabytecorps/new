/**
 * notifications.js
 * @description :: sequelize model of database table notifications
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Notifications = sequelize.define('notifications',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  description:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  tergat:{ type:DataTypes.STRING },
  zone_id:{ type:DataTypes.BIGINT },
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
      async function (notifications,options){
        notifications.isActive = true;
        notifications.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (notifications,options){
        if (notifications !== undefined && notifications.length) { 
          for (let index = 0; index < notifications.length; index++) { 
        
            const element = notifications[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Notifications.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Notifications);
sequelizePaginate.paginate(Notifications);
module.exports = Notifications;
