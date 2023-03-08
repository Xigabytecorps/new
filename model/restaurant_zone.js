/**
 * restaurant_zone.js
 * @description :: sequelize model of database table restaurant_zone
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Restaurant_zone = sequelize.define('restaurant_zone',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  store_id:{ type:DataTypes.BIGINT },
  zone_id:{ type:DataTypes.BIGINT },
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
      async function (restaurant_zone,options){
        restaurant_zone.isActive = true;
        restaurant_zone.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (restaurant_zone,options){
        if (restaurant_zone !== undefined && restaurant_zone.length) { 
          for (let index = 0; index < restaurant_zone.length; index++) { 
        
            const element = restaurant_zone[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Restaurant_zone.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Restaurant_zone);
sequelizePaginate.paginate(Restaurant_zone);
module.exports = Restaurant_zone;
