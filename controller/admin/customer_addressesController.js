/**
 * customer_addressesController.js
 * @description :: exports action methods for customer_addresses.
 */

const Customer_addresses = require('../../model/customer_addresses');
const customer_addressesSchemaKey = require('../../utils/validation/customer_addressesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Customer_addresses in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Customer_addresses. {status, message, data}
 */ 
const addCustomer_addresses = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      customer_addressesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCustomer_addresses = await dbService.createOne(Customer_addresses,dataToCreate);
    return  res.success({ data :createdCustomer_addresses });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Customer_addresses in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Customer_addressess. {status, message, data}
 */
const bulkInsertCustomer_addresses = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCustomer_addresses = await dbService.createMany(Customer_addresses,dataToCreate); 
      return  res.success({ data :{ count :createdCustomer_addresses.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Customer_addresses from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Customer_addresses(s). {status, message, data}
 */
const findAllCustomer_addresses = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCustomer_addresses;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      customer_addressesSchemaKey.findFilterKeys,
      Customer_addresses.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCustomer_addresses = await dbService.count(Customer_addresses, query);
      if (!foundCustomer_addresses) {
        return res.recordNotFound();
      } 
      foundCustomer_addresses = { totalRecords: foundCustomer_addresses };
      return res.success({ data :foundCustomer_addresses });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCustomer_addresses = await dbService.paginate( Customer_addresses,query,options);
    if (!foundCustomer_addresses){
      return res.recordNotFound();
    }
    return res.success({ data:foundCustomer_addresses }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Customer_addresses from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Customer_addresses. {status, message, data}
 */
const getCustomer_addresses = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCustomer_addresses = await dbService.findOne(Customer_addresses,{ id :id });
    if (!foundCustomer_addresses){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCustomer_addresses });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Customer_addresses.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCustomer_addressesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      customer_addressesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCustomer_addresses = await dbService.count(Customer_addresses,where);
    if (!countedCustomer_addresses){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCustomer_addresses } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Customer_addresses with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customer_addresses.
 * @return {Object} : updated Customer_addresses. {status, message, data}
 */
const updateCustomer_addresses = async (req, res) => {
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
      customer_addressesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCustomer_addresses = await dbService.update(Customer_addresses,query,dataToUpdate);
    return  res.success({ data :updatedCustomer_addresses }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Customer_addresses with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customer_addressess.
 * @return {Object} : updated Customer_addressess. {status, message, data}
 */
const bulkUpdateCustomer_addresses = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCustomer_addresses = await dbService.update(Customer_addresses,filter,dataToUpdate);
    if (!updatedCustomer_addresses){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCustomer_addresses.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Customer_addresses with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customer_addresses.
 * @return {Object} : updated Customer_addresses. {status, message, data}
 */
const partialUpdateCustomer_addresses = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      customer_addressesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCustomer_addresses = await dbService.update(Customer_addresses, query, dataToUpdate);
    if (!updatedCustomer_addresses) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCustomer_addresses });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Customer_addresses from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Customer_addresses.
 * @return {Object} : deactivated Customer_addresses. {status, message, data}
 */
const softDeleteCustomer_addresses = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Customer_addresses, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Customer_addresses from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Customer_addresses. {status, message, data}
 */
const deleteCustomer_addresses = async (req, res) => {
  const result = await dbService.deleteByPk(Customer_addresses, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Customer_addresses in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCustomer_addresses = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCustomer_addresses = await dbService.destroy(Customer_addresses,query);
    return res.success({ data :{ count :deletedCustomer_addresses.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Customer_addresses from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Customer_addresses.
 * @return {Object} : number of deactivated documents of Customer_addresses. {status, message, data}
 */
const softDeleteManyCustomer_addresses = async (req, res) => {
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
    let updatedCustomer_addresses = await dbService.update(Customer_addresses,query,updateBody, options);
    if (!updatedCustomer_addresses) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCustomer_addresses.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCustomer_addresses,
  bulkInsertCustomer_addresses,
  findAllCustomer_addresses,
  getCustomer_addresses,
  getCustomer_addressesCount,
  updateCustomer_addresses,
  bulkUpdateCustomer_addresses,
  partialUpdateCustomer_addresses,
  softDeleteCustomer_addresses,
  deleteCustomer_addresses,
  deleteManyCustomer_addresses,
  softDeleteManyCustomer_addresses,
};
