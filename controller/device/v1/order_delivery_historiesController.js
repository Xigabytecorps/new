/**
 * order_delivery_historiesController.js
 * @description :: exports action methods for order_delivery_histories.
 */

const Order_delivery_histories = require('../../../model/order_delivery_histories');
const order_delivery_historiesSchemaKey = require('../../../utils/validation/order_delivery_historiesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Order_delivery_histories in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Order_delivery_histories. {status, message, data}
 */ 
const addOrder_delivery_histories = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      order_delivery_historiesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOrder_delivery_histories = await dbService.createOne(Order_delivery_histories,dataToCreate);
    return  res.success({ data :createdOrder_delivery_histories });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Order_delivery_histories in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Order_delivery_historiess. {status, message, data}
 */
const bulkInsertOrder_delivery_histories = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOrder_delivery_histories = await dbService.createMany(Order_delivery_histories,dataToCreate); 
      return  res.success({ data :{ count :createdOrder_delivery_histories.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Order_delivery_histories from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Order_delivery_histories(s). {status, message, data}
 */
const findAllOrder_delivery_histories = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOrder_delivery_histories;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      order_delivery_historiesSchemaKey.findFilterKeys,
      Order_delivery_histories.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOrder_delivery_histories = await dbService.count(Order_delivery_histories, query);
      if (!foundOrder_delivery_histories) {
        return res.recordNotFound();
      } 
      foundOrder_delivery_histories = { totalRecords: foundOrder_delivery_histories };
      return res.success({ data :foundOrder_delivery_histories });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOrder_delivery_histories = await dbService.paginate( Order_delivery_histories,query,options);
    if (!foundOrder_delivery_histories){
      return res.recordNotFound();
    }
    return res.success({ data:foundOrder_delivery_histories }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Order_delivery_histories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Order_delivery_histories. {status, message, data}
 */
const getOrder_delivery_histories = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOrder_delivery_histories = await dbService.findOne(Order_delivery_histories,{ id :id });
    if (!foundOrder_delivery_histories){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOrder_delivery_histories });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Order_delivery_histories.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOrder_delivery_historiesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      order_delivery_historiesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOrder_delivery_histories = await dbService.count(Order_delivery_histories,where);
    if (!countedOrder_delivery_histories){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOrder_delivery_histories } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Order_delivery_histories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_delivery_histories.
 * @return {Object} : updated Order_delivery_histories. {status, message, data}
 */
const updateOrder_delivery_histories = async (req, res) => {
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
      order_delivery_historiesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOrder_delivery_histories = await dbService.update(Order_delivery_histories,query,dataToUpdate);
    return  res.success({ data :updatedOrder_delivery_histories }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Order_delivery_histories with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_delivery_historiess.
 * @return {Object} : updated Order_delivery_historiess. {status, message, data}
 */
const bulkUpdateOrder_delivery_histories = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOrder_delivery_histories = await dbService.update(Order_delivery_histories,filter,dataToUpdate);
    if (!updatedOrder_delivery_histories){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOrder_delivery_histories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Order_delivery_histories with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_delivery_histories.
 * @return {Object} : updated Order_delivery_histories. {status, message, data}
 */
const partialUpdateOrder_delivery_histories = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      order_delivery_historiesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOrder_delivery_histories = await dbService.update(Order_delivery_histories, query, dataToUpdate);
    if (!updatedOrder_delivery_histories) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOrder_delivery_histories });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Order_delivery_histories from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Order_delivery_histories.
 * @return {Object} : deactivated Order_delivery_histories. {status, message, data}
 */
const softDeleteOrder_delivery_histories = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Order_delivery_histories, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Order_delivery_histories from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Order_delivery_histories. {status, message, data}
 */
const deleteOrder_delivery_histories = async (req, res) => {
  const result = await dbService.deleteByPk(Order_delivery_histories, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Order_delivery_histories in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOrder_delivery_histories = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOrder_delivery_histories = await dbService.destroy(Order_delivery_histories,query);
    return res.success({ data :{ count :deletedOrder_delivery_histories.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Order_delivery_histories from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Order_delivery_histories.
 * @return {Object} : number of deactivated documents of Order_delivery_histories. {status, message, data}
 */
const softDeleteManyOrder_delivery_histories = async (req, res) => {
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
    let updatedOrder_delivery_histories = await dbService.update(Order_delivery_histories,query,updateBody, options);
    if (!updatedOrder_delivery_histories) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOrder_delivery_histories.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOrder_delivery_histories,
  bulkInsertOrder_delivery_histories,
  findAllOrder_delivery_histories,
  getOrder_delivery_histories,
  getOrder_delivery_historiesCount,
  updateOrder_delivery_histories,
  bulkUpdateOrder_delivery_histories,
  partialUpdateOrder_delivery_histories,
  softDeleteOrder_delivery_histories,
  deleteOrder_delivery_histories,
  deleteManyOrder_delivery_histories,
  softDeleteManyOrder_delivery_histories,
};
