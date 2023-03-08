/**
 * users.js
 * @description :: sequelize model of database table users
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Users = sequelize.define('users',{
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
  is_phone_verified:{ type:DataTypes.INTEGER },
  email_verified_at:{ type:DataTypes.DATE },
  password:{ type:DataTypes.STRING },
  remember_token:{ type:DataTypes.STRING },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  interest:{ type:DataTypes.STRING },
  cm_firebase_token:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  order_count:{ type:DataTypes.INTEGER },
  login_medium:{ type:DataTypes.STRING },
  social_id:{ type:DataTypes.STRING },
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
      async function (users,options){
        users.isActive = true;
        users.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (users,options){
        if (users !== undefined && users.length) { 
          for (let index = 0; index < users.length; index++) { 
        
            const element = users[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Users.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Users);
sequelizePaginate.paginate(Users);
module.exports = Users;
