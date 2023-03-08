/**
 * couponsValidation.js
 * @description :: validate each post and put request as per coupons model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of coupons */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  start_date: joi.any(),
  expire_date: joi.any(),
  min_purchase: joi.number().allow(0),
  max_discount: joi.number().allow(0),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  coupon_type: joi.string().allow(null).allow(''),
  limit: joi.number().integer().allow(0),
  status: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  total_uses: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of coupons for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  start_date: joi.any(),
  expire_date: joi.any(),
  min_purchase: joi.number().allow(0),
  max_discount: joi.number().allow(0),
  discount: joi.number().allow(0),
  discount_type: joi.string().allow(null).allow(''),
  coupon_type: joi.string().allow(null).allow(''),
  limit: joi.number().integer().allow(0),
  status: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  total_uses: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of coupons for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      start_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      expire_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      min_purchase: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      max_discount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      discount_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      coupon_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      limit: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      total_uses: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
