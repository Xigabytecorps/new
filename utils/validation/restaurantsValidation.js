/**
 * restaurantsValidation.js
 * @description :: validate each post and put request as per restaurants model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of restaurants */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  logo: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  address: joi.any(),
  footer_text: joi.any(),
  minimum_order: joi.number().allow(0),
  comission: joi.number().allow(0),
  schedule_order: joi.number().integer().allow(0),
  opening_time: joi.date().options({ convert: true }).allow(null).allow(''),
  closeing_time: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  vendor_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  free_delivery: joi.number().integer().allow(0),
  rating: joi.string().allow(null).allow(''),
  cover_photo: joi.string().allow(null).allow(''),
  delivery: joi.number().integer().allow(0),
  take_away: joi.number().integer().allow(0),
  food_section: joi.number().integer().allow(0),
  tax: joi.number().allow(0),
  zone_id: joi.number().integer().allow(0),
  reviews_section: joi.number().integer().allow(0),
  active: joi.number().integer().allow(0),
  off_day: joi.string().allow(null).allow(''),
  gst: joi.string().allow(null).allow(''),
  self_delivery_system: joi.number().integer().allow(0),
  pos_system: joi.number().integer().allow(0),
  delivery_charge: joi.number().allow(0),
  delivery_time: joi.string().allow(null).allow(''),
  veg: joi.number().integer().allow(0),
  non_veg: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of restaurants for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  logo: joi.string().allow(null).allow(''),
  latitude: joi.string().allow(null).allow(''),
  longitude: joi.string().allow(null).allow(''),
  address: joi.any(),
  footer_text: joi.any(),
  minimum_order: joi.number().allow(0),
  comission: joi.number().allow(0),
  schedule_order: joi.number().integer().allow(0),
  opening_time: joi.date().options({ convert: true }).allow(null).allow(''),
  closeing_time: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.number().integer().allow(0),
  vendor_id: joi.number().integer().allow(0),
  created_at: joi.date().options({ convert: true }).allow(null).allow(''),
  updated_at: joi.date().options({ convert: true }).allow(null).allow(''),
  free_delivery: joi.number().integer().allow(0),
  rating: joi.string().allow(null).allow(''),
  cover_photo: joi.string().allow(null).allow(''),
  delivery: joi.number().integer().allow(0),
  take_away: joi.number().integer().allow(0),
  food_section: joi.number().integer().allow(0),
  tax: joi.number().allow(0),
  zone_id: joi.number().integer().allow(0),
  reviews_section: joi.number().integer().allow(0),
  active: joi.number().integer().allow(0),
  off_day: joi.string().allow(null).allow(''),
  gst: joi.string().allow(null).allow(''),
  self_delivery_system: joi.number().integer().allow(0),
  pos_system: joi.number().integer().allow(0),
  delivery_charge: joi.number().allow(0),
  delivery_time: joi.string().allow(null).allow(''),
  veg: joi.number().integer().allow(0),
  non_veg: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of restaurants for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      logo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      latitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      longitude: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      footer_text: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      minimum_order: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      comission: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      schedule_order: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      opening_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      closeing_time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      vendor_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      created_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updated_at: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      free_delivery: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      rating: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      cover_photo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      delivery: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      take_away: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      food_section: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      tax: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      zone_id: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      reviews_section: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      active: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      off_day: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      gst: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      self_delivery_system: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      pos_system: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      delivery_charge: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      delivery_time: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      veg: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      non_veg: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
