/**
 * restaurants.js
 * @description :: sequelize model of database table restaurants
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Restaurants = sequelize.define('restaurants',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  phone:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  logo:{ type:DataTypes.STRING },
  latitude:{ type:DataTypes.STRING },
  longitude:{ type:DataTypes.STRING },
  address:{ type:DataTypes.TEXT },
  footer_text:{ type:DataTypes.TEXT },
  minimum_order:{ type:DataTypes.DECIMAL },
  comission:{ type:DataTypes.DECIMAL },
  schedule_order:{ type:DataTypes.INTEGER },
  opening_time:{ type:DataTypes.DATE },
  closeing_time:{ type:DataTypes.DATE },
  status:{ type:DataTypes.INTEGER },
  vendor_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  free_delivery:{ type:DataTypes.INTEGER },
  rating:{ type:DataTypes.STRING },
  cover_photo:{ type:DataTypes.STRING },
  delivery:{ type:DataTypes.INTEGER },
  take_away:{ type:DataTypes.INTEGER },
  food_section:{ type:DataTypes.INTEGER },
  tax:{ type:DataTypes.DECIMAL },
  zone_id:{ type:DataTypes.BIGINT },
  reviews_section:{ type:DataTypes.INTEGER },
  active:{ type:DataTypes.INTEGER },
  off_day:{ type:DataTypes.STRING },
  gst:{ type:DataTypes.STRING },
  self_delivery_system:{ type:DataTypes.INTEGER },
  pos_system:{ type:DataTypes.INTEGER },
  delivery_charge:{ type:DataTypes.DECIMAL },
  delivery_time:{ type:DataTypes.STRING },
  veg:{ type:DataTypes.INTEGER },
  non_veg:{ type:DataTypes.INTEGER },
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
      async function (restaurants,options){
        restaurants.isActive = true;
        restaurants.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (restaurants,options){
        if (restaurants !== undefined && restaurants.length) { 
          for (let index = 0; index < restaurants.length; index++) { 
        
            const element = restaurants[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Restaurants.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Restaurants);
sequelizePaginate.paginate(Restaurants);
module.exports = Restaurants;
