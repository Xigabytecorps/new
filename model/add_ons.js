/**
 * add_ons.js
 * @description :: sequelize model of database table add_ons
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Add_ons = sequelize.define('add_ons',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  name:{ type:DataTypes.STRING },
  price:{ type:DataTypes.DECIMAL },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (add_ons,options){
        add_ons.isActive = true;
        add_ons.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (add_ons,options){
        if (add_ons !== undefined && add_ons.length) { 
          for (let index = 0; index < add_ons.length; index++) { 
        
            const element = add_ons[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Add_ons.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Add_ons);
sequelizePaginate.paginate(Add_ons);
module.exports = Add_ons;
