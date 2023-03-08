/**
 * track_deliverymen.js
 * @description :: sequelize model of database table track_deliverymen
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Track_deliverymen = sequelize.define('track_deliverymen',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  order_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
  longitude:{ type:DataTypes.STRING },
  latitude:{ type:DataTypes.STRING },
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
      async function (track_deliverymen,options){
        track_deliverymen.isActive = true;
        track_deliverymen.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (track_deliverymen,options){
        if (track_deliverymen !== undefined && track_deliverymen.length) { 
          for (let index = 0; index < track_deliverymen.length; index++) { 
        
            const element = track_deliverymen[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Track_deliverymen.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Track_deliverymen);
sequelizePaginate.paginate(Track_deliverymen);
module.exports = Track_deliverymen;
