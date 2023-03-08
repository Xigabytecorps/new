/**
 * notificationsController.js
 * @description :: exports action methods for notifications.
 */

const Notifications = require('../../model/notifications');
const notificationsSchemaKey = require('../../utils/validation/notificationsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Notifications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Notifications. {status, message, data}
 */ 
const addNotifications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      notificationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdNotifications = await dbService.createOne(Notifications,dataToCreate);
    return  res.success({ data :createdNotifications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Notifications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Notificationss. {status, message, data}
 */
const bulkInsertNotifications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdNotifications = await dbService.createMany(Notifications,dataToCreate); 
      return  res.success({ data :{ count :createdNotifications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Notifications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Notifications(s). {status, message, data}
 */
const findAllNotifications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundNotifications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      notificationsSchemaKey.findFilterKeys,
      Notifications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundNotifications = await dbService.count(Notifications, query);
      if (!foundNotifications) {
        return res.recordNotFound();
      } 
      foundNotifications = { totalRecords: foundNotifications };
      return res.success({ data :foundNotifications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundNotifications = await dbService.paginate( Notifications,query,options);
    if (!foundNotifications){
      return res.recordNotFound();
    }
    return res.success({ data:foundNotifications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Notifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Notifications. {status, message, data}
 */
const getNotifications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundNotifications = await dbService.findOne(Notifications,{ id :id });
    if (!foundNotifications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundNotifications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Notifications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getNotificationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      notificationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedNotifications = await dbService.count(Notifications,where);
    if (!countedNotifications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedNotifications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Notifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Notifications.
 * @return {Object} : updated Notifications. {status, message, data}
 */
const updateNotifications = async (req, res) => {
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
      notificationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedNotifications = await dbService.update(Notifications,query,dataToUpdate);
    return  res.success({ data :updatedNotifications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Notifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Notificationss.
 * @return {Object} : updated Notificationss. {status, message, data}
 */
const bulkUpdateNotifications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedNotifications = await dbService.update(Notifications,filter,dataToUpdate);
    if (!updatedNotifications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedNotifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Notifications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Notifications.
 * @return {Object} : updated Notifications. {status, message, data}
 */
const partialUpdateNotifications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      notificationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedNotifications = await dbService.update(Notifications, query, dataToUpdate);
    if (!updatedNotifications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedNotifications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Notifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Notifications.
 * @return {Object} : deactivated Notifications. {status, message, data}
 */
const softDeleteNotifications = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Notifications, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Notifications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Notifications. {status, message, data}
 */
const deleteNotifications = async (req, res) => {
  const result = await dbService.deleteByPk(Notifications, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Notifications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyNotifications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedNotifications = await dbService.destroy(Notifications,query);
    return res.success({ data :{ count :deletedNotifications.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Notifications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Notifications.
 * @return {Object} : number of deactivated documents of Notifications. {status, message, data}
 */
const softDeleteManyNotifications = async (req, res) => {
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
    let updatedNotifications = await dbService.update(Notifications,query,updateBody, options);
    if (!updatedNotifications) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedNotifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addNotifications,
  bulkInsertNotifications,
  findAllNotifications,
  getNotifications,
  getNotificationsCount,
  updateNotifications,
  bulkUpdateNotifications,
  partialUpdateNotifications,
  softDeleteNotifications,
  deleteNotifications,
  deleteManyNotifications,
  softDeleteManyNotifications,
};
