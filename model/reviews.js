/**
 * reviews.js
 * @description :: sequelize model of database table reviews
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Reviews = sequelize.define('reviews',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  item_id:{ type:DataTypes.BIGINT },
  user_id:{ type:DataTypes.BIGINT },
  comment:{ type:DataTypes.TEXT },
  attachment:{ type:DataTypes.STRING },
  rating:{ type:DataTypes.INTEGER },
  order_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  item_campaign_id:{ type:DataTypes.BIGINT },
  status:{ type:DataTypes.INTEGER },
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
      async function (reviews,options){
        reviews.isActive = true;
        reviews.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (reviews,options){
        if (reviews !== undefined && reviews.length) { 
          for (let index = 0; index < reviews.length; index++) { 
        
            const element = reviews[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Reviews.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Reviews);
sequelizePaginate.paginate(Reviews);
module.exports = Reviews;
