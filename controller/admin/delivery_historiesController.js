/**
 * delivery_historiesController.js
 * @description :: exports action methods for delivery_histories.
 */

const Delivery_histories = require('../../model/delivery_histories');
const delivery_historiesSchemaKey = require('../../utils/validation/delivery_historiesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Delivery_histories in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Delivery_histories. {status, message, data}
 */ 
const addDelivery_histories = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      delivery_historiesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDelivery_histories = await dbService.createOne(Delivery_histories,dataToCreate);
    return  res.success({ data :createdDelivery_histories });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Delivery_histories in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Delivery_historiess. {status, message, data}
 */
const bulkInsertDelivery_histories = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDelivery_histories = await dbService.createMany(Delivery_histories,dataToCreate); 
      return  res.success({ data :{ count :createdDelivery_histories.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Delivery_histories from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Delivery_histories(s). {status, message, data}
 */
const findAllDelivery_histories = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDelivery_histories;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      delivery_historiesSchemaKey.findFilterKeys,
      Delivery_histories.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDelivery_histories = await dbService.count(Delivery_histories, query);
      if (!foundDelivery_histories) {
        return res.recordNotFound();
      } 
      foundDelivery_histories = { totalRecords: foundDelivery_histories };
      return res.success({ data :foundDelivery_histories });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDelivery_histories = await dbService.paginate( Delivery_histories,query,options);
    if (!foundDelivery_histories){
      return res.recordNotFound();
    }
    return res.success({ data:foundDelivery_histories }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Delivery_histories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Delivery_histories. {status, message, data}
 */
const getDelivery_histories = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDelivery_histories = await dbService.findOne(Delivery_histories,{ id :id });
    if (!foundDelivery_histories){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDelivery_histories });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Delivery_histories.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDelivery_historiesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      delivery_historiesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDelivery_histories = await dbService.count(Delivery_histories,where);
    if (!countedDelivery_histories){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDelivery_histories } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Delivery_histories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_histories.
 * @return {Object} : updated Delivery_histories. {status, message, data}
 */
const updateDelivery_histories = async (req, res) => {
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
      delivery_historiesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDelivery_histories = await dbService.update(Delivery_histories,query,dataToUpdate);
    return  res.success({ data :updatedDelivery_histories }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Delivery_histories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_historiess.
 * @return {Object} : updated Delivery_historiess. {status, message, data}
 */
const bulkUpdateDelivery_histories = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDelivery_histories = await dbService.update(Delivery_histories,filter,dataToUpdate);
    if (!updatedDelivery_histories){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDelivery_histories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Delivery_histories with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_histories.
 * @return {Object} : updated Delivery_histories. {status, message, data}
 */
const partialUpdateDelivery_histories = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      delivery_historiesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDelivery_histories = await dbService.update(Delivery_histories, query, dataToUpdate);
    if (!updatedDelivery_histories) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDelivery_histories });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Delivery_histories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Delivery_histories.
 * @return {Object} : deactivated Delivery_histories. {status, message, data}
 */
const softDeleteDelivery_histories = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Delivery_histories, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Delivery_histories from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Delivery_histories. {status, message, data}
 */
const deleteDelivery_histories = async (req, res) => {
  const result = await dbService.deleteByPk(Delivery_histories, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Delivery_histories in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDelivery_histories = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDelivery_histories = await dbService.destroy(Delivery_histories,query);
    return res.success({ data :{ count :deletedDelivery_histories.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Delivery_histories from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Delivery_histories.
 * @return {Object} : number of deactivated documents of Delivery_histories. {status, message, data}
 */
const softDeleteManyDelivery_histories = async (req, res) => {
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
    let updatedDelivery_histories = await dbService.update(Delivery_histories,query,updateBody, options);
    if (!updatedDelivery_histories) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDelivery_histories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDelivery_histories,
  bulkInsertDelivery_histories,
  findAllDelivery_histories,
  getDelivery_histories,
  getDelivery_historiesCount,
  updateDelivery_histories,
  bulkUpdateDelivery_histories,
  partialUpdateDelivery_histories,
  softDeleteDelivery_histories,
  deleteDelivery_histories,
  deleteManyDelivery_histories,
  softDeleteManyDelivery_histories,
};
