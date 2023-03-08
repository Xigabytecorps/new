/**
 * delivery_menController.js
 * @description :: exports action methods for delivery_men.
 */

const Delivery_men = require('../../../model/delivery_men');
const delivery_menSchemaKey = require('../../../utils/validation/delivery_menValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Delivery_men in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Delivery_men. {status, message, data}
 */ 
const addDelivery_men = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      delivery_menSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDelivery_men = await dbService.createOne(Delivery_men,dataToCreate);
    return  res.success({ data :createdDelivery_men });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Delivery_men in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Delivery_mens. {status, message, data}
 */
const bulkInsertDelivery_men = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDelivery_men = await dbService.createMany(Delivery_men,dataToCreate); 
      return  res.success({ data :{ count :createdDelivery_men.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Delivery_men from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Delivery_men(s). {status, message, data}
 */
const findAllDelivery_men = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDelivery_men;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      delivery_menSchemaKey.findFilterKeys,
      Delivery_men.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDelivery_men = await dbService.count(Delivery_men, query);
      if (!foundDelivery_men) {
        return res.recordNotFound();
      } 
      foundDelivery_men = { totalRecords: foundDelivery_men };
      return res.success({ data :foundDelivery_men });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDelivery_men = await dbService.paginate( Delivery_men,query,options);
    if (!foundDelivery_men){
      return res.recordNotFound();
    }
    return res.success({ data:foundDelivery_men }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Delivery_men from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Delivery_men. {status, message, data}
 */
const getDelivery_men = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDelivery_men = await dbService.findOne(Delivery_men,{ id :id });
    if (!foundDelivery_men){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDelivery_men });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Delivery_men.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDelivery_menCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      delivery_menSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDelivery_men = await dbService.count(Delivery_men,where);
    if (!countedDelivery_men){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDelivery_men } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Delivery_men with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_men.
 * @return {Object} : updated Delivery_men. {status, message, data}
 */
const updateDelivery_men = async (req, res) => {
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
      delivery_menSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDelivery_men = await dbService.update(Delivery_men,query,dataToUpdate);
    return  res.success({ data :updatedDelivery_men }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Delivery_men with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_mens.
 * @return {Object} : updated Delivery_mens. {status, message, data}
 */
const bulkUpdateDelivery_men = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDelivery_men = await dbService.update(Delivery_men,filter,dataToUpdate);
    if (!updatedDelivery_men){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDelivery_men.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Delivery_men with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_men.
 * @return {Object} : updated Delivery_men. {status, message, data}
 */
const partialUpdateDelivery_men = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      delivery_menSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDelivery_men = await dbService.update(Delivery_men, query, dataToUpdate);
    if (!updatedDelivery_men) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDelivery_men });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Delivery_men from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Delivery_men.
 * @return {Object} : deactivated Delivery_men. {status, message, data}
 */
const softDeleteDelivery_men = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Delivery_men, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Delivery_men from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Delivery_men. {status, message, data}
 */
const deleteDelivery_men = async (req, res) => {
  const result = await dbService.deleteByPk(Delivery_men, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Delivery_men in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDelivery_men = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDelivery_men = await dbService.destroy(Delivery_men,query);
    return res.success({ data :{ count :deletedDelivery_men.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Delivery_men from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Delivery_men.
 * @return {Object} : number of deactivated documents of Delivery_men. {status, message, data}
 */
const softDeleteManyDelivery_men = async (req, res) => {
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
    let updatedDelivery_men = await dbService.update(Delivery_men,query,updateBody, options);
    if (!updatedDelivery_men) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDelivery_men.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDelivery_men,
  bulkInsertDelivery_men,
  findAllDelivery_men,
  getDelivery_men,
  getDelivery_menCount,
  updateDelivery_men,
  bulkUpdateDelivery_men,
  partialUpdateDelivery_men,
  softDeleteDelivery_men,
  deleteDelivery_men,
  deleteManyDelivery_men,
  softDeleteManyDelivery_men,
};
