/**
 * provide_d_m_earnings.js
 * @description :: sequelize model of database table provide_d_m_earnings
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Provide_d_m_earnings = sequelize.define('provide_d_m_earnings',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  delivery_man_id:{ type:DataTypes.BIGINT },
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
      async function (provide_d_m_earnings,options){
        provide_d_m_earnings.isActive = true;
        provide_d_m_earnings.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (provide_d_m_earnings,options){
        if (provide_d_m_earnings !== undefined && provide_d_m_earnings.length) { 
          for (let index = 0; index < provide_d_m_earnings.length; index++) { 
        
            const element = provide_d_m_earnings[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Provide_d_m_earnings.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Provide_d_m_earnings);
sequelizePaginate.paginate(Provide_d_m_earnings);
module.exports = Provide_d_m_earnings;
