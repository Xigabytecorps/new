/**
 * account_transactionsValidation.js
 * @description :: validate each post and put request as per account_transactions model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of account_transactions */
exports.schemaKeys = joi.object({
  from_type: joi.string().allow(null).allow(''),
  from_id: joi.number().integer().allow(0),
  current_balance: joi.number().allow(0),
  amount: joi.number().allow(0),
  method: joi.string().allow(null).allow(''),
  ref: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of account_transactions for updation */
exports.updateSchemaKeys = joi.object({
  from_type: joi.string().allow(null).allow(''),
  from_id: joi.number().integer().allow(0),
  current_balance: joi.number().allow(0),
  amount: joi.number().allow(0),
  method: joi.string().allow(null).allow(''),
  ref: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of account_transactions for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      from_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      from_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      current_balance: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      method: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ref: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
