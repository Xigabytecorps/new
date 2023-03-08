/**
 * discountsValidation.js
 * @description :: validate each post and put request as per discounts model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of discounts */
exports.schemaKeys = joi.object({
  start_date: joi.any(),
  end_date: joi.any(),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  min_purchase: joi.number().allow(0),
  max_discount: joi.number().allow(0),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of discounts for updation */
exports.updateSchemaKeys = joi.object({
  start_date: joi.any(),
  end_date: joi.any(),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  min_purchase: joi.number().allow(0),
  max_discount: joi.number().allow(0),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of discounts for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      start_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      end_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      start_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      end_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      min_purchase: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      max_discount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      store_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
