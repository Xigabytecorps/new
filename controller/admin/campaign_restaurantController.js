/**
 * campaign_restaurantController.js
 * @description :: exports action methods for campaign_restaurant.
 */

const Campaign_restaurant = require('../../model/campaign_restaurant');
const campaign_restaurantSchemaKey = require('../../utils/validation/campaign_restaurantValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Campaign_restaurant in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Campaign_restaurant. {status, message, data}
 */ 
const addCampaign_restaurant = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      campaign_restaurantSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCampaign_restaurant = await dbService.createOne(Campaign_restaurant,dataToCreate);
    return  res.success({ data :createdCampaign_restaurant });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Campaign_restaurant in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Campaign_restaurants. {status, message, data}
 */
const bulkInsertCampaign_restaurant = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCampaign_restaurant = await dbService.createMany(Campaign_restaurant,dataToCreate); 
      return  res.success({ data :{ count :createdCampaign_restaurant.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Campaign_restaurant from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Campaign_restaurant(s). {status, message, data}
 */
const findAllCampaign_restaurant = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCampaign_restaurant;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      campaign_restaurantSchemaKey.findFilterKeys,
      Campaign_restaurant.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCampaign_restaurant = await dbService.count(Campaign_restaurant, query);
      if (!foundCampaign_restaurant) {
        return res.recordNotFound();
      } 
      foundCampaign_restaurant = { totalRecords: foundCampaign_restaurant };
      return res.success({ data :foundCampaign_restaurant });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCampaign_restaurant = await dbService.paginate( Campaign_restaurant,query,options);
    if (!foundCampaign_restaurant){
      return res.recordNotFound();
    }
    return res.success({ data:foundCampaign_restaurant }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Campaign_restaurant from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Campaign_restaurant. {status, message, data}
 */
const getCampaign_restaurant = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCampaign_restaurant = await dbService.findOne(Campaign_restaurant,{ id :id });
    if (!foundCampaign_restaurant){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCampaign_restaurant });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Campaign_restaurant.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCampaign_restaurantCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      campaign_restaurantSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCampaign_restaurant = await dbService.count(Campaign_restaurant,where);
    if (!countedCampaign_restaurant){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCampaign_restaurant } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Campaign_restaurant with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Campaign_restaurant.
 * @return {Object} : updated Campaign_restaurant. {status, message, data}
 */
const updateCampaign_restaurant = async (req, res) => {
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
      campaign_restaurantSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCampaign_restaurant = await dbService.update(Campaign_restaurant,query,dataToUpdate);
    return  res.success({ data :updatedCampaign_restaurant }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Campaign_restaurant with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Campaign_restaurants.
 * @return {Object} : updated Campaign_restaurants. {status, message, data}
 */
const bulkUpdateCampaign_restaurant = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCampaign_restaurant = await dbService.update(Campaign_restaurant,filter,dataToUpdate);
    if (!updatedCampaign_restaurant){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCampaign_restaurant.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Campaign_restaurant with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Campaign_restaurant.
 * @return {Object} : updated Campaign_restaurant. {status, message, data}
 */
const partialUpdateCampaign_restaurant = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      campaign_restaurantSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCampaign_restaurant = await dbService.update(Campaign_restaurant, query, dataToUpdate);
    if (!updatedCampaign_restaurant) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCampaign_restaurant });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Campaign_restaurant from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Campaign_restaurant.
 * @return {Object} : deactivated Campaign_restaurant. {status, message, data}
 */
const softDeleteCampaign_restaurant = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Campaign_restaurant, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Campaign_restaurant from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Campaign_restaurant. {status, message, data}
 */
const deleteCampaign_restaurant = async (req, res) => {
  const result = await dbService.deleteByPk(Campaign_restaurant, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Campaign_restaurant in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCampaign_restaurant = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCampaign_restaurant = await dbService.destroy(Campaign_restaurant,query);
    return res.success({ data :{ count :deletedCampaign_restaurant.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Campaign_restaurant from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Campaign_restaurant.
 * @return {Object} : number of deactivated documents of Campaign_restaurant. {status, message, data}
 */
const softDeleteManyCampaign_restaurant = async (req, res) => {
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
    let updatedCampaign_restaurant = await dbService.update(Campaign_restaurant,query,updateBody, options);
    if (!updatedCampaign_restaurant) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCampaign_restaurant.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCampaign_restaurant,
  bulkInsertCampaign_restaurant,
  findAllCampaign_restaurant,
  getCampaign_restaurant,
  getCampaign_restaurantCount,
  updateCampaign_restaurant,
  bulkUpdateCampaign_restaurant,
  partialUpdateCampaign_restaurant,
  softDeleteCampaign_restaurant,
  deleteCampaign_restaurant,
  deleteManyCampaign_restaurant,
  softDeleteManyCampaign_restaurant,
};
