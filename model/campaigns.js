/**
 * campaigns.js
 * @description :: sequelize model of database table campaigns
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Campaigns = sequelize.define('campaigns',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  image:{ type:DataTypes.STRING },
  description:{ type:DataTypes.STRING },
  status:{ type:DataTypes.INTEGER },
  admin_id:{ type:DataTypes.BIGINT },
  created_at:{ type:DataTypes.DATE },
  updated_at:{ type:DataTypes.DATE },
  start_date:{ type:DataTypes.DATEONLY },
  end_date:{ type:DataTypes.DATEONLY },
  start_time:{ type:DataTypes.DATE },
  end_time:{ type:DataTypes.DATE },
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
      async function (campaigns,options){
        campaigns.isActive = true;
        campaigns.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (campaigns,options){
        if (campaigns !== undefined && campaigns.length) { 
          for (let index = 0; index < campaigns.length; index++) { 
        
            const element = campaigns[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Campaigns.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Campaigns);
sequelizePaginate.paginate(Campaigns);
module.exports = Campaigns;
