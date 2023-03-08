/**
 * campaign_restaurant.js
 * @description :: sequelize model of database table campaign_restaurant
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Campaign_restaurant = sequelize.define('campaign_restaurant',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  campaign_id:{ type:DataTypes.BIGINT },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (campaign_restaurant,options){
        campaign_restaurant.isActive = true;
        campaign_restaurant.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (campaign_restaurant,options){
        if (campaign_restaurant !== undefined && campaign_restaurant.length) { 
          for (let index = 0; index < campaign_restaurant.length; index++) { 
        
            const element = campaign_restaurant[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Campaign_restaurant.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Campaign_restaurant);
sequelizePaginate.paginate(Campaign_restaurant);
module.exports = Campaign_restaurant;
