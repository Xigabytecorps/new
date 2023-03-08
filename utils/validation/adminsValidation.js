/**
 * adminsValidation.js
 * @description :: validate each post and put request as per admins model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of admins */
exports.schemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  remember_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  role_id: joi.number().integer().allow(0),
  zone_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of admins for updation */
exports.updateSchemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  remember_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  role_id: joi.number().integer().allow(0),
  zone_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of admins for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      f_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      l_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      remember_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      role_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      zone_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
