/**
 * withdraw_requests.js
 * @description :: sequelize model of database table withdraw_requests
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Withdraw_requests = sequelize.define('withdraw_requests',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  vendor_id:{ type:DataTypes.BIGINT },
  admin_id:{ type:DataTypes.BIGINT },
  transaction_note:{ type:DataTypes.STRING },
  amount:{ type:DataTypes.DECIMAL },
  approved:{ type:DataTypes.INTEGER },
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
      async function (withdraw_requests,options){
        withdraw_requests.isActive = true;
        withdraw_requests.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (withdraw_requests,options){
        if (withdraw_requests !== undefined && withdraw_requests.length) { 
          for (let index = 0; index < withdraw_requests.length; index++) { 
        
            const element = withdraw_requests[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Withdraw_requests.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Withdraw_requests);
sequelizePaginate.paginate(Withdraw_requests);
module.exports = Withdraw_requests;
