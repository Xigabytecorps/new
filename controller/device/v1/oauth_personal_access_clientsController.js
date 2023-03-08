/**
 * oauth_personal_access_clientsController.js
 * @description :: exports action methods for oauth_personal_access_clients.
 */

const Oauth_personal_access_clients = require('../../../model/oauth_personal_access_clients');
const oauth_personal_access_clientsSchemaKey = require('../../../utils/validation/oauth_personal_access_clientsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Oauth_personal_access_clients in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Oauth_personal_access_clients. {status, message, data}
 */ 
const addOauth_personal_access_clients = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      oauth_personal_access_clientsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOauth_personal_access_clients = await dbService.createOne(Oauth_personal_access_clients,dataToCreate);
    return  res.success({ data :createdOauth_personal_access_clients });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Oauth_personal_access_clients in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Oauth_personal_access_clientss. {status, message, data}
 */
const bulkInsertOauth_personal_access_clients = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOauth_personal_access_clients = await dbService.createMany(Oauth_personal_access_clients,dataToCreate); 
      return  res.success({ data :{ count :createdOauth_personal_access_clients.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Oauth_personal_access_clients from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Oauth_personal_access_clients(s). {status, message, data}
 */
const findAllOauth_personal_access_clients = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOauth_personal_access_clients;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      oauth_personal_access_clientsSchemaKey.findFilterKeys,
      Oauth_personal_access_clients.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOauth_personal_access_clients = await dbService.count(Oauth_personal_access_clients, query);
      if (!foundOauth_personal_access_clients) {
        return res.recordNotFound();
      } 
      foundOauth_personal_access_clients = { totalRecords: foundOauth_personal_access_clients };
      return res.success({ data :foundOauth_personal_access_clients });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOauth_personal_access_clients = await dbService.paginate( Oauth_personal_access_clients,query,options);
    if (!foundOauth_personal_access_clients){
      return res.recordNotFound();
    }
    return res.success({ data:foundOauth_personal_access_clients }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Oauth_personal_access_clients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Oauth_personal_access_clients. {status, message, data}
 */
const getOauth_personal_access_clients = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOauth_personal_access_clients = await dbService.findOne(Oauth_personal_access_clients,{ id :id });
    if (!foundOauth_personal_access_clients){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOauth_personal_access_clients });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Oauth_personal_access_clients.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOauth_personal_access_clientsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      oauth_personal_access_clientsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOauth_personal_access_clients = await dbService.count(Oauth_personal_access_clients,where);
    if (!countedOauth_personal_access_clients){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOauth_personal_access_clients } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Oauth_personal_access_clients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_personal_access_clients.
 * @return {Object} : updated Oauth_personal_access_clients. {status, message, data}
 */
const updateOauth_personal_access_clients = async (req, res) => {
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
      oauth_personal_access_clientsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOauth_personal_access_clients = await dbService.update(Oauth_personal_access_clients,query,dataToUpdate);
    return  res.success({ data :updatedOauth_personal_access_clients }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Oauth_personal_access_clients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_personal_access_clientss.
 * @return {Object} : updated Oauth_personal_access_clientss. {status, message, data}
 */
const bulkUpdateOauth_personal_access_clients = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOauth_personal_access_clients = await dbService.update(Oauth_personal_access_clients,filter,dataToUpdate);
    if (!updatedOauth_personal_access_clients){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOauth_personal_access_clients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Oauth_personal_access_clients with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_personal_access_clients.
 * @return {Object} : updated Oauth_personal_access_clients. {status, message, data}
 */
const partialUpdateOauth_personal_access_clients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      oauth_personal_access_clientsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOauth_personal_access_clients = await dbService.update(Oauth_personal_access_clients, query, dataToUpdate);
    if (!updatedOauth_personal_access_clients) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOauth_personal_access_clients });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Oauth_personal_access_clients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Oauth_personal_access_clients.
 * @return {Object} : deactivated Oauth_personal_access_clients. {status, message, data}
 */
const softDeleteOauth_personal_access_clients = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Oauth_personal_access_clients, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Oauth_personal_access_clients from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Oauth_personal_access_clients. {status, message, data}
 */
const deleteOauth_personal_access_clients = async (req, res) => {
  const result = await dbService.deleteByPk(Oauth_personal_access_clients, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Oauth_personal_access_clients in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOauth_personal_access_clients = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOauth_personal_access_clients = await dbService.destroy(Oauth_personal_access_clients,query);
    return res.success({ data :{ count :deletedOauth_personal_access_clients.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Oauth_personal_access_clients from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Oauth_personal_access_clients.
 * @return {Object} : number of deactivated documents of Oauth_personal_access_clients. {status, message, data}
 */
const softDeleteManyOauth_personal_access_clients = async (req, res) => {
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
    let updatedOauth_personal_access_clients = await dbService.update(Oauth_personal_access_clients,query,updateBody, options);
    if (!updatedOauth_personal_access_clients) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOauth_personal_access_clients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOauth_personal_access_clients,
  bulkInsertOauth_personal_access_clients,
  findAllOauth_personal_access_clients,
  getOauth_personal_access_clients,
  getOauth_personal_access_clientsCount,
  updateOauth_personal_access_clients,
  bulkUpdateOauth_personal_access_clients,
  partialUpdateOauth_personal_access_clients,
  softDeleteOauth_personal_access_clients,
  deleteOauth_personal_access_clients,
  deleteManyOauth_personal_access_clients,
  softDeleteManyOauth_personal_access_clients,
};
