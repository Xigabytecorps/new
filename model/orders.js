/**
 * orders.js
 * @description :: sequelize model of database table orders
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Orders = sequelize.define('orders',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  order_amount:{ type:DataTypes.DECIMAL },
  coupon_discount_amount:{ type:DataTypes.DECIMAL },
  coupon_discount_title:{ type:DataTypes.STRING },
  payment_status:{ type:DataTypes.STRING },
  order_status:{ type:DataTypes.STRING },
  total_tax_amount:{ type:DataTypes.DECIMAL },
  payment_method:{ type:DataTypes.STRING },
  transaction_reference:{ type:DataTypes.STRING },
  delivery_address_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
  coupon_code:{ type:DataTypes.STRING },
  order_note:{ type:DataTypes.TEXT },
  order_type:{ type:DataTypes.STRING },
  checked:{ type:DataTypes.INTEGER },
  store_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  delivery_charge:{ type:DataTypes.DECIMAL },
  schedule_at:{ type:DataTypes.DATE },
  callback:{ type:DataTypes.STRING },
  otp:{ type:DataTypes.STRING },
  pending:{ type:DataTypes.DATE },
  accepted:{ type:DataTypes.DATE },
  confirmed:{ type:DataTypes.DATE },
  processing:{ type:DataTypes.DATE },
  handover:{ type:DataTypes.DATE },
  picked_up:{ type:DataTypes.DATE },
  delivered:{ type:DataTypes.DATE },
  canceled:{ type:DataTypes.DATE },
  refund_requested:{ type:DataTypes.DATE },
  refunded:{ type:DataTypes.DATE },
  delivery_address:{ type:DataTypes.TEXT },
  scheduled:{ type:DataTypes.INTEGER },
  store_discount_amount:{ type:DataTypes.DECIMAL },
  original_delivery_charge:{ type:DataTypes.DECIMAL },
  failed:{ type:DataTypes.DATE },
  adjusment:{ type:DataTypes.DECIMAL },
  edited:{ type:DataTypes.INTEGER },
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
      async function (orders,options){
        orders.isActive = true;
        orders.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (orders,options){
        if (orders !== undefined && orders.length) { 
          for (let index = 0; index < orders.length; index++) { 
        
            const element = orders[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Orders.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Orders);
sequelizePaginate.paginate(Orders);
module.exports = Orders;
