/**
 * wishlists.js
 * @description :: sequelize model of database table wishlists
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Wishlists = sequelize.define('wishlists',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{ type:DataTypes.BIGINT },
  item_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (wishlists,options){
        wishlists.isActive = true;
        wishlists.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (wishlists,options){
        if (wishlists !== undefined && wishlists.length) { 
          for (let index = 0; index < wishlists.length; index++) { 
        
            const element = wishlists[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Wishlists.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Wishlists);
sequelizePaginate.paginate(Wishlists);
module.exports = Wishlists;
