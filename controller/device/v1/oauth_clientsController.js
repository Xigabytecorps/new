/**
 * oauth_clientsController.js
 * @description :: exports action methods for oauth_clients.
 */

const Oauth_clients = require('../../../model/oauth_clients');
const oauth_clientsSchemaKey = require('../../../utils/validation/oauth_clientsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Oauth_clients in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Oauth_clients. {status, message, data}
 */ 
const addOauth_clients = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      oauth_clientsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOauth_clients = await dbService.createOne(Oauth_clients,dataToCreate);
    return  res.success({ data :createdOauth_clients });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Oauth_clients in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Oauth_clientss. {status, message, data}
 */
const bulkInsertOauth_clients = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOauth_clients = await dbService.createMany(Oauth_clients,dataToCreate); 
      return  res.success({ data :{ count :createdOauth_clients.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Oauth_clients from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Oauth_clients(s). {status, message, data}
 */
const findAllOauth_clients = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOauth_clients;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      oauth_clientsSchemaKey.findFilterKeys,
      Oauth_clients.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOauth_clients = await dbService.count(Oauth_clients, query);
      if (!foundOauth_clients) {
        return res.recordNotFound();
      } 
      foundOauth_clients = { totalRecords: foundOauth_clients };
      return res.success({ data :foundOauth_clients });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOauth_clients = await dbService.paginate( Oauth_clients,query,options);
    if (!foundOauth_clients){
      return res.recordNotFound();
    }
    return res.success({ data:foundOauth_clients }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Oauth_clients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Oauth_clients. {status, message, data}
 */
const getOauth_clients = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOauth_clients = await dbService.findOne(Oauth_clients,{ id :id });
    if (!foundOauth_clients){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOauth_clients });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Oauth_clients.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOauth_clientsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      oauth_clientsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOauth_clients = await dbService.count(Oauth_clients,where);
    if (!countedOauth_clients){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOauth_clients } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Oauth_clients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_clients.
 * @return {Object} : updated Oauth_clients. {status, message, data}
 */
const updateOauth_clients = async (req, res) => {
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
      oauth_clientsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOauth_clients = await dbService.update(Oauth_clients,query,dataToUpdate);
    return  res.success({ data :updatedOauth_clients }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Oauth_clients with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_clientss.
 * @return {Object} : updated Oauth_clientss. {status, message, data}
 */
const bulkUpdateOauth_clients = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOauth_clients = await dbService.update(Oauth_clients,filter,dataToUpdate);
    if (!updatedOauth_clients){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOauth_clients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Oauth_clients with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Oauth_clients.
 * @return {Object} : updated Oauth_clients. {status, message, data}
 */
const partialUpdateOauth_clients = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      oauth_clientsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOauth_clients = await dbService.update(Oauth_clients, query, dataToUpdate);
    if (!updatedOauth_clients) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOauth_clients });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Oauth_clients from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Oauth_clients.
 * @return {Object} : deactivated Oauth_clients. {status, message, data}
 */
const softDeleteOauth_clients = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Oauth_clients, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Oauth_clients from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Oauth_clients. {status, message, data}
 */
const deleteOauth_clients = async (req, res) => {
  const result = await dbService.deleteByPk(Oauth_clients, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Oauth_clients in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOauth_clients = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOauth_clients = await dbService.destroy(Oauth_clients,query);
    return res.success({ data :{ count :deletedOauth_clients.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Oauth_clients from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Oauth_clients.
 * @return {Object} : number of deactivated documents of Oauth_clients. {status, message, data}
 */
const softDeleteManyOauth_clients = async (req, res) => {
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
    let updatedOauth_clients = await dbService.update(Oauth_clients,query,updateBody, options);
    if (!updatedOauth_clients) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOauth_clients.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOauth_clients,
  bulkInsertOauth_clients,
  findAllOauth_clients,
  getOauth_clients,
  getOauth_clientsCount,
  updateOauth_clients,
  bulkUpdateOauth_clients,
  partialUpdateOauth_clients,
  softDeleteOauth_clients,
  deleteOauth_clients,
  deleteManyOauth_clients,
  softDeleteManyOauth_clients,
};
