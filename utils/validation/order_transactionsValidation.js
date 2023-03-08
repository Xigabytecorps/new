/**
 * order_transactionsValidation.js
 * @description :: validate each post and put request as per order_transactions model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of order_transactions */
exports.schemaKeys = joi.object({
  vendor_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  order_amount: joi.number().allow(0),
  restaurant_amount: joi.number().allow(0),
  admin_commission: joi.number().allow(0),
  received_by: joi.string().allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  delivery_charge: joi.number().allow(0),
  original_delivery_charge: joi.number().allow(0),
  tax: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of order_transactions for updation */
exports.updateSchemaKeys = joi.object({
  vendor_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  order_amount: joi.number().allow(0),
  restaurant_amount: joi.number().allow(0),
  admin_commission: joi.number().allow(0),
  received_by: joi.string().allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  delivery_charge: joi.number().allow(0),
  original_delivery_charge: joi.number().allow(0),
  tax: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of order_transactions for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      vendor_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      delivery_man_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      order_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      order_amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      restaurant_amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      admin_commission: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      received_by: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      delivery_charge: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      original_delivery_charge: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      tax: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
