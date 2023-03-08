/**
 * oauth_auth_codesValidation.js
 * @description :: validate each post and put request as per oauth_auth_codes model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of oauth_auth_codes */
exports.schemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  client_id: joi.number().integer().allow(0),
  scopes: joi.any(),
  revoked: joi.number().integer().allow(0),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of oauth_auth_codes for updation */
exports.updateSchemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  client_id: joi.number().integer().allow(0),
  scopes: joi.any(),
  revoked: joi.number().integer().allow(0),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of oauth_auth_codes for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      client_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      scopes: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      revoked: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      expires_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
