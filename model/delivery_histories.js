/**
 * delivery_histories.js
 * @description :: sequelize model of database table delivery_histories
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Delivery_histories = sequelize.define('delivery_histories',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  order_id:{ type:DataTypes.BIGINT },
  delivery_man_id:{ type:DataTypes.BIGINT },
  time:{ type:DataTypes.DATE },
  longitude:{ type:DataTypes.STRING },
  latitude:{ type:DataTypes.STRING },
  location:{ type:DataTypes.STRING },
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
      async function (delivery_histories,options){
        delivery_histories.isActive = true;
        delivery_histories.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (delivery_histories,options){
        if (delivery_histories !== undefined && delivery_histories.length) { 
          for (let index = 0; index < delivery_histories.length; index++) { 
        
            const element = delivery_histories[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Delivery_histories.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Delivery_histories);
sequelizePaginate.paginate(Delivery_histories);
module.exports = Delivery_histories;
