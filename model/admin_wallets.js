/**
 * admin_wallets.js
 * @description :: sequelize model of database table admin_wallets
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Admin_wallets = sequelize.define('admin_wallets',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  admin_id:{ type:DataTypes.BIGINT },
  total_commission_earning:{ type:DataTypes.DECIMAL },
  digital_received:{ type:DataTypes.DECIMAL },
  manual_received:{ type:DataTypes.DECIMAL },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  delivery_charge:{ type:DataTypes.DECIMAL },
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
      async function (admin_wallets,options){
        admin_wallets.isActive = true;
        admin_wallets.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (admin_wallets,options){
        if (admin_wallets !== undefined && admin_wallets.length) { 
          for (let index = 0; index < admin_wallets.length; index++) { 
        
            const element = admin_wallets[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Admin_wallets.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Admin_wallets);
sequelizePaginate.paginate(Admin_wallets);
module.exports = Admin_wallets;
