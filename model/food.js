/**
 * food.js
 * @description :: sequelize model of database table food
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Food = sequelize.define('food',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  description:{ type:DataTypes.TEXT },
  image:{ type:DataTypes.STRING },
  category_id:{ type:DataTypes.BIGINT },
  category_ids:{ type:DataTypes.STRING },
  variations:{ type:DataTypes.TEXT },
  add_ons:{ type:DataTypes.STRING },
  attributes:{ type:DataTypes.STRING },
  choice_options:{ type:DataTypes.TEXT },
  price:{ type:DataTypes.DECIMAL },
  tax:{ type:DataTypes.DECIMAL },
  tax_type:{ type:DataTypes.STRING },
  discount:{ type:DataTypes.DECIMAL },
  discount_type:{ type:DataTypes.STRING },
  available_time_starts:{ type:DataTypes.DATE },
  available_time_ends:{ type:DataTypes.DATE },
  veg:{ type:DataTypes.INTEGER },
  status:{ type:DataTypes.INTEGER },
  store_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  order_count:{ type:DataTypes.INTEGER },
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
      async function (food,options){
        food.isActive = true;
        food.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (food,options){
        if (food !== undefined && food.length) { 
          for (let index = 0; index < food.length; index++) { 
        
            const element = food[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Food.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Food);
sequelizePaginate.paginate(Food);
module.exports = Food;
