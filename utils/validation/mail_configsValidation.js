/**
 * mail_configsValidation.js
 * @description :: validate each post and put request as per mail_configs model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of mail_configs */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  host: joi.string().allow(null).allow(''),
  driver: joi.string().allow(null).allow(''),
  port: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  encryption: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of mail_configs for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  host: joi.string().allow(null).allow(''),
  driver: joi.string().allow(null).allow(''),
  port: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  encryption: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  store_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of mail_configs for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      host: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      driver: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      port: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      encryption: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      store_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
