/**
 * oauth_auth_codesController.js
 * @description :: exports action methods for oauth_auth_codes.
 */

const Oauth_auth_codes = require('../../model/oauth_auth_codes');
const oauth_auth_codesSchemaKey = require('../../utils/validation/oauth_auth_codesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Oauth_auth_codes in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Oauth_auth_codes. {status, message, data}
 */ 
const addOauth_auth_codes = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      oauth_auth_codesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOauth_auth_codes = await dbService.createOne(Oauth_auth_codes,dataToCreate);
    return  res.success({ data :createdOauth_auth_codes });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Oauth_auth_codes in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Oauth_auth_codess. {status, message, data}
 */
const bulkInsertOauth_auth_codes = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOauth_auth_codes = await dbService.createMany(Oauth_auth_codes,dataToCreate); 
      return  res.success({ data :{ count :createdOauth_auth_codes.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Oauth_auth_codes from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Oauth_auth_codes(s). {status, message, data}
 */
const findAllOauth_auth_codes = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOauth_auth_codes;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      oauth_auth_codesSchemaKey.findFilterKeys,
      Oauth_auth_codes.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOauth_auth_codes = await dbService.count(Oauth_auth_codes, query);
      if (!foundOauth_auth_codes) {
        return res.recordNotFound();
      } 
      foundOauth_auth_codes = { totalRecords: foundOauth_auth_codes };
      return res.success({ data :foundOauth_auth_codes });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOauth_auth_codes = await dbService.paginate( Oauth_auth_codes,query,options);
    if (!foundOauth_auth_codes){
      return res.recordNotFound();
    }
    return res.success({ data:foundOauth_auth_codes }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Oauth_auth_codes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Oauth_auth_codes. {status, message, data}
 */
const getOauth_auth_codes = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOauth_auth_codes = await dbService.findOne(Oauth_auth_codes,{ id :id });
    if (!foundOauth_auth_codes){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOauth_auth_codes });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Oauth_auth_codes.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOauth_auth_codesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      oauth_auth_codesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOauth_auth_codes = await dbService.count(Oauth_auth_codes,where);
    if (!countedOauth_auth_codes){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOauth_auth_codes } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Oauth_auth_codes with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_auth_codes.
 * @return {Object} : updated Oauth_auth_codes. {status, message, data}
 */
const updateOauth_auth_codes = async (req, res) => {
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
      oauth_auth_codesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOauth_auth_codes = await dbService.update(Oauth_auth_codes,query,dataToUpdate);
    return  res.success({ data :updatedOauth_auth_codes }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Oauth_auth_codes with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_auth_codess.
 * @return {Object} : updated Oauth_auth_codess. {status, message, data}
 */
const bulkUpdateOauth_auth_codes = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOauth_auth_codes = await dbService.update(Oauth_auth_codes,filter,dataToUpdate);
    if (!updatedOauth_auth_codes){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOauth_auth_codes.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Oauth_auth_codes with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_auth_codes.
 * @return {Object} : updated Oauth_auth_codes. {status, message, data}
 */
const partialUpdateOauth_auth_codes = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      oauth_auth_codesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOauth_auth_codes = await dbService.update(Oauth_auth_codes, query, dataToUpdate);
    if (!updatedOauth_auth_codes) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOauth_auth_codes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Oauth_auth_codes from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Oauth_auth_codes.
 * @return {Object} : deactivated Oauth_auth_codes. {status, message, data}
 */
const softDeleteOauth_auth_codes = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Oauth_auth_codes, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Oauth_auth_codes from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Oauth_auth_codes. {status, message, data}
 */
const deleteOauth_auth_codes = async (req, res) => {
  const result = await dbService.deleteByPk(Oauth_auth_codes, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Oauth_auth_codes in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOauth_auth_codes = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOauth_auth_codes = await dbService.destroy(Oauth_auth_codes,query);
    return res.success({ data :{ count :deletedOauth_auth_codes.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Oauth_auth_codes from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Oauth_auth_codes.
 * @return {Object} : number of deactivated documents of Oauth_auth_codes. {status, message, data}
 */
const softDeleteManyOauth_auth_codes = async (req, res) => {
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
    let updatedOauth_auth_codes = await dbService.update(Oauth_auth_codes,query,updateBody, options);
    if (!updatedOauth_auth_codes) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOauth_auth_codes.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOauth_auth_codes,
  bulkInsertOauth_auth_codes,
  findAllOauth_auth_codes,
  getOauth_auth_codes,
  getOauth_auth_codesCount,
  updateOauth_auth_codes,
  bulkUpdateOauth_auth_codes,
  partialUpdateOauth_auth_codes,
  softDeleteOauth_auth_codes,
  deleteOauth_auth_codes,
  deleteManyOauth_auth_codes,
  softDeleteManyOauth_auth_codes,
};
