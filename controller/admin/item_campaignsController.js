/**
 * item_campaignsController.js
 * @description :: exports action methods for item_campaigns.
 */

const Item_campaigns = require('../../model/item_campaigns');
const item_campaignsSchemaKey = require('../../utils/validation/item_campaignsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Item_campaigns in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Item_campaigns. {status, message, data}
 */ 
const addItem_campaigns = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      item_campaignsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdItem_campaigns = await dbService.createOne(Item_campaigns,dataToCreate);
    return  res.success({ data :createdItem_campaigns });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Item_campaigns in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Item_campaignss. {status, message, data}
 */
const bulkInsertItem_campaigns = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdItem_campaigns = await dbService.createMany(Item_campaigns,dataToCreate); 
      return  res.success({ data :{ count :createdItem_campaigns.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Item_campaigns from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Item_campaigns(s). {status, message, data}
 */
const findAllItem_campaigns = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundItem_campaigns;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      item_campaignsSchemaKey.findFilterKeys,
      Item_campaigns.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundItem_campaigns = await dbService.count(Item_campaigns, query);
      if (!foundItem_campaigns) {
        return res.recordNotFound();
      } 
      foundItem_campaigns = { totalRecords: foundItem_campaigns };
      return res.success({ data :foundItem_campaigns });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundItem_campaigns = await dbService.paginate( Item_campaigns,query,options);
    if (!foundItem_campaigns){
      return res.recordNotFound();
    }
    return res.success({ data:foundItem_campaigns }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Item_campaigns from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Item_campaigns. {status, message, data}
 */
const getItem_campaigns = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundItem_campaigns = await dbService.findOne(Item_campaigns,{ id :id });
    if (!foundItem_campaigns){
      return res.recordNotFound();
    }
    return  res.success({ data :foundItem_campaigns });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Item_campaigns.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getItem_campaignsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      item_campaignsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedItem_campaigns = await dbService.count(Item_campaigns,where);
    if (!countedItem_campaigns){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedItem_campaigns } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Item_campaigns with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Item_campaigns.
 * @return {Object} : updated Item_campaigns. {status, message, data}
 */
const updateItem_campaigns = async (req, res) => {
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
      item_campaignsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedItem_campaigns = await dbService.update(Item_campaigns,query,dataToUpdate);
    return  res.success({ data :updatedItem_campaigns }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Item_campaigns with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Item_campaignss.
 * @return {Object} : updated Item_campaignss. {status, message, data}
 */
const bulkUpdateItem_campaigns = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedItem_campaigns = await dbService.update(Item_campaigns,filter,dataToUpdate);
    if (!updatedItem_campaigns){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedItem_campaigns.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Item_campaigns with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Item_campaigns.
 * @return {Object} : updated Item_campaigns. {status, message, data}
 */
const partialUpdateItem_campaigns = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      item_campaignsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedItem_campaigns = await dbService.update(Item_campaigns, query, dataToUpdate);
    if (!updatedItem_campaigns) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedItem_campaigns });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Item_campaigns from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Item_campaigns.
 * @return {Object} : deactivated Item_campaigns. {status, message, data}
 */
const softDeleteItem_campaigns = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Item_campaigns, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Item_campaigns from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Item_campaigns. {status, message, data}
 */
const deleteItem_campaigns = async (req, res) => {
  const result = await dbService.deleteByPk(Item_campaigns, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Item_campaigns in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyItem_campaigns = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedItem_campaigns = await dbService.destroy(Item_campaigns,query);
    return res.success({ data :{ count :deletedItem_campaigns.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Item_campaigns from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Item_campaigns.
 * @return {Object} : number of deactivated documents of Item_campaigns. {status, message, data}
 */
const softDeleteManyItem_campaigns = async (req, res) => {
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
    let updatedItem_campaigns = await dbService.update(Item_campaigns,query,updateBody, options);
    if (!updatedItem_campaigns) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedItem_campaigns.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addItem_campaigns,
  bulkInsertItem_campaigns,
  findAllItem_campaigns,
  getItem_campaigns,
  getItem_campaignsCount,
  updateItem_campaigns,
  bulkUpdateItem_campaigns,
  partialUpdateItem_campaigns,
  softDeleteItem_campaigns,
  deleteItem_campaigns,
  deleteManyItem_campaigns,
  softDeleteManyItem_campaigns,
};
