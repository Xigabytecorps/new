/**
 * currenciesValidation.js
 * @description :: validate each post and put request as per currencies model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of currencies */
exports.schemaKeys = joi.object({
  country: joi.string().allow(null).allow(''),
  currency_code: joi.string().allow(null).allow(''),
  currency_symbol: joi.string().allow(null).allow(''),
  exchange_rate: joi.number().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of currencies for updation */
exports.updateSchemaKeys = joi.object({
  country: joi.string().allow(null).allow(''),
  currency_code: joi.string().allow(null).allow(''),
  currency_symbol: joi.string().allow(null).allow(''),
  exchange_rate: joi.number().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of currencies for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      country: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      currency_code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      currency_symbol: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      exchange_rate: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
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
