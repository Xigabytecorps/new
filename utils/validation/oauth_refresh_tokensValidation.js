/**
 * oauth_refresh_tokensValidation.js
 * @description :: validate each post and put request as per oauth_refresh_tokens model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of oauth_refresh_tokens */
exports.schemaKeys = joi.object({
  access_token_id: joi.string().allow(null).allow(''),
  revoked: joi.number().integer().allow(0),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of oauth_refresh_tokens for updation */
exports.updateSchemaKeys = joi.object({
  access_token_id: joi.string().allow(null).allow(''),
  revoked: joi.number().integer().allow(0),
  expires_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of oauth_refresh_tokens for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      access_token_id: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
