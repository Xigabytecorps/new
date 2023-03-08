/**
 * restaurant_zoneController.js
 * @description :: exports action methods for restaurant_zone.
 */

const Restaurant_zone = require('../../model/restaurant_zone');
const restaurant_zoneSchemaKey = require('../../utils/validation/restaurant_zoneValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Restaurant_zone in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Restaurant_zone. {status, message, data}
 */ 
const addRestaurant_zone = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      restaurant_zoneSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRestaurant_zone = await dbService.createOne(Restaurant_zone,dataToCreate);
    return  res.success({ data :createdRestaurant_zone });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Restaurant_zone in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Restaurant_zones. {status, message, data}
 */
const bulkInsertRestaurant_zone = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRestaurant_zone = await dbService.createMany(Restaurant_zone,dataToCreate); 
      return  res.success({ data :{ count :createdRestaurant_zone.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Restaurant_zone from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Restaurant_zone(s). {status, message, data}
 */
const findAllRestaurant_zone = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRestaurant_zone;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      restaurant_zoneSchemaKey.findFilterKeys,
      Restaurant_zone.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRestaurant_zone = await dbService.count(Restaurant_zone, query);
      if (!foundRestaurant_zone) {
        return res.recordNotFound();
      } 
      foundRestaurant_zone = { totalRecords: foundRestaurant_zone };
      return res.success({ data :foundRestaurant_zone });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRestaurant_zone = await dbService.paginate( Restaurant_zone,query,options);
    if (!foundRestaurant_zone){
      return res.recordNotFound();
    }
    return res.success({ data:foundRestaurant_zone }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Restaurant_zone from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Restaurant_zone. {status, message, data}
 */
const getRestaurant_zone = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRestaurant_zone = await dbService.findOne(Restaurant_zone,{ id :id });
    if (!foundRestaurant_zone){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRestaurant_zone });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Restaurant_zone.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRestaurant_zoneCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      restaurant_zoneSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRestaurant_zone = await dbService.count(Restaurant_zone,where);
    if (!countedRestaurant_zone){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRestaurant_zone } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Restaurant_zone with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_zone.
 * @return {Object} : updated Restaurant_zone. {status, message, data}
 */
const updateRestaurant_zone = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      restaurant_zoneSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRestaurant_zone = await dbService.update(Restaurant_zone,query,dataToUpdate);
    return  res.success({ data :updatedRestaurant_zone }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Restaurant_zone with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_zones.
 * @return {Object} : updated Restaurant_zones. {status, message, data}
 */
const bulkUpdateRestaurant_zone = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRestaurant_zone = await dbService.update(Restaurant_zone,filter,dataToUpdate);
    if (!updatedRestaurant_zone){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRestaurant_zone.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Restaurant_zone with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_zone.
 * @return {Object} : updated Restaurant_zone. {status, message, data}
 */
const partialUpdateRestaurant_zone = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      restaurant_zoneSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRestaurant_zone = await dbService.update(Restaurant_zone, query, dataToUpdate);
    if (!updatedRestaurant_zone) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRestaurant_zone });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Restaurant_zone from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Restaurant_zone.
 * @return {Object} : deactivated Restaurant_zone. {status, message, data}
 */
const softDeleteRestaurant_zone = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Restaurant_zone, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Restaurant_zone from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Restaurant_zone. {status, message, data}
 */
const deleteRestaurant_zone = async (req, res) => {
  const result = await dbService.deleteByPk(Restaurant_zone, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Restaurant_zone in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRestaurant_zone = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedRestaurant_zone = await dbService.destroy(Restaurant_zone,query);
    return res.success({ data :{ count :deletedRestaurant_zone.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Restaurant_zone from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Restaurant_zone.
 * @return {Object} : number of deactivated documents of Restaurant_zone. {status, message, data}
 */
const softDeleteManyRestaurant_zone = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedRestaurant_zone = await dbService.update(Restaurant_zone,query,updateBody, options);
    if (!updatedRestaurant_zone) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedRestaurant_zone.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRestaurant_zone,
  bulkInsertRestaurant_zone,
  findAllRestaurant_zone,
  getRestaurant_zone,
  getRestaurant_zoneCount,
  updateRestaurant_zone,
  bulkUpdateRestaurant_zone,
  partialUpdateRestaurant_zone,
  softDeleteRestaurant_zone,
  deleteRestaurant_zone,
  deleteManyRestaurant_zone,
  softDeleteManyRestaurant_zone,
};
