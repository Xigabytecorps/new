/**
 * delivery_man_walletsValidation.js
 * @description :: validate each post and put request as per delivery_man_wallets model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of delivery_man_wallets */
exports.schemaKeys = joi.object({
  delivery_man_id: joi.number().integer().allow(0),
  collected_cash: joi.number().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  total_earning: joi.number().allow(0),
  total_withdrawn: joi.number().allow(0),
  pending_withdraw: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of delivery_man_wallets for updation */
exports.updateSchemaKeys = joi.object({
  delivery_man_id: joi.number().integer().allow(0),
  collected_cash: joi.number().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  total_earning: joi.number().allow(0),
  total_withdrawn: joi.number().allow(0),
  pending_withdraw: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of delivery_man_wallets for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      delivery_man_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      collected_cash: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      total_earning: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      total_withdrawn: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      pending_withdraw: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
