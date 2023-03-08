/**
 * translations.js
 * @description :: sequelize model of database table translations
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Translations = sequelize.define('translations',{
  id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
  },
  translationable_type:{ type:DataTypes.STRING },
  translationable_id:{ type:DataTypes.BIGINT },
  locale:{ type:DataTypes.STRING },
  key:{ type:DataTypes.STRING },
  value:{ type:DataTypes.TEXT },
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
      async function (translations,options){
        translations.isActive = true;
        translations.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (translations,options){
        if (translations !== undefined && translations.length) { 
          for (let index = 0; index < translations.length; index++) { 
        
            const element = translations[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Translations.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Translations);
sequelizePaginate.paginate(Translations);
module.exports = Translations;
