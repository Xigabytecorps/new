/**
 * mail_configsController.js
 * @description :: exports action methods for mail_configs.
 */

const Mail_configs = require('../../model/mail_configs');
const mail_configsSchemaKey = require('../../utils/validation/mail_configsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Mail_configs in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Mail_configs. {status, message, data}
 */ 
const addMail_configs = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      mail_configsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdMail_configs = await dbService.createOne(Mail_configs,dataToCreate);
    return  res.success({ data :createdMail_configs });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Mail_configs in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Mail_configss. {status, message, data}
 */
const bulkInsertMail_configs = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdMail_configs = await dbService.createMany(Mail_configs,dataToCreate); 
      return  res.success({ data :{ count :createdMail_configs.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Mail_configs from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Mail_configs(s). {status, message, data}
 */
const findAllMail_configs = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundMail_configs;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      mail_configsSchemaKey.findFilterKeys,
      Mail_configs.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundMail_configs = await dbService.count(Mail_configs, query);
      if (!foundMail_configs) {
        return res.recordNotFound();
      } 
      foundMail_configs = { totalRecords: foundMail_configs };
      return res.success({ data :foundMail_configs });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundMail_configs = await dbService.paginate( Mail_configs,query,options);
    if (!foundMail_configs){
      return res.recordNotFound();
    }
    return res.success({ data:foundMail_configs }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Mail_configs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Mail_configs. {status, message, data}
 */
const getMail_configs = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundMail_configs = await dbService.findOne(Mail_configs,{ id :id });
    if (!foundMail_configs){
      return res.recordNotFound();
    }
    return  res.success({ data :foundMail_configs });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Mail_configs.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getMail_configsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      mail_configsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedMail_configs = await dbService.count(Mail_configs,where);
    if (!countedMail_configs){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedMail_configs } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Mail_configs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Mail_configs.
 * @return {Object} : updated Mail_configs. {status, message, data}
 */
const updateMail_configs = async (req, res) => {
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
      mail_configsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedMail_configs = await dbService.update(Mail_configs,query,dataToUpdate);
    return  res.success({ data :updatedMail_configs }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Mail_configs with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Mail_configss.
 * @return {Object} : updated Mail_configss. {status, message, data}
 */
const bulkUpdateMail_configs = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedMail_configs = await dbService.update(Mail_configs,filter,dataToUpdate);
    if (!updatedMail_configs){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedMail_configs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Mail_configs with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Mail_configs.
 * @return {Object} : updated Mail_configs. {status, message, data}
 */
const partialUpdateMail_configs = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      mail_configsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedMail_configs = await dbService.update(Mail_configs, query, dataToUpdate);
    if (!updatedMail_configs) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedMail_configs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Mail_configs from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Mail_configs.
 * @return {Object} : deactivated Mail_configs. {status, message, data}
 */
const softDeleteMail_configs = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Mail_configs, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Mail_configs from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Mail_configs. {status, message, data}
 */
const deleteMail_configs = async (req, res) => {
  const result = await dbService.deleteByPk(Mail_configs, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Mail_configs in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyMail_configs = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedMail_configs = await dbService.destroy(Mail_configs,query);
    return res.success({ data :{ count :deletedMail_configs.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Mail_configs from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Mail_configs.
 * @return {Object} : number of deactivated documents of Mail_configs. {status, message, data}
 */
const softDeleteManyMail_configs = async (req, res) => {
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
    let updatedMail_configs = await dbService.update(Mail_configs,query,updateBody, options);
    if (!updatedMail_configs) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedMail_configs.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addMail_configs,
  bulkInsertMail_configs,
  findAllMail_configs,
  getMail_configs,
  getMail_configsCount,
  updateMail_configs,
  bulkUpdateMail_configs,
  partialUpdateMail_configs,
  softDeleteMail_configs,
  deleteMail_configs,
  deleteManyMail_configs,
  softDeleteManyMail_configs,
};
