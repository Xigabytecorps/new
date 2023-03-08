/**
 * item_campaigns.js
 * @description :: sequelize model of database table item_campaigns
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Item_campaigns = sequelize.define('item_campaigns',{
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
  start_date:{ type:DataTypes.DATEONLY },
  end_date:{ type:DataTypes.DATEONLY },
  start_time:{ type:DataTypes.DATE },
  end_time:{ type:DataTypes.DATE },
  category_id:{ type:DataTypes.BIGINT },
  category_ids:{ type:DataTypes.STRING },
  variations:{ type:DataTypes.TEXT },
  add_ons:{ type:DataTypes.STRING },
  attributes:{ type:DataTypes.STRING },
  choice_options:{ type:DataTypes.TEXT },
  price:{ type:DataTypes.DECIMAL },
  tax:{ type:DataTypes.DECIMAL },
  tax_type:{ type:DataTypes.STRING },
  discount:{ type:DataTypes.DECIMAL },
  discount_type:{ type:DataTypes.STRING },
  store_id:{ type:DataTypes.BIGINT },
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
      async function (item_campaigns,options){
        item_campaigns.isActive = true;
        item_campaigns.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (item_campaigns,options){
        if (item_campaigns !== undefined && item_campaigns.length) { 
          for (let index = 0; index < item_campaigns.length; index++) { 
        
            const element = item_campaigns[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Item_campaigns.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Item_campaigns);
sequelizePaginate.paginate(Item_campaigns);
module.exports = Item_campaigns;
