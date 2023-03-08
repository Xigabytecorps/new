/**
 * ordersController.js
 * @description :: exports action methods for orders.
 */

const Orders = require('../../../model/orders');
const ordersSchemaKey = require('../../../utils/validation/ordersValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Orders in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Orders. {status, message, data}
 */ 
const addOrders = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ordersSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOrders = await dbService.createOne(Orders,dataToCreate);
    return  res.success({ data :createdOrders });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Orders in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Orderss. {status, message, data}
 */
const bulkInsertOrders = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOrders = await dbService.createMany(Orders,dataToCreate); 
      return  res.success({ data :{ count :createdOrders.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Orders from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Orders(s). {status, message, data}
 */
const findAllOrders = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOrders;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ordersSchemaKey.findFilterKeys,
      Orders.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOrders = await dbService.count(Orders, query);
      if (!foundOrders) {
        return res.recordNotFound();
      } 
      foundOrders = { totalRecords: foundOrders };
      return res.success({ data :foundOrders });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOrders = await dbService.paginate( Orders,query,options);
    if (!foundOrders){
      return res.recordNotFound();
    }
    return res.success({ data:foundOrders }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Orders from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Orders. {status, message, data}
 */
const getOrders = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOrders = await dbService.findOne(Orders,{ id :id });
    if (!foundOrders){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOrders });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Orders.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOrdersCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ordersSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOrders = await dbService.count(Orders,where);
    if (!countedOrders){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOrders } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Orders with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Orders.
 * @return {Object} : updated Orders. {status, message, data}
 */
const updateOrders = async (req, res) => {
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
      ordersSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOrders = await dbService.update(Orders,query,dataToUpdate);
    return  res.success({ data :updatedOrders }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Orders with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Orderss.
 * @return {Object} : updated Orderss. {status, message, data}
 */
const bulkUpdateOrders = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOrders = await dbService.update(Orders,filter,dataToUpdate);
    if (!updatedOrders){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOrders.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Orders with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Orders.
 * @return {Object} : updated Orders. {status, message, data}
 */
const partialUpdateOrders = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ordersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOrders = await dbService.update(Orders, query, dataToUpdate);
    if (!updatedOrders) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOrders });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Orders from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Orders.
 * @return {Object} : deactivated Orders. {status, message, data}
 */
const softDeleteOrders = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Orders, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Orders from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Orders. {status, message, data}
 */
const deleteOrders = async (req, res) => {
  const result = await dbService.deleteByPk(Orders, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Orders in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOrders = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOrders = await dbService.destroy(Orders,query);
    return res.success({ data :{ count :deletedOrders.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Orders from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Orders.
 * @return {Object} : number of deactivated documents of Orders. {status, message, data}
 */
const softDeleteManyOrders = async (req, res) => {
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
    let updatedOrders = await dbService.update(Orders,query,updateBody, options);
    if (!updatedOrders) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOrders.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOrders,
  bulkInsertOrders,
  findAllOrders,
  getOrders,
  getOrdersCount,
  updateOrders,
  bulkUpdateOrders,
  partialUpdateOrders,
  softDeleteOrders,
  deleteOrders,
  deleteManyOrders,
  softDeleteManyOrders,
};
