/**
 * order_detailsValidation.js
 * @description :: validate each post and put request as per order_details model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of order_details */
exports.schemaKeys = joi.object({
  item_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  food_details: joi.any(),
  variation: joi.string().allow(null).allow(''),
  add_ons: joi.any(),
  discount_on_item: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  quantity: joi.number().integer().allow(0),
  tax_amount: joi.number().allow(0),
  variant: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  item_campaign_id: joi.number().integer().allow(0),
  total_add_on_price: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of order_details for updation */
exports.updateSchemaKeys = joi.object({
  item_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  food_details: joi.any(),
  variation: joi.string().allow(null).allow(''),
  add_ons: joi.any(),
  discount_on_item: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  quantity: joi.number().integer().allow(0),
  tax_amount: joi.number().allow(0),
  variant: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  item_campaign_id: joi.number().integer().allow(0),
  total_add_on_price: joi.number().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of order_details for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      item_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      order_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      food_details: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      variation: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      add_ons: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      discount_on_item: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      quantity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      tax_amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      variant: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      item_campaign_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      total_add_on_price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
