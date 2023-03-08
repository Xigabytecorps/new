/**
 * order_details.js
 * @description :: sequelize model of database table order_details
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Order_details = sequelize.define('order_details',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  item_id:{ type:DataTypes.BIGINT },
  order_id:{ type:DataTypes.BIGINT },
  price:{ type:DataTypes.DECIMAL },
  food_details:{ type:DataTypes.TEXT },
  variation:{ type:DataTypes.STRING },
  add_ons:{ type:DataTypes.TEXT },
  discount_on_item:{ type:DataTypes.DECIMAL },
  discount_type:{ type:DataTypes.STRING },
  quantity:{ type:DataTypes.INTEGER },
  tax_amount:{ type:DataTypes.DECIMAL },
  variant:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  item_campaign_id:{ type:DataTypes.BIGINT },
  total_add_on_price:{ type:DataTypes.DECIMAL },
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
      async function (order_details,options){
        order_details.isActive = true;
        order_details.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (order_details,options){
        if (order_details !== undefined && order_details.length) { 
          for (let index = 0; index < order_details.length; index++) { 
        
            const element = order_details[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Order_details.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Order_details);
sequelizePaginate.paginate(Order_details);
module.exports = Order_details;
