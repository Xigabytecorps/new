/**
 * conversationsValidation.js
 * @description :: validate each post and put request as per conversations model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of conversations */
exports.schemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  message: joi.string().allow(null).allow(''),
  reply: joi.string().allow(null).allow(''),
  checked: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of conversations for updation */
exports.updateSchemaKeys = joi.object({
  user_id: joi.number().integer().allow(0),
  message: joi.string().allow(null).allow(''),
  reply: joi.string().allow(null).allow(''),
  checked: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of conversations for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      message: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      reply: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      checked: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
