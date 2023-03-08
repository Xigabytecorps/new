/**
 * conversationsController.js
 * @description :: exports action methods for conversations.
 */

const Conversations = require('../../model/conversations');
const conversationsSchemaKey = require('../../utils/validation/conversationsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Conversations in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Conversations. {status, message, data}
 */ 
const addConversations = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      conversationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdConversations = await dbService.createOne(Conversations,dataToCreate);
    return  res.success({ data :createdConversations });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Conversations in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Conversationss. {status, message, data}
 */
const bulkInsertConversations = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdConversations = await dbService.createMany(Conversations,dataToCreate); 
      return  res.success({ data :{ count :createdConversations.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Conversations from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Conversations(s). {status, message, data}
 */
const findAllConversations = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundConversations;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      conversationsSchemaKey.findFilterKeys,
      Conversations.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundConversations = await dbService.count(Conversations, query);
      if (!foundConversations) {
        return res.recordNotFound();
      } 
      foundConversations = { totalRecords: foundConversations };
      return res.success({ data :foundConversations });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundConversations = await dbService.paginate( Conversations,query,options);
    if (!foundConversations){
      return res.recordNotFound();
    }
    return res.success({ data:foundConversations }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Conversations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Conversations. {status, message, data}
 */
const getConversations = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundConversations = await dbService.findOne(Conversations,{ id :id });
    if (!foundConversations){
      return res.recordNotFound();
    }
    return  res.success({ data :foundConversations });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Conversations.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getConversationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      conversationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedConversations = await dbService.count(Conversations,where);
    if (!countedConversations){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedConversations } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Conversations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Conversations.
 * @return {Object} : updated Conversations. {status, message, data}
 */
const updateConversations = async (req, res) => {
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
      conversationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedConversations = await dbService.update(Conversations,query,dataToUpdate);
    return  res.success({ data :updatedConversations }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Conversations with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Conversationss.
 * @return {Object} : updated Conversationss. {status, message, data}
 */
const bulkUpdateConversations = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedConversations = await dbService.update(Conversations,filter,dataToUpdate);
    if (!updatedConversations){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedConversations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Conversations with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Conversations.
 * @return {Object} : updated Conversations. {status, message, data}
 */
const partialUpdateConversations = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      conversationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedConversations = await dbService.update(Conversations, query, dataToUpdate);
    if (!updatedConversations) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedConversations });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Conversations from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Conversations.
 * @return {Object} : deactivated Conversations. {status, message, data}
 */
const softDeleteConversations = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Conversations, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Conversations from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Conversations. {status, message, data}
 */
const deleteConversations = async (req, res) => {
  const result = await dbService.deleteByPk(Conversations, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Conversations in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyConversations = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedConversations = await dbService.destroy(Conversations,query);
    return res.success({ data :{ count :deletedConversations.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Conversations from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Conversations.
 * @return {Object} : number of deactivated documents of Conversations. {status, message, data}
 */
const softDeleteManyConversations = async (req, res) => {
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
    let updatedConversations = await dbService.update(Conversations,query,updateBody, options);
    if (!updatedConversations) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedConversations.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addConversations,
  bulkInsertConversations,
  findAllConversations,
  getConversations,
  getConversationsCount,
  updateConversations,
  bulkUpdateConversations,
  partialUpdateConversations,
  softDeleteConversations,
  deleteConversations,
  deleteManyConversations,
  softDeleteManyConversations,
};
