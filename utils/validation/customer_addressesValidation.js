/**
 * customer_addressesValidation.js
 * @description :: validate each post and put request as per customer_addresses model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of customer_addresses */
exports.schemaKeys = joi.object({
  address_type: joi.string().allow(null).allow(''),
  contact_person_number: joi.string().allow(null).allow(''),
  address: joi.any(),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  contact_person_name: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  zone_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of customer_addresses for updation */
exports.updateSchemaKeys = joi.object({
  address_type: joi.string().allow(null).allow(''),
  contact_person_number: joi.string().allow(null).allow(''),
  address: joi.any(),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  user_id: joi.number().integer().allow(0),
  contact_person_name: joi.string().allow(null).allow(''),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  zone_id: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of customer_addresses for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      address_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      contact_person_number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      latitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      longitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      contact_person_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
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
