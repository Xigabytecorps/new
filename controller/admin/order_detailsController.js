/**
 * order_detailsController.js
 * @description :: exports action methods for order_details.
 */

const Order_details = require('../../model/order_details');
const order_detailsSchemaKey = require('../../utils/validation/order_detailsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Order_details in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Order_details. {status, message, data}
 */ 
const addOrder_details = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      order_detailsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOrder_details = await dbService.createOne(Order_details,dataToCreate);
    return  res.success({ data :createdOrder_details });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Order_details in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Order_detailss. {status, message, data}
 */
const bulkInsertOrder_details = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOrder_details = await dbService.createMany(Order_details,dataToCreate); 
      return  res.success({ data :{ count :createdOrder_details.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Order_details from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Order_details(s). {status, message, data}
 */
const findAllOrder_details = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOrder_details;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      order_detailsSchemaKey.findFilterKeys,
      Order_details.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOrder_details = await dbService.count(Order_details, query);
      if (!foundOrder_details) {
        return res.recordNotFound();
      } 
      foundOrder_details = { totalRecords: foundOrder_details };
      return res.success({ data :foundOrder_details });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOrder_details = await dbService.paginate( Order_details,query,options);
    if (!foundOrder_details){
      return res.recordNotFound();
    }
    return res.success({ data:foundOrder_details }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Order_details from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Order_details. {status, message, data}
 */
const getOrder_details = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOrder_details = await dbService.findOne(Order_details,{ id :id });
    if (!foundOrder_details){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOrder_details });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Order_details.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOrder_detailsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      order_detailsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOrder_details = await dbService.count(Order_details,where);
    if (!countedOrder_details){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOrder_details } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Order_details with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_details.
 * @return {Object} : updated Order_details. {status, message, data}
 */
const updateOrder_details = async (req, res) => {
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
      order_detailsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOrder_details = await dbService.update(Order_details,query,dataToUpdate);
    return  res.success({ data :updatedOrder_details }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Order_details with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_detailss.
 * @return {Object} : updated Order_detailss. {status, message, data}
 */
const bulkUpdateOrder_details = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOrder_details = await dbService.update(Order_details,filter,dataToUpdate);
    if (!updatedOrder_details){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOrder_details.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Order_details with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order_details.
 * @return {Object} : updated Order_details. {status, message, data}
 */
const partialUpdateOrder_details = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      order_detailsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOrder_details = await dbService.update(Order_details, query, dataToUpdate);
    if (!updatedOrder_details) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOrder_details });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Order_details from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Order_details.
 * @return {Object} : deactivated Order_details. {status, message, data}
 */
const softDeleteOrder_details = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Order_details, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Order_details from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Order_details. {status, message, data}
 */
const deleteOrder_details = async (req, res) => {
  const result = await dbService.deleteByPk(Order_details, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Order_details in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOrder_details = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOrder_details = await dbService.destroy(Order_details,query);
    return res.success({ data :{ count :deletedOrder_details.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Order_details from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Order_details.
 * @return {Object} : number of deactivated documents of Order_details. {status, message, data}
 */
const softDeleteManyOrder_details = async (req, res) => {
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
    let updatedOrder_details = await dbService.update(Order_details,query,updateBody, options);
    if (!updatedOrder_details) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOrder_details.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOrder_details,
  bulkInsertOrder_details,
  findAllOrder_details,
  getOrder_details,
  getOrder_detailsCount,
  updateOrder_details,
  bulkUpdateOrder_details,
  partialUpdateOrder_details,
  softDeleteOrder_details,
  deleteOrder_details,
  deleteManyOrder_details,
  softDeleteManyOrder_details,
};
