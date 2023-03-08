/**
 * coupons.js
 * @description :: sequelize model of database table coupons
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Coupons = sequelize.define('coupons',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  code:{ type:DataTypes.STRING },
  start_date:{ type:DataTypes.DATEONLY },
  expire_date:{ type:DataTypes.DATEONLY },
  min_purchase:{ type:DataTypes.DECIMAL },
  max_discount:{ type:DataTypes.DECIMAL },
  discount:{ type:DataTypes.DECIMAL },
  discount_type:{ type:DataTypes.STRING },
  coupon_type:{ type:DataTypes.STRING },
  limit:{ type:DataTypes.INTEGER },
  status:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  data:{ type:DataTypes.STRING },
  total_uses:{ type:DataTypes.BIGINT },
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
      async function (coupons,options){
        coupons.isActive = true;
        coupons.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (coupons,options){
        if (coupons !== undefined && coupons.length) { 
          for (let index = 0; index < coupons.length; index++) { 
        
            const element = coupons[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Coupons.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Coupons);
sequelizePaginate.paginate(Coupons);
module.exports = Coupons;
