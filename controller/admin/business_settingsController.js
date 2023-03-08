/**
 * business_settingsController.js
 * @description :: exports action methods for business_settings.
 */

const Business_settings = require('../../model/business_settings');
const business_settingsSchemaKey = require('../../utils/validation/business_settingsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Business_settings in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Business_settings. {status, message, data}
 */ 
const addBusiness_settings = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      business_settingsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBusiness_settings = await dbService.createOne(Business_settings,dataToCreate);
    return  res.success({ data :createdBusiness_settings });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Business_settings in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Business_settingss. {status, message, data}
 */
const bulkInsertBusiness_settings = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBusiness_settings = await dbService.createMany(Business_settings,dataToCreate); 
      return  res.success({ data :{ count :createdBusiness_settings.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Business_settings from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Business_settings(s). {status, message, data}
 */
const findAllBusiness_settings = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBusiness_settings;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      business_settingsSchemaKey.findFilterKeys,
      Business_settings.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBusiness_settings = await dbService.count(Business_settings, query);
      if (!foundBusiness_settings) {
        return res.recordNotFound();
      } 
      foundBusiness_settings = { totalRecords: foundBusiness_settings };
      return res.success({ data :foundBusiness_settings });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBusiness_settings = await dbService.paginate( Business_settings,query,options);
    if (!foundBusiness_settings){
      return res.recordNotFound();
    }
    return res.success({ data:foundBusiness_settings }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Business_settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Business_settings. {status, message, data}
 */
const getBusiness_settings = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBusiness_settings = await dbService.findOne(Business_settings,{ id :id });
    if (!foundBusiness_settings){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBusiness_settings });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Business_settings.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBusiness_settingsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      business_settingsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBusiness_settings = await dbService.count(Business_settings,where);
    if (!countedBusiness_settings){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBusiness_settings } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Business_settings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Business_settings.
 * @return {Object} : updated Business_settings. {status, message, data}
 */
const updateBusiness_settings = async (req, res) => {
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
      business_settingsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBusiness_settings = await dbService.update(Business_settings,query,dataToUpdate);
    return  res.success({ data :updatedBusiness_settings }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Business_settings with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Business_settingss.
 * @return {Object} : updated Business_settingss. {status, message, data}
 */
const bulkUpdateBusiness_settings = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBusiness_settings = await dbService.update(Business_settings,filter,dataToUpdate);
    if (!updatedBusiness_settings){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBusiness_settings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Business_settings with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Business_settings.
 * @return {Object} : updated Business_settings. {status, message, data}
 */
const partialUpdateBusiness_settings = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      business_settingsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBusiness_settings = await dbService.update(Business_settings, query, dataToUpdate);
    if (!updatedBusiness_settings) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBusiness_settings });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Business_settings from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Business_settings.
 * @return {Object} : deactivated Business_settings. {status, message, data}
 */
const softDeleteBusiness_settings = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Business_settings, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Business_settings from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Business_settings. {status, message, data}
 */
const deleteBusiness_settings = async (req, res) => {
  const result = await dbService.deleteByPk(Business_settings, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Business_settings in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBusiness_settings = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedBusiness_settings = await dbService.destroy(Business_settings,query);
    return res.success({ data :{ count :deletedBusiness_settings.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Business_settings from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Business_settings.
 * @return {Object} : number of deactivated documents of Business_settings. {status, message, data}
 */
const softDeleteManyBusiness_settings = async (req, res) => {
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
    let updatedBusiness_settings = await dbService.update(Business_settings,query,updateBody, options);
    if (!updatedBusiness_settings) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedBusiness_settings.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBusiness_settings,
  bulkInsertBusiness_settings,
  findAllBusiness_settings,
  getBusiness_settings,
  getBusiness_settingsCount,
  updateBusiness_settings,
  bulkUpdateBusiness_settings,
  partialUpdateBusiness_settings,
  softDeleteBusiness_settings,
  deleteBusiness_settings,
  deleteManyBusiness_settings,
  softDeleteManyBusiness_settings,
};
