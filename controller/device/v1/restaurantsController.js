/**
 * restaurantsController.js
 * @description :: exports action methods for restaurants.
 */

const Restaurants = require('../../../model/restaurants');
const restaurantsSchemaKey = require('../../../utils/validation/restaurantsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Restaurants in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Restaurants. {status, message, data}
 */ 
const addRestaurants = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      restaurantsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRestaurants = await dbService.createOne(Restaurants,dataToCreate);
    return  res.success({ data :createdRestaurants });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Restaurants in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Restaurantss. {status, message, data}
 */
const bulkInsertRestaurants = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRestaurants = await dbService.createMany(Restaurants,dataToCreate); 
      return  res.success({ data :{ count :createdRestaurants.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Restaurants from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Restaurants(s). {status, message, data}
 */
const findAllRestaurants = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRestaurants;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      restaurantsSchemaKey.findFilterKeys,
      Restaurants.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRestaurants = await dbService.count(Restaurants, query);
      if (!foundRestaurants) {
        return res.recordNotFound();
      } 
      foundRestaurants = { totalRecords: foundRestaurants };
      return res.success({ data :foundRestaurants });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRestaurants = await dbService.paginate( Restaurants,query,options);
    if (!foundRestaurants){
      return res.recordNotFound();
    }
    return res.success({ data:foundRestaurants }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Restaurants from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Restaurants. {status, message, data}
 */
const getRestaurants = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRestaurants = await dbService.findOne(Restaurants,{ id :id });
    if (!foundRestaurants){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRestaurants });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Restaurants.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRestaurantsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      restaurantsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRestaurants = await dbService.count(Restaurants,where);
    if (!countedRestaurants){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRestaurants } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Restaurants with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurants.
 * @return {Object} : updated Restaurants. {status, message, data}
 */
const updateRestaurants = async (req, res) => {
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
      restaurantsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRestaurants = await dbService.update(Restaurants,query,dataToUpdate);
    return  res.success({ data :updatedRestaurants }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Restaurants with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurantss.
 * @return {Object} : updated Restaurantss. {status, message, data}
 */
const bulkUpdateRestaurants = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRestaurants = await dbService.update(Restaurants,filter,dataToUpdate);
    if (!updatedRestaurants){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRestaurants.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Restaurants with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurants.
 * @return {Object} : updated Restaurants. {status, message, data}
 */
const partialUpdateRestaurants = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      restaurantsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRestaurants = await dbService.update(Restaurants, query, dataToUpdate);
    if (!updatedRestaurants) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRestaurants });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Restaurants from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Restaurants.
 * @return {Object} : deactivated Restaurants. {status, message, data}
 */
const softDeleteRestaurants = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Restaurants, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Restaurants from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Restaurants. {status, message, data}
 */
const deleteRestaurants = async (req, res) => {
  const result = await dbService.deleteByPk(Restaurants, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Restaurants in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRestaurants = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedRestaurants = await dbService.destroy(Restaurants,query);
    return res.success({ data :{ count :deletedRestaurants.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Restaurants from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Restaurants.
 * @return {Object} : number of deactivated documents of Restaurants. {status, message, data}
 */
const softDeleteManyRestaurants = async (req, res) => {
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
    let updatedRestaurants = await dbService.update(Restaurants,query,updateBody, options);
    if (!updatedRestaurants) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedRestaurants.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRestaurants,
  bulkInsertRestaurants,
  findAllRestaurants,
  getRestaurants,
  getRestaurantsCount,
  updateRestaurants,
  bulkUpdateRestaurants,
  partialUpdateRestaurants,
  softDeleteRestaurants,
  deleteRestaurants,
  deleteManyRestaurants,
  softDeleteManyRestaurants,
};
