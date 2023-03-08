/**
 * usersValidation.js
 * @description :: validate each post and put request as per users model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of users */
exports.schemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  is_phone_verified: joi.number().integer().allow(0),
  email_verified_at: joi.date().options({ convert: true }).allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  remember_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  interest: joi.string().allow(null).allow(''),
  cm_firebase_token: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  order_count: joi.number().integer().allow(0),
  login_medium: joi.string().allow(null).allow(''),
  social_id: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of users for updation */
exports.updateSchemaKeys = joi.object({
  f_name: joi.string().allow(null).allow(''),
  l_name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  is_phone_verified: joi.number().integer().allow(0),
  email_verified_at: joi.date().options({ convert: true }).allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  remember_token: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  interest: joi.string().allow(null).allow(''),
  cm_firebase_token: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  order_count: joi.number().integer().allow(0),
  login_medium: joi.string().allow(null).allow(''),
  social_id: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of users for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      f_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      l_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      is_phone_verified: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      email_verified_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      remember_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      interest: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      cm_firebase_token: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      order_count: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      login_medium: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      social_id: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
