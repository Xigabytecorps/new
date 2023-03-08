/**
 * restaurant_wallets.js
 * @description :: sequelize model of database table restaurant_wallets
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Restaurant_wallets = sequelize.define('restaurant_wallets',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  vendor_id:{ type:DataTypes.BIGINT },
  total_earning:{ type:DataTypes.DECIMAL },
  total_withdrawn:{ type:DataTypes.DECIMAL },
  pending_withdraw:{ type:DataTypes.DECIMAL },
  collected_cash:{ type:DataTypes.DECIMAL },
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
      async function (restaurant_wallets,options){
        restaurant_wallets.isActive = true;
        restaurant_wallets.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (restaurant_wallets,options){
        if (restaurant_wallets !== undefined && restaurant_wallets.length) { 
          for (let index = 0; index < restaurant_wallets.length; index++) { 
        
            const element = restaurant_wallets[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Restaurant_wallets.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Restaurant_wallets);
sequelizePaginate.paginate(Restaurant_wallets);
module.exports = Restaurant_wallets;
