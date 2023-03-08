/**
 * discounts.js
 * @description :: sequelize model of database table discounts
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Discounts = sequelize.define('discounts',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  start_date:{ type:DataTypes.DATEONLY },
  end_date:{ type:DataTypes.DATEONLY },
  start_time:{ type:DataTypes.DATE },
  end_time:{ type:DataTypes.DATE },
  min_purchase:{ type:DataTypes.DECIMAL },
  max_discount:{ type:DataTypes.DECIMAL },
  discount:{ type:DataTypes.DECIMAL },
  discount_type:{ type:DataTypes.STRING },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (discounts,options){
        discounts.isActive = true;
        discounts.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (discounts,options){
        if (discounts !== undefined && discounts.length) { 
          for (let index = 0; index < discounts.length; index++) { 
        
            const element = discounts[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Discounts.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Discounts);
sequelizePaginate.paginate(Discounts);
module.exports = Discounts;
