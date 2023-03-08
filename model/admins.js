/**
 * admins.js
 * @description :: sequelize model of database table admins
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admins = sequelize.define('admins',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  f_name:{ type:DataTypes.STRING },
  l_name:{ type:DataTypes.STRING },
  phone:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  password:{ type:DataTypes.STRING },
  remember_token:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  role_id:{ type:DataTypes.BIGINT },
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
      async function (admins,options){
        admins.isActive = true;
        admins.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admins,options){
        if (admins !== undefined && admins.length) { 
          for (let index = 0; index < admins.length; index++) { 
        
            const element = admins[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admins.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admins);
sequelizePaginate.paginate(Admins);
module.exports = Admins;
