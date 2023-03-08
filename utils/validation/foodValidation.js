/**
 * foodValidation.js
 * @description :: validate each post and put request as per food model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of food */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.any(),
  image: joi.string().allow(null).allow(''),
  category_id: joi.number().integer().allow(0),
  category_ids: joi.string().allow(null).allow(''),
  variations: joi.any(),
  add_ons: joi.string().allow(null).allow(''),
  attributes: joi.string().allow(null).allow(''),
  choice_options: joi.any(),
  price: joi.number().allow(0),
  tax: joi.number().allow(0),
  tax_type: joi.string().allow(null).allow(''),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  available_time_starts: joi.date().options({ convert: true }).allow(null).allow(''),
  available_time_ends: joi.date().options({ convert: true }).allow(null).allow(''),
  veg: joi.number().integer().allow(0),
  status: joi.number().integer().allow(0),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  order_count: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of food for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.any(),
  image: joi.string().allow(null).allow(''),
  category_id: joi.number().integer().allow(0),
  category_ids: joi.string().allow(null).allow(''),
  variations: joi.any(),
  add_ons: joi.string().allow(null).allow(''),
  attributes: joi.string().allow(null).allow(''),
  choice_options: joi.any(),
  price: joi.number().allow(0),
  tax: joi.number().allow(0),
  tax_type: joi.string().allow(null).allow(''),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  available_time_starts: joi.date().options({ convert: true }).allow(null).allow(''),
  available_time_ends: joi.date().options({ convert: true }).allow(null).allow(''),
  veg: joi.number().integer().allow(0),
  status: joi.number().integer().allow(0),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  order_count: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of food for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      category_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      category_ids: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      variations: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      add_ons: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      attributes: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      choice_options: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      tax: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      tax_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      available_time_starts: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      available_time_ends: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      veg: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      store_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      order_count: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
