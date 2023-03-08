/**
 * oauth_access_tokensController.js
 * @description :: exports action methods for oauth_access_tokens.
 */

const Oauth_access_tokens = require('../../model/oauth_access_tokens');
const oauth_access_tokensSchemaKey = require('../../utils/validation/oauth_access_tokensValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Oauth_access_tokens in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Oauth_access_tokens. {status, message, data}
 */ 
const addOauth_access_tokens = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      oauth_access_tokensSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOauth_access_tokens = await dbService.createOne(Oauth_access_tokens,dataToCreate);
    return  res.success({ data :createdOauth_access_tokens });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Oauth_access_tokens in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Oauth_access_tokenss. {status, message, data}
 */
const bulkInsertOauth_access_tokens = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOauth_access_tokens = await dbService.createMany(Oauth_access_tokens,dataToCreate); 
      return  res.success({ data :{ count :createdOauth_access_tokens.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Oauth_access_tokens from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Oauth_access_tokens(s). {status, message, data}
 */
const findAllOauth_access_tokens = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOauth_access_tokens;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      oauth_access_tokensSchemaKey.findFilterKeys,
      Oauth_access_tokens.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOauth_access_tokens = await dbService.count(Oauth_access_tokens, query);
      if (!foundOauth_access_tokens) {
        return res.recordNotFound();
      } 
      foundOauth_access_tokens = { totalRecords: foundOauth_access_tokens };
      return res.success({ data :foundOauth_access_tokens });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOauth_access_tokens = await dbService.paginate( Oauth_access_tokens,query,options);
    if (!foundOauth_access_tokens){
      return res.recordNotFound();
    }
    return res.success({ data:foundOauth_access_tokens }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Oauth_access_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Oauth_access_tokens. {status, message, data}
 */
const getOauth_access_tokens = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOauth_access_tokens = await dbService.findOne(Oauth_access_tokens,{ id :id });
    if (!foundOauth_access_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOauth_access_tokens });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Oauth_access_tokens.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOauth_access_tokensCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      oauth_access_tokensSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOauth_access_tokens = await dbService.count(Oauth_access_tokens,where);
    if (!countedOauth_access_tokens){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOauth_access_tokens } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Oauth_access_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_access_tokens.
 * @return {Object} : updated Oauth_access_tokens. {status, message, data}
 */
const updateOauth_access_tokens = async (req, res) => {
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
      oauth_access_tokensSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOauth_access_tokens = await dbService.update(Oauth_access_tokens,query,dataToUpdate);
    return  res.success({ data :updatedOauth_access_tokens }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Oauth_access_tokens with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_access_tokenss.
 * @return {Object} : updated Oauth_access_tokenss. {status, message, data}
 */
const bulkUpdateOauth_access_tokens = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOauth_access_tokens = await dbService.update(Oauth_access_tokens,filter,dataToUpdate);
    if (!updatedOauth_access_tokens){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOauth_access_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Oauth_access_tokens with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_access_tokens.
 * @return {Object} : updated Oauth_access_tokens. {status, message, data}
 */
const partialUpdateOauth_access_tokens = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      oauth_access_tokensSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOauth_access_tokens = await dbService.update(Oauth_access_tokens, query, dataToUpdate);
    if (!updatedOauth_access_tokens) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOauth_access_tokens });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Oauth_access_tokens from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Oauth_access_tokens.
 * @return {Object} : deactivated Oauth_access_tokens. {status, message, data}
 */
const softDeleteOauth_access_tokens = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Oauth_access_tokens, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Oauth_access_tokens from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Oauth_access_tokens. {status, message, data}
 */
const deleteOauth_access_tokens = async (req, res) => {
  const result = await dbService.deleteByPk(Oauth_access_tokens, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Oauth_access_tokens in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOauth_access_tokens = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOauth_access_tokens = await dbService.destroy(Oauth_access_tokens,query);
    return res.success({ data :{ count :deletedOauth_access_tokens.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Oauth_access_tokens from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Oauth_access_tokens.
 * @return {Object} : number of deactivated documents of Oauth_access_tokens. {status, message, data}
 */
const softDeleteManyOauth_access_tokens = async (req, res) => {
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
    let updatedOauth_access_tokens = await dbService.update(Oauth_access_tokens,query,updateBody, options);
    if (!updatedOauth_access_tokens) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOauth_access_tokens.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOauth_access_tokens,
  bulkInsertOauth_access_tokens,
  findAllOauth_access_tokens,
  getOauth_access_tokens,
  getOauth_access_tokensCount,
  updateOauth_access_tokens,
  bulkUpdateOauth_access_tokens,
  partialUpdateOauth_access_tokens,
  softDeleteOauth_access_tokens,
  deleteOauth_access_tokens,
  deleteManyOauth_access_tokens,
  softDeleteManyOauth_access_tokens,
};
