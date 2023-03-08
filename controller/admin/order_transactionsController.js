/**
 * order_transactionsController.js
 * @description :: exports action methods for order_transactions.
 */

const Order_transactions = require('../../model/order_transactions');
const order_transactionsSchemaKey = require('../../utils/validation/order_transactionsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Order_transactions in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Order_transactions. {status, message, data}
 */ 
const addOrder_transactions = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      order_transactionsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOrder_transactions = await dbService.createOne(Order_transactions,dataToCreate);
    return  res.success({ data :createdOrder_transactions });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Order_transactions in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Order_transactionss. {status, message, data}
 */
const bulkInsertOrder_transactions = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOrder_transactions = await dbService.createMany(Order_transactions,dataToCreate); 
      return  res.success({ data :{ count :createdOrder_transactions.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Order_transactions from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Order_transactions(s). {status, message, data}
 */
const findAllOrder_transactions = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOrder_transactions;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      order_transactionsSchemaKey.findFilterKeys,
      Order_transactions.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOrder_transactions = await dbService.count(Order_transactions, query);
      if (!foundOrder_transactions) {
        return res.recordNotFound();
      } 
      foundOrder_transactions = { totalRecords: foundOrder_transactions };
      return res.success({ data :foundOrder_transactions });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOrder_transactions = await dbService.paginate( Order_transactions,query,options);
    if (!foundOrder_transactions){
      return res.recordNotFound();
    }
    return res.success({ data:foundOrder_transactions }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Order_transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Order_transactions. {status, message, data}
 */
const getOrder_transactions = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOrder_transactions = await dbService.findOne(Order_transactions,{ id :id });
    if (!foundOrder_transactions){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOrder_transactions });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Order_transactions.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOrder_transactionsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      order_transactionsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOrder_transactions = await dbService.count(Order_transactions,where);
    if (!countedOrder_transactions){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOrder_transactions } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Order_transactions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_transactions.
 * @return {Object} : updated Order_transactions. {status, message, data}
 */
const updateOrder_transactions = async (req, res) => {
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
      order_transactionsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOrder_transactions = await dbService.update(Order_transactions,query,dataToUpdate);
    return  res.success({ data :updatedOrder_transactions }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Order_transactions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_transactionss.
 * @return {Object} : updated Order_transactionss. {status, message, data}
 */
const bulkUpdateOrder_transactions = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOrder_transactions = await dbService.update(Order_transactions,filter,dataToUpdate);
    if (!updatedOrder_transactions){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOrder_transactions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Order_transactions with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_transactions.
 * @return {Object} : updated Order_transactions. {status, message, data}
 */
const partialUpdateOrder_transactions = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      order_transactionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOrder_transactions = await dbService.update(Order_transactions, query, dataToUpdate);
    if (!updatedOrder_transactions) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOrder_transactions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Order_transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Order_transactions.
 * @return {Object} : deactivated Order_transactions. {status, message, data}
 */
const softDeleteOrder_transactions = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Order_transactions, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Order_transactions from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Order_transactions. {status, message, data}
 */
const deleteOrder_transactions = async (req, res) => {
  const result = await dbService.deleteByPk(Order_transactions, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Order_transactions in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOrder_transactions = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOrder_transactions = await dbService.destroy(Order_transactions,query);
    return res.success({ data :{ count :deletedOrder_transactions.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Order_transactions from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Order_transactions.
 * @return {Object} : number of deactivated documents of Order_transactions. {status, message, data}
 */
const softDeleteManyOrder_transactions = async (req, res) => {
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
    let updatedOrder_transactions = await dbService.update(Order_transactions,query,updateBody, options);
    if (!updatedOrder_transactions) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOrder_transactions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOrder_transactions,
  bulkInsertOrder_transactions,
  findAllOrder_transactions,
  getOrder_transactions,
  getOrder_transactionsCount,
  updateOrder_transactions,
  bulkUpdateOrder_transactions,
  partialUpdateOrder_transactions,
  softDeleteOrder_transactions,
  deleteOrder_transactions,
  deleteManyOrder_transactions,
  softDeleteManyOrder_transactions,
};
