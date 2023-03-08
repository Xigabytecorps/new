/**
 * currenciesController.js
 * @description :: exports action methods for currencies.
 */

const Currencies = require('../../model/currencies');
const currenciesSchemaKey = require('../../utils/validation/currenciesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Currencies in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Currencies. {status, message, data}
 */ 
const addCurrencies = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      currenciesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCurrencies = await dbService.createOne(Currencies,dataToCreate);
    return  res.success({ data :createdCurrencies });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Currencies in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Currenciess. {status, message, data}
 */
const bulkInsertCurrencies = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCurrencies = await dbService.createMany(Currencies,dataToCreate); 
      return  res.success({ data :{ count :createdCurrencies.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Currencies from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Currencies(s). {status, message, data}
 */
const findAllCurrencies = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCurrencies;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      currenciesSchemaKey.findFilterKeys,
      Currencies.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCurrencies = await dbService.count(Currencies, query);
      if (!foundCurrencies) {
        return res.recordNotFound();
      } 
      foundCurrencies = { totalRecords: foundCurrencies };
      return res.success({ data :foundCurrencies });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCurrencies = await dbService.paginate( Currencies,query,options);
    if (!foundCurrencies){
      return res.recordNotFound();
    }
    return res.success({ data:foundCurrencies }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Currencies from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Currencies. {status, message, data}
 */
const getCurrencies = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCurrencies = await dbService.findOne(Currencies,{ id :id });
    if (!foundCurrencies){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCurrencies });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Currencies.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCurrenciesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      currenciesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCurrencies = await dbService.count(Currencies,where);
    if (!countedCurrencies){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCurrencies } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Currencies with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Currencies.
 * @return {Object} : updated Currencies. {status, message, data}
 */
const updateCurrencies = async (req, res) => {
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
      currenciesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCurrencies = await dbService.update(Currencies,query,dataToUpdate);
    return  res.success({ data :updatedCurrencies }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Currencies with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Currenciess.
 * @return {Object} : updated Currenciess. {status, message, data}
 */
const bulkUpdateCurrencies = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCurrencies = await dbService.update(Currencies,filter,dataToUpdate);
    if (!updatedCurrencies){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCurrencies.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Currencies with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Currencies.
 * @return {Object} : updated Currencies. {status, message, data}
 */
const partialUpdateCurrencies = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      currenciesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCurrencies = await dbService.update(Currencies, query, dataToUpdate);
    if (!updatedCurrencies) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCurrencies });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Currencies from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Currencies.
 * @return {Object} : deactivated Currencies. {status, message, data}
 */
const softDeleteCurrencies = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Currencies, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Currencies from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Currencies. {status, message, data}
 */
const deleteCurrencies = async (req, res) => {
  const result = await dbService.deleteByPk(Currencies, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Currencies in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCurrencies = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCurrencies = await dbService.destroy(Currencies,query);
    return res.success({ data :{ count :deletedCurrencies.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Currencies from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Currencies.
 * @return {Object} : number of deactivated documents of Currencies. {status, message, data}
 */
const softDeleteManyCurrencies = async (req, res) => {
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
    let updatedCurrencies = await dbService.update(Currencies,query,updateBody, options);
    if (!updatedCurrencies) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCurrencies.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCurrencies,
  bulkInsertCurrencies,
  findAllCurrencies,
  getCurrencies,
  getCurrenciesCount,
  updateCurrencies,
  bulkUpdateCurrencies,
  partialUpdateCurrencies,
  softDeleteCurrencies,
  deleteCurrencies,
  deleteManyCurrencies,
  softDeleteManyCurrencies,
};
