/**
 * account_transactionsController.js
 * @description :: exports action methods for account_transactions.
 */

const Account_transactions = require('../../model/account_transactions');
const account_transactionsSchemaKey = require('../../utils/validation/account_transactionsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Account_transactions in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Account_transactions. {status, message, data}
 */ 
const addAccount_transactions = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      account_transactionsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAccount_transactions = await dbService.createOne(Account_transactions,dataToCreate);
    return  res.success({ data :createdAccount_transactions });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Account_transactions in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Account_transactionss. {status, message, data}
 */
const bulkInsertAccount_transactions = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAccount_transactions = await dbService.createMany(Account_transactions,dataToCreate); 
      return  res.success({ data :{ count :createdAccount_transactions.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Account_transactions from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Account_transactions(s). {status, message, data}
 */
const findAllAccount_transactions = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAccount_transactions;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      account_transactionsSchemaKey.findFilterKeys,
      Account_transactions.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAccount_transactions = await dbService.count(Account_transactions, query);
      if (!foundAccount_transactions) {
        return res.recordNotFound();
      } 
      foundAccount_transactions = { totalRecords: foundAccount_transactions };
      return res.success({ data :foundAccount_transactions });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAccount_transactions = await dbService.paginate( Account_transactions,query,options);
    if (!foundAccount_transactions){
      return res.recordNotFound();
    }
    return res.success({ data:foundAccount_transactions }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Account_transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Account_transactions. {status, message, data}
 */
const getAccount_transactions = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAccount_transactions = await dbService.findOne(Account_transactions,{ id :id });
    if (!foundAccount_transactions){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAccount_transactions });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Account_transactions.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAccount_transactionsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      account_transactionsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAccount_transactions = await dbService.count(Account_transactions,where);
    if (!countedAccount_transactions){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAccount_transactions } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Account_transactions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Account_transactions.
 * @return {Object} : updated Account_transactions. {status, message, data}
 */
const updateAccount_transactions = async (req, res) => {
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
      account_transactionsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAccount_transactions = await dbService.update(Account_transactions,query,dataToUpdate);
    return  res.success({ data :updatedAccount_transactions }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Account_transactions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Account_transactionss.
 * @return {Object} : updated Account_transactionss. {status, message, data}
 */
const bulkUpdateAccount_transactions = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAccount_transactions = await dbService.update(Account_transactions,filter,dataToUpdate);
    if (!updatedAccount_transactions){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAccount_transactions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Account_transactions with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Account_transactions.
 * @return {Object} : updated Account_transactions. {status, message, data}
 */
const partialUpdateAccount_transactions = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      account_transactionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAccount_transactions = await dbService.update(Account_transactions, query, dataToUpdate);
    if (!updatedAccount_transactions) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAccount_transactions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Account_transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Account_transactions.
 * @return {Object} : deactivated Account_transactions. {status, message, data}
 */
const softDeleteAccount_transactions = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Account_transactions, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Account_transactions from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Account_transactions. {status, message, data}
 */
const deleteAccount_transactions = async (req, res) => {
  const result = await dbService.deleteByPk(Account_transactions, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Account_transactions in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAccount_transactions = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAccount_transactions = await dbService.destroy(Account_transactions,query);
    return res.success({ data :{ count :deletedAccount_transactions.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Account_transactions from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Account_transactions.
 * @return {Object} : number of deactivated documents of Account_transactions. {status, message, data}
 */
const softDeleteManyAccount_transactions = async (req, res) => {
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
    let updatedAccount_transactions = await dbService.update(Account_transactions,query,updateBody, options);
    if (!updatedAccount_transactions) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAccount_transactions.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAccount_transactions,
  bulkInsertAccount_transactions,
  findAllAccount_transactions,
  getAccount_transactions,
  getAccount_transactionsCount,
  updateAccount_transactions,
  bulkUpdateAccount_transactions,
  partialUpdateAccount_transactions,
  softDeleteAccount_transactions,
  deleteAccount_transactions,
  deleteManyAccount_transactions,
  softDeleteManyAccount_transactions,
};
