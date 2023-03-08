/**
 * user_notificationsController.js
 * @description :: exports action methods for user_notifications.
 */

const User_notifications = require('../../../model/user_notifications');
const user_notificationsSchemaKey = require('../../../utils/validation/user_notificationsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of User_notifications in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created User_notifications. {status, message, data}
 */ 
const addUser_notifications = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      user_notificationsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdUser_notifications = await dbService.createOne(User_notifications,dataToCreate);
    return  res.success({ data :createdUser_notifications });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of User_notifications in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created User_notificationss. {status, message, data}
 */
const bulkInsertUser_notifications = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdUser_notifications = await dbService.createMany(User_notifications,dataToCreate); 
      return  res.success({ data :{ count :createdUser_notifications.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of User_notifications from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found User_notifications(s). {status, message, data}
 */
const findAllUser_notifications = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser_notifications;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      user_notificationsSchemaKey.findFilterKeys,
      User_notifications.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundUser_notifications = await dbService.count(User_notifications, query);
      if (!foundUser_notifications) {
        return res.recordNotFound();
      } 
      foundUser_notifications = { totalRecords: foundUser_notifications };
      return res.success({ data :foundUser_notifications });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundUser_notifications = await dbService.paginate( User_notifications,query,options);
    if (!foundUser_notifications){
      return res.recordNotFound();
    }
    return res.success({ data:foundUser_notifications }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of User_notifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found User_notifications. {status, message, data}
 */
const getUser_notifications = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundUser_notifications = await dbService.findOne(User_notifications,{ id :id });
    if (!foundUser_notifications){
      return res.recordNotFound();
    }
    return  res.success({ data :foundUser_notifications });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of User_notifications.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getUser_notificationsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      user_notificationsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedUser_notifications = await dbService.count(User_notifications,where);
    if (!countedUser_notifications){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedUser_notifications } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of User_notifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_notifications.
 * @return {Object} : updated User_notifications. {status, message, data}
 */
const updateUser_notifications = async (req, res) => {
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
      user_notificationsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedUser_notifications = await dbService.update(User_notifications,query,dataToUpdate);
    return  res.success({ data :updatedUser_notifications }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of User_notifications with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_notificationss.
 * @return {Object} : updated User_notificationss. {status, message, data}
 */
const bulkUpdateUser_notifications = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedUser_notifications = await dbService.update(User_notifications,filter,dataToUpdate);
    if (!updatedUser_notifications){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedUser_notifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of User_notifications with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_notifications.
 * @return {Object} : updated User_notifications. {status, message, data}
 */
const partialUpdateUser_notifications = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_notificationsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedUser_notifications = await dbService.update(User_notifications, query, dataToUpdate);
    if (!updatedUser_notifications) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedUser_notifications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of User_notifications from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of User_notifications.
 * @return {Object} : deactivated User_notifications. {status, message, data}
 */
const softDeleteUser_notifications = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(User_notifications, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of User_notifications from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted User_notifications. {status, message, data}
 */
const deleteUser_notifications = async (req, res) => {
  const result = await dbService.deleteByPk(User_notifications, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of User_notifications in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyUser_notifications = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedUser_notifications = await dbService.destroy(User_notifications,query);
    return res.success({ data :{ count :deletedUser_notifications.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of User_notifications from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of User_notifications.
 * @return {Object} : number of deactivated documents of User_notifications. {status, message, data}
 */
const softDeleteManyUser_notifications = async (req, res) => {
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
    let updatedUser_notifications = await dbService.update(User_notifications,query,updateBody, options);
    if (!updatedUser_notifications) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedUser_notifications.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addUser_notifications,
  bulkInsertUser_notifications,
  findAllUser_notifications,
  getUser_notifications,
  getUser_notificationsCount,
  updateUser_notifications,
  bulkUpdateUser_notifications,
  partialUpdateUser_notifications,
  softDeleteUser_notifications,
  deleteUser_notifications,
  deleteManyUser_notifications,
  softDeleteManyUser_notifications,
};
