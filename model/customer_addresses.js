/**
 * customer_addresses.js
 * @description :: sequelize model of database table customer_addresses
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Customer_addresses = sequelize.define('customer_addresses',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  address_type:{ type:DataTypes.STRING },
  contact_person_number:{ type:DataTypes.STRING },
  address:{ type:DataTypes.TEXT },
  latitude:{ type:DataTypes.STRING },
  longitude:{ type:DataTypes.STRING },
  user_id:{ type:DataTypes.BIGINT },
  contact_person_name:{ type:DataTypes.STRING },
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
      async function (customer_addresses,options){
        customer_addresses.isActive = true;
        customer_addresses.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (customer_addresses,options){
        if (customer_addresses !== undefined && customer_addresses.length) { 
          for (let index = 0; index < customer_addresses.length; index++) { 
        
            const element = customer_addresses[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Customer_addresses.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Customer_addresses);
sequelizePaginate.paginate(Customer_addresses);
module.exports = Customer_addresses;
