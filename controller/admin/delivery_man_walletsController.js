/**
 * delivery_man_walletsController.js
 * @description :: exports action methods for delivery_man_wallets.
 */

const Delivery_man_wallets = require('../../model/delivery_man_wallets');
const delivery_man_walletsSchemaKey = require('../../utils/validation/delivery_man_walletsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Delivery_man_wallets in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Delivery_man_wallets. {status, message, data}
 */ 
const addDelivery_man_wallets = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      delivery_man_walletsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDelivery_man_wallets = await dbService.createOne(Delivery_man_wallets,dataToCreate);
    return  res.success({ data :createdDelivery_man_wallets });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Delivery_man_wallets in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Delivery_man_walletss. {status, message, data}
 */
const bulkInsertDelivery_man_wallets = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDelivery_man_wallets = await dbService.createMany(Delivery_man_wallets,dataToCreate); 
      return  res.success({ data :{ count :createdDelivery_man_wallets.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Delivery_man_wallets from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Delivery_man_wallets(s). {status, message, data}
 */
const findAllDelivery_man_wallets = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDelivery_man_wallets;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      delivery_man_walletsSchemaKey.findFilterKeys,
      Delivery_man_wallets.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDelivery_man_wallets = await dbService.count(Delivery_man_wallets, query);
      if (!foundDelivery_man_wallets) {
        return res.recordNotFound();
      } 
      foundDelivery_man_wallets = { totalRecords: foundDelivery_man_wallets };
      return res.success({ data :foundDelivery_man_wallets });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDelivery_man_wallets = await dbService.paginate( Delivery_man_wallets,query,options);
    if (!foundDelivery_man_wallets){
      return res.recordNotFound();
    }
    return res.success({ data:foundDelivery_man_wallets }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Delivery_man_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Delivery_man_wallets. {status, message, data}
 */
const getDelivery_man_wallets = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDelivery_man_wallets = await dbService.findOne(Delivery_man_wallets,{ id :id });
    if (!foundDelivery_man_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDelivery_man_wallets });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Delivery_man_wallets.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDelivery_man_walletsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      delivery_man_walletsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDelivery_man_wallets = await dbService.count(Delivery_man_wallets,where);
    if (!countedDelivery_man_wallets){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDelivery_man_wallets } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Delivery_man_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_man_wallets.
 * @return {Object} : updated Delivery_man_wallets. {status, message, data}
 */
const updateDelivery_man_wallets = async (req, res) => {
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
      delivery_man_walletsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDelivery_man_wallets = await dbService.update(Delivery_man_wallets,query,dataToUpdate);
    return  res.success({ data :updatedDelivery_man_wallets }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Delivery_man_wallets with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_man_walletss.
 * @return {Object} : updated Delivery_man_walletss. {status, message, data}
 */
const bulkUpdateDelivery_man_wallets = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDelivery_man_wallets = await dbService.update(Delivery_man_wallets,filter,dataToUpdate);
    if (!updatedDelivery_man_wallets){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDelivery_man_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Delivery_man_wallets with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Delivery_man_wallets.
 * @return {Object} : updated Delivery_man_wallets. {status, message, data}
 */
const partialUpdateDelivery_man_wallets = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      delivery_man_walletsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDelivery_man_wallets = await dbService.update(Delivery_man_wallets, query, dataToUpdate);
    if (!updatedDelivery_man_wallets) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDelivery_man_wallets });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Delivery_man_wallets from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Delivery_man_wallets.
 * @return {Object} : deactivated Delivery_man_wallets. {status, message, data}
 */
const softDeleteDelivery_man_wallets = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Delivery_man_wallets, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Delivery_man_wallets from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Delivery_man_wallets. {status, message, data}
 */
const deleteDelivery_man_wallets = async (req, res) => {
  const result = await dbService.deleteByPk(Delivery_man_wallets, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Delivery_man_wallets in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDelivery_man_wallets = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDelivery_man_wallets = await dbService.destroy(Delivery_man_wallets,query);
    return res.success({ data :{ count :deletedDelivery_man_wallets.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Delivery_man_wallets from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Delivery_man_wallets.
 * @return {Object} : number of deactivated documents of Delivery_man_wallets. {status, message, data}
 */
const softDeleteManyDelivery_man_wallets = async (req, res) => {
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
    let updatedDelivery_man_wallets = await dbService.update(Delivery_man_wallets,query,updateBody, options);
    if (!updatedDelivery_man_wallets) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDelivery_man_wallets.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDelivery_man_wallets,
  bulkInsertDelivery_man_wallets,
  findAllDelivery_man_wallets,
  getDelivery_man_wallets,
  getDelivery_man_walletsCount,
  updateDelivery_man_wallets,
  bulkUpdateDelivery_man_wallets,
  partialUpdateDelivery_man_wallets,
  softDeleteDelivery_man_wallets,
  deleteDelivery_man_wallets,
  deleteManyDelivery_man_wallets,
  softDeleteManyDelivery_man_wallets,
};
