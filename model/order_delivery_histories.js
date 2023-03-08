/**
 * order_delivery_histories.js
 * @description :: sequelize model of database table order_delivery_histories
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Order_delivery_histories = sequelize.define('order_delivery_histories',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  order_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
  start_time:{ type:DataTypes.DATE },
  end_time:{ type:DataTypes.DATE },
  start_location:{ type:DataTypes.STRING },
  end_location:{ type:DataTypes.STRING },
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
      async function (order_delivery_histories,options){
        order_delivery_histories.isActive = true;
        order_delivery_histories.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (order_delivery_histories,options){
        if (order_delivery_histories !== undefined && order_delivery_histories.length) { 
          for (let index = 0; index < order_delivery_histories.length; index++) { 
        
            const element = order_delivery_histories[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Order_delivery_histories.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Order_delivery_histories);
sequelizePaginate.paginate(Order_delivery_histories);
module.exports = Order_delivery_histories;
