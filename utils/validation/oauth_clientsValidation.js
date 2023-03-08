/**
 * oauth_clientsValidation.js
 * @description :: validate each post and put request as per oauth_clients model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of oauth_clients */
exports.schemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  secret: joi.string().allow(null).allow(''),
  provider: joi.string().allow(null).allow(''),
  redirect: joi.any(),
  personal_access_client: joi.number().integer().allow(0),
  password_client: joi.number().integer().allow(0),
  revoked: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of oauth_clients for updation */
exports.updateSchemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  secret: joi.string().allow(null).allow(''),
  provider: joi.string().allow(null).allow(''),
  redirect: joi.any(),
  personal_access_client: joi.number().integer().allow(0),
  password_client: joi.number().integer().allow(0),
  revoked: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of oauth_clients for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      secret: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      provider: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      redirect: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      personal_access_client: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      password_client: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      revoked: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
