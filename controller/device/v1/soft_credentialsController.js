/**
 * soft_credentialsController.js
 * @description :: exports action methods for soft_credentials.
 */

const Soft_credentials = require('../../../model/soft_credentials');
const soft_credentialsSchemaKey = require('../../../utils/validation/soft_credentialsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Soft_credentials in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Soft_credentials. {status, message, data}
 */ 
const addSoft_credentials = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      soft_credentialsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdSoft_credentials = await dbService.createOne(Soft_credentials,dataToCreate);
    return  res.success({ data :createdSoft_credentials });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Soft_credentials in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Soft_credentialss. {status, message, data}
 */
const bulkInsertSoft_credentials = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdSoft_credentials = await dbService.createMany(Soft_credentials,dataToCreate); 
      return  res.success({ data :{ count :createdSoft_credentials.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Soft_credentials from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Soft_credentials(s). {status, message, data}
 */
const findAllSoft_credentials = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundSoft_credentials;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      soft_credentialsSchemaKey.findFilterKeys,
      Soft_credentials.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundSoft_credentials = await dbService.count(Soft_credentials, query);
      if (!foundSoft_credentials) {
        return res.recordNotFound();
      } 
      foundSoft_credentials = { totalRecords: foundSoft_credentials };
      return res.success({ data :foundSoft_credentials });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundSoft_credentials = await dbService.paginate( Soft_credentials,query,options);
    if (!foundSoft_credentials){
      return res.recordNotFound();
    }
    return res.success({ data:foundSoft_credentials }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Soft_credentials from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Soft_credentials. {status, message, data}
 */
const getSoft_credentials = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundSoft_credentials = await dbService.findOne(Soft_credentials,{ id :id });
    if (!foundSoft_credentials){
      return res.recordNotFound();
    }
    return  res.success({ data :foundSoft_credentials });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Soft_credentials.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getSoft_credentialsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      soft_credentialsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedSoft_credentials = await dbService.count(Soft_credentials,where);
    if (!countedSoft_credentials){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedSoft_credentials } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Soft_credentials with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Soft_credentials.
 * @return {Object} : updated Soft_credentials. {status, message, data}
 */
const updateSoft_credentials = async (req, res) => {
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
      soft_credentialsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedSoft_credentials = await dbService.update(Soft_credentials,query,dataToUpdate);
    return  res.success({ data :updatedSoft_credentials }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Soft_credentials with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Soft_credentialss.
 * @return {Object} : updated Soft_credentialss. {status, message, data}
 */
const bulkUpdateSoft_credentials = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedSoft_credentials = await dbService.update(Soft_credentials,filter,dataToUpdate);
    if (!updatedSoft_credentials){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedSoft_credentials.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Soft_credentials with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Soft_credentials.
 * @return {Object} : updated Soft_credentials. {status, message, data}
 */
const partialUpdateSoft_credentials = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      soft_credentialsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedSoft_credentials = await dbService.update(Soft_credentials, query, dataToUpdate);
    if (!updatedSoft_credentials) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedSoft_credentials });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Soft_credentials from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Soft_credentials.
 * @return {Object} : deactivated Soft_credentials. {status, message, data}
 */
const softDeleteSoft_credentials = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Soft_credentials, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Soft_credentials from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Soft_credentials. {status, message, data}
 */
const deleteSoft_credentials = async (req, res) => {
  const result = await dbService.deleteByPk(Soft_credentials, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Soft_credentials in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManySoft_credentials = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedSoft_credentials = await dbService.destroy(Soft_credentials,query);
    return res.success({ data :{ count :deletedSoft_credentials.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Soft_credentials from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Soft_credentials.
 * @return {Object} : number of deactivated documents of Soft_credentials. {status, message, data}
 */
const softDeleteManySoft_credentials = async (req, res) => {
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
    let updatedSoft_credentials = await dbService.update(Soft_credentials,query,updateBody, options);
    if (!updatedSoft_credentials) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedSoft_credentials.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addSoft_credentials,
  bulkInsertSoft_credentials,
  findAllSoft_credentials,
  getSoft_credentials,
  getSoft_credentialsCount,
  updateSoft_credentials,
  bulkUpdateSoft_credentials,
  partialUpdateSoft_credentials,
  softDeleteSoft_credentials,
  deleteSoft_credentials,
  deleteManySoft_credentials,
  softDeleteManySoft_credentials,
};
