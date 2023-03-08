/**
 * delivery_men.js
 * @description :: sequelize model of database table delivery_men
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Delivery_men = sequelize.define('delivery_men',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  f_name:{ type:DataTypes.STRING },
  l_name:{ type:DataTypes.STRING },
  phone:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  identity_number:{ type:DataTypes.STRING },
  identity_type:{ type:DataTypes.STRING },
  identity_image:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  password:{ type:DataTypes.STRING },
  auth_token:{ type:DataTypes.STRING },
  fcm_token:{ type:DataTypes.STRING },
  zone_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  status:{ type:DataTypes.INTEGER },
  active:{ type:DataTypes.INTEGER },
  earning:{ type:DataTypes.INTEGER },
  current_orders:{ type:DataTypes.INTEGER },
  type:{ type:DataTypes.STRING },
  store_id:{ type:DataTypes.BIGINT },
  application_status:{ type:DataTypes.ENUM },
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
      async function (delivery_men,options){
        delivery_men.isActive = true;
        delivery_men.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (delivery_men,options){
        if (delivery_men !== undefined && delivery_men.length) { 
          for (let index = 0; index < delivery_men.length; index++) { 
        
            const element = delivery_men[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Delivery_men.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Delivery_men);
sequelizePaginate.paginate(Delivery_men);
module.exports = Delivery_men;
