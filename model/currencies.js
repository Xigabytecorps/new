/**
 * currencies.js
 * @description :: sequelize model of database table currencies
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Currencies = sequelize.define('currencies',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  country:{ type:DataTypes.STRING },
  currency_code:{ type:DataTypes.STRING },
  currency_symbol:{ type:DataTypes.STRING },
  exchange_rate:{ type:DataTypes.DECIMAL },
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
      async function (currencies,options){
        currencies.isActive = true;
        currencies.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (currencies,options){
        if (currencies !== undefined && currencies.length) { 
          for (let index = 0; index < currencies.length; index++) { 
        
            const element = currencies[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Currencies.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Currencies);
sequelizePaginate.paginate(Currencies);
module.exports = Currencies;
