/**
 * delivery_man_wallets.js
 * @description :: sequelize model of database table delivery_man_wallets
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Delivery_man_wallets = sequelize.define('delivery_man_wallets',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  delivery_man_id:{ type:DataTypes.BIGINT },
  collected_cash:{ type:DataTypes.DECIMAL },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  total_earning:{ type:DataTypes.DECIMAL },
  total_withdrawn:{ type:DataTypes.DECIMAL },
  pending_withdraw:{ type:DataTypes.DECIMAL },
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
      async function (delivery_man_wallets,options){
        delivery_man_wallets.isActive = true;
        delivery_man_wallets.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (delivery_man_wallets,options){
        if (delivery_man_wallets !== undefined && delivery_man_wallets.length) { 
          for (let index = 0; index < delivery_man_wallets.length; index++) { 
        
            const element = delivery_man_wallets[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Delivery_man_wallets.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Delivery_man_wallets);
sequelizePaginate.paginate(Delivery_man_wallets);
module.exports = Delivery_man_wallets;
