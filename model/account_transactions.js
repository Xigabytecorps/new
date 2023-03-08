/**
 * account_transactions.js
 * @description :: sequelize model of database table account_transactions
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Account_transactions = sequelize.define('account_transactions',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  from_type:{ type:DataTypes.STRING },
  from_id:{ type:DataTypes.BIGINT },
  current_balance:{ type:DataTypes.DECIMAL },
  amount:{ type:DataTypes.DECIMAL },
  method:{ type:DataTypes.STRING },
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
      async function (account_transactions,options){
        account_transactions.isActive = true;
        account_transactions.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (account_transactions,options){
        if (account_transactions !== undefined && account_transactions.length) { 
          for (let index = 0; index < account_transactions.length; index++) { 
        
            const element = account_transactions[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Account_transactions.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Account_transactions);
sequelizePaginate.paginate(Account_transactions);
module.exports = Account_transactions;
