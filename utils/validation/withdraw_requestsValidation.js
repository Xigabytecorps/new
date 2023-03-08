/**
 * withdraw_requestsValidation.js
 * @description :: validate each post and put request as per withdraw_requests model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of withdraw_requests */
exports.schemaKeys = joi.object({
  vendor_id: joi.number().integer().allow(0),
  admin_id: joi.number().integer().allow(0),
  transaction_note: joi.string().allow(null).allow(''),
  amount: joi.number().allow(0),
  approved: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of withdraw_requests for updation */
exports.updateSchemaKeys = joi.object({
  vendor_id: joi.number().integer().allow(0),
  admin_id: joi.number().integer().allow(0),
  transaction_note: joi.string().allow(null).allow(''),
  amount: joi.number().allow(0),
  approved: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of withdraw_requests for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      vendor_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      admin_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      transaction_note: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      approved: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
