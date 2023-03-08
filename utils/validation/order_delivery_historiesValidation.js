/**
 * order_delivery_historiesValidation.js
 * @description :: validate each post and put request as per order_delivery_histories model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of order_delivery_histories */
exports.schemaKeys = joi.object({
  order_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  start_location: joi.string().allow(null).allow(''),
  end_location: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of order_delivery_histories for updation */
exports.updateSchemaKeys = joi.object({
  order_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  start_location: joi.string().allow(null).allow(''),
  end_location: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of order_delivery_histories for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      order_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      delivery_man_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      start_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      end_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      start_location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      end_location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
