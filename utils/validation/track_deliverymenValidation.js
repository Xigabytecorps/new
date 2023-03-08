/**
 * track_deliverymenValidation.js
 * @description :: validate each post and put request as per track_deliverymen model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of track_deliverymen */
exports.schemaKeys = joi.object({
  order_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  longitude: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of track_deliverymen for updation */
exports.updateSchemaKeys = joi.object({
  order_id: joi.number().integer().allow(0),
  delivery_man_id: joi.number().integer().allow(0),
  longitude: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of track_deliverymen for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      order_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      delivery_man_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      longitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      latitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
