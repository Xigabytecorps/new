/**
 * discountsController.js
 * @description :: exports action methods for discounts.
 */

const Discounts = require('../../../model/discounts');
const discountsSchemaKey = require('../../../utils/validation/discountsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Discounts in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Discounts. {status, message, data}
 */ 
const addDiscounts = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      discountsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDiscounts = await dbService.createOne(Discounts,dataToCreate);
    return  res.success({ data :createdDiscounts });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Discounts in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Discountss. {status, message, data}
 */
const bulkInsertDiscounts = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDiscounts = await dbService.createMany(Discounts,dataToCreate); 
      return  res.success({ data :{ count :createdDiscounts.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Discounts from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Discounts(s). {status, message, data}
 */
const findAllDiscounts = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDiscounts;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      discountsSchemaKey.findFilterKeys,
      Discounts.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDiscounts = await dbService.count(Discounts, query);
      if (!foundDiscounts) {
        return res.recordNotFound();
      } 
      foundDiscounts = { totalRecords: foundDiscounts };
      return res.success({ data :foundDiscounts });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDiscounts = await dbService.paginate( Discounts,query,options);
    if (!foundDiscounts){
      return res.recordNotFound();
    }
    return res.success({ data:foundDiscounts }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Discounts from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Discounts. {status, message, data}
 */
const getDiscounts = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDiscounts = await dbService.findOne(Discounts,{ id :id });
    if (!foundDiscounts){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDiscounts });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Discounts.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDiscountsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      discountsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDiscounts = await dbService.count(Discounts,where);
    if (!countedDiscounts){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDiscounts } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Discounts with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Discounts.
 * @return {Object} : updated Discounts. {status, message, data}
 */
const updateDiscounts = async (req, res) => {
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
      discountsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDiscounts = await dbService.update(Discounts,query,dataToUpdate);
    return  res.success({ data :updatedDiscounts }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Discounts with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Discountss.
 * @return {Object} : updated Discountss. {status, message, data}
 */
const bulkUpdateDiscounts = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDiscounts = await dbService.update(Discounts,filter,dataToUpdate);
    if (!updatedDiscounts){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDiscounts.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Discounts with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Discounts.
 * @return {Object} : updated Discounts. {status, message, data}
 */
const partialUpdateDiscounts = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      discountsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDiscounts = await dbService.update(Discounts, query, dataToUpdate);
    if (!updatedDiscounts) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDiscounts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Discounts from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Discounts.
 * @return {Object} : deactivated Discounts. {status, message, data}
 */
const softDeleteDiscounts = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Discounts, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Discounts from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Discounts. {status, message, data}
 */
const deleteDiscounts = async (req, res) => {
  const result = await dbService.deleteByPk(Discounts, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Discounts in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDiscounts = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDiscounts = await dbService.destroy(Discounts,query);
    return res.success({ data :{ count :deletedDiscounts.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Discounts from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Discounts.
 * @return {Object} : number of deactivated documents of Discounts. {status, message, data}
 */
const softDeleteManyDiscounts = async (req, res) => {
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
    let updatedDiscounts = await dbService.update(Discounts,query,updateBody, options);
    if (!updatedDiscounts) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDiscounts.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDiscounts,
  bulkInsertDiscounts,
  findAllDiscounts,
  getDiscounts,
  getDiscountsCount,
  updateDiscounts,
  bulkUpdateDiscounts,
  partialUpdateDiscounts,
  softDeleteDiscounts,
  deleteDiscounts,
  deleteManyDiscounts,
  softDeleteManyDiscounts,
};
