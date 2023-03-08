/**
 * withdraw_requestsController.js
 * @description :: exports action methods for withdraw_requests.
 */

const Withdraw_requests = require('../../model/withdraw_requests');
const withdraw_requestsSchemaKey = require('../../utils/validation/withdraw_requestsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Withdraw_requests in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Withdraw_requests. {status, message, data}
 */ 
const addWithdraw_requests = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      withdraw_requestsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdWithdraw_requests = await dbService.createOne(Withdraw_requests,dataToCreate);
    return  res.success({ data :createdWithdraw_requests });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Withdraw_requests in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Withdraw_requestss. {status, message, data}
 */
const bulkInsertWithdraw_requests = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdWithdraw_requests = await dbService.createMany(Withdraw_requests,dataToCreate); 
      return  res.success({ data :{ count :createdWithdraw_requests.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Withdraw_requests from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Withdraw_requests(s). {status, message, data}
 */
const findAllWithdraw_requests = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundWithdraw_requests;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      withdraw_requestsSchemaKey.findFilterKeys,
      Withdraw_requests.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundWithdraw_requests = await dbService.count(Withdraw_requests, query);
      if (!foundWithdraw_requests) {
        return res.recordNotFound();
      } 
      foundWithdraw_requests = { totalRecords: foundWithdraw_requests };
      return res.success({ data :foundWithdraw_requests });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundWithdraw_requests = await dbService.paginate( Withdraw_requests,query,options);
    if (!foundWithdraw_requests){
      return res.recordNotFound();
    }
    return res.success({ data:foundWithdraw_requests }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Withdraw_requests from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Withdraw_requests. {status, message, data}
 */
const getWithdraw_requests = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundWithdraw_requests = await dbService.findOne(Withdraw_requests,{ id :id });
    if (!foundWithdraw_requests){
      return res.recordNotFound();
    }
    return  res.success({ data :foundWithdraw_requests });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Withdraw_requests.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getWithdraw_requestsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      withdraw_requestsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedWithdraw_requests = await dbService.count(Withdraw_requests,where);
    if (!countedWithdraw_requests){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedWithdraw_requests } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Withdraw_requests with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Withdraw_requests.
 * @return {Object} : updated Withdraw_requests. {status, message, data}
 */
const updateWithdraw_requests = async (req, res) => {
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
      withdraw_requestsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedWithdraw_requests = await dbService.update(Withdraw_requests,query,dataToUpdate);
    return  res.success({ data :updatedWithdraw_requests }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Withdraw_requests with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Withdraw_requestss.
 * @return {Object} : updated Withdraw_requestss. {status, message, data}
 */
const bulkUpdateWithdraw_requests = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedWithdraw_requests = await dbService.update(Withdraw_requests,filter,dataToUpdate);
    if (!updatedWithdraw_requests){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedWithdraw_requests.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Withdraw_requests with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Withdraw_requests.
 * @return {Object} : updated Withdraw_requests. {status, message, data}
 */
const partialUpdateWithdraw_requests = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      withdraw_requestsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedWithdraw_requests = await dbService.update(Withdraw_requests, query, dataToUpdate);
    if (!updatedWithdraw_requests) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedWithdraw_requests });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Withdraw_requests from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Withdraw_requests.
 * @return {Object} : deactivated Withdraw_requests. {status, message, data}
 */
const softDeleteWithdraw_requests = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Withdraw_requests, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Withdraw_requests from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Withdraw_requests. {status, message, data}
 */
const deleteWithdraw_requests = async (req, res) => {
  const result = await dbService.deleteByPk(Withdraw_requests, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Withdraw_requests in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyWithdraw_requests = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedWithdraw_requests = await dbService.destroy(Withdraw_requests,query);
    return res.success({ data :{ count :deletedWithdraw_requests.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Withdraw_requests from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Withdraw_requests.
 * @return {Object} : number of deactivated documents of Withdraw_requests. {status, message, data}
 */
const softDeleteManyWithdraw_requests = async (req, res) => {
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
    let updatedWithdraw_requests = await dbService.update(Withdraw_requests,query,updateBody, options);
    if (!updatedWithdraw_requests) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedWithdraw_requests.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addWithdraw_requests,
  bulkInsertWithdraw_requests,
  findAllWithdraw_requests,
  getWithdraw_requests,
  getWithdraw_requestsCount,
  updateWithdraw_requests,
  bulkUpdateWithdraw_requests,
  partialUpdateWithdraw_requests,
  softDeleteWithdraw_requests,
  deleteWithdraw_requests,
  deleteManyWithdraw_requests,
  softDeleteManyWithdraw_requests,
};
