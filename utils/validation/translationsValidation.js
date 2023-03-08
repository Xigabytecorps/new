/**
 * translationsValidation.js
 * @description :: validate each post and put request as per translations model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of translations */
exports.schemaKeys = joi.object({
  translationable_type: joi.string().allow(null).allow(''),
  translationable_id: joi.number().integer().allow(0),
  locale: joi.string().allow(null).allow(''),
  key: joi.string().allow(null).allow(''),
  value: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of translations for updation */
exports.updateSchemaKeys = joi.object({
  translationable_type: joi.string().allow(null).allow(''),
  translationable_id: joi.number().integer().allow(0),
  locale: joi.string().allow(null).allow(''),
  key: joi.string().allow(null).allow(''),
  value: joi.any(),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of translations for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      translationable_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      translationable_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      locale: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      key: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      value: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
