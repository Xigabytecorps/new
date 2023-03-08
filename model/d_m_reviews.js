/**
 * d_m_reviews.js
 * @description :: sequelize model of database table d_m_reviews
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let D_m_reviews = sequelize.define('d_m_reviews',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  delivery_man_id:{ type:DataTypes.BIGINT },
  user_id:{ type:DataTypes.BIGINT },
  order_id:{ type:DataTypes.BIGINT },
  comment:{ type:DataTypes.TEXT },
  attachment:{ type:DataTypes.STRING },
  rating:{ type:DataTypes.INTEGER },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
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
      async function (d_m_reviews,options){
        d_m_reviews.isActive = true;
        d_m_reviews.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (d_m_reviews,options){
        if (d_m_reviews !== undefined && d_m_reviews.length) { 
          for (let index = 0; index < d_m_reviews.length; index++) { 
        
            const element = d_m_reviews[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
D_m_reviews.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(D_m_reviews);
sequelizePaginate.paginate(D_m_reviews);
module.exports = D_m_reviews;
