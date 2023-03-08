/**
 * campaignsValidation.js
 * @description :: validate each post and put request as per campaigns model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of campaigns */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  admin_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  start_date: joi.any(),
  end_date: joi.any(),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of campaigns for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  status: joi.number().integer().allow(0),
  admin_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  start_date: joi.any(),
  end_date: joi.any(),
  start_time: joi.date().options({ convert: true }).allow(null).allow(''),
  end_time: joi.date().options({ convert: true }).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of campaigns for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      admin_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      start_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      end_date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      start_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      end_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
