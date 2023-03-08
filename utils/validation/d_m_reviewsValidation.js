/**
 * d_m_reviewsValidation.js
 * @description :: validate each post and put request as per d_m_reviews model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of d_m_reviews */
exports.schemaKeys = joi.object({
  delivery_man_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  comment: joi.any(),
  attachment: joi.string().allow(null).allow(''),
  rating: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of d_m_reviews for updation */
exports.updateSchemaKeys = joi.object({
  delivery_man_id: joi.number().integer().allow(0),
  user_id: joi.number().integer().allow(0),
  order_id: joi.number().integer().allow(0),
  comment: joi.any(),
  attachment: joi.string().allow(null).allow(''),
  rating: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of d_m_reviews for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      delivery_man_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      order_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      comment: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      attachment: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rating: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
