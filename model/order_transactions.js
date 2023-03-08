/**
 * order_transactions.js
 * @description :: sequelize model of database table order_transactions
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Order_transactions = sequelize.define('order_transactions',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  vendor_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
  order_id:{ type:DataTypes.BIGINT },
  order_amount:{ type:DataTypes.DECIMAL },
  restaurant_amount:{ type:DataTypes.DECIMAL },
  admin_commission:{ type:DataTypes.DECIMAL },
  received_by:{ type:DataTypes.STRING },
  status:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  delivery_charge:{ type:DataTypes.DECIMAL },
  original_delivery_charge:{ type:DataTypes.DECIMAL },
  tax:{ type:DataTypes.DECIMAL },
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
      async function (order_transactions,options){
        order_transactions.isActive = true;
        order_transactions.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (order_transactions,options){
        if (order_transactions !== undefined && order_transactions.length) { 
          for (let index = 0; index < order_transactions.length; index++) { 
        
            const element = order_transactions[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Order_transactions.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Order_transactions);
sequelizePaginate.paginate(Order_transactions);
module.exports = Order_transactions;
