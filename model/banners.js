/**
 * banners.js
 * @description :: sequelize model of database table banners
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Banners = sequelize.define('banners',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  type:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  data:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  zone_id:{ type:DataTypes.BIGINT },
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
      async function (banners,options){
        banners.isActive = true;
        banners.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (banners,options){
        if (banners !== undefined && banners.length) { 
          for (let index = 0; index < banners.length; index++) { 
        
            const element = banners[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Banners.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Banners);
sequelizePaginate.paginate(Banners);
module.exports = Banners;
