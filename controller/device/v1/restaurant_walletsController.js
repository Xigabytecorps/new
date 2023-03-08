/**
 * restaurant_walletsController.js
 * @description :: exports action methods for restaurant_wallets.
 */

const Restaurant_wallets = require('../../../model/restaurant_wallets');
const restaurant_walletsSchemaKey = require('../../../utils/validation/restaurant_walletsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Restaurant_wallets in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Restaurant_wallets. {status, message, data}
 */ 
const addRestaurant_wallets = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      restaurant_walletsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRestaurant_wallets = await dbService.createOne(Restaurant_wallets,dataToCreate);
    return  res.success({ data :createdRestaurant_wallets });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Restaurant_wallets in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Restaurant_walletss. {status, message, data}
 */
const bulkInsertRestaurant_wallets = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRestaurant_wallets = await dbService.createMany(Restaurant_wallets,dataToCreate); 
      return  res.success({ data :{ count :createdRestaurant_wallets.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Restaurant_wallets from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Restaurant_wallets(s). {status, message, data}
 */
const findAllRestaurant_wallets = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRestaurant_wallets;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      restaurant_walletsSchemaKey.findFilterKeys,
      Restaurant_wallets.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRestaurant_wallets = await dbService.count(Restaurant_wallets, query);
      if (!foundRestaurant_wallets) {
        return res.recordNotFound();
      } 
      foundRestaurant_wallets = { totalRecords: foundRestaurant_wallets };
      return res.success({ data :foundRestaurant_wallets });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRestaurant_wallets = await dbService.paginate( Restaurant_wallets,query,options);
    if (!foundRestaurant_wallets){
      return res.recordNotFound();
    }
    return res.success({ data:foundRestaurant_wallets }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Restaurant_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Restaurant_wallets. {status, message, data}
 */
const getRestaurant_wallets = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRestaurant_wallets = await dbService.findOne(Restaurant_wallets,{ id :id });
    if (!foundRestaurant_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRestaurant_wallets });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Restaurant_wallets.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRestaurant_walletsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      restaurant_walletsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRestaurant_wallets = await dbService.count(Restaurant_wallets,where);
    if (!countedRestaurant_wallets){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRestaurant_wallets } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Restaurant_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_wallets.
 * @return {Object} : updated Restaurant_wallets. {status, message, data}
 */
const updateRestaurant_wallets = async (req, res) => {
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
      restaurant_walletsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRestaurant_wallets = await dbService.update(Restaurant_wallets,query,dataToUpdate);
    return  res.success({ data :updatedRestaurant_wallets }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Restaurant_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_walletss.
 * @return {Object} : updated Restaurant_walletss. {status, message, data}
 */
const bulkUpdateRestaurant_wallets = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRestaurant_wallets = await dbService.update(Restaurant_wallets,filter,dataToUpdate);
    if (!updatedRestaurant_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRestaurant_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Restaurant_wallets with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Restaurant_wallets.
 * @return {Object} : updated Restaurant_wallets. {status, message, data}
 */
const partialUpdateRestaurant_wallets = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      restaurant_walletsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRestaurant_wallets = await dbService.update(Restaurant_wallets, query, dataToUpdate);
    if (!updatedRestaurant_wallets) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRestaurant_wallets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Restaurant_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Restaurant_wallets.
 * @return {Object} : deactivated Restaurant_wallets. {status, message, data}
 */
const softDeleteRestaurant_wallets = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Restaurant_wallets, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Restaurant_wallets from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Restaurant_wallets. {status, message, data}
 */
const deleteRestaurant_wallets = async (req, res) => {
  const result = await dbService.deleteByPk(Restaurant_wallets, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Restaurant_wallets in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRestaurant_wallets = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedRestaurant_wallets = await dbService.destroy(Restaurant_wallets,query);
    return res.success({ data :{ count :deletedRestaurant_wallets.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Restaurant_wallets from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Restaurant_wallets.
 * @return {Object} : number of deactivated documents of Restaurant_wallets. {status, message, data}
 */
const softDeleteManyRestaurant_wallets = async (req, res) => {
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
    let updatedRestaurant_wallets = await dbService.update(Restaurant_wallets,query,updateBody, options);
    if (!updatedRestaurant_wallets) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedRestaurant_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRestaurant_wallets,
  bulkInsertRestaurant_wallets,
  findAllRestaurant_wallets,
  getRestaurant_wallets,
  getRestaurant_walletsCount,
  updateRestaurant_wallets,
  bulkUpdateRestaurant_wallets,
  partialUpdateRestaurant_wallets,
  softDeleteRestaurant_wallets,
  deleteRestaurant_wallets,
  deleteManyRestaurant_wallets,
  softDeleteManyRestaurant_wallets,
};
