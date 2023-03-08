/**
 * delivery_menValidation.js
 * @description :: validate each post and put request as per delivery_men model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of delivery_men */
exports.schemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  identity_number: joi.string().allow(null).allow(''),
  identity_type: joi.string().allow(null).allow(''),
  identity_image: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  auth_token: joi.string().allow(null).allow(''),
  fcm_token: joi.string().allow(null).allow(''),
  zone_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  active: joi.number().integer().allow(0),
  earning: joi.number().integer().allow(0),
  current_orders: joi.number().integer().allow(0),
  type: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  application_status: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of delivery_men for updation */
exports.updateSchemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  identity_number: joi.string().allow(null).allow(''),
  identity_type: joi.string().allow(null).allow(''),
  identity_image: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  auth_token: joi.string().allow(null).allow(''),
  fcm_token: joi.string().allow(null).allow(''),
  zone_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  active: joi.number().integer().allow(0),
  earning: joi.number().integer().allow(0),
  current_orders: joi.number().integer().allow(0),
  type: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  application_status: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of delivery_men for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      f_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      l_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      identity_number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      identity_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      identity_image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      auth_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      fcm_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      zone_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      active: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      earning: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      current_orders: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      store_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      application_status: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
